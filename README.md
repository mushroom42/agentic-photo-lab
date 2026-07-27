# Agentic Photo Lab

Agentic Photo Lab uses a photography-training product as a controlled domain for studying how Coding Agents behave under interacting constraints.

It is intentionally two things:

1. A deterministic photography assignment generator.
2. An evaluation lab for prompts, context packages, skills, tools, and Agent runs.

## Why photography?

Photography exercises contain understandable but interacting rules: scene, light, color, focal length, film stock, shot budget, recent practice, and difficulty. They expose instruction-following and constraint failures without requiring a huge application.

## Baseline commands

```bash
npm install
npm run typecheck
npm test
npm run demo
npm run benchmark
```

## Repository map

```text
src/             Controlled domain and evaluation seams
tests/           Public behavior tests
evals/           Benchmark tasks, rubric, and recorded runs
.agents/skills/  Reusable Agent workflows
docs/            Spec, ADRs, autonomy, context, and failures
```

Start with [CONTEXT.md](CONTEXT.md) and [docs/SPEC.md](docs/SPEC.md).

## Experiment workflow

1. Choose a task from `evals/tasks.json`.
2. Prepare a task-scoped context package.
3. Pin the model, tools, repository commit, prompt, and skills.
4. Run the Agent from that commit.
5. Record observations in the run dataset before human corrections.
6. Run `npm run benchmark`.
7. Classify failures and turn recurring ones into tests or guardrails.

The checked-in sample runs are illustrative fixtures. Replace them with
sanitized observations from real runs before drawing conclusions.

See [docs/EXPERIMENT_METHOD.md](docs/EXPERIMENT_METHOD.md) for the controlled
comparison protocol.
