# Shared agent instructions

## Verification cost

- Verify affected behavior with the lowest-total-cost credible method. Prefer
  builds, static checks and focused disposable checks; do not add retained tests
  by default.
- Keep or add retained tests only when material failures prevented or repeated
  verification saved justify authoring, maintenance, execution and agent-context
  costs. Prefer stable observable behavior to implementation details.
- Missing automated coverage alone is not a defect; identify the concrete risk
  or required verification gap. Preserve required evidence and runtime safeguards.
- Follow explicit target policies, including required suites and no-test rules.
  Remove low-value tests and orphaned wiring only within authorized scope.

## Repository work by agents

- Every agent receives the applicable repository `AGENTS.md` plus its own
  `agent.md`. Delegated agents receive both directly. Read more specific
  `AGENTS.md` files before entering their scope.
- Preserve established product intent, accepted design choices and other work.
  Make routine decisions and continue through recoverable problems.
- Keep `USE_CASES.md` concise: a short introduction, numbered functional groups,
  stable IDs, and one sentence per actor goal with a Markdown checkbox. Check a
  case only when implemented and verified; work in progress stays unchecked.
  Keep detailed scenarios elsewhere and link useful task/evidence records.
- Keep `DESIGN_GUIDE.md` terse: accepted design facts and rules, with references
  to authoritative tokens and components. Keep unresolved decisions and workflow
  instructions outside the guide.
- Plan the application structure using all known use cases. Use shared component
  implementations, intentional variants and tokens so changes propagate.
- For UI, preserve consistent geometry and state meanings, readable navigation,
  clear next actions and purposeful text. Labels are short; help is separate.
  Web apps remain useful on small, short phones with compact headers, readable
  content and reachable controls. Inspect demanding populated and failure states.
- Concentrate formal verification and review at the end of the requested scope.
  Use focused execution feedback while building; fix demonstrated problems and
  recheck affected behavior. Follow explicit requests about checks and avoid
  repeated intermediate gates.
- Unfinished future use cases do not expand the authorized scope. Report actual
  completion and verification accurately.
