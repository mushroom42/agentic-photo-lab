---
name: evaluate-agent-run
description: Record and evaluate an Agent run against observable task evidence.
---

# Trigger

Use after an Agent attempts a benchmark task.

# Required evidence

- Task contract and configuration label
- Changed paths
- Required validation results
- Safety violations
- Human rework minutes
- Tool calls, tokens, and duration

# Workflow

1. Record raw observations without accepting the Agent's self-report as proof.
2. Validate the run record shape.
3. Run `npm run benchmark`.
4. Inspect binary success separately from reliability and efficiency metrics.
5. Classify failures using `docs/FAILURE_MODES.md`.
6. Add a regression test or guardrail for recurring failures.

# Prohibited behavior

- Do not edit expected outcomes to improve a score.
- Do not infer missing measures.
- Do not compare configurations run on different task sets as if controlled.

# Completion gate

The record is reproducible and includes enough evidence for another person to
reach the same success decision.
