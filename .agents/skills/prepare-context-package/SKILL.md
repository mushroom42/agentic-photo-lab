---
name: prepare-context-package
description: Build a minimal, current context package for one Agent task.
---

# Trigger

Use before delegating or benchmarking a coding task.

# Workflow

1. Define one observable goal.
2. Link the current spec, ADR, glossary terms, relevant code, and reproduction.
3. Declare allowed paths and non-goals.
4. Add executable acceptance evidence.
5. Add stop conditions for conflict, missing authority, and scope expansion.
6. Remove unrelated context.
7. Save the package under `evals/context-packages/`.

# Quality checks

- Every source path exists.
- No two sources disagree silently.
- The package contains evidence, not only instructions.
- The task can fit in one focused Agent run.

# Stop conditions

Do not resolve product or architecture conflicts while packaging context.
Escalate them to a human decision.
