# Schedule an agent

**Design example only — not runnable.** The accepted design keeps schedules in
the owning agent's definition. Runner does not yet implement the `schedules`
field or cron/timezone execution. This guide changes no executable definition,
enables no schedule and requires no new dependency.

The [Runner design](https://github.com/dispatchlabs-ai/dispatch/blob/main/packages/runner/docs/schedules.md)
owns the shared contract and unresolved policies. This scaffold shows where the
configuration would go and how it connects to an existing workflow.

## Daily at 3 a.m. Eastern

The [author](../agents/author/agent.ts) and [reviewer](../agents/reviewer/agent.ts)
already demonstrate independent work, self-checking, review and a returned
report. Their [runnable walkthrough](independent-agents.md) is manual today.

Under the proposed API, `agents/author/agent.ts` would look like this. **Do not
copy this over the working definition until Runner supports it.**

```ts
import { defineAgent } from "@dispatch/runner";

export default defineAgent({
  trigger: { mode: "manual" },
  input: "Draft the assigned release notes, check them, then request independent review.",
  messages: ["author", "reviewer"],
  schedules: [
    {
      id: "daily-release-review",
      cron: "0 3 * * *",
      timezone: "America/New_York",
      instance: { mode: "new" },
      input: [
        "Draft Field Notes 1.2 release notes from only these synthetic changes:",
        "- Added CSV export.",
        "- Fixed duplicate saved filters.",
        "Check the draft, request independent review, and report the findings.",
        "Do not publish anything.",
      ].join("\n"),
    },
  ],
});
```

The five-field expression and timezone describe 3 a.m. Eastern each day,
following daylight-saving changes. A 24-hour interval or fixed EST offset is
not equivalent. Each occurrence would start a fresh `author` instance; recovery
would resume that occurrence, not create another assignment. The schedule's
`input` is sent as the assignment, unchanged, while `agent.md` still supplies
the role instructions, model and thinking.

The source changes are inline because this example's author has no file,
browser or shell tools. They are static teaching data, not a live daily feed.
For real work, supply the necessary source in the assignment or explicitly
equip the agent to obtain current inputs. Scheduling grants no extra access.

`manual` would mean no continuous/interval loop, not a ban on scheduled
assignments. Today that definition is still manual only, and TypeScript rejects
the proposed extra field. Bypassing the type check does not enable scheduling.

## Keep configuration with its owner

- Keep several schedules in one agent's `schedules` list when it has different
  times, prompts or target repositories. Each entry is implicitly for that agent.
- If the list grows, move it to an adjacent `schedules.ts` and import it into
  `agent.ts`. It is ordinary application code, not a new manifest format.
- Keep `factory.yaml` limited to agent enablement and deployment facts, not
  the schedules or their prompts. The checked-in `agents: []` stays unchanged.
- Keep both author and reviewer available in the same service for messaging.
  The reviewer needs no calendar schedule just to accept a handoff.
- Let Runner admit scheduled assignments and Pi Durable persist and recover
  work. The agents still own checking, convergence and handoff decisions.

The fresh-instance choice above is explicit, not a global default. Existing
instance addressing, missed runs while offline, overlap/busy behavior and
schedule-update semantics still need a defined implementation contract. Do not
infer skip/coalescing rules or a concurrency cap from this example.

There is no scheduled-start command to run yet. Use the existing manual
walkthrough to try the author/reviewer sequence; it does **not** verify a timer,
timezone behavior or cron recovery. No system cron job, Codex automation or
live service deployment is created by this guide.
