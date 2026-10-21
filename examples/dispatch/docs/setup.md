# Run the optional Dispatch example

Use Node.js 24 or 25 and npm on macOS or Linux (including a Linux filesystem in
WSL). `.node-version` selects the 24.x line for tools that read it. Native Windows
storage is unavailable until the runner can enforce private ACLs. No database
server, Docker, Slack account or gateway is needed.

## Make your copy

Choose **Use this template → Create a new repository** on
https://github.com/dispatchlabs-ai/agent-scaffold. Pick the visibility appropriate
for your company, then clone your new repository. A template copy has its own
history. A plain clone of this reference also works for a local trial.

From the repository root, enter the example first:

```sh
cd examples/dispatch
npm ci
npm run check
npm run demo
```

Expected: a scripted draft for Field Notes 1.2 with Highlights, Fixes and Upgrade
notes. It also reports reads of `company/company-writing-style`,
`agent/draft-release-notes` and `references/template.md`, including content hashes.
The responses are scripted; the runner, tool calls and saved conversation are real.
Rerunning the demo adds another turn to its saved conversation.

All remaining commands run from `examples/dispatch/`. Its agent definitions, skills,
assets, dependencies and state belong to this example, independently of the root
scaffold.

## Connect your provider

```sh
npm run auth -- login anthropic
```

Enter your own API key at the hidden prompt. It is saved in your native OS
credential store, outside the repository. No `.env` file is read or created.
Use [credential setup](credentials.md) for existing vault helpers, session-only
input, environment compatibility, Linux prerequisites and recovery. If native
storage is unavailable, select one of those explicit alternatives.

The helper selects `anthropic / claude-sonnet-4-6` in `agents/helper/agent.md`.
`src/models.ts` also registers the Pi OpenAI provider. Configure its credential
with `npm run auth -- login openai` or a helper.
To use it, select an OpenAI model ID supported by the pinned Pi 1.3.0 catalog in
`agent.md` and set a thinking level supported by that model. Provider access and
billing are yours. Other providers can be registered in `src/models.ts` through
[Pi's provider API](https://github.com/earendil-works/pi/tree/v1.3.0/packages/ai).

```sh
npm run chat -- helper
```

Ask: “Draft release notes: added CSV export, fixed date filters resetting, and no
upgrade action is needed.” The helper reads both skills and their template before
drafting. Live prompts, loaded skill content and conversation history are sent to
the provider you configure. Local history is stored under `.state/live/`.

With no configured source, interactive chat offers a hidden session-only prompt;
noninteractive chat exits with setup guidance. A failed configured source returns
an error without a fallback. Run `npm run demo` for the credential-free example.

## Commands

| Command or option | Result |
| --- | --- |
| `npm run agents` | List runnable and draft agent folders |
| `npm run skills -- helper` | Show that agent's scoped skills and revisions |
| `npm run chat -- helper --prompt "Hello"` | Send one turn, print the answer, exit |
| `npm run chat -- helper --prompt-file assets/sample-changes.md` | Send a UTF-8 file as one turn |
| `--session planning` | Open or continue a named local conversation |
| `--new` | Create a conversation and print its session key for later use |
| `--history` | Print the selected saved conversation without a model call |
| `--demo --history` | Inspect the demo's saved conversation |
| `--state-dir PATH` | Use a separate local state directory |
| `--update-definitions` | Apply changed definitions/skills when saved work is idle |
| `--credentials session` | Read a key privately for this process only |
| `--credentials environment` | Explicitly use the provider's injected environment variable |
| `--help` | Show command usage |

With no session option, chat resumes `main`. In interactive chat, `/new` starts a
conversation, `/history` prints it and `/quit` closes the process. Ctrl-C suspends
unfinished work, which resumes with the same definitions and state next time.
The CLI streams response text and reports tool activity on stderr.

The scripted demo only supports the included helper and sample input. Use live
chat for arbitrary questions. Demo and live stores are separate by default.

For an agent following this guide: complete the credential-free workflow first,
show its result, then configure a provider only if the user also requested live
chat. Use their approved local secret mechanism for credentials. Report missing
access accurately; do not invent a model response or claim the demo is live inference.
