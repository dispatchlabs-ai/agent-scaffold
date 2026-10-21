import { readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { parseArgs } from "node:util";
import { fileURLToPath } from "node:url";
import { catalog, chatInTerminal, loadAgent } from "@dispatch/runner";
import { demoModels, liveModels } from "./models.ts";

const root = fileURLToPath(new URL("../", import.meta.url));

try {
  const envFile = resolve(root, ".env");
  if (existsSync(envFile)) process.loadEnvFile(envFile);
  const { values, positionals } = parseArgs({ allowPositionals: true, options: {
    demo: { type: "boolean" }, help: { type: "boolean" }, list: { type: "boolean" },
    skills: { type: "boolean" }, history: { type: "boolean" }, new: { type: "boolean" },
    session: { type: "string" }, prompt: { type: "string" }, "prompt-file": { type: "string" },
    "state-dir": { type: "string" }, "update-definitions": { type: "boolean" },
  } });
  if (positionals.length > 1) throw new Error("Supply one agent name. Use --prompt for a one-shot message.");
  const name = positionals[0] ?? "helper";
  if (values.help) {
    console.log("Usage: npm run chat -- [agent] [--demo | --prompt TEXT | --prompt-file PATH]\nOptions: --list, --skills, --session NAME, --new, --history, --state-dir PATH, --update-definitions\nInteractive commands: /new, /history, /quit");
  } else if (values.list) {
    for (const agent of await catalog(root)) console.log(`${agent.id}${agent.runnable ? "" : " (draft)"}`);
  } else {
    const agent = await loadAgent(root, name);
    if (values.skills) {
      for (const skill of agent.skillCatalog ?? []) console.log(`${skill.id}\t${skill.revision.slice(0, 12)}\t${skill.description}`);
    } else {
      if (values.prompt && values["prompt-file"]) throw new Error("Choose --prompt or --prompt-file.");
      if (values.demo && (name !== "helper" || values.prompt || values["prompt-file"])) throw new Error("The scripted demo runs helper with assets/sample-changes.md. Omit --demo for your own prompts.");
      const models = values.demo ? demoModels() : liveModels();
      if (!values.demo && !values.history) {
        if (!models.getModel(agent.model.provider, agent.model.id)) throw new Error("Unknown model. Set a supported provider and model in agent.md; see docs/setup.md.");
        if (!await models.getAuth(agent.model.provider)) throw new Error(`No credentials for ${agent.model.provider}. Add your provider API key to .env; see .env.example and docs/setup.md. Try npm run demo without credentials.`);
      }
      const prompt = values.demo ? await readFile(resolve(root, "assets/sample-changes.md"), "utf8")
        : values["prompt-file"] ? await readFile(resolve(values["prompt-file"]), "utf8") : values.prompt;
      await chatInTerminal({ root, models, agent: name, demo: values.demo,
        stateRoot: resolve(values["state-dir"] ?? resolve(root, ".state", values.demo ? "demo" : "live")),
        session: values.session, newChat: values.new, history: values.history, prompt,
        updateDefinitions: values["update-definitions"],
      });
    }
  }
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
}
