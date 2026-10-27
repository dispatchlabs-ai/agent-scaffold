import { fileURLToPath } from "node:url";
import { resolve } from "node:path";
import { parseArgs } from "node:util";
import { createRunner, loadAgent, run } from "@dispatch/runner";
import { liveModels, userCredentials } from "./models.ts";
import { sequenceDemoModels } from "./sequence-demo.ts";

const { values } = parseArgs({ options: {
  demo: { type: "boolean" }, "state-dir": { type: "string" },
  "update-definitions": { type: "boolean" },
} });
const root = fileURLToPath(new URL("../", import.meta.url));
const credentials = values.demo ? undefined : await userCredentials();
let app: Awaited<ReturnType<typeof run>> | undefined;
let watch: { stop(): Promise<void> } | undefined;
try {
  const models = values.demo ? sequenceDemoModels() : liveModels(credentials);
  if (!values.demo) for (const name of ["author", "reviewer"]) {
    const { model } = await loadAgent(root, name);
    if (!models.getModel(model.provider, model.id) || !await models.getAuth(model.provider))
      throw new Error(`Configure a supported model and credentials for ${name}.`);
  }
  app = await run({ root, models, demo: !!values.demo, names: ["author", "reviewer"],
    runner: createRunner({ namespace: "scaffold-sequence" }),
    stateRoot: resolve(values["state-dir"] ?? resolve(root, ".state/schedules", values.demo ? "demo" : "live")),
    updateDefinitions: values["update-definitions"],
  });
  console.log(JSON.stringify(await app.service.schedules(), null, 2));
  console.log("Calendar service running. factory.yaml enables agents. Ctrl-C suspends native work.");
  watch = await app.service.watchList(async chats => {
    console.log(JSON.stringify(chats.map(({ id, source, createdAt }) => ({ id, source, createdAt }))));
  });
  process.stdin.resume();
  await new Promise<void>(resolve => {
    process.once("SIGINT", () => resolve());
    process.once("SIGTERM", () => resolve());
  });
} finally {
  process.stdin.pause();
  await watch?.stop();
  await app?.close();
}
