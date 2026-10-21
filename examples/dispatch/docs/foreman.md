# Try the repository foreman locally

The foreman assesses a repository, decides the next useful action and works
through the requested scope. It can give bounded assignments to workers. Shared
rules live in `AGENTS.md`; each role's instructions live in its own `agent.md`.
Formal checks and review happen after the implementation pass.

This prototype needs the updated runner source. The pinned public alpha.4 archive
does not include repository instruction loading or the `delegate` tool yet.

## Install the local runner

In your Dispatch source checkout, build the runner from its Nix shell:

```sh
nix develop --command npm ci
nix develop --command npm run build --workspace @dispatch/runner
```

Then, from this scaffold's `examples/dispatch/` directory:

```sh
npm ci
npm run link-runner -- /path/to/dispatch
npm run check
```

`link-runner` installs a temporary package built from that checkout's `dist/`
without changing the manifest or lockfile. Build again before reinstalling source
changes. `npm ci` restores the public snapshot; repeat `link-runner` afterward to
use the foreman.

Configure your OpenAI credential using the [credential guide](credentials.md).
Both roles select the model in their own `agent.md`; change both if needed.

## Start a bounded assignment

```sh
npm run foreman -- --cwd /path/to/project --prompt "Bring this repository's foundation up to the standard in AGENTS.md. Establish concise checkbox use cases, a terse design guide, and an application structure based on shared components. Preserve accepted intent and existing work. Keep implementation within this foundation; finish with verification and review."
```

For an assessment first:

```sh
npm run foreman -- --cwd /path/to/project --prompt "Assess foundation readiness. Delegate one bounded read-only investigation to a worker. Report missing use cases, design rules and shared components. Do not change files."
```

Omit `--prompt` for interactive chat. Use the same `--cwd` and `--session NAME`
to continue, or add `--history` to inspect the saved conversation. Separate
repositories have separate default state directories. `--state-dir` overrides
that location; an existing store cannot be retargeted to another directory.

Every agent gets the scaffold's applicable `AGENTS.md` chain and its own role
instructions. Before each model request, it also receives the target repository's
root-to-working-directory `AGENTS.md` chain. The foreman and workers use the same
loader. More deeply nested instructions must be read before editing their scope.
If the target has no `AGENTS.md`, the agent is told it is missing.

Workers are native foreground child conversations in the same Pi Durable store.
Parallel tool calls can run parallel assignments. Ctrl-C suspends unfinished
work; reopen with the same definitions and working directory to resume. The
foreman decides when the assignment is complete; this prototype has no separate
acceptance gate or background improvement loop.

These roles have Pi's file and shell tools under your local account. `--cwd` sets
their starting directory; it is not a filesystem sandbox. Use a task worktree for
repository edits and give concurrent workers disjoint file ownership. Repository
content and tool results may be sent to your configured model provider.
