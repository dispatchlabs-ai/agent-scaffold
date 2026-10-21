# Make it your own

Start with `agents/helper/agent.md`: change the purpose, instructions and model.
`agent.ts` declares its trigger and granted capabilities. These TypeScript modules
are trusted local application code, loaded by Node; review changes before running.

For another agent, copy `agents/helper/` to `agents/<your-name>/`, then update its
instructions and skills. Names use lowercase letters, digits and hyphens and
start with a letter. Run `npm run chat -- <your-name>`. There is no registration
wizard or generated runtime code to maintain.

With the updated [local runner](foreman.md), every agent also receives applicable
repository `AGENTS.md` instructions. `delegates: ["worker"]` makes the named role
available through native foreground child conversations. Each child loads its
own `agent.md` and the shared rules; assignments must supply their own context.
Use `--update-definitions` while idle after changing roles or scaffold rules.

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
