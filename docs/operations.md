# Maintain your copy

A template copy owns its files. Later scaffold changes do not automatically
rewrite your company's instructions, skills or code. Compare changes and adopt
what is useful while preserving your own work.

The default structure has no process to start, packages to update or conversation
database. Once you add a runtime, document its dependencies, credential handling,
state locations and recovery procedure in your copy.

## Optional Dispatch example

The example's commands run from `examples/dispatch/`. Its default conversations
live in `examples/dispatch/.state/live/` and `examples/dispatch/.state/demo/`.
Its dependencies and lockfile also live inside the example. See its
[operations guide](../examples/dispatch/docs/operations.md) for backup, recovery
and runtime upgrades, and its [credential guide](../examples/dispatch/docs/credentials.md)
for provider setup.

The [changelog](../CHANGELOG.md) records observed qualification. The structure
itself supplies no sandbox or isolation guarantees.
