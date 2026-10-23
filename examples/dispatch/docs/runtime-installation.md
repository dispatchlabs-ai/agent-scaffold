# Shared runtime installation

This repository owns agent definitions, skills, domain workflows and company
integrations. The parent workspace owns Dispatch Runner, optional adapters and
Pi. Its `package.json` and lockfile select one compatible runtime for every agent.
Do not add Runner/Pi dependencies or archives to this repository or an agent folder.

Create a parent installation, then place the real company checkout beneath it:

```sh
mkdir agent-workspace
cd agent-workspace
npm init -y
npm install https://github.com/dispatchlabs-ai/dispatch/releases/download/runner-v0.6.0-alpha.5/dispatch-runner-0.6.0.tgz
# Clone or place the company repository inside this directory.
```

Keep the parent's manifest and lockfile with the deployment configuration. Run
`npm ci` and the repository's usual checks from the company checkout to install
its business and development dependencies. Node and TypeScript find shared
packages in the parent's `node_modules`; no custom module loader is used.
A symlink to a checkout elsewhere does not change its real ancestor directories.

The current installation uses Pi Durable, Pi AI and Chord 1.4.0. Native Pi imports
in company tools and documents remain valid; their implementation and version
come from the host. Update the installation once, then verify every definition
and affected domain workflow against it. Run `npm ls` at the installation root
to check the resolved runtime tree. An agent-local package must not install its
own runtime, including through a transitive dependency.

Before upgrading retained state, stop its owner and back up the complete state
directory. Pi 1.4 opens SQLite with schema version 2; Pi 1.3 cannot reopen a
migrated store. Validate recovery with a private copy first. Keep the old release
and pre-upgrade backup together; changing a package URL does not reverse a schema
migration. Runtime replacement preserves definition names, namespaces, saved
conversation IDs, tool grants and transport routing.

See [Runner definition workspaces](https://github.com/dispatchlabs-ai/dispatch/blob/main/packages/runner/docs/definition-workspaces.md) for immutable deployment layout.
