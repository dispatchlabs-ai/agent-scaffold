# Provider credentials

Keep API keys outside this repository. The shared runner resolves credentials
directly into Pi's model client; it does not put them into agent instructions,
conversation history or environment variables. `.env` files are not loaded.
Raw chat-provider errors are replaced with safe categories before they reach
history, because a provider can echo a rejected key. Retry and context-limit
handling still work; raw provider diagnostics are withheld.

## Save a key once

```sh
npm run auth -- login anthropic
npm run chat -- helper
```

The first command reads the key without echoing it and saves it in macOS Keychain,
Windows Credential Manager, or Linux Secret Service. Linux requires an available,
unlocked Secret Service such as GNOME Keyring or KWallet and its D-Bus session.
Unavailable native storage produces an error. There is no plaintext or kernel
keyring fallback. The native adapter is optional; helper and session sources work
without it.

For scripted setup, a trusted password-manager command can pipe one key to
`npm run auth -- login anthropic --stdin`. Never put the value in a command
argument, shell history, an agent message, or a repository file. `--stdin` is an
explicit pipe input, not a path to a secret file.

## Use an existing password manager

Register a trusted, installed helper that prints exactly one API key:

```sh
npm run auth -- helper anthropic /absolute/path/to/op read 'op://Development/Anthropic/credential'
```

This is a 1Password example, not a required subscription. Other vault CLIs can use
the same interface. Authenticate the helper using its own supported login flow
first. Use its actual absolute executable path. The executable must live outside
the project. Arguments contain references, never secret values.

Setup verifies the helper, then stores its executable, arguments and approved
provider origin in private user configuration. Helpers execute directly without
a shell, from the user's home directory. Their stdout is captured privately;
their stderr is never printed by the runner. A failed helper, invalid output or
60-second timeout fails credential resolution. No other source is substituted.
Each resolution reruns the helper, so it can handle rotation and temporary tokens
without copying the resulting key into this application's persistent storage.

Helper configuration is executable authority. Only configure a program you trust.
The project has no file containing helper commands for the runtime to auto-load.

## Session-only and environment compatibility

```sh
npm run chat -- helper --credentials session
```

This reads a key without echoing it, keeps it in this process and saves no
credential. A first interactive chat with no configured source offers the same
explicitly labeled session-only prompt. Noninteractive chat with no source exits
with setup guidance. A configured but failed source never triggers that prompt.

For an application launcher that already injects provider environment variables:

```sh
npm run chat -- helper --credentials environment
```

This explicitly reads `ANTHROPIC_API_KEY` or `OPENAI_API_KEY` from the process
environment. An ambient key alone is ignored. Prefer process-scoped injection
from your secret manager over a persistent shell export. Environment variables
can be inherited or inspected by other processes; this compatibility mode does
not provide credential isolation. The runner does not populate them itself.

Both flags explicitly override the saved source for that run. They do not change
the saved configuration. API-key helpers may refresh their own tokens. This
scaffold does not implement provider OAuth login or refresh-token persistence.

## Inspect, rotate and remove

```sh
npm run auth -- status
npm run auth -- status anthropic --json
npm run auth -- check anthropic
npm run auth -- logout anthropic
```

Status reads source metadata only; it does not unlock the keychain or execute a
helper. Check resolves the key without printing it or making a provider request.
Repeat login to replace a native key, or update the value in your existing vault.
Logout removes this project's native key or helper binding. It does not revoke a
provider key or delete a vault item. Revoke compromised keys at the provider.

Source configuration lives under `$XDG_CONFIG_HOME/dispatch/credentials` (default
`~/.config/dispatch/credentials`), or `%APPDATA%\Dispatch\credentials` on Windows.
The directory/file must be private and owned by the user on POSIX systems. No
plaintext key is saved there. A hash of the canonical repository path scopes the
profile; copied or moved checkouts need their own setup. Provider-origin changes
also require explicit setup again. Preserve the configured source until a failed
removal or replacement can be recovered.
Ordinary profile-write failures roll back the native change. A crash between
writes can still require inspecting both stores; a failed rollback identifies
the native service/account for recovery.

## Trust boundary

This is credential storage for trusted local application code. Native stores
improve protection at rest but do not universally isolate scripts using the same
runtime. Code in this process, installed dependencies and user-authorized helper
programs must be trusted. JavaScript memory is not guaranteed to be zeroized.

The example agent only has the scoped skill reader. Before adding untrusted code
execution, place that code in a real sandbox and keep authentication in a broker
outside it. Restrict the broker's destinations and operations. This scaffold does
not supply that sandbox or broker, and hiding a key does not prevent misuse of
permitted API calls. See [operations](operations.md) for other boundaries and
[the changelog](../../../CHANGELOG.md) for the platforms actually exercised.
