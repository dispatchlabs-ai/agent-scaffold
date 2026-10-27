# Changelog

## Native agent calendars — October 27, 2026

- Replace the scheduling proposal with agent-owned Runner calendars, using an
  explicit timezone, instance choice and missed-occurrence policy.
- Add an opt-in author/reviewer calendar service and synthetic demonstration;
  the checked-in factory remains disabled. Root setup stays runtime-free.
- Pin cron-capable public Runner source in the parent-installation guide.
  Native Pi tasks own timers and recovery; no second scheduler or OS cron job.

Qualification on macOS ARM64, Node 24.22.1: type/definition checks, helper,
sibling and parallel demos, two real calendar occurrences with author/reviewer
completion, history, bounded expiry and unchanged restart passed. Linux and
Windows were not exercised. This is source qualification, not a package release
or a live model deployment.

## Shared-mailbox email pattern — October 26, 2026

- Document a dedicated team mailbox with per-agent aliases, complete filing and
  explicit routing to existing definitions and durable conversations.
- Keep each optional email address with its agent definition; demonstrate a
  synthetic address in the root helper without adding an executable schema field.
- Separate mail delivery from role behavior and private mailbox connections.
  Cover thread continuity, sender/recipient authorization, reply identity,
  duplicate handling, uncertain sends and loop prevention.
- Use synthetic addresses only. Link the guide from onboarding, authoring,
  operations and the use-case catalog; leave email execution unchecked.

Documentation only: no mail adapter, provider configuration, dependency change
or live deployment. Relative links, the diff and added content were reviewed for
private identifiers. The guide's end-to-end checks are acceptance criteria, not
performed email tests.

## Parallel QA coordinator — October 26, 2026

- Add a runtime-neutral QA coordinator role and a runnable optional Dispatch
  example. One definition serves coordinator and child assignments; fresh native
  children inherit the stored configuration and return their own findings.
- Keep complete dependent conversation chains together, with independent variants
  in separate children. Require per-expectation checks, complete target tool-trace
  review, and explicit failed, blocked and missing results in the final report.
- Demonstrate two synthetic recorded traces, including a convincing final answer
  contradicted by its tool result. Scripted model responses make the example
  credential-free; a completed demonstration is not a passing suite.
- Reuse the sequence host for `npm run parallel`, with separate native state,
  history and resume. Keep cloning/recovery in Runner and domain behavior in
  definitions; no scheduler, notes store or arbitrary worker cap.
- Pin public Runner source `42119776de70b44a45a05e8ae846577a81096157` in the
  parent-installation guide. No shared installation or released package is changed.

Qualification on macOS ARM64, Node 24.22.1: type/definition checks, existing helper
and sibling demos, parallel demo/history and idle resume passed. Native records
showed overlapping child tasks, fresh assignments and byte-identical stored
parent/child configurations. Removing the evidence tool through both native
filters kept it unavailable to both children; their blocked reports reached the
coordinator instead of being counted as passes. A process killed after both
children existed recovered those same child/task IDs and stable submissions,
without duplicate children or manual lock deletion.

The parallel demo, type/definition checks, history and idle resume also passed in
a non-root, read-only Linux ARM64 Docker container with Node 24.22.1 and the
task-local dependency installation. These observations do not qualify real model
judgment, a live application, every crash/cancellation mode, Windows, Linux AMD64,
fresh-agent onboarding or a company rollout. No automated functional suite added.

## Agent-local schedule design — October 26, 2026

- Document agent-owned schedules and predefined prompts, with optional adjacent
  TypeScript modules when a list grows. Keep company configuration for agent
  enablement and shared timing/admission in Runner.
- Add a clearly non-runnable daily 3 a.m. Eastern author/reviewer example, linked
  from both READMEs and authoring guides. Keep cron execution unchecked in the
  use-case catalog and distinguish fresh occurrences from recovery.
- Leave executable definitions, dependency pins and `factory.yaml` unchanged.
  Cron/timezone support and the proposed `schedules` API are not implemented.
  Existing-instance, missed-run, overlap and schedule-edit policies remain open.

Checked affected documentation links and the docs-only diff. On macOS ARM64 with
Node 24.22.1, a temporary example copy using the compatible parent runtime passed
dependency installation, type/definition checks, both scripted demos and history
reads. The illustrative definition was separately confirmed to fail TypeScript
on the unsupported `schedules` field; this does not qualify cron execution.

## Independent-agent starter — October 26, 2026

- Make independent-agent sequences discoverable from the root README and
  runtime-neutral authoring guide, with a complete optional Dispatch walkthrough.
- Add separate manual author/reviewer definitions and a small shared-host CLI.
  An author continues its checking pass in the same instance, messages a new
  independent reviewer, then receives its findings without restarting the cycle.
  No coordinator, notes subsystem, scheduling service or second recovery engine.
- Include a credential-free scripted demonstration and live-provider commands.
  Validate recipient names, explain native ownership and scope, and keep
  runtime installation outside the definition repository.
