import { defineAgent } from "@dispatch/runner";

export default defineAgent({
  trigger: { mode: "manual" },
  input: "Ask which changes should be included in the release notes.",
  skills: true,
});
