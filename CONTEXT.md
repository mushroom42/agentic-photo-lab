# Current Context

## Objective

Use a photography-training product as a controlled domain for studying how Coding Agents behave under interacting constraints.

The project has two public seams:

1. `generateAssignment(input)` produces an executable photography assignment.
2. `evaluateAgentRun(run)` scores observable evidence from an agentic coding run.

## Current phase

Build a dependency-light TypeScript baseline with:

- deterministic domain rules;
- tests at public seams;
- reusable project skills;
- benchmark fixtures and a repeatable evaluator;
- context, autonomy, and failure-mode documentation.

## Deliberate non-goals

- Production UI or accounts
- Calling a live LLM
- Subjective photo scoring
- Multi-agent automation
- Cloud deployment

Those features would add uncontrolled variables before the baseline is measurable.
