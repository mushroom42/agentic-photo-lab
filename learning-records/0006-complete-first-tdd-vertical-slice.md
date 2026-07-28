# 完成第一个 TDD 纵向切片

学习者围绕已确认的公共 seam `decideAddedLight(context)`，先运行了一个因接口尚不存在而失败的行为测试，再加入只满足当前行为的最小实现。新增测试与原有十二条回归测试共同通过，完成了一个可观察的 red → green 循环。

## Evidence

`npm test` 报告共 13 条测试全部通过，其中包含“观察作为主体的环境光时避免 added light”的新行为。

## Implications

可以继续以单条 tracer-bullet 测试推进决策表，并用下一条行为测试逐步击穿当前硬编码实现，而不是一次性实现未经测试约束的完整规则。
