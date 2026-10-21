# Contributing

Use Node.js 24 or 25, `npm ci` and `npm run check`. Application source runs directly
through Node's TypeScript support. Exercise the documented demo and affected
commands manually, and record meaningful behavior observations. There is no
automated functional suite or CI workflow in this initial scaffold.

Preserve user changes. Use a task branch/worktree for concurrent edits. Before
publication, fetch the latest target, reconcile changes, check the resulting
revision and inspect the full outgoing diff and history. Never force-push over
another contributor. Outside contributions are welcome as pull requests under
MIT, without a CLA or copyright assignment; maintainer changes can land directly.

Review source, dependency lockfiles and release archives for secrets and private
company, infrastructure or personal information. Use synthetic public examples.
Keep operational captures and state out of Git and package archives. A clean
secret scan does not replace content review.

The project is maintained by Chris Reynolds, cofounder of Dispatch Labs AI.
Report ordinary bugs through GitHub issues, excluding credentials and private
transcripts. Use the repository's private vulnerability reporting channel for
security-sensitive reports. Releases remain source alpha until wider platform,
independent security and fresh-agent onboarding qualification is documented.
