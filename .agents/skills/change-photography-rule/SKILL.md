---
name: change-photography-rule
description: Add or modify a photography compatibility rule in the controlled domain.
---

# Trigger

Use for changes to candidate eligibility, film compatibility, focal-length
compatibility, scene compatibility, shot budgets, or history preference.

# Required context

Read `CONTEXT.md`, `GLOSSARY.md`, `docs/SPEC.md`, relevant ADRs, the public
generator seam, and its tests.

# Workflow

1. Restate the requested observable behavior and allowed paths.
2. Identify whether the rule is hard or soft.
3. Add one failing public-seam test from a worked example.
4. Run only that test and capture the red evidence.
5. Implement the smallest deterministic change.
6. Run the focused test, full tests, and typecheck.
7. Review the diff for prompt-only enforcement and scope drift.
8. Record a failure mode if the change fixes a recurring Agent pattern.

# Tool permissions

- Read repository sources.
- Edit only declared paths.
- Run tests, typecheck, and non-destructive Git inspection.
- Do not change dependencies, external systems, or releases without approval.

# Completion gate

Report commands and results. A completion claim without passing validation is
not completion.

# Stop conditions

Stop for conflicting sources, missing acceptance criteria, an undeclared public
schema change, or a required out-of-scope edit.
