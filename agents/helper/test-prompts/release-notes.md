# Draft release notes from supplied changes

Based on this scaffold's [sample changes](../../../assets/sample-changes.md) and [helper instructions](../agent.md). The sample product and changes are synthetic; the exercise uses the helper's actual release-note workflow.

**Needs:** the helper's instructions, both linked skills, their template, and the sample input. Use an existing agent that can read those files, or supply their contents. Return text in the conversation; no publishing integration is needed.

## Prompt

```text
Read the helper instructions, the company writing skill, this agent's release-note skill and its template, and assets/sample-changes.md. Draft customer-facing release notes using only the supplied facts. Explain any missing information that affects the result. Return the draft here.
```

## Check

- The draft identifies Field Notes 1.2 and covers CSV report export, the report-date-filter fix, and automatic updates with no action required.
- It follows the supplied style and template without inventing a release date, unsupported features, or performance claims.
- The agent actually reads or receives the referenced material. It does not claim to publish the draft or modify files.
- Record the agent/model and source revisions, supplied input, actual reply, and a pass/partial/fail result. A reviewed prompt is not evidence that a model completed it.
