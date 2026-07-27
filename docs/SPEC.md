# Baseline Specification

## Purpose

The baseline must be small enough to inspect yet rich enough to expose failures in instruction following, context management, tool use, testing, and constraint reasoning.

## Photography assignment generator

Given a scene, equipment, film, shot budget, recent history, and seed:

1. Return one assignment whose theme and technique satisfy all hard constraints.
2. Never require color when using monochrome film.
3. Never exceed the available shot budget.
4. Never require a focal length unavailable to the selected lens.
5. Only select candidates compatible with the scene.
6. Prefer recently unused candidates.
7. Produce the same result for the same valid input and seed.
8. If no assignment is possible, return a structured failure with reasons rather than inventing a result.

## Agent-run evaluator

Given a task contract and observed run evidence:

1. A run succeeds only if required validations passed and no critical scope or safety violation occurred.
2. Report scope violations explicitly.
3. Preserve raw measures such as human rework, tool calls, tokens, and duration.
4. Calculate a documented reliability score from observable evidence.
5. Never infer success from an Agent's self-reported completion message.

## Experiment assets

The repository must include:

- reusable skills with triggers and validation gates;
- a context-package template;
- autonomy and approval policy;
- a failure-mode registry;
- benchmark tasks, rubric, and sample runs;
- commands that reproduce typechecking, tests, demo output, and benchmark summaries.
