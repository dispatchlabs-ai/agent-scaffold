# Supported workflows

- Copy a company-agent directory structure without installing dependencies or
  selecting a model provider or runtime.
- Keep one agent's instructions and skills together, with reusable company skills
  in a separate shared directory.
- Keep reusable test conversations and expected results beside each agent in
  `test-prompts/`, and use them manually with the chosen runtime.
- Adapt the supplied instructions, writing skill and release-note template with
  an existing file-reading agent or by editing the files yourself.
- Keep verified findings in a shared notes file that roles read before
  assignments, independent of any conversation's history.
- Route a finished repository change through an optional lander role that
  verifies, reconciles and reports it before it merges.
- Add company code and integrate a runtime of your choice when execution is needed.
- Explicitly choose the [Dispatch example](examples/dispatch/README.md) for a
  scripted demo, direct terminal chat, local persistence and credential management.
  Its [runtime workflows](examples/dispatch/USE_CASES.md) require its dependencies.

The default is structure only. Folders and Markdown do not provide automatic skill
discovery, tool access, persistence or a security boundary. The selected runtime
owns those behaviors. There is no web app, checked-in vendor archive or setup wizard.
