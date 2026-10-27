# Schedule an agent

The [author definition](../agents/author/agent.ts) owns a daily 3 a.m. Eastern
release-review assignment. Runner admits it and Pi Durable owns timer/task
recovery. The root scaffold remains runtime-neutral. Install the cron-capable
source revision in [runtime installation](runtime-installation.md) first;
older alpha archives do not provide this API.

## Try the native calendar

1. From `examples/dispatch`, change `factory.yaml` to `agents: [author]`. The
   checked-in `agents: []` intentionally starts no automatic work.
2. To observe a near-term synthetic run, temporarily set the author's `cron` to
   `* * * * *`. Keep its other fields and synthetic prompt unchanged. Optionally
   set an absolute `endAt` shortly after the intended observation to bound it.
3. Run `npm run schedules -- --demo`. It prints the next deadline and newly
   created conversation IDs. The service uses real native tasks and scripted
   author/reviewer responses, without live inference or credentials.
4. Wait for a minute boundary, then Ctrl-C. Inspect saved work with
   `npm run sequence -- --demo --history --state-dir .state/schedules/demo`.
   Restart `npm run schedules -- --demo` to recover saved work without a new
   assignment for an already admitted occurrence.
5. Restore `0 3 * * *` and `agents: []` after the exercise. Definition changes
   against idle saved state require `--update-definitions`. Do not delete live
   histories merely to bypass the update policy.

For live inference, configure the two roles' provider credentials and models
using the existing [setup](setup.md), then omit `--demo`. Demo and live state
remain separate. Keep the service running; the command installs no supervisor.
To inspect a deployment using `dispatch-service`, run `dispatch-service CONFIG
schedules`, then inspect the returned chat and submission with `snapshot` and
`receipt`. Last admission is not completed work.

## Definition

```ts
schedules: [{
  id: "daily-release-review",
  cron: "0 3 * * *",
  timezone: "America/New_York",
  instance: { mode: "new" },
  missed: "latest",
  input: "Draft Field Notes 1.2 release notes from these synthetic changes only: added CSV export for reports; fixed report date filters resetting when switching tabs; existing accounts update automatically with no action needed. Check the draft, request independent review and report the findings. Do not publish anything.",
}],
```

`manual` still means no continuous/interval loop; it does not block calendars.
The role retains model, instructions, permissions and handoff policy. Author and
reviewer must both be served, but only the author needs calendar enablement.
The synthetic prompt is static teaching data, not a live feed or a new tool grant.

Each occurrence creates a new independent author instance; recovery reuses its
saved conversation/request identity. `missed: "latest"` admits just the most
recent missed occurrence after offline time. Choose `skip` explicitly to discard
older minutes. A newly activated/edited schedule starts at its next future time,
not earlier today. New instances may overlap; there is no concurrency cap.
Existing-instance addressing, expiry, edits, DST handling and native failure
inspection are defined in the [Runner contract](https://github.com/dispatchlabs-ai/dispatch/blob/main/packages/runner/docs/schedules.md).

Keep multiple schedules in the agent's list; import an adjacent `schedules.ts`
if it grows. `factory.yaml` holds only enablement, not prompts or timetables.
Scheduling submits an assignment, not a supervisory workflow. This replaces the
October 26 documentation-only proposal; no OS cron or Codex automation is used.
