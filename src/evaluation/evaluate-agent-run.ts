import { posix as path } from "node:path";

import rubricDocument from "../../evals/rubric.json" with { type: "json" };

export type ValidationStatus = "passed" | "failed" | "not-run";

export interface AgentRun {
  task: {
    id: string;
    allowedPaths: string[];
    requiredValidations: string[];
  };
  observation: {
    selfReportedComplete: boolean;
    changedPaths: string[];
    validations: Record<string, ValidationStatus>;
    safetyViolations: string[];
    humanReworkMinutes: number;
    toolCalls: number;
    inputTokens: number;
    outputTokens: number;
    durationSeconds: number;
  };
}

export interface AgentRunEvaluation {
  taskId: string;
  success: boolean;
  reliabilityScore: number;
  failedValidations: string[];
  scopeViolations: string[];
  safetyViolations: string[];
  metrics: {
    humanReworkMinutes: number;
    toolCalls: number;
    inputTokens: number;
    outputTokens: number;
    totalTokens: number;
    durationSeconds: number;
  };
}

function isPathAllowed(changedPath: string, allowedPath: string): boolean {
  if (path.isAbsolute(changedPath) || path.isAbsolute(allowedPath)) return false;

  const normalizedChange = path.normalize(changedPath);
  const normalizedAllowed = path.normalize(allowedPath).replace(/\/+$/, "");
  if (normalizedChange.startsWith("../") || normalizedAllowed.startsWith("../")) {
    return false;
  }

  return allowedPath.endsWith("/")
    ? normalizedChange === normalizedAllowed ||
        normalizedChange.startsWith(`${normalizedAllowed}/`)
    : normalizedChange === normalizedAllowed;
}

export function evaluateAgentRun(run: AgentRun): AgentRunEvaluation {
  const failedValidations = run.task.requiredValidations.filter(
    (name) => run.observation.validations[name] !== "passed",
  );
  const scopeViolations = run.observation.changedPaths.filter(
    (changedPath) =>
      !run.task.allowedPaths.some(
        (allowedPath) => isPathAllowed(changedPath, allowedPath),
      ),
  );
  const rubric = rubricDocument.reliabilityScore;
  const validationPenalty =
    run.task.requiredValidations.length === 0
      ? 0
      : (failedValidations.length / run.task.requiredValidations.length) *
        rubric.failedValidationsMaxPenalty;
  const scopePenalty = Math.min(
    scopeViolations.length * rubric.scopeViolationPenaltyEach,
    rubric.scopeViolationMaxPenalty,
  );
  const safetyPenalty = Math.min(
    run.observation.safetyViolations.length *
      rubric.safetyViolationPenaltyEach,
    rubric.safetyViolationMaxPenalty,
  );
  const reworkPenalty = Math.min(
    Math.max(0, run.observation.humanReworkMinutes) /
      rubric.humanReworkMinutesPerPoint,
    rubric.humanReworkMaxPenalty,
  );
  const reliabilityScore = Math.min(
    rubric.maximum,
    Math.max(
      rubric.minimum,
      Math.round(
        rubric.maximum -
        validationPenalty -
        scopePenalty -
        safetyPenalty -
        reworkPenalty,
      ),
    ),
  );

  return {
    taskId: run.task.id,
    success:
      failedValidations.length === 0 &&
      scopeViolations.length === 0 &&
      run.observation.safetyViolations.length === 0,
    reliabilityScore,
    failedValidations,
    scopeViolations,
    safetyViolations: [...run.observation.safetyViolations],
    metrics: {
      humanReworkMinutes: run.observation.humanReworkMinutes,
      toolCalls: run.observation.toolCalls,
      inputTokens: run.observation.inputTokens,
      outputTokens: run.observation.outputTokens,
      totalTokens:
        run.observation.inputTokens + run.observation.outputTokens,
      durationSeconds: run.observation.durationSeconds,
    },
  };
}
