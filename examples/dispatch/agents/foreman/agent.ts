import { defineAgent } from "@dispatch/runner";
import { CodingTools } from "@earendil-works/pi-durable/tools";

const definition = {
  trigger: { mode: "continuous" as const, delayMs: 0 },
  input: "Continue the authorized repository goal using the conversation and current repository state. Reassess what remains, choose the next useful action and carry it through. A completed pass does not complete the overall goal. Preserve existing work and constraints; do not manufacture changes or expand authorization. If missing input prevents every useful next action, call pause_loop with the specific blocker and needed input, then explain it.",
  extensions: [CodingTools],
  delegates: ["worker"],
};

export default defineAgent(definition);
