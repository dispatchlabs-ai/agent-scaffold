# Make the structure your own

Start with `agents/helper/agent.md`. It describes the agent's purpose, instructions
and related skills in ordinary Markdown. Give each agent its own folder and use
clear names, such as `release-helper` or `researcher`.

The root example chooses no model, runtime, tool set or schedule. Add executable
definitions and configuration only when you integrate your chosen runtime. Put
company integration code in `src/`, and document how to run it in `docs/`.

For repository improvement, adapt [the foreman](../agents/foreman/agent.md) and
[worker](../agents/worker/agent.md) roles, and add the optional
[lander](../agents/lander/agent.md) as the final gate for repositories with
formal checks: it verifies, reconciles and reports a finished change before it
merges. Supply each agent with the applicable repository `AGENTS.md` and its
own `agent.md`. The optional Dispatch example has a
[local runnable prototype](../examples/dispatch/docs/foreman.md).

## Two skill scopes

```text
skills/company-writing-style/SKILL.md
agents/helper/skills/draft-release-notes/SKILL.md
agents/helper/skills/draft-release-notes/references/template.md
```

`skills/` holds guidance that can be shared across the company. Skills under an
agent's folder belong to that agent. A `SKILL.md` contains a name and description
in YAML frontmatter, followed by instructions. Supporting resources stay beside
that skill and are linked using relative paths.

The sample helper links to both scopes. An agent with file access can follow those
links, or you can supply the files as context. The layout alone does not load
skills automatically or restrict which files an agent can read. Discovery, tool
permissions and saved history depend on the runtime you choose.

## Definition contracts

A role file is ordinary Markdown instructions; the structure itself declares no
schema. A runtime may pair each role with a machine-readable declaration —
frontmatter or a sidecar module naming the model, tools, skills or schedule —
and defines its own fields and validation rules. Unknown-field handling belongs
to that runtime; the directory structure imposes none. The optional Dispatch
example shows one such pairing.

## Shared findings

Supply role instructions and shared rules when starting each conversation;
automatic loading depends on the runtime. Past findings are not automatically
shared with other roles or conversations. Keep durable
findings in a plain shared file — `NOTES.md` at the repository root for
project-wide facts, or beside an agent's `agent.md` for its own. Read
applicable notes before starting an assignment and append what the work
verifies, with a date, keeping open questions separate from established
findings. This is an ordinary file convention that any file-reading runtime
can follow without support.

Keep credentials out of instructions, skills and assets. Review what your runtime
will send to a model provider before including company information.

## Optional Dispatch implementation

The [Dispatch example](../examples/dispatch/README.md) has its own copies of the
agent, skills and sample input. Edit those copies when running that example;
changing the root scaffold does not change its behavior.

Its [authoring guide](../examples/dispatch/docs/authoring.md) explains `agent.ts`,
model configuration, scoped skill discovery and deliberate definition updates.
Those are choices made by that implementation, rather than requirements of the
directory structure.
