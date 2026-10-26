import { randomUUID } from "node:crypto";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { parseArgs } from "node:util";
import { withAbortSignal } from "@earendil-works/chord/context";
import { context, createRunner, loadAgent, type ChatService, type UserCredentials } from "@dispatch/runner";
import { liveModels, userCredentials } from "./models.ts";
import { sequenceDemoModels } from "./sequence-demo.ts";
import { parallelDemoModels } from "./parallel-demo.ts";

const root = fileURLToPath(new URL("../", import.meta.url));
let service: ChatService | undefined;
let credentials: UserCredentials | undefined;
const watches: { stop(): Promise<void> }[] = [];
const interrupted = new AbortController();
const signal = () => interrupted.abort();
process.once("SIGINT", signal);
process.once("SIGTERM", signal);

// Keep terminal control bytes from saved or generated text out of the terminal.
const display = (value: string) => value.replace(/[\x00-\x08\x0b-\x1f\x7f-\x9f]/g,
  character => `\\x${character.charCodeAt(0).toString(16).padStart(2, "0")}`);

try {
  const { values } = parseArgs({ options: {
    demo: { type: "boolean" }, history: { type: "boolean" }, resume: { type: "boolean" },
    help: { type: "boolean" }, "prompt-file": { type: "string" },
    parallel: { type: "boolean" },
    "state-dir": { type: "string" }, "update-definitions": { type: "boolean" },
  } });
  if (values.help) {
    console.log("Usage: npm run sequence -- [--demo] [--prompt-file PATH | --resume | --history] [--state-dir PATH] [--update-definitions]\nUse npm run parallel for the owned-child QA example. Each run creates a new primary instance.\n--resume submits nothing; --history does not resume work. Ctrl+C suspends the host.\nSee docs/independent-agents.md and docs/parallel-qa.md.");
  } else {
    const names = values.parallel ? ["qa-coordinator"] : ["author", "reviewer"];
    const workflow = values.parallel ? "parallel" : "sequence";
    if ([values["prompt-file"], values.resume, values.history].filter(Boolean).length > 1)
      throw new Error("Choose --prompt-file, --resume or --history.");
    if (values.demo && values["prompt-file"]) throw new Error("The scripted demo uses only its synthetic example inputs.");
    // Read inputs and validate credentials before creating state or resuming work.
    const prompt = values.resume || values.history ? undefined
      : values.parallel && !values["prompt-file"] ? "Review the supported and ineligible example cases in parallel, including every trace record, and reconcile both reports."
        : await readFile(values["prompt-file"] ? resolve(values["prompt-file"]) : resolve(root, "assets/sample-changes.md"), "utf8");
    if (prompt !== undefined && !prompt.trim()) throw new Error("The assignment is empty.");
    if (!values.demo && !values.history) credentials = await userCredentials();
    const models = values.demo ? (values.parallel ? parallelDemoModels() : sequenceDemoModels()) : liveModels(credentials);
    if (!values.demo && !values.history) {
      for (const name of names) {
        const { model } = await loadAgent(root, name);
        if (!models.getModel(model.provider, model.id)) throw new Error(`Configure a supported model for ${name}.`);
        if (!await models.getAuth(model.provider))
          throw new Error(`Configure credentials with npm run auth -- login ${model.provider}. The demo needs no credentials.`);
      }
    }
    const stateRoot = resolve(values["state-dir"] ?? resolve(root, ".state", workflow, values.demo ? "demo" : "live"));
    service = await createRunner({ namespace: `scaffold-${workflow}` }).ChatService.open({
      root, stateRoot, names, models, demo: !!values.demo, resume: false,
      updateDefinitions: values["update-definitions"],
    });
    console.log(`State: ${stateRoot}\n${values.demo ? "Scripted demo: no live model or credentials." : `Live ${workflow}: supplied content goes to each configured model provider.`}`);
    if (values.history) {
      for (const chat of await service.list()) {
        console.log(`\n${chat.id}: ${display(chat.title)}`);
        for (const message of (await service.snapshot(chat.id)).messages)
          console.log(`${message.role}: ${display(message.text || message.error || "")}`);
      }
    } else {
      const seen = new Set<string>();
      const tools = new Map<string, string>();
      const attached = new Set<string>();
      const existing = new Set((await service.list()).map(chat => chat.id));
      watches.push(await service.watchList(async chats => {
        for (const chat of chats) {
          if (attached.has(chat.id)) continue;
          attached.add(chat.id);
          let initial = true;
          watches.push(await service!.watch(chat.id, async snapshot => {
            for (const message of snapshot.messages) {
              const key = `${chat.id}/${message.id}`;
              if (seen.has(key)) continue;
              seen.add(key);
              if (initial && existing.has(chat.id)) continue;
              console.log(`[${chat.id}] ${message.role}: ${display(message.text || message.error || "")}`);
            }
            initial = false;
            const active = snapshot.tools.join(", ");
            if (active && active !== tools.get(chat.id)) console.log(`[${chat.id}] tools: ${display(active)}`);
            tools.set(chat.id, active);
          }));
        }
      }));
      let primary: string | undefined;
      interrupted.signal.throwIfAborted();
      if (prompt !== undefined) {
        const key = randomUUID();
        const chat = await service.create(names[0], "cli", key, values.parallel ? "Parallel QA review" : "Release notes and independent review");
        primary = chat.id;
        const receipt = await service.submit(chat.id, prompt, key, "followUp", "cli");
        console.log(`Assignment: ${chat.id}; submission: ${receipt.submissionId}`);
      }
      for (const host of service.hosts.values()) host.harness.resume();
      const ctx = withAbortSignal(interrupted.signal, context);
      // Observe native tasks, including background message delivery/replies.
      // waitForIdle alone excludes background work and can close too early.
      for (;;) {
        const pending: Promise<unknown>[] = [];
        for (const host of service.hosts.values()) {
          const state = await host.harness.inspect(ctx);
          for (const task of state.tasks) pending.push(host.harness.waitForTask(task.record.id, ctx));
          for (const item of state.submissions) {
            const submission = await host.harness.submission(item.id, ctx);
            if (submission) pending.push(submission.wait(ctx));
          }
        }
        if (!pending.length) break;
        await Promise.all(pending);
      }
      if (values.demo && primary) {
        const snapshot = await service.snapshot(primary);
        if (!snapshot.messages.some(message => message.role === "assistant" && (values.parallel
          ? message.text.startsWith("Parallel QA complete: 2/2") && message.text.includes("supported: PASS") && message.text.includes("ineligible: FAIL")
          : message.text.startsWith("Review received;") && message.text.includes("(answered)")
            && message.text.includes("Scripted review: the draft preserves all three supplied changes"))))
          throw new Error("The scripted workflow did not receive the expected reports. Inspect history and native tool results.");
      }
      console.log("All admitted work settled. Inspect the findings; idle is not a quality verdict.");
    }
  }
} catch (error) {
  console.error(interrupted.signal.aborted ? "Suspended. Use --resume with the same state directory and mode." :
    display(error instanceof Error ? error.message : "Sequence failed."));
  process.exitCode = interrupted.signal.aborted ? 130 : 1;
} finally {
  try {
    for (const watch of watches) await watch.stop();
  } finally {
    try { await service?.close(); }
    finally {
      credentials?.clearSession();
      process.removeListener("SIGINT", signal);
      process.removeListener("SIGTERM", signal);
    }
  }
}
