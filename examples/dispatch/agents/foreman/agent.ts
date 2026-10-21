import { defineAgent } from "@dispatch/runner";
import { CodingTools } from "@earendil-works/pi-durable/tools";

const definition = {
  trigger: { mode: "manual" as const },
  input: "Assess the assigned repository and complete the requested scope.",
  extensions: [CodingTools],
  delegates: ["worker"],
};

export default defineAgent(definition);
