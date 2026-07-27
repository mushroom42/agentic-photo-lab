# Agent Instructions

Read `CONTEXT.md`, `docs/SPEC.md`, and relevant ADRs before changing behavior.

## Sources of truth

1. `docs/SPEC.md` defines product behavior.
2. `docs/adr/` records decisions and their rationale.
3. Public tests describe observable examples, but do not override the spec.
4. `GLOSSARY.md` owns domain vocabulary.

## Working rules

- Keep photography constraints in the domain layer, never in UI-only code or prompts.
- Treat prompts and skills as versioned experiment inputs.
- Do not modify benchmark expected outcomes while implementing a benchmark task.
- Any hard constraint enforced by an LLM must also have deterministic validation.
- Record recurring agent failures in `docs/FAILURE_MODES.md`.
- Run `npm run typecheck` and `npm test` before reporting completion.
- External writes, dependency changes, data migrations, and releases require human approval.
