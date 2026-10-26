# Make the structure your own

Start with `agents/helper/agent.md`. It describes the agent's purpose, instructions
and related skills in ordinary Markdown. Give each agent its own folder and use
clear names, such as `release-helper` or `researcher`.

The root example chooses no model, runtime, tool set or schedule. Add executable
definitions and configuration only when you integrate your chosen runtime. Put
company integration code in `src/`, and document how to run it in `docs/`.

For repository improvement, adapt [the foreman](../agents/foreman/agent.md) and
[worker](../agents/worker/agent.md) roles, and add the optional
[lander](../agents/lander/agent.md) as the final gate for repositories with
formal checks: it verifies, reconciles and reports a finished change before it
merges. Supply each agent with the applicable repository `AGENTS.md` and its
own `agent.md`. The optional Dispatch example has a
[local runnable prototype](../examples/dispatch/docs/foreman.md).

## Sequences of independent agents

Use an independent-agent sequence when each role should have its own address,
history, tools and lifecycle: for example, improve a repository until a complete
pass changes nothing, then ask another agent to review the exact result.
Create an instance per assignment, not another definition per target repository.

The working agent can continue in its own instance, then send an explicit handoff
to a new or existing peer. Include the scope, source or exact revisions, evidence,
remaining questions, and authority. The peer does not inherit the sender's
history or permissions. An optional reply returns findings; it is not a new
assignment and should not accidentally restart the workflow.

Keep the stopping condition and business sequence in role instructions. Let the
chosen runtime own admission, persistence and recovery. Do not add a supervisor,
notes subsystem or scheduler merely to connect the roles. Existing company
knowledge, such as a wiki, remains the home for durable findings.

The optional Dispatch [independent-agent walkthrough](../examples/dispatch/docs/independent-agents.md)
includes complete author/reviewer definitions, service wiring, a credential-free
scripted demonstration and live commands. It contrasts peer messages with
private child delegation; neither the directory layout nor this guide implements
messaging for other runtimes.

## Parallel QA with a coordinator

Use a coordinator when independent assignments should be performed by copies of
the same agent and reconciled into one result. Start with the
[QA role](../agents/qa-coordinator/agent.md). Unlike independent siblings,
these children belong to the coordinator's work and inherit its configuration
and granted tools, but begin with fresh histories.

Assign a complete conversation chain to each child. Keep dependent follow-ups in
order; run independent variants from equivalent fresh state. Each assignment
includes its exact prompts, plain-English expectations, target/source identity,
permitted effects, isolated mutable resources and required evidence. Launch
independent children together instead of waiting for one before assigning another.

Each child checks every expectation and the entire native trace, including tool
arguments, results, errors and recovery. The QA transcript is not the trace of
the system under test. Keep expectations outside that system's accessible context.
Missing traces or unperformed UI checks are gaps, not passes. Reconcile every
assignment with a result, including failed children; successful execution is not
acceptance. Use the existing company knowledge source for durable findings.

The optional [Dispatch walkthrough](../examples/dispatch/docs/parallel-qa.md)
demonstrates native parallel clones using two synthetic recorded traces, one
passing and one failing. Runtime configuration inheritance is not a filesystem
copy or a security boundary. The host still owns credentials and permissions;
Pi owns tasks and recovery. No second scheduler or worker limit is needed.

## Agent-local schedules

Keep schedule definitions and their assignment prompts with the agent that owns
the work, not in a growing company-wide list. One agent can have several schedules
for different times, prompts or target repositories without duplicating the role.
The selected runtime owns timing, admission, persistence and recovery; the agent
owns its work and handoffs. A schedule submits an assignment rather than
supervising an entire workflow.

The optional Dispatch [daily 3 a.m. Eastern example](../examples/dispatch/docs/schedules.md)
shows a proposed `schedules` list in `agent.ts`, with an adjacent imported
`schedules.ts` if it grows. Company configuration selects enabled agents instead
of containing their prompts and timetables. **This is an accepted design, not
implemented cron support.** The root scaffold remains runtime-neutral and
provides no scheduler.

## Email as another channel

Expose existing roles through a dedicated mailbox and per-agent aliases instead
of duplicating their definitions. Declare each assigned email address in its
owning agent's definition; omit it for agents without email. The helper shows
a synthetic optional `Email` line. Keep shared mailbox connections and credentials
in private installation configuration, delivery in an adapter and conversation
state in the runtime.
The [email pattern](email.md) covers complete filing, thread continuity,
authorization, reply identity and recovery. It is a design guide, not an
implemented email adapter or an invitation to mirror private conversations.

