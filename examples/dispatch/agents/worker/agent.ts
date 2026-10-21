import { defineAgent } from "@dispatch/runner";
import { CodingTools } from "@earendil-works/pi-durable/tools";

export default defineAgent({
  trigger: { mode: "manual" },
  input: "Assess the assigned repository and complete the requested scope.",
  extensions: [CodingTools],
});
