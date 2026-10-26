# Build a sequence of independent agents

Use this pattern when roles need separate addresses, histories, tools and
lifecycles. The example drafts synthetic release notes, continues a checking
pass in the same author instance, hands the exact source and draft to a new
reviewer, and returns the review. There is no coordinator LLM or notes subsystem.

This is the scaffold's adoption recipe. Runner owns the canonical
[instance-message contract](https://github.com/dispatchlabs-ai/dispatch/blob/1ba8ef000651f9b3ee2744a5709483935bd2195a/packages/runner/docs/instance-messages.md).
The [runtime-neutral overview](../../../docs/authoring.md#sequences-of-independent-agents)
explains the pattern without requiring Dispatch.

## Run the example

An agent following this guide needs file and shell access, Git, Node 24.22.1+
within Node 24, and network access to public GitHub/npm for installation. Prepare
the [parent runtime](runtime-installation.md) using its exact source revision.
Place the real scaffold checkout beneath that installation, then run:

```sh
cd agent-scaffold/examples/dispatch
npm ci
npm run check
npm run sequence -- --demo
npm run sequence -- --demo --history
```

Use `npm.cmd` instead of `npm` in Windows PowerShell. The script prints an
`author:ID`, tool activity, a separate `reviewer:ID`, and a final **Review
received** answer in the author conversation. IDs are allocated by the runtime;
do not copy an ID from documentation. Repeating the first command intentionally
creates another assignment, not another definition.

The demo uses scripted responses with real tools, native tasks, SQLite and
replies. It makes no model requests, requires no credentials, and modifies no
target repository. It is evidence for wiring, not judgment, convergence quality,
or live-model acceptance. It has no file, shell or publication tools.

For live work, configure the existing credential mechanism and send a UTF-8 file:

```sh
npm run auth -- login anthropic
npm run sequence -- --prompt-file assets/sample-changes.md
```

Both roles currently select the same model as the helper; each can independently
select a supported model and thinking level in its own `agent.md`. Credentials
must be configured for every selected provider. Prompts, handoff contents and
conversation history go to those providers. Do not include secrets.

The process stays open until all admitted native tasks and submissions settle,
including background message delivery and replies. **Idle is not acceptance**:
inspect the returned findings. Ctrl+C suspends the host. Recover without another
assignment using the same mode and state location:

```sh
npm run sequence -- --demo --resume
# For live work:
npm run sequence -- --resume
```

`--state-dir PATH` selects isolated state. Keep it, the namespace, definitions and
runtime compatible across resumes. Demo/live state is separate by default; never
mix them. `--history` opens without resuming work and needs no credentials.
It still owns the stores while open: stop the other writer first. Use
`--update-definitions` only after saved work is idle, with closed-store backups.

## Files to copy and adapt

| File | Responsibility |
| --- | --- |
| [author/agent.ts](../agents/author/agent.ts) | Manual trigger and recipient allowlist |
| [author/agent.md](../agents/author/agent.md) | Model, checking loop, convergence and handoff behavior |
| [reviewer/agent.ts](../agents/reviewer/agent.ts) | Independent reviewer definition and capabilities |
| [reviewer/agent.md](../agents/reviewer/agent.md) | Independent model and report-only instructions |
| [sequence.ts](../src/sequence.ts) | One host serving both roles, inputs, observation and shutdown |
| [models.ts](../src/models.ts) | Existing direct-provider and credential wiring |
| [sequence-demo.ts](../src/sequence-demo.ts) | Explicitly scripted public demonstration, not production reasoning |

The real configuration is in `agents/author/agent.ts`:

```ts
export default defineAgent({
  trigger: { mode: "manual" },
  input: "Draft the assigned release notes, check them, then request independent review.",
  messages: ["author", "reviewer"],
});
```

`messages` enables tools; it is not a workflow declaration. The role instructions
decide what work to do and when it is ready. The host selects both definitions:

```ts
const service = await createRunner({ namespace: "scaffold-sequence" }).ChatService.open({
  root, stateRoot, names: ["author", "reviewer"], models, demo: false,
});
```

This excerpt omits the CLI's credential, signal and observation code; copy the
complete source when adapting it. `ChatService.open` installs the messaging
extension. A custom `ChatService.attach` host must install
`instanceMessagingExtension` before resuming; follow Runner's contract.
Do not use the single-agent `npm run chat -- author` command for this sequence.

## Three message shapes

1. **Continue the same assignment.** Call `agent_instances` for the exact self ID,
   then `message_agent({ agent: "author", instance: self, text, reply: false })`.
   Omitting `instance` would create another author, not continue this one.
2. **Request independent review.** Call
   `message_agent({ agent: "reviewer", text: handoff, reply: true })`. Omit
   `instance` for a new reviewer; use a discovered existing ID to address one.
3. **Receive the answer.** Runner delivers the review as a later attributed input.
   The reviewer needs no outgoing messaging grant to return its answer. The
   author's instructions present it without starting another cycle.

A send result means **durable admission**, not delivery, success or review
completion. Idle recipients start; busy recipients receive queued follow-up
input. Do not busy-poll while waiting for an automatic reply. Self-messages
cannot request replies. Stopping a sender does not cancel an already admitted
reviewer assignment; stopping the host suspends its served work for recovery.

Messages are service-local: two repositories in different services do not become
connected merely by naming each other's agents. Allowlisting a role permits
addressing its instances in this service; it does not grant file, wiki, provider
or human authority. Private child delegation remains available for workflows
that actually need parent-owned children; this example uses neither `delegates`
nor the private `handoff` configuration.

## Adapt it to another agents repository

1. Copy the role folders and the needed entrypoint/provider wiring into the
   destination repository. Keep it self-contained; do not import a personal
   checkout at runtime. The parent installation still owns Runner/Pi.
2. Rename the roles and update their `messages` allowlist and the service's
   `names` together. Run definition checks after adapting the files.
3. Define the assignment, authorized effects, completion condition and blocker
   behavior in each role's instructions. Give the recipient its own necessary
   skills, tools, credentials and adapters. Links alone do not supply access.
4. Carry scope, exact inputs/revisions, evidence, unresolved questions and
   authority in the handoff. For repository work, include all checkout paths and
   preserve them through review; use separate task worktrees for concurrent edits.
5. Create instances for concrete assignments. Reuse definitions across targets.
   Let native Pi Durable tasks own recovery; add no second recovery engine.
6. Exercise synthetic work, inspect both histories and native receipts, then
   validate real domain work separately. Update an existing installation only
   through its deployment owner while idle, preserving backups and adapters.

For cleanup → use-case/UX review, replace drafting with complete cleanup passes:
changed → continue self; no-change pass → independent review; blocked → report
and stop. Supply the cleanup skill and actual container/browser capabilities.
The synthetic release-note example does not supply those capabilities or prove
that workflow. Review-only authority belongs in the reviewer instructions and,
where required, enforced tool/OS permissions—not merely the role's name.

## Evidence and limits

Console/history output includes conversation text and observed active tool names,
not every tool argument or result. Native entries, tasks and submissions remain
in each role's `session.sqlite` beneath the selected state root. Inspect them
read-only, for example with Dispatch Observer; do not open a second Harness.
The first assignment receipt is not the entire sequence's verdict.

This starter supplies no background daemon, cross-service transport, shared
notes store, schedule, repository tools or security sandbox. No company service
is upgraded by copying these files. Qualification and remaining platform/live
model limits are recorded in [the changelog](../../../CHANGELOG.md).
