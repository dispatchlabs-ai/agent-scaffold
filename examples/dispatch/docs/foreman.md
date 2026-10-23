# Try the repository foreman locally

The foreman assesses a repository, decides the next useful action and works
continuously toward the requested goal. It can give bounded assignments to workers. Shared
rules live in `AGENTS.md`; each role's instructions live in its own `agent.md`.
Formal checks and review follow meaningful implementation packages. Completing a
pass is a progress checkpoint, not an instruction to exit.

Use the shared parent Runner installation described in
[runtime installation](runtime-installation.md). Alpha.5 includes foreground
delegation and repository instruction loading. From the example directory:

```sh
npm ci
npm run check
```

For source development, build and pack Runner in its owning Dispatch checkout,
then install that archive in the parent workspace. Do not install a temporary
runtime into this definition directory. Keep a separate state directory for
trials and preserve a complete pre-upgrade backup before Pi 1.4 opens old state.

Configure your OpenAI credential using the [credential guide](credentials.md).
Each role selects its model in its own `agent.md`; change those definitions if needed.

## Start continuous work

```sh
npm run foreman -- --cwd /path/to/project --session improvement --prompt "Bring this repository up to the agreed standard in AGENTS.md. Preserve accepted intent, design and existing work. Assess what remains, fix concrete gaps, and keep moving through the authorized goal. Verify meaningful completed packages and continue with the next useful action."
```

For an assessment first:

```sh
npm run foreman -- --cwd /path/to/project --once --session assessment --prompt "Assess foundation readiness. Delegate one bounded read-only investigation to a worker. Report missing use cases, design rules and shared components. Do not change files."
```

The Foreman runs continuously by default. Ctrl-C saves and suspends unfinished
work. Resume with the same `--cwd` and `--session NAME`, omitting `--prompt`:

```sh
npm run foreman -- --cwd /path/to/project --session improvement
```

Each final answer starts the next native loop iteration in the same conversation.
There is no pass limit or external shell loop. The Foreman can call `pause_loop`
only when missing input prevents useful progress or the user asks it to stop. A
pause records its reason and exits; resume with the missing input in `--prompt`.
A suspended active loop rejects a changed prompt; resume its saved goal first.

Use `--once` for one pass, or `--once` without a prompt for interactive chat.
Single-pass mode rejects a saved active loop; it does not restart it implicitly.
Add `--history` to inspect saved messages without running the agent. Separate
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
loop retains its task and submission identities across suspension. Stopping the
process does not erase work or imply that the repository meets the goal. The
prototype has no separate automated acceptance gate.

## Land a finished change through its checks

Repositories with formal checks can add the lander role, included here as
`agents/lander/agent.md` in the scaffold and `agents/lander/` in this example. A
lander assignment hands it a completed branch or change; it runs the checks
on the result reconciled with the latest target branch, reports how the result
diverges from the request, and merges only what is verified and in scope.

```sh
npm run chat -- lander --cwd /path/to/project --prompt "Land branch preview into main: reconcile with the latest main, run the repository's checks and merge it. Do not publish a release."
```

The lander is an ordinary manual agent with the same coding tools and
permissions as the other roles, not an enforced approval or security boundary.
Start it separately after implementation; the Foreman delegates to workers, not
automatically to the lander. Its assignment must identify the completed branch,
target branch and authorized publication scope.

These roles have Pi's file and shell tools under your local account. `--cwd` sets
their starting directory; it is not a filesystem sandbox. Use a task worktree for
repository edits and give concurrent workers disjoint file ownership. Repository
content and tool results may be sent to your configured model provider.
