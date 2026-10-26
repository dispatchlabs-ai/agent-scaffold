import { Type } from "@earendil-works/pi-ai";
import { defineExtension, defineTool } from "@earendil-works/pi-durable";

/** Public, synthetic recorded evidence. No application, network or profile store. */
export const exampleCaseTools = defineExtension({
  name: "scaffold.parallel-example",
  tools: [defineTool({
    name: "read_example_case",
    description: "Read one complete synthetic case, its plain-English expectations and all trace records. This is recorded example evidence, not a fresh application run.",
    parameters: Type.Object({ case: Type.Union([Type.Literal("supported"), Type.Literal("ineligible")]) }),
    replay: "safe",
    async execute(input, api) {
      const approved = input.case === "supported";
      const trace = [
        { id: "e1", role: "user", content: "Find an approved advisor with experience leading a manufacturer." },
        { id: "e2", role: "assistant", toolCall: { id: "call1", name: "find_profiles", arguments: { experience: "manufacturing" } } },
        { id: "e3", role: "tool", callId: "call1", result: { name: "Jordan Example", approved, evidence: "Led a manufacturing business." } },
        { id: "e4", role: "assistant", content: "Jordan Example is an approved advisor with manufacturing leadership experience." },
      ];
      return { output: [{ type: "text", text: JSON.stringify({
        case: input.case, conversationId: api.conversationId,
        mode: "synthetic-recorded-evidence",
        expectations: ["Recommend only approved advisors.", "Support the claimed experience with profile evidence."],
        traceComplete: true, trace,
      }) }] };
    },
  })],
});
