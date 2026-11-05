# Jett

Jett is the default for new conversations, using Astra with medium reasoning.
The definition and operating guide are portable: company knowledge, authority,
credentials, repositories and deployment policy come from this repository and its
trusted installation. Existing named agents and saved conversations remain available.

Jett works directly, retains the original request until its outcome is complete,
and can use the five optional private workers for focused assignments. Development
coordinates implementation, narrow independent code review and authorized
publication. Cleanup, security remediation and separate acceptance work are
explicit assignments rather than automatic extra phases.

See [Jett's instructions](../agents/jett/agent.md),
[operating guide](../agents/jett/operations.md), and
[Development](../agents/development/operations.md). `defaultAgent` is independent
of the factory's schedule list; adding Jett does not enable recurring work.

## Optional runtime example

The root remains a dependency-free directory structure. Its Jett and Development
Markdown can be used by an existing agent. `examples/dispatch` includes executable
Jett, optional workers and Development roles, using installation-owned Dispatch/Pi.
From that example, `npm run chat -- --cwd /path/to/workspace` selects Jett. Named
agents retain the older examples; the helper demo needs no credentials.

The example has no company IDs, endpoints or credentials. Choose installed models
and host capabilities deliberately; keep credentials and persistent state outside
source. New default selection does not rename old histories.
