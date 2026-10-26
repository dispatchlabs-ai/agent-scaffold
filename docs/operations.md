# Maintain your copy

A template copy owns its files. Later scaffold changes do not automatically
rewrite your company's instructions, skills or code. Compare changes and adopt
what is useful while preserving your own work.

The default structure has no process to start, packages to update or conversation
database. Once you add a runtime, document its dependencies, credential handling,
state locations and recovery procedure in your copy.

## Reusing test prompts

After changing an agent's instructions, tools, model, or runtime, select the
relevant files in its `test-prompts/` folder and rerun those conversations with
resolved inputs. Compare actual results with the checks in each file and retain
the revisions and evidence. Mark missing capability as blocked/not run; a plan
does not establish that the requested action worked. The bundled helper prompts
are documented examples, not a claim of fresh-model acceptance.

## Email integration

If your company adds email, follow the [shared-mailbox pattern](email.md).
Verify aliases, complete filing, sender identities, authorized thread routing
and recovery before enabling ordinary messages. Keep assigned addresses in their
agent definitions and private mailbox settings and credentials outside the public
template. Labels are presentation, not proof of
processing or delivery; preserve durable receipts and conversation mappings.
The scaffold itself does not provision mailboxes or run an email adapter.

## Optional Dispatch example

The example's commands run from `examples/dispatch/`. Its default conversations
live in `examples/dispatch/.state/live/` and `examples/dispatch/.state/demo/`.
Its dependencies and lockfile also live inside the example. See its
[operations guide](../examples/dispatch/docs/operations.md) for backup, recovery
and runtime upgrades, and its [credential guide](../examples/dispatch/docs/credentials.md)
for provider setup.

The [changelog](../CHANGELOG.md) records observed qualification. The structure
itself supplies no sandbox or isolation guarantees.
