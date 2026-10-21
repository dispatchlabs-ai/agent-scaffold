# Contributor guidance

- Read README.md and the affected guide under docs/ before changing behavior.
- Keep the root scaffold independent of any runtime and free of install steps.
  Runtime dependencies and executable examples belong under examples/.
- Use synthetic data. Never commit credentials, local state or private logs.
- Check affected links and inspect the diff. For Dispatch example changes, run
  npm run check and the documented demo from examples/dispatch/.
- Keep both skill scopes useful. See docs/authoring.md for the conventions.
- Follow CONTRIBUTING.md for publication and review requirements.