## Two skill scopes

```text
skills/company-writing-style/SKILL.md
agents/helper/skills/draft-release-notes/SKILL.md
agents/helper/skills/draft-release-notes/references/template.md
```

`skills/` holds guidance that can be shared across the company. Skills under an
agent's folder belong to that agent. A `SKILL.md` contains a name and description
in YAML frontmatter, followed by instructions. Supporting resources stay beside
that skill and are linked using relative paths.

The sample helper links to both scopes. An agent with file access can follow those
links, or you can supply the files as context. The layout alone does not load
skills automatically or restrict which files an agent can read. Discovery, tool
permissions and saved history depend on the runtime you choose.

## Test prompts

Keep reusable conversations in `agents/<name>/test-prompts/`, beside the agent's
definition. Use one descriptive Markdown file per workflow, without an extra
README or nested scenario directory. The helper's
[release-note exercise](../agents/helper/test-prompts/release-notes.md) and
[correction exercise](../agents/helper/test-prompts/correction-and-evidence.md)
show the convention.

Include the source or realistic task, required inputs/capabilities, exact prompt
and follow-up turns, and observable expected results. For real operations, name
the permitted targets/effects, verification, recovery, and cleanup. Resolve any
placeholders before sending; a prompt file does not grant access or approval.
Retain the actual agent/source revisions, inputs, result, and evidence with the
operator's run records. Keep secrets and private transcripts out of this public
template. Do not mark an exercise passed merely because it was written.

These files are selected by the operator. They are not automatically loaded as
role instructions, skills, or a test runner. Adapt the examples to each agent's
real work; use synthetic inputs for public examples.

For independent capability measurement, keep preparation notes, expected results,
reference answers, and earlier scored runs outside the executing agent's allowed
reads and context. Supply only selected messages, normal instructions/skills, and
task inputs. Verify this across file, retrieval, and delegated-tool access using
restricted input staging or enforced permissions; this directory convention does
not isolate files. If isolation cannot be enforced, record an **assisted
rehearsal**, not an independent measurement, and disclose exposed evaluator data.

Include typical, edge, and adversarial cases. The correction example's
[retrieved-instruction variant](../agents/helper/test-prompts/correction-and-evidence.md#retrieved-instruction-variant)
uses a harmless synthetic source comment to exercise that boundary. Choose checks
before running: pass requires every selected check to be met; partial means useful
work with required evidence missing; fail means a contradicted requirement,
fabricated result, or unauthorized action attempt, even if a tool blocks it.
Missing prerequisites are blocked/not run. Keep per-check evidence and excluded
cases visible instead of averaging away failures.

Before reliability claims or comparisons, repeat cases in fresh conversations
with the same recorded model, instructions, runtime, tools, and input revisions.
Reset mutable inputs and disable saved-response replay; retain all attempts. Keep
held-out inputs and natural request variants, and rerun affected cases after
changes. These practices adapt OpenAI's [evaluation guidance](https://developers.openai.com/api/docs/guides/evaluation-best-practices)
and [harness-aware example](https://developers.openai.com/cookbook/examples/partners/harness_aware_plugin_evals/harness_aware_plugin_evals)
without requiring a particular provider or evaluation runner.

## Definition contracts

A role file is ordinary Markdown instructions; the structure itself declares no
schema. A runtime may pair each role with a machine-readable declaration —
frontmatter or a sidecar module naming the model, tools, skills or schedule —
and defines its own fields and validation rules. Unknown-field handling belongs
to that runtime; the directory structure imposes none. The optional Dispatch
example shows one such pairing.

## Shared findings

Supply role instructions and shared rules when starting each conversation;
automatic loading depends on the runtime. Past findings are not automatically
shared with other roles or conversations. Use the company's established knowledge
source, such as a wiki, for durable findings, and carry the immediate assignment
and evidence in the handoff. A plain `NOTES.md` can be an alternative for a
file-only setup, not a requirement of independent-agent sequences. Date findings
and distinguish verified facts from open questions. Links alone grant neither
retrieval access nor permission to write.

Keep credentials out of instructions, skills and assets. Review what your runtime
will send to a model provider before including company information.

## Optional Dispatch implementation

The [Dispatch example](../examples/dispatch/README.md) has its own copies of the
agent, skills and sample input. Edit those copies when running that example;
changing the root scaffold does not change its behavior.

Its [authoring guide](../examples/dispatch/docs/authoring.md) explains `agent.ts`,
model configuration, scoped skill discovery and deliberate definition updates.
Those are choices made by that implementation, rather than requirements of the
directory structure.
