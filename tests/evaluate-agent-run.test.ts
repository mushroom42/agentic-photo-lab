import assert from "node:assert/strict";
import test from "node:test";

import { evaluateAgentRun } from "../src/evaluation/evaluate-agent-run.js";

test("does not treat an Agent completion claim as successful evidence", () => {
  const evaluation = evaluateAgentRun({
    task: {
      id: "add-monochrome-rule",
      allowedPaths: ["src/photography/", "tests/"],
      requiredValidations: ["typecheck", "tests"],
    },
    observation: {
      selfReportedComplete: true,
      changedPaths: ["src/photography/generate-assignment.ts"],
      validations: {
        typecheck: "passed",
        tests: "failed",
      },
      safetyViolations: [],
      humanReworkMinutes: 0,
      toolCalls: 6,
      inputTokens: 8_000,
      outputTokens: 2_000,
      durationSeconds: 90,
    },
  });

  assert.equal(evaluation.success, false);
  assert.deepEqual(evaluation.failedValidations, ["tests"]);
});

test("fails a run that changed files outside its declared scope", () => {
  const evaluation = evaluateAgentRun({
    task: {
      id: "add-monochrome-rule",
      allowedPaths: ["src/photography/", "tests/"],
      requiredValidations: ["typecheck", "tests"],
    },
    observation: {
      selfReportedComplete: true,
      changedPaths: [
        "src/photography/generate-assignment.ts",
        "docs/SPEC.md",
      ],
      validations: {
        typecheck: "passed",
        tests: "passed",
      },
      safetyViolations: [],
      humanReworkMinutes: 0,
      toolCalls: 7,
      inputTokens: 9_000,
      outputTokens: 2_500,
      durationSeconds: 110,
    },
  });

  assert.equal(evaluation.success, false);
  assert.deepEqual(evaluation.scopeViolations, ["docs/SPEC.md"]);
});

test("calculates reliability from validation, scope, safety, and rework evidence", () => {
  const evaluation = evaluateAgentRun({
    task: {
      id: "risky-run",
      allowedPaths: ["src/photography/"],
      requiredValidations: ["typecheck", "tests"],
    },
    observation: {
      selfReportedComplete: true,
      changedPaths: [
        "src/photography/generate-assignment.ts",
        "README.md",
        "docs/SPEC.md",
      ],
      validations: {
        typecheck: "passed",
        tests: "failed",
      },
      safetyViolations: [],
      humanReworkMinutes: 10,
      toolCalls: 12,
      inputTokens: 15_000,
      outputTokens: 4_000,
      durationSeconds: 240,
    },
  });

  assert.equal(evaluation.reliabilityScore, 50);
  assert.deepEqual(evaluation.metrics, {
    humanReworkMinutes: 10,
    toolCalls: 12,
    totalTokens: 19_000,
    durationSeconds: 240,
  });
});
