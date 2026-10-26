import { createModels } from "@earendil-works/pi-ai/models";
import { fauxAssistantMessage, fauxProvider, fauxToolCall, type FauxResponseFactory } from "@earendil-works/pi-ai/providers/faux";

const draft = "# Field Notes 1.2\n- Export reports as CSV.\n- Report date filters stay selected when switching tabs.\n- Existing accounts update automatically; no action is needed.";

/** Scripted responses exercise real native messages; they do not measure an LLM. */
export function sequenceDemoModels() {
  const faux = fauxProvider();
  const respond: FauxResponseFactory = transcript => {
    // Requeue the same transcript-driven script, including after process restart.
    faux.appendResponses([respond]);
    const index = transcript.messages.findLastIndex(message => message.role === "user");
    const input = transcript.messages[index];
    const text = input?.role === "user"
      ? typeof input.content === "string" ? input.content
        : input.content.flatMap(part => part.type === "text" ? [part.text] : []).join("\n")
      : "";
    const result = transcript.messages.slice(index + 1).findLast(message => message.role === "toolResult");
    if (result?.role === "toolResult") {
      if (result.isError) throw new Error("The scripted messaging tool failed; inspect saved tool results.");
      if (result.toolName === "agent_instances") {
        const content = result.content.find(part => part.type === "text");
        const { self } = JSON.parse(content?.type === "text" ? content.text : "{}");
        if (typeof self !== "string") throw new Error("Instance discovery returned no self ID.");
        return fauxAssistantMessage(fauxToolCall("message_agent", {
          agent: "author", instance: self, reply: false,
          text: `Check this draft against the source; report-only review follows a no-change pass.\n\nSource:\n${text}\n\nDraft:\n${draft}`,
        }), { stopReason: "toolUse" });
      }
      if (result.toolName === "message_agent") return fauxAssistantMessage("Message admitted. This turn is a checkpoint, not completion of the sequence.");
    }
    if (text.startsWith("Reply from agent instance reviewer:")) {
      return fauxAssistantMessage(`Review received; no new drafting cycle started.\n\n${text}`);
    }
    if (/^Message from agent instance author:\d+ to reviewer:/.test(text)) {
      return fauxAssistantMessage("Scripted review: the draft preserves all three supplied changes and adds no unsupported claim. No edits or publication performed.");
    }
    if (/^Message from agent instance author:\d+ to author:/.test(text)) {
      return fauxAssistantMessage(fauxToolCall("message_agent", {
        agent: "reviewer", title: "Independent release-note review", reply: true,
        text: `Review this exact source and draft. The complete checking pass required no changes. Report findings only; do not rewrite or publish.\n\n${text}`,
      }), { stopReason: "toolUse" });
    }
    return fauxAssistantMessage(fauxToolCall("agent_instances", {}), { stopReason: "toolUse" });
  };
  faux.setResponses([respond]);
  const models = createModels();
  models.setProvider(faux.provider);
  return models;
}
