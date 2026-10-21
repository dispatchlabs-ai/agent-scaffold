# Agent Scaffold

Make a company agent you can talk to in your terminal. This reference includes a
release-note helper, a shared writing skill and a skill that belongs to the helper.
Copy it, run it, then replace the examples with your own work.

Created by Chris Reynolds, cofounder of Dispatch Labs AI. MIT licensed, source
alpha. Requires Node.js 24 or 25. Live chat needs your own model-provider API key.

## Use it with your AI agent

Give an agent with shell and file access this prompt:

> Follow https://github.com/dispatchlabs-ai/agent-scaffold/blob/main/docs/setup.md
> to make my own copy and run the scripted example. Show me the result and the
> company and agent skills it read. Then help me configure live chat with my own
> provider key using the credential setup guide, keeping secrets outside the repository.

This is an operational guide for your agent, not a setup wizard. Fresh-agent
onboarding has not yet been independently qualified.

## Try it yourself

Use GitHub's **Use this template** button to create your own repository, then clone
it. To try the reference directly:

```sh
git clone https://github.com/dispatchlabs-ai/agent-scaffold.git
cd agent-scaffold
npm ci
npm run demo
```

You should see a short draft for **Field Notes 1.2**, followed by the two skills
and template actually read. The demo uses scripted responses, makes no model
requests and needs no credentials. Its conversations are saved separately from
live chat.

For live chat, save your Anthropic API key through a hidden prompt in your OS
credential store, then chat:

```sh
npm run auth -- login anthropic
npm run chat -- helper
```

[Credential setup](docs/credentials.md) also supports an existing password manager,
session-only input and explicit environment compatibility. No `.env` is loaded.

Ask it to draft release notes from your changes, or use the supplied input:

```sh
npm run chat -- helper --prompt-file assets/sample-changes.md
```

Conversations persist locally. [Setup](docs/setup.md) covers providers and commands;
[authoring](docs/authoring.md) explains how to make this your own;
[operations](docs/operations.md) covers recovery, upgrades and boundaries.

## What you own

| Location | Working example |
| --- | --- |
| `agents/` | Helper instructions, its runnable definition and release-note skill |
| `skills/` | Company writing guidance available to agents that enable skills |
| `src/` | CLI choices, direct model connections and the scripted demo |
| `docs/` | Setup, authoring and operations guides |
| `assets/` | Synthetic change list used by the demo and live example |
| `factory.yaml` | Scheduled-agent selection; the manual example schedules nothing |

The [Dispatch runner](https://github.com/dispatchlabs-ai/dispatch/tree/main/packages/runner)
owns durable execution, skill loading and the terminal client. Its public archive
is pinned in the dependency lockfile. There is no `vendor/`, web application or
generator. Slack and a company inference gateway are optional integrations.

See [supported workflows](USE_CASES.md), [contributing](CONTRIBUTING.md) and the
[license](LICENSE).
