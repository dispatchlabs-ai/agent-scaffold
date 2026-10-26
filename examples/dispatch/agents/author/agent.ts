import { defineAgent } from "@dispatch/runner";

export default defineAgent({
  trigger: { mode: "manual" },
  input: "Draft the assigned release notes, check them, then request independent review.",
  messages: ["author", "reviewer"],
});
