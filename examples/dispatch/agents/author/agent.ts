import { defineAgent } from "@dispatch/runner";

export default defineAgent({
  trigger: { mode: "manual" },
  input: "Draft the assigned release notes, check them, then request independent review.",
  schedules: [{
    id: "daily-release-review",
    cron: "0 3 * * *",
    timezone: "America/New_York",
    instance: { mode: "new" },
    missed: "latest",
    input: "Draft Field Notes 1.2 release notes from these synthetic changes only: added CSV export for reports; fixed report date filters resetting when switching tabs; existing accounts update automatically with no action needed. Check the draft, request independent review and report the findings. Do not publish anything.",
  }],
  messages: ["author", "reviewer"],
});
