# Adopt the directory structure

The default scaffold is a set of folders and Markdown examples. You need a file
editor and, if cloning, Git. There is nothing to install at the repository root.

## Make your copy

Choose **Use this template → Create a new repository** on
https://github.com/dispatchlabs-ai/agent-scaffold, choose your repository's
visibility and clone it. A plain clone also works for exploring the reference.
You can instead copy `agents/`, `skills/`, `src/`, `docs/` and `assets/` into an
existing repository, preserving its files and instructions. Also merge the
root `AGENTS.md` project-work guidance and `factory.yaml` company directory;
preserve any existing deployment fields. `examples/` is optional.

## Follow the example

1. Read [the helper instructions](../agents/helper/agent.md).
2. Follow the links to the [company writing skill](../skills/company-writing-style/SKILL.md)
   and the [helper's release-note skill](../agents/helper/skills/draft-release-notes/SKILL.md).
3. Read its linked template and [the synthetic change list](../assets/sample-changes.md).
4. Adapt the helper and company guidance for your own work. Copy the helper folder
   to add another agent, keeping that agent's skills beside its instructions.

At this point you have a usable layout with both skill scopes and supporting
resources. The scaffold requires no credentials or packages and makes no model
requests. Your own agent can read the files to draft release notes; that agent
supplies the execution and model access. See [authoring](authoring.md) for the
conventions.

For project work, read [the shared skill](../skills/project-work/SKILL.md).
Set the company wiki in `factory.yaml`, then register only real projects with
verified wiki pages. Empty inventories are intentional, not executable setup.

For an agent following this guide: show the directory structure and explain the
two skill scopes. Help with the requested edits and preserve existing user work.
Keep setup structure-only unless the user chooses a runtime. Do not infer that
copying these files grants tools or enables automatic skill discovery.

## Choose execution separately

You can connect any suitable runtime using your company's code in `src/`.
For the included implementation, explicitly select the
[Dispatch example setup](../examples/dispatch/docs/setup.md). Its Node.js
dependencies, demo, credential setup and saved conversations are contained under
`examples/dispatch/`.
