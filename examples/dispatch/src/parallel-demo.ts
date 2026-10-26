import { createModels } from "@earendil-works/pi-ai/models";
import { fauxAssistantMessage, fauxProvider, fauxToolCall, type FauxResponseFactory } from "@earendil-works/pi-ai/providers/faux";

/** Transcript-driven responses survive reopening; only the QA judgment is scripted. */
export function parallelDemoModels() {
  const faux = fauxProvider();
  const respond: FauxResponseFactory = transcript => {
    faux.appendResponses([respond]);
    const user = transcript.messages.findLast(message => message.role === "user");
    const input = user?.role === "user"
      ? typeof user.content === "string" ? user.content
        : user.content.flatMap(part => part.type === "text" ? [part.text] : []).join("\n")
      : "";
    const results = transcript.messages.filter(message => message.role === "toolResult");
    if (input.startsWith("CHILD CASE")) {
      const name = input.includes("ineligible") ? "ineligible" : "supported";
      const result = results.findLast(message => message.role === "toolResult" && message.toolName === "read_example_case");
      if (!result) return fauxAssistantMessage(fauxToolCall("read_example_case", { case: name }), { stopReason: "toolUse" });
      if (result.role !== "toolResult" || result.isError) return fauxAssistantMessage(`${name}: BLOCKED; case tool failed.`);
      const text = result.content.find(part => part.type === "text");
      const evidence = JSON.parse(text?.type === "text" ? text.text : "{}");
      const approved = evidence.trace?.find((entry: { id: string }) => entry.id === "e3")?.result?.approved;
      return fauxAssistantMessage(`${name}: ${approved ? "PASS" : "FAIL"}; synthetic recorded evidence only. Reviewed all four trace records e1–e4, including call1 arguments and its result. Approval: ${approved ? "pass" : "fail"} at e3/e4. Experience: pass at e3. Child conversation ${evidence.conversationId}.`);
    }
    if (!results.length) return fauxAssistantMessage([
      fauxToolCall("clone_agent", { task: "CHILD CASE supported. Read read_example_case and review every expectation and all trace records, including tool calls/results. Report findings only." }),
      fauxToolCall("clone_agent", { task: "CHILD CASE ineligible. Read read_example_case and review every expectation and all trace records, including tool calls/results. Report findings only." }),
    ], { stopReason: "toolUse" });
    const reports = results.filter(message => message.role === "toolResult" && message.toolName === "clone_agent");
    return fauxAssistantMessage(`Parallel QA complete: ${reports.length}/2 child results. This scripted example is not live-search qualification.\n` +
      reports.map(message => message.role === "toolResult"
        ? `${message.isError ? "CHILD ERROR: " : ""}${message.content.flatMap(part => part.type === "text" ? [part.text] : []).join("\n")}` : "").join("\n") +
      "\nOverall: not passed; preserve the failures and gaps above.");
  };
  faux.setResponses([respond]);
  const models = createModels();
  models.setProvider(faux.provider);
  return models;
}
