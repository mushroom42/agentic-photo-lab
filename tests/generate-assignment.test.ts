import assert from "node:assert/strict";
import test from "node:test";

import { generateAssignment } from "../src/photography/generate-assignment.js";

test("generates an executable monochrome indoor assignment", () => {
  const result = generateAssignment({
    scene: "indoor",
    film: { colorMode: "monochrome", iso: 400, framesRemaining: 12 },
    lens: { focalLengths: [50] },
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
    recentCandidateIds: [],
    seed: 1,
  });

  assert.equal(result.ok, true);
  if (!result.ok) return;

  assert.equal(result.assignment.id, "red-accent");
  assert.equal(result.assignment.requiresColor, true);
  assert.equal(result.assignment.focalLength, 35);
});

test("prefers an eligible candidate that was not used recently", () => {
  const result = generateAssignment({
    scene: "city",
    film: { colorMode: "color", iso: 200, framesRemaining: 24 },
    lens: { focalLengths: [35] },
    recentCandidateIds: ["red-accent"],
    seed: 1,
  });

  assert.equal(result.ok, true);
  if (!result.ok) return;

  assert.equal(result.assignment.id, "negative-space");
});

test("reports why no assignment can be generated instead of inventing one", () => {
  const result = generateAssignment({
    scene: "forest",
    film: { colorMode: "monochrome", iso: 400, framesRemaining: 0 },
    lens: { focalLengths: [50] },
    recentCandidateIds: [],
    seed: 9,
  });

  assert.equal(result.ok, false);
  if (result.ok) return;

  assert.deepEqual(result.reasons, ["film.framesRemaining must be positive"]);
});