- Document building public Runner source `1ba8ef000651f9b3ee2744a5709483935bd2195a`;
  the earlier alpha.5 archive predates instance messages. No Runner release or
  existing company-service deployment is part of this scaffold change.
- Give the workflow catalogs stable identifiers, preserving the existing goals
  and explicitly leaving live sequence acceptance unchecked.

Qualification on macOS ARM64 and Linux ARM64 (Debian Bookworm), Node 24.22.1:
fresh dependency installation, TypeScript/definition checks, helper demo/history,
independent sequence/history and idle resume passed. Native macOS records
confirmed ownerless author/reviewer conversations, self-continuation without a
reply, independent review with a reply, and separate instances on repeated runs.
A process killed during an admitted tool resumed with the original task/input
identities and completed the review; history inspection generated no new model
entries or assignments. The stale owner lock aged out normally, without manual
deletion. Invalid command combinations, missing input and wrong single-agent
startup returned nonzero exits. Relative links and the root's runtime-free
boundary were checked.

The demonstration scripts model responses: these observations do not qualify
live-model judgment, real repository cleanup/UX review, fresh-agent onboarding,
Windows, Linux AMD64 or every crash mode. Historical platform checks below retain
their original scope. No automated functional suite was added.

## Runtime separation — October 23, 2026

- Move Runner/Pi version selection to the parent installation. Definition packages
  keep only company and development dependencies; the scaffold no longer offers
  a helper that installs a private runtime into its example.
- Verify definitions against Pi 1.4.0. Preserve earlier qualification receipts
  below as evidence of the dependency layouts used at those dates.


## Unreleased

- Add an optional manual lander role at the root and in the Dispatch example.
  Reconcile completed work, run repository-approved checks and report deviations
  before authorized integration. This is an instruction-driven role, not an
  automatic Foreman handoff or security boundary.
- Document runtime-owned definition contracts and shared dated findings; keep
  Foreman work grounded in repository conventions.
- Include definition loading, folder-name, target and skill checks in the
  example's `npm run check`, compatible with public alpha.4 and local source.
- Align the temporary local runner's Pi AI/Durable packages with its manifest.
  Keep the public alpha.4/1.3.0 lock unchanged; document the irreversible SQLite
  schema upgrade when trying Pi 1.4.0 and the need for separate state or backups.

October 23 qualification on macOS ARM64 with Node 24.22.1: the locked alpha.4
example and the locally packed Pi 1.4 runner passed type/definition checks and
the scripted demo. Existing synthetic alpha.4 history reopened after migration.
A scheduled demo task slept, survived close/reopen, completed its due pass and
slept again with the same task identity. No live model calls or lander-driven
merges were exercised; Windows and Linux were not requalified in this pass.

- Make the local Foreman prototype continuous by default. Keep working in the
  same native conversation after each pass, recover suspended work and explicitly
  pause for blocking input. Add `--once` for a bounded assessment or interactive
  chat. This requires the locally built runner; alpha.4 is unchanged.

- Update the optional Dispatch example to runner source snapshot alpha.4 for
  native Windows use. The runner applies private file permissions automatically
  and uses Windows Credential Manager without an addon, compiler, administrator
  launch or manual permission setup. Document the ordinary PowerShell workflow.
- Update the optional Dispatch example to runner source snapshot alpha.3: secure
  new and retained conversation state with owner-only POSIX modes before opening
  SQLite, and display terminal controls as visible escapes in streamed answers,
  history and errors. Stored text is unchanged. That snapshot rejected native
  Windows state until ACL enforcement was added in alpha.4.

- Make the default template a runtime-independent directory structure with no
  package manifest, installation step or provider setup at the repository root.
- Keep useful agent instructions, both skill scopes, supporting resources and a
  place for company code. The root Markdown examples use relative file links.
- Move the complete runnable Dispatch implementation into `examples/dispatch/`,
  including its dependencies, model configuration, CLI and runtime guides. It is
  an explicit opt-in with independent definitions and local state.

Checked relative documentation links and the root's absence of runtime files.
The relocated example installed, type-checked, ran the demo and reopened its
saved history on macOS ARM64 with Node 24.21.0.

The security follow-up installed alpha.3 from its locked public archive on macOS
ARM64 with Node 24.21.0 and passed type checking, the demo and saved-history
reopening. A fresh Linux ARM64 example with Node 24.19.0 exercised the same packed
bytes. Manual observations covered private modes for new and retained state and
visible escaping of synthetic terminal controls. Live inference, Linux AMD64 and
WSL runtime behavior were not requalified in that security follow-up.

The alpha.4 Windows qualification used Windows 11 x64, Windows PowerShell 5.1
and Node 24.19.0. Installation without optional addons, type checking, the demo,
both skill reads and saved-history reopening passed. Under a standard Windows
account, synthetic native credentials passed save, read in another process,
rotation and removal. Manual storage checks covered private ACLs, retained state,
long paths and rejection of unsafe links and ambiguous paths. macOS ARM64 and
Linux AMD64 also passed the example workflow. Live Windows inference, Windows 10,
Windows ARM64, domain policies and interactive keyboard behavior were not
qualified. These observations are not a penetration-test claim.

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
