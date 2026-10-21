import { createModels, type Models } from "@earendil-works/pi-ai/models";
import { anthropicProvider } from "@earendil-works/pi-ai/providers/anthropic";
import { openaiProvider } from "@earendil-works/pi-ai/providers/openai";
import { fauxAssistantMessage, fauxProvider, fauxToolCall } from "@earendil-works/pi-ai/providers/faux";

export function liveModels(): Models {
  const models = createModels();
  models.setProvider(anthropicProvider());
  models.setProvider(openaiProvider());
  return models;
}

/** A scripted installation example. It makes real tool calls, but no model requests. */
export function demoModels(): Models {
  const faux = fauxProvider();
  const calls = [
    { id: "company/company-writing-style", path: "SKILL.md" },
    { id: "agent/draft-release-notes", path: "SKILL.md" },
    { id: "agent/draft-release-notes", path: "references/template.md" },
  ];
  faux.setResponses([
    ...calls.map(args => fauxAssistantMessage(fauxToolCall("read_skill", args), { stopReason: "toolUse" })),
    transcript => {
      const reads = transcript.messages.filter(message => message.role === "toolResult").slice(-3);
      if (reads.length !== 3 || reads.some(message => message.isError)) {
        throw new Error("The demo could not read both skill scopes and the template. Check the skill files.");
      }
      const evidence = reads.map(message => {
        const text = message.content.find(part => part.type === "text");
        const result = JSON.parse(text?.type === "text" ? text.text : "{}");
        return `${result.id}/${result.path} @ ${String(result.revision).slice(0, 12)}`;
      });
      return fauxAssistantMessage(`Scripted demo — no live model was used.\n\n# Field Notes 1.2\n\n## Highlights\n- Export reports as CSV.\n\n## Fixes\n- Report date filters stay selected when you switch tabs.\n\n## Upgrade notes\n- Existing accounts update automatically. No action is needed.\n\nSkills read:\n${evidence.map(line => `- ${line}`).join("\n")}`);
    },
  ]);
  const models = createModels();
  models.setProvider(faux.provider);
  return models;
}
