import { createHash } from "node:crypto";
import { readFile, realpath } from "node:fs/promises";
import { resolve } from "node:path";
import { parseArgs } from "node:util";
import { fileURLToPath } from "node:url";
import { catalog, chatInTerminal, loadAgent, CredentialError, promptForSecret, type UserCredentials } from "@dispatch/runner";
import { demoModels, liveModels, userCredentials } from "./models.ts";

const root = fileURLToPath(new URL("../", import.meta.url));
let credentials: UserCredentials | undefined;

try {
  const { values, positionals } = parseArgs({ allowPositionals: true, options: {
    demo: { type: "boolean" }, help: { type: "boolean" }, list: { type: "boolean" },
    skills: { type: "boolean" }, history: { type: "boolean" }, new: { type: "boolean" },
    session: { type: "string" }, prompt: { type: "string" }, "prompt-file": { type: "string" },
    "state-dir": { type: "string" }, "update-definitions": { type: "boolean" },
    credentials: { type: "string" }, cwd: { type: "string" },
    once: { type: "boolean" }, continuous: { type: "boolean" },
  } });
  if (values.credentials && !["session", "environment"].includes(values.credentials)) throw new Error("--credentials accepts session or environment.");
  if (positionals.length > 1) throw new Error("Supply one agent name. Use --prompt for a one-shot message.");
  const name = positionals[0] ?? "helper";
  if (values.help) {
    console.log("Usage: npm run chat -- [agent] [--demo | --prompt TEXT | --prompt-file PATH]\nOptions: --list, --skills, --cwd PATH, --session NAME, --new, --history, --state-dir PATH, --update-definitions\nForeman continues by default. --once runs a single pass; --continuous follows a continuous agent's loop.\nCredentials: npm run auth -- help; --credentials session or --credentials environment\nInteractive commands: /new, /history, /quit");
  } else if (values.list) {
    for (const agent of await catalog(root)) console.log(`${agent.id}${agent.runnable ? "" : " (draft)"}`);
  } else {
    const agent = await loadAgent(root, name);
    if (values.skills) {
      for (const skill of agent.skillCatalog ?? []) console.log(`${skill.id}\t${skill.revision.slice(0, 12)}\t${skill.description}`);
    } else {
      if (values.prompt && values["prompt-file"]) throw new Error("Choose --prompt or --prompt-file.");
      if (values.once && values.continuous) throw new Error("Choose --once or --continuous.");
      const continuous = !values.history && !values.once && (values.continuous || name === "foreman");
      if (continuous && agent.trigger.mode !== "continuous") throw new Error("Continuous work requires a continuous agent definition.");
      if ((values.cwd || ["foreman", "worker", "lander"].includes(name)) && !("repositoryInstructions" in agent)) {
        throw new Error("Repository work requires the updated local runner. Follow docs/foreman.md, then run npm run link-runner -- /path/to/dispatch.");
      }
      if (["foreman", "worker", "lander"].includes(name) && !values.cwd) throw new Error("Supply --cwd PATH for the repository to work on. See docs/foreman.md.");
      const cwd = values.cwd ? await realpath(resolve(values.cwd)) : undefined;
      const workspace = cwd ? createHash("sha256").update(cwd).digest("hex").slice(0, 16) : undefined;
      if (values.demo && (name !== "helper" || values.prompt || values["prompt-file"])) throw new Error("The scripted demo runs helper with assets/sample-changes.md. Omit --demo for your own prompts.");
      if (!values.demo && !values.history) {
        credentials = await userCredentials();
        if (values.credentials === "environment") credentials.useEnvironment(agent.model.provider);
        else if (values.credentials === "session") credentials.useSession(agent.model.provider, await promptForSecret(`${agent.model.provider} API key (this session only)`));
        else if ((await credentials.status(agent.model.provider))[0].source === "unconfigured") {
          if (!process.stdin.isTTY) throw new Error("No credential source configured. Run npm run auth -- login " + agent.model.provider + ", configure a helper, or explicitly select --credentials environment. The demo needs no key.");
          credentials.useSession(agent.model.provider, await promptForSecret(`${agent.model.provider} API key (this session only; use npm run auth for saved setup)`));
        }
      }
      const models = values.demo ? demoModels() : liveModels(credentials);
      if (!values.demo && !values.history) {
        if (!models.getModel(agent.model.provider, agent.model.id)) throw new Error("Unknown model. Set a supported provider and model in agent.md; see docs/setup.md.");
        if (!await models.getAuth(agent.model.provider)) throw new Error(`No credentials for ${agent.model.provider}. Run npm run auth -- help; see docs/credentials.md. Try npm run demo without credentials.`);
      }
      const prompt = values.demo ? await readFile(resolve(root, "assets/sample-changes.md"), "utf8")
        : values["prompt-file"] ? await readFile(resolve(values["prompt-file"]), "utf8") : values.prompt;
      const options = { root, models, agent: name, demo: values.demo, cwd,
        stateRoot: resolve(values["state-dir"] ?? resolve(root, ".state", values.demo ? "demo" : "live", ...(workspace ? [workspace] : []))),
        session: values.session, newChat: values.new, history: values.history, prompt,
        updateDefinitions: values["update-definitions"], continuous,
      };
      await chatInTerminal(options);
    }
  }
} catch (error) {
  const safe = error instanceof Error && error.cause instanceof CredentialError ? error.cause : error;
  console.error(safe instanceof Error ? safe.message : "The command failed.");
  process.exitCode = safe instanceof CredentialError && safe.code === "CANCELLED" ? 130 : 1;
} finally {
  credentials?.clearSession();
}
