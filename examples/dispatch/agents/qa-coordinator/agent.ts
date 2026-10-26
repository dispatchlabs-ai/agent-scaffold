import { defineAgent } from "@dispatch/runner";
import { exampleCaseTools } from "../../src/parallel-cases.ts";

export default defineAgent({
  trigger: { mode: "manual" },
  input: "Review the assigned cases in parallel and reconcile their evidence.",
  clones: true,
  extensions: [exampleCaseTools],
});
