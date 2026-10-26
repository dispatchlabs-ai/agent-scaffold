# Supported workflows

These stable identifiers describe the template's goals; runtime and qualification
boundaries remain in the linked guides and [changelog](CHANGELOG.md).

## 1. Adopt and customize

- [x] **UC-001:** Copy the company-agent structure without installing dependencies or selecting a model provider or runtime.
- [x] **UC-002:** Keep agent instructions, local skills and shared company skills organized, and adapt the supplied writing examples.
- [x] **UC-004:** Maintain a company copy with its own code, chosen runtime and knowledge source, without depending on another conversation's history.
- [x] **UC-008:** Keep reusable manual test conversations and expected results beside each agent in `test-prompts/`.

## 2. Compose workflows

- [x] **UC-006:** Adapt the Foreman and worker roles for continuous repository improvement through the chosen runtime.
- [x] **UC-007:** Route an authorized finished change through an optional Lander that verifies, reconciles and reports before integration.
- [x] **UC-009:** Adapt the independent-agent pattern to continue an assignment, hand off explicit evidence and scope, and receive a peer's reply.
- [x] **UC-010:** Adapt a QA coordinator that assigns independent conversation chains to same-configuration children, reviews complete tool traces and reconciles every result.

## 3. Opt into Dispatch

- [x] **UC-003:** Choose the [Dispatch example](examples/dispatch/README.md) for a scripted demonstration and direct terminal chat with the required parent runtime.
- [x] **UC-005:** Manage the optional implementation's local state, credentials and deliberate runtime upgrades through its [runtime workflows](examples/dispatch/USE_CASES.md).

The default is structure only. Folders and Markdown do not provide automatic skill
discovery, tool access, persistence or a security boundary. The selected runtime
owns those behaviors. There is no web app, checked-in vendor archive or setup wizard.
