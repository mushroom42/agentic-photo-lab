import assert from "node:assert/strict";
import test from "node:test";

import { decideAddedLight } from "../src/photography/lighting.js";

test("avoids added light when observing ambient light as the subject", () => {
    const result = decideAddedLight({
        ambientRole: "as-subject",
        practiceGoal: "observe-ambient-light",
        hasForegroundSubjectNeedingExposure: false,
    });

    assert.deepEqual(result, {
        ok: true,
        policy: "avoid",
    });
});

test("requires added light when the exercise practices added lighting", () => {
  const result = decideAddedLight({
    ambientRole: "illuminate-subject",
    practiceGoal: "practice-added-light",
    hasForegroundSubjectNeedingExposure: true,
    ambientCanExposeForegroundSubject: true,
    exposureIntent: "detail",
  });

  assert.deepEqual(result, {
    ok: true,
    policy: "required",
  });
});

test("requires added light when ambient light cannot expose a detailed foreground subject ", () => {
  const result = decideAddedLight({
    ambientRole: "illuminate-subject",
    practiceGoal: "unrestricted",
    hasForegroundSubjectNeedingExposure: true,
    ambientCanExposeForegroundSubject: false,
    exposureIntent: "detail",
  });

  assert.deepEqual(result, {
    ok: true,
    policy: "required",
  });
});