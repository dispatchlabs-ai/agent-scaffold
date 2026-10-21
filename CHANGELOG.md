# Changelog

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
