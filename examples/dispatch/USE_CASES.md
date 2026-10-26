# Supported workflows

The `UC-D` identifiers belong to this optional implementation; checked cases have
recorded implementation evidence, with platform and historical limits in the
[changelog](../../CHANGELOG.md), not a claim of universal live-model reliability.

## 1. Define and run agents

- [x] **UC-D001:** Customize company-owned definitions in a copy of the reference.
- [x] **UC-D002:** Run the clearly labeled credential-free helper demo with both skill scopes.
- [x] **UC-D003:** Chat directly in a terminal using a supported provider and the operator's credentials.
- [x] **UC-D004:** Discover company and agent-local skills, read supporting text and retain revision evidence.

## 2. Operate the runtime

- [x] **UC-D005:** Configure, inspect, rotate and remove native/helper credential sources, or explicitly select session/environment input without repository secrets.
- [x] **UC-D006:** Resume saved conversations, inspect history without model calls and deliberately update idle definitions and skills.
- [x] **UC-D007:** Upgrade the externally owned shared runtime through a locked installation without vendoring it into definitions.

## 3. Compose repository and peer workflows

- [x] **UC-D008:** Adapt the [local Foreman prototype](docs/foreman.md) for continuous repository work, bounded worker delegation, recovery and optional manual landing.
- [x] **UC-D009:** Run the scripted author → self-check → independent reviewer → reply sequence and inspect or recover its native evidence without a replacement assignment.
- [ ] **UC-D010:** Use the independent author/reviewer sequence with live providers and verify the resulting work against the role instructions.

UC-D010's entrypoint is implemented; live-model acceptance remains unqualified.

## 4. Schedule assignments — accepted design, not implemented

- [ ] **UC-D011:** Define schedules and predefined prompts with their owning agent, and run a daily assignment at a chosen local time and timezone through shared Runner scheduling.

The [agent-local schedule example](docs/schedules.md) documents the proposed API;
there is no cron implementation or scheduled-run qualification yet.

This scaffold intentionally contains no web app, checked-in vendor archives or
setup wizard. Slack and gateway integration remain optional. Trusted local use
does not establish hosted, multi-tenant or portable shell sandbox support.
