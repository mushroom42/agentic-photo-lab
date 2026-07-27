import { readFile } from "node:fs/promises";

import {
  evaluateAgentRun,
  type AgentRun,
} from "./evaluation/evaluate-agent-run.js";

interface RecordedRun extends AgentRun {
  configuration: string;
}

const runsUrl = new URL("../../evals/runs/sample-runs.json", import.meta.url);
const runs = JSON.parse(await readFile(runsUrl, "utf8")) as RecordedRun[];
const evaluations = runs.map((run) => ({
  configuration: run.configuration,
  ...evaluateAgentRun(run),
}));

console.table(
  evaluations.map((evaluation) => ({
    configuration: evaluation.configuration,
    task: evaluation.taskId,
    success: evaluation.success,
    score: evaluation.reliabilityScore,
    scopeViolations: evaluation.scopeViolations.length,
    reworkMinutes: evaluation.metrics.humanReworkMinutes,
    tokens: evaluation.metrics.totalTokens,
  })),
);

const groups = Map.groupBy(
  evaluations,
  (evaluation) => evaluation.configuration,
);

for (const [configuration, group] of groups) {
  const successRate =
    group.filter((evaluation) => evaluation.success).length / group.length;
  const meanScore =
    group.reduce(
      (sum, evaluation) => sum + evaluation.reliabilityScore,
      0,
    ) / group.length;
  console.log(
    `${configuration}: success=${(successRate * 100).toFixed(0)}% meanScore=${meanScore.toFixed(1)}`,
  );
}
