# Make it your own

Start with `agents/helper/agent.md`: change the purpose, instructions and model.
`agent.ts` declares its trigger and granted capabilities. These TypeScript modules
are trusted local application code, loaded by Node; review changes before running.

For another agent, copy `agents/helper/` to `agents/<your-name>/`, then update its
instructions and skills. Names use lowercase letters, digits and hyphens and
start with a letter. Run `npm run chat -- <your-name>`. There is no registration
wizard or generated runtime code to maintain.

With the [compatible parent runtime](runtime-installation.md), every agent also receives applicable
repository `AGENTS.md` instructions. `delegates: ["worker"]` makes the named role
available through native foreground child conversations. Each child loads its
own `agent.md` and the shared rules; assignments must supply their own context.
Use `--update-definitions` while idle after changing roles or scaffold rules.

`agent.ts` may declare the trigger (`manual`; `continuous` with `delayMs`; or
`interval` with `everyMs`), the iteration `input`, native `extensions`, a
`coding` checkout, scoped `skills`, `delegates` naming other roles and a
`handoff` target, or `messages` naming independently addressable peers.
Which fields exist is this implementation's choice, not a
requirement of the directory structure. Only documented fields have runtime
meaning; TypeScript also checks object literals passed to `defineAgent`. Extra
frontmatter keys are not a substitute for fields in `agent.ts`.

Run `npm run check` to type-check and load every runnable definition, validate
folder names and target existence, and require discovered skills when enabled.
Draft folders without `agent.ts` are reported and skipped. This loads trusted
modules but starts no agents or model requests; it does not prove model or tool
behavior. Install the source revision in [runtime installation](runtime-installation.md);
the older alpha.5 archive does not support instance messages.

## Independent-agent sequences

Start with [the complete walkthrough](independent-agents.md), not the single-agent
terminal command. Copy `agents/author/` and `agents/reviewer/`, then adapt their
instructions and `src/sequence.ts` to your workflow. The executable definition
belongs in `agents/<name>/agent.ts`; model selection and behavior are in
`agent.md`. `messages: ["author", "reviewer"]` grants the author instance tools to
address those roles, including itself. It does not determine when to hand off.

Both definitions must be selected in one `ChatService`. The allowlist neither
starts an unselected role nor supplies its credentials, adapters or tools.
Omitting the recipient instance creates a separate top-level conversation.
Use an exact self ID and `reply: false` for self-continuations; use `reply: true`
for an independent review whose answer should come back automatically.

Use `delegates` for private, parent-owned child work instead. The `handoff`
configuration field also belongs to the private-child helper; it is not the
independent message pattern. The existing Foreman example remains a separate
option, not a required coordinator for peer sequences.

## Agent-local schedules

Put calendar schedules and prompts in the owning agent's `agent.ts`, not in
`factory.yaml`. Import an adjacent `schedules.ts` if the list grows. The
[daily 3 a.m. Eastern example](schedules.md) runs the author/reviewer sequence
through the shared native scheduler. `factory.yaml` selects enabled agents.
Choose an instance mode and missed-occurrence policy explicitly. Scheduling adds
no permissions and does not supervise the agent workflow. Install the cron-capable
source revision from [runtime installation](runtime-installation.md); earlier
alpha archives do not implement the field.

## Test prompts

Keep manual exercises in `agents/<name>/test-prompts/` beside that agent's
definition. The helper includes [release notes](../agents/helper/test-prompts/release-notes.md)
and [correction/evidence](../agents/helper/test-prompts/correction-and-evidence.md)
examples in this implementation's own copy.
Select the prompt blocks manually, resolve inputs, and compare actual replies
with their checks. The folder is not automatically loaded into the system prompt
and supplies no new tools. Use a live conversation to assess model behavior;
the scripted demo does not execute these prompts as an acceptance suite.
Apply the root guide's [evaluation isolation and scoring guidance](../../../docs/authoring.md#test-prompts),
including the separate retrieved-instruction variant. The operator supplies its
source attachment as ordinary task data; the helper's read-only skill tools do
not grant access to this prompt catalog or a publishing service.

## Two skill scopes

```text
skills/company-writing-style/SKILL.md
agents/helper/skills/draft-release-notes/SKILL.md
agents/helper/skills/draft-release-notes/references/template.md
```

Set `skills: true` in an agent definition to enable discovery. It sees company
skills and only its own local skills. A folder needs a `SKILL.md` with YAML
frontmatter containing `name` (matching the folder) and `description`, followed
by instructions. A useful description says when the skill applies.

The model initially sees each skill's scoped ID and description. The `read_skill`
tool loads `SKILL.md`, then listed supporting paths on demand. IDs such as
`company/writing` and `agent/writing` stay distinct; neither silently overrides
the other. Tool results include the skill revision and available resource paths.

Resources must be ordinary UTF-8 text files under the skill folder. Symlinks and
special files are rejected. The reader cannot open arbitrary repository paths
or another agent's skills. Reading a script does not execute it. Keep secrets and
private data out of skills unless sharing them with the configured provider is
intended. Skill content is trusted company guidance, not a permissions mechanism.

Skill files are snapshotted at startup and included in definition fingerprints.
Restart after editing them. If the saved definition changed, use
`--update-definitions` when work is idle; previous tool results preserve what was
read. Imported extension code is not transitively fingerprinted, so pin dependency
versions and treat code upgrades as deliberate changes too.

## Keep boundaries clear

- `agent.md` owns one agent's behavior. `agent.ts` owns its extensions and trigger.
- `skills/` owns reusable company guidance. Agent-local skills stay beside their
  owner. The helper's read-only skills grant no shell or general filesystem tool.
- `src/` owns company wiring. Durable sessions, terminal behavior and the skill
  loader stay in `@dispatch/runner`.
- `assets/` contains the sample input used by both documented quick starts.
- `factory.yaml` lists scheduled agents. The example uses `agents: []`; adding a
  nonmanual definition enables its schedule while a runner process serves that
  agent. The terminal client serves only the agent selected on its command line.

For company-specific tools or domain workflows, use native Pi extensions in the
agent definition. Consult the [runner API](https://github.com/dispatchlabs-ai/dispatch/tree/main/packages/runner)
before adding an adapter. Slack and inference-gateway integration are optional and
need their own packages, configuration and credentials.
