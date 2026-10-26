# Agent Scaffold

A directory structure for your company's agents, shared skills and supporting
code. Copy it, adapt the Markdown examples and choose your own runtime when you
need one. The default scaffold has no dependencies or installation step.

Created by Chris Reynolds, cofounder of Dispatch Labs AI. MIT licensed, source alpha.

## Use it with your AI agent

Give an agent with file access this prompt, adding shell access if it will clone
the repository:

> Follow https://github.com/dispatchlabs-ai/agent-scaffold/blob/main/docs/setup.md
> to make my own copy of the directory structure. Walk me through the helper's
> instructions and both skill scopes, then help me adapt them for my company.
> Keep the setup structure-only unless I choose a runtime.

The guide uses ordinary files. Your existing agent supplies the ability to read
them; this scaffold does not start an agent or provide model access. Fresh-agent
onboarding has not yet been independently qualified.

## Make your copy

Use GitHub's **Use this template** button, then clone your new repository. To
explore the reference directly:

```sh
git clone https://github.com/dispatchlabs-ai/agent-scaffold.git
cd agent-scaffold
```

Start with [the helper instructions](agents/helper/agent.md), its linked skills
and [the sample changes](assets/sample-changes.md). You can give those files to
your existing agent to draft release notes, or replace them with your own work.
No Node.js, npm, Dispatch account or provider credential is needed to adopt the
structure.

```text
agents/
  helper/
    agent.md
    test-prompts/
      release-notes.md
      correction-and-evidence.md
    skills/draft-release-notes/
      SKILL.md
      references/template.md
skills/
  company-writing-style/SKILL.md
src/
  README.md
docs/
assets/
  sample-changes.md
examples/
  dispatch/                  # Optional runnable example
```

| Location | Purpose |
| --- | --- |
| `agents/` | One folder per agent, with instructions, its own skills, and reusable test prompts |
| `skills/` | Company guidance reusable across agents |
| `src/` | A place for company code and integrations when you add them |
| `docs/` | Setup, authoring and operating guidance |
| `assets/` | Supporting inputs, templates and other resources |
| `examples/dispatch/` | Optional definitions and integrations using an external runtime |

[Setup](docs/setup.md) explains the first steps. [Authoring](docs/authoring.md)
covers customization, and [operations](docs/operations.md) covers updates.
Try the helper's [release-note prompt](agents/helper/test-prompts/release-notes.md)
and [correction follow-up](agents/helper/test-prompts/correction-and-evidence.md)
with your chosen agent; each includes its inputs and expected results.

## Connect independent agents

For work → review workflows, start with
[the pattern](docs/authoring.md#sequences-of-independent-agents) and
[the runnable Dispatch walkthrough](examples/dispatch/docs/independent-agents.md).
It shows one instance continuing its own work, handing off to an independent
reviewer, and receiving the review. The scripted demonstration needs no API key;
live execution uses your configured provider. The root scaffold stays runtime-free.

## Coordinate parallel QA

For independent checks with one final report, use the
[QA coordinator pattern](docs/authoring.md#parallel-qa-with-a-coordinator) and
[runnable parallel example](examples/dispatch/docs/parallel-qa.md).
The coordinator clones its configuration into fresh children; each reviews its
assigned output and complete tool trace. The credential-free demo deliberately
includes a failure so a convincing answer cannot hide contradictory tool evidence.

## Schedule an agent

Keep schedules and assignment prompts with their owning agent. Read
[the ownership pattern](docs/authoring.md#agent-local-schedules) and
[the daily 3 a.m. Eastern example](examples/dispatch/docs/schedules.md).
This is a documented design, **not implemented cron support**; the working
manual and continuous examples are unchanged.

## Optional: run the Dispatch example

If you want a ready-made terminal agent, [examples/dispatch](examples/dispatch/README.md)
uses the [parent runtime installation](examples/dispatch/docs/runtime-installation.md)
for saved conversations and credential management. It requires Node.js 24.22.1 or later in the Node 24 line:

```sh
cd examples/dispatch
npm ci
npm run demo
```

The scripted demo needs no model credentials and makes no model requests.
Live chat uses your own provider key. The parent workspace installs Runner/Pi;
the example installs only development dependencies. Its definitions and state
are independent of the root scaffold.
You can omit `examples/` when copying only the structure.

See [supported workflows](USE_CASES.md), [contributing](CONTRIBUTING.md) and the
[license](LICENSE).
