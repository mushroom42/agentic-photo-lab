# Experiment Method

## Question

How do scoped context packages and reusable skills affect Coding Agent
reliability under interacting domain constraints?

## Controlled comparison

For each configuration:

1. Use the same benchmark task revision.
2. Pin the model and tool permissions.
3. Start from the same Git commit.
4. Vary only the declared factor, such as context or skill.
5. Record raw observations before human correction.
6. Evaluate with `evaluateAgentRun`.
7. Keep failed runs; they are experimental evidence.

## Configuration examples

- baseline prompt;
- baseline plus scoped context;
- scoped context plus skill;
- scoped context plus skill plus test feedback.

## Measures

- binary task success;
- reliability score;
- scope violations;
- safety violations;
- human rework minutes;
- tool calls;
- input and output tokens;
- duration.

## Interpretation limits

- Sample runs are illustrative fixtures, not empirical claims.
- Scores compare runs within this benchmark; they do not measure general
  intelligence.
- A high score on easy tasks does not justify more production authority.
- Model and tool updates require a new experiment series.
