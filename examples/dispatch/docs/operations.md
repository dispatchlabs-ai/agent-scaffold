# Operate the Dispatch example

## Local state and recovery

`.state/live/` and `.state/demo/` hold separate native Pi SQLite sessions. They
contain private conversation history and tool results and are ignored by Git.
Before opening SQLite, the runner applies owner-only POSIX permissions (`0700`
directories and `0600` database, existing sidecar and status files), including
older state. It rejects unsafe ownership, symlinks, hard-linked files and special
files, and stops if it cannot establish the required modes. Use state beneath
trusted parent directories; review extra filesystem ACLs and backups separately.
On Windows, it automatically applies and verifies a private ACL for the current
account, including inheritance for new SQLite sidecars and status files. It uses
built-in Windows PowerShell; no administrator launch or manual permission
commands are needed. State must be on a local Windows volume that supports ACLs
(normally NTFS). Junctions, symbolic links and ambiguous trailing-dot/space path
components are rejected. Filesystem permissions do not isolate code running as
the same user or privileged administrators.

Run only one process against an agent's state directory at a time; the runner
enforces the database's single-owner contract. Independent state directories can
run independently. No network listener is opened by the terminal client.

Close the process before backing up the complete state directory. Preserve it
when troubleshooting; deleting it discards history. If startup reports a changed
definition, finish or stop saved work using its previous definition, then restart
with `--update-definitions`. Do not mix demo and live execution in one store.

The `--session` option selects a conversation within that store. `/new` and
`--new` print a new session key; keep it to reopen that conversation. The default
`main` session remains available. Ctrl-C suspends pending work rather than
claiming it completed.

The terminal prints control characters as visible `\xNN` escapes, preserving
tabs, newlines and ordinary Unicode. This applies to streamed/final answers,
history, tool diagnostics and returned errors; the original stored text remains
unchanged for other clients.

The parent installation uses Pi 1.4.0. Preserve a closed pre-upgrade backup
before its schema-2 migration; older Pi cannot reopen a migrated store. Record
upstream versions and removal conditions beside any copied implementations.

## Dependencies and upgrades

The [independent-agent sequence](independent-agents.md) uses separate
`.state/sequence/demo/` and `.state/sequence/live/` roots, with an SQLite store per
role and an independently addressable conversation per assignment.
`npm run sequence -- --demo --history` reads saved messages without resuming work;
`--resume` resumes admitted work without submitting a replacement assignment.
Do not run another writer on those stores or confuse the first input's completion
with the later review's completion. Native message tasks include delivery and
automatic-reply tracking; the example waits for background work too.

Credential setup is separate from conversation state. Use
[the credential guide](credentials.md) to inspect, rotate or remove a configured
source. The runtime does not load `.env` files or implicitly use ambient API keys.

The installation owns the immutable Runner archive and its lockfile. Follow
[runtime installation](runtime-installation.md) to update that parent workspace;
`npm ci` in this definition checkout installs company dependencies only.
Verify native compatibility and saved-state recovery before a live upgrade.

A template copy owns its files. Changes to this reference do not automatically
rewrite your company definitions. Compare later scaffold changes and adopt those
you need; shared runtime updates arrive through dependencies. A generator and
automatic template merging are deferred.

## Scope and qualification

This is a pre-1.0 source alpha for trusted local use. Agent modules and installed
extensions run with the launching user's filesystem and network authority. The
included helper only has the scoped skill reader; adding coding or shell tools
changes that authority. It is not a multi-tenant security boundary.

The demo qualifies installation, skill discovery/read calls and local persistence;
it cannot establish model quality or provider access. Type checks do not establish
live behavior. Platform observations and known gaps are recorded in
[the changelog](../../../CHANGELOG.md). No GitHub Actions workflow is installed.
