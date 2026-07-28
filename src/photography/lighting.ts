export type PrimaryAmbientLightRole =
  | "as-subject"          // 拍摄光源本身，例如霓虹招牌
  | "illuminate-subject"  // 用环境光照亮人物或物体
  | "set-atmosphere";     // 用环境光营造背景氛围

export type LightingPracticeGoal =
  | "observe-ambient-light"
  | "practice-added-light"
  | "unrestricted";

export type AddedLightPolicy =
  | "avoid"     // 这次练习要求只利用现场光
  | "optional"  // 使用或不使用都可以
  | "required" // added light 是完成练习的必要条件
  | "invalid"

export type ForegroundExposureIntent =
  | "detail"
  | "silhouette";


export type SubjectExposure =
  | {
    hasForegroundSubjectNeedingExposure: false;
  }
  | {
    hasForegroundSubjectNeedingExposure: true;
    ambientCanExposeForegroundSubject: boolean;
    exposureIntent: ForegroundExposureIntent;
  };

interface LightingContextBase {
  ambientRole: PrimaryAmbientLightRole;
  practiceGoal: LightingPracticeGoal;
}

export type LightingContext = LightingContextBase & SubjectExposure;

export type LightingDecision =
  | { ok: true; policy: AddedLightPolicy }
  | { ok: false; reasons: string[] };

export function decideAddedLight(
  context: LightingContext,
): LightingDecision {
  if (context.practiceGoal === "practice-added-light") {
    return {
      ok: true,
      policy: "required",
    };
  }
  else if (context.practiceGoal === "unrestricted" && context.hasForegroundSubjectNeedingExposure === true && context.ambientCanExposeForegroundSubject === false && context.exposureIntent === "detail") {
    return {
      ok: true,
      policy: "required",
    }
  }

  return {
    ok: true,
    policy: "avoid",
  };
}