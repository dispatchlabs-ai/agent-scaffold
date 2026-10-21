# Changelog

## Unreleased

## 0.2.0 — source alpha, October 21, 2026

- Replace automatic `.env` loading and implicit ambient API keys with explicit
  credential setup: native OS storage, an existing vault helper, hidden
  session-only input, or environment compatibility selected for that run.
- Add source status, resolution checking and removal without displaying keys.
  Keep private helper configuration outside the project and fail without a
  plaintext fallback when a configured source is unavailable.
- Filter raw chat-provider errors before they enter saved history, preserving
  retry/context-limit categories and withholding errors that can echo keys.

This changes credential setup from 0.1.0. Existing conversation state and agent
definitions are unchanged; existing local `.env` files are left untouched.

Observed during qualification:

- Fresh public GitHub clones on macOS and Linux ARM64 installed the alpha.2
  runner archive, passed type checking, ran the demo and reopened saved history.
  Native credential setup/read/removal also passed with the downloaded package.
- macOS ARM64: native save, restart/read, rotation, hidden pasted input and
  cancellation, helper use/failure and logout. Live Anthropic chat through a
  vault helper read both skills and resumed its conversation in a second process.
- Linux ARM64, Debian Bookworm: native save/read/logout with an unlocked GNOME
  Keyring Secret Service; a missing D-Bus/store failed without a plaintext fallback.
- An OpenAI rejection with a synthetic key retained only a safe error in durable
  history; the synthetic key was absent from the local state files.
- An independent source/security review found and resolved error-disclosure,
  native-write rollback and provider-decorator compatibility issues.

Windows, Linux AMD64, locked-store UI, crash recovery and successful OpenAI
inference remain unverified. This is not a sandbox or a penetration-test claim.
Native/profile writes cannot be made crash-atomic across the two stores.

## 0.1.0 — source alpha, October 21, 2026

- Add a runnable release-note helper with company and agent-specific skills.
- Provide direct terminal chat, saved local conversations, explicit definition
  updates and a credential-free scripted demo.
- Consume an integrity-pinned public Dispatch runner archive without vendoring.
- Include synthetic sample input and setup, authoring and operations guides.

Observed with the public runner archive from clean GitHub clones:

- macOS ARM64, Node 24.21.0: `npm ci`, type checking, scripted skill reads and
  saved history after a process restart.
- Linux ARM64 in a Debian Bookworm container, Node 24.19.0: the same workflow,
  including installation without Nix or a local Dispatch checkout.
- macOS live Anthropic chat: both skill scopes and their template were read;
  a second process recalled the prior conversation. Missing and invalid keys
  returned nonzero exits. Interactive new-session and Ctrl-C behavior were checked.
- A changed skill fingerprint was rejected until an explicit idle-state definition
  update, after which the previous history remained readable.

The scaffold dependency audit reported no known vulnerabilities, and source and
runner-archive secret scans found none. These observations are not an independent
security review or fresh-agent onboarding acceptance. OpenAI live inference,
Windows, Linux AMD64 and broader platform support remain unverified.
