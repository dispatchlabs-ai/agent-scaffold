import { defineAgent } from "@dispatch/runner";

export default defineAgent({
  trigger: { mode: "manual" },
  input: "Review the supplied source and draft; report findings without changing anything.",
});
