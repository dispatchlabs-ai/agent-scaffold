# Dispatch example

Optional runnable definitions for the [structure-only scaffold](../../README.md),
using an externally installed Dispatch runtime.
It includes a release-note helper, a shared writing skill and a skill that belongs
to the helper. Its agents, skills and assets are independent copies; edits to the
root scaffold do not change this example. Run commands from this directory.

Created by Chris Reynolds, cofounder of Dispatch Labs AI. MIT licensed, source
alpha. Runs on Windows, macOS and Linux with Node.js 24.22.1 or later in the Node 24 line. Live chat needs
your own model-provider API key.

## Use it with your AI agent

Give an agent with shell and file access this prompt:

> Follow https://github.com/dispatchlabs-ai/agent-scaffold/blob/main/examples/dispatch/docs/setup.md
> to make my own copy and run the scripted example. Show me the result and the
> company and agent skills it read. Then help me configure live chat with my own
> provider key using the credential setup guide, keeping secrets outside the repository.

This is an operational guide for your agent, not a setup wizard. Fresh-agent
onboarding has not yet been independently qualified.

Prepare the [parent runtime installation](docs/runtime-installation.md) before
using the commands below. This repository does not install or pin Pi.

## Try it yourself

Use GitHub's **Use this template** button to create your own repository, then clone
it. To try the reference directly:

```sh
git clone https://github.com/dispatchlabs-ai/agent-scaffold.git
cd agent-scaffold/examples/dispatch
npm ci
npm run demo
```

In Windows PowerShell, use `npm.cmd`:

```powershell
npm.cmd ci
npm.cmd run demo
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

On Windows, these commands are `npm.cmd run auth -- login anthropic` and
`npm.cmd run chat -- helper`. The application saves the key in Windows Credential
Manager and protects its local files automatically.

[Credential setup](docs/credentials.md) also supports an existing password manager,
session-only input and explicit environment compatibility. No `.env` is loaded.

Ask it to draft release notes from your changes, or use the supplied input:

```sh
npm run chat -- helper --prompt-file assets/sample-changes.md
```

Conversations persist locally. [Setup](docs/setup.md) covers providers and commands;
[authoring](docs/authoring.md) explains how to make this your own;
[operations](docs/operations.md) covers recovery, upgrades and boundaries.

The [local repository foreman](docs/foreman.md) adds continuous repository work and
bounded worker delegation. Each completed pass leads to the next in the same saved
conversation; use `--once` for an assessment. The parent installation supplies
the Runner snapshot used by every role.

## Try independent agents

For **work → review → reply**, follow the
[independent-agent walkthrough](docs/independent-agents.md). Run
`npm run sequence -- --demo` for the credential-free scripted path, or use your
provider for live work. It serves `author` and `reviewer` together with separate
conversations and native recovery; neither is a child of the other.
The [installation guide](docs/runtime-installation.md) pins source with messaging
support; the older alpha.5 archive does not include it.

## What you own

| Location | Working example |
| --- | --- |
| `agents/` | Helper, repository roles, and independent author/reviewer definitions |
| `skills/` | Company writing guidance available to agents that enable skills |
| `src/` | CLI choices, direct model connections and the scripted demo |
| `docs/` | Setup, authoring and operations guides |
| `assets/` | Synthetic change list used by the demo and live example |
| `factory.yaml` | Scheduled-agent selection; the manual example schedules nothing |

The [Dispatch runner](https://github.com/dispatchlabs-ai/dispatch/tree/main/packages/runner)
owns durable execution, skill loading and the terminal client. The parent
installation pins its archive; this checkout contains only company dependencies. Slack and a company inference gateway are optional integrations.

See [supported workflows](USE_CASES.md), [contributing](../../CONTRIBUTING.md) and the
[license](../../LICENSE).
