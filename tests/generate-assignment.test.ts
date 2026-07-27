import assert from "node:assert/strict";
import test from "node:test";

import { generateAssignment } from "../src/photography/generate-assignment.js";

test("generates an executable monochrome indoor assignment", () => {
  const result = generateAssignment({
    scene: "indoor",
    film: { colorMode: "monochrome", iso: 400, framesRemaining: 12 },
    lens: { focalLengths: [50] },
    shotBudget: 12,
    recentCandidateIds: [],
    seed: 42,
  });

  assert.equal(result.ok, true);
  if (!result.ok) return;

  assert.equal(result.assignment.scene, "indoor");
  assert.equal(result.assignment.requiresColor, false);
  assert.equal(result.assignment.focalLength, 50);
  assert.ok(result.assignment.maxShots <= 12);
});

test("can generate a color-observation assignment when color film supports it", () => {
  const result = generateAssignment({
    scene: "city",
    film: { colorMode: "color", iso: 200, framesRemaining: 24 },
    lens: { focalLengths: [35] },
    shotBudget: 10,
    recentCandidateIds: [],
    seed: 1,
  });

  assert.equal(result.ok, true);
  if (!result.ok) return;

  assert.equal(result.assignment.theme.id, "red-accent");
  assert.ok(result.assignment.technique.id.length > 0);
  assert.equal(result.assignment.requiresColor, true);
  assert.equal(result.assignment.focalLength, 35);
});

test("prefers an eligible candidate that was not used recently", () => {
  const result = generateAssignment({
    scene: "city",
    film: { colorMode: "color", iso: 200, framesRemaining: 24 },
    lens: { focalLengths: [35] },
    shotBudget: 10,
    recentCandidateIds: ["red-accent"],
    seed: 1,
  });

  assert.equal(result.ok, true);
  if (!result.ok) return;

  assert.equal(result.assignment.theme.id, "negative-space");
});

test("reports why no assignment can be generated instead of inventing one", () => {
  const result = generateAssignment({
    scene: "forest",
    film: { colorMode: "monochrome", iso: 400, framesRemaining: 0 },
    lens: { focalLengths: [50] },
    shotBudget: 12,
    recentCandidateIds: [],
    seed: 9,
  });

  assert.equal(result.ok, false);
  if (result.ok) return;

  assert.deepEqual(result.reasons, ["film.framesRemaining must be positive"]);
});

test("does not confuse available film frames with the shoot budget", () => {
  const result = generateAssignment({
    scene: "city",
    film: { colorMode: "color", iso: 400, framesRemaining: 36 },
    lens: { focalLengths: [50] },
    shotBudget: 5,
    recentCandidateIds: [],
    seed: 4,
  });

  assert.equal(result.ok, true);
  if (!result.ok) return;

  assert.equal(result.assignment.maxShots, 5);
});

test("normalizes a finite fractional seed to a valid deterministic choice", () => {
  const result = generateAssignment({
    scene: "indoor",
    film: { colorMode: "monochrome", iso: 400, framesRemaining: 12 },
    lens: { focalLengths: [50] },
    shotBudget: 8,
    recentCandidateIds: [],
    seed: 0.5,
  });

  assert.equal(result.ok, true);
});
