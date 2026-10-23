// Load trusted example definitions without starting agents or model requests.
import { catalog, loadAgent, agentName } from "@dispatch/runner";
import { readdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const problems: string[] = [];
// catalog() omits invalid names, so inspect the directories before using it.
for (const folder of await readdir(new URL("../agents/", import.meta.url), { withFileTypes: true })) {
  if (folder.isDirectory() && !agentName.test(folder.name))
    problems.push(`${folder.name}: name does not follow the runner's naming rules`);
}

const entries = await catalog(root);
for (const entry of entries) {
  if (!entry.runnable) {
    console.log(`draft: ${entry.id} has no agent.ts; skipped`);
    continue;
  }
  try {
    const agent = await loadAgent(root, entry.id);
    const targets = [...(agent.delegates ?? []), ...(agent.handoff ? [agent.handoff.target] : [])];
    for (const target of targets) {
      if (!entries.some(candidate => candidate.runnable && candidate.id === target))
        problems.push(`${entry.id}: ${target} is not a runnable agent`);
    }
    if (agent.skills && !agent.skillCatalog?.length)
      problems.push(`${entry.id}: enables skill discovery but no skills resolve`);
  } catch (error) {
    problems.push(`${entry.id}: ${error instanceof Error ? error.message : String(error)}`);
  }
}

if (problems.length) {
  for (const problem of problems) console.error(problem);
  process.exit(1);
}
console.log(`Definitions ok: ${entries.filter(entry => entry.runnable).length} runnable, ${entries.length} total.`);
