import { defineAgent } from "@dispatch/runner";
import { CodingTools } from "@earendil-works/pi-durable/tools";

export default defineAgent({
  trigger: { mode: "manual" },
  input: "Integrate the completed work: reconcile it with its base branch, run the repository's checks and land it.",
  extensions: [CodingTools],
});
