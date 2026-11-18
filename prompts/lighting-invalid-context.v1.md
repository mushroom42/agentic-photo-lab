---
id: lighting-invalid-context
version: 1
purpose: reject two contradictory lighting contexts through the public decision seam
hypothesis: a compact task contract with exact inputs, scope, and verification will reduce requirement guessing and scope drift
baselineCommit: 2e2a699
---

# Task

更新 `decideAddedLight`，实现以下两种无效 Context：

- `illuminate-subject` 却没有需要照亮的前景主体；
- 目标是观察环境光、要求主体呈现细节，但环境光无法照亮主体。

## Outcome

输入一：

- `ambientRole = "illuminate-subject"`
- `practiceGoal = "unrestricted"`
- `hasForegroundSubjectNeedingExposure = false`

输入二：

- `ambientRole = "illuminate-subject"`
- `practiceGoal = "observe-ambient-light"`
- `hasForegroundSubjectNeedingExposure = true`
- `ambientCanExposeForegroundSubject = false`
- `exposureIntent = "detail"`

对于以上两种 Context，`decideAddedLight` 必须返回
`{ ok: false, reasons }`，其中 `reasons` 至少包含一个非空字符串。

## Relevant context

- `LightingDecision` 是公共返回类型。
- 当前同时存在 `"invalid"` 成功政策和失败返回结构。

## Constraints

- 只允许修改 `src/photography/lighting.ts` 和
  `tests/lighting.test.ts`。
- 无效 Context 必须返回失败原因，不能伪装成成功政策。
- 从 `AddedLightPolicy` 中删除 `"invalid"`。
- 除上述删除外，其他公开类型和已有行为保持不变。

## Verification

- 为每一种 invalid Context 添加一条通过 `decideAddedLight` 公共接口验证行为的测试。
- 运行 `npm run typecheck`。
- 运行 `npm test`。
- 原有测试和新增测试必须全部通过。
