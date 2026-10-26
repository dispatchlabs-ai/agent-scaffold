# Coordinate parallel QA children

Use this pattern when one QA coordinator should assign independent cases to
copies of itself and combine their findings. Unlike the
[sibling sequence](independent-agents.md), the children are private, owned work:
they inherit the coordinator's native agent configuration, have fresh histories,
and return their results through the invoking tool calls.

Prepare the [parent runtime](runtime-installation.md), then from this example:

```sh
npm ci
npm run check
npm run parallel -- --demo
npm run parallel -- --demo --history
```

The demo uses real native parallel child tasks, tools and SQLite, with scripted
model responses. Two children each read a complete **synthetic recorded trace**.
One case passes; the other fails because its tool result says the recommended
profile was not approved, despite a convincing final answer. The coordinator
reports both outcomes and does not call the suite passed. No real search or
customer data is involved. A zero process exit means the demonstration completed,
not that every case passed.

## Definition and rights

[`agents/qa-coordinator/agent.ts`](../agents/qa-coordinator/agent.ts) declares
`clones: true` and the example's read-only domain tool. Its
[`agent.md`](../agents/qa-coordinator/agent.md) defines both coordinator and
CHILD CASE behavior. There is one definition, not a separate underprivileged or
drifting worker copy.

The coordinator emits multiple `clone_agent({ task })` calls in one response.
Pi's native parallel tool execution runs them concurrently. Each child receives
the parent's stored model, thinking, instructions, extensions and tool filters,
including cloning rights. No conversation history, credentials or filesystem
copy is placed in its assignment. Host authorization still applies. See the
[Runner contract](https://github.com/dispatchlabs-ai/dispatch/blob/main/packages/runner/docs/parallel-children.md)
for inheritance, failure, cancellation and recovery details.

All selected work shares the host's authority; this example is not a sandbox.
For real QA, supply scoped domain tools and isolated mutable resources. Keep
expected results visible to the QA child but inaccessible to the system being
tested. The public example intentionally grants no filesystem, shell or network
tools and evaluates recorded synthetic evidence only.

## Use real model judgment on the example

```sh
npm run auth -- login anthropic
npm run parallel
```

This uses the configured model to review the same synthetic traces. It is not
real application execution. `--prompt-file PATH` supplies a different assignment
to the existing role and tools; it does not install a new test target or grants.
The provider receives the assignment, evidence and QA history.

Each ordinary invocation creates a new coordinator instance. Ctrl+C suspends
work. Reopen using the same mode and state directory without another assignment:

```sh
npm run parallel -- --demo --resume
```

`--history` does not resume tasks or make model requests. It displays conversation
text, not complete tool bodies. Native parent/child conversations, tool arguments,
results and identities remain in `qa-coordinator/session.sqlite` under the
selected state root. Inspect through read-only native APIs or Observer while
preserving the single-writer rule. Keep evidence before cleaning disposable state.

## Adapt the pattern

1. Copy the coordinator definition and adapt its instructions. Replace
   [`parallel-cases.ts`](../src/parallel-cases.ts) with the actual domain tools.
   Keep reusable cloning and recovery in Runner/Pi.
2. Choose complete independent conversation chains. Dependent refinements stay
   in one child; export variants use independent equivalent state.
3. Give each child exact inputs, plain-English expectations, target/data/source
   identity, permitted effects, its own mutable resources and report requirements.
4. Require complete native trace review, including tool calls/results, errors
   and recovery. Do not substitute shortened history or final prose.
5. Reconcile all assignments with reports, including errors, blocked cases and
   missing coverage. Keep fresh execution, frozen replay and UI evidence distinct.

The [runtime-neutral role](../../../agents/qa-coordinator/agent.md) and
[authoring overview](../../../docs/authoring.md#parallel-qa-with-a-coordinator)
explain the same pattern without selecting Dispatch. No second queue, scheduler,
notes store, recovery engine or arbitrary worker cap is introduced.
