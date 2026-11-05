import { defineAgent, RequestCompletion } from "@dispatch/runner";
import { CodingTools } from "@earendil-works/pi-durable/tools";

export default defineAgent({
  trigger: { mode: "manual" },
  input: "Complete the user’s current request.",
  skills: true,
  delegates: ["assistant-sol", "assistant-terra", "assistant-glm-flash", "assistant-opus", "assistant-fable"],
  messages: ["development", "developer", "code-reviewer", "use-case-tester"],
  extensions: [CodingTools, RequestCompletion],
});
