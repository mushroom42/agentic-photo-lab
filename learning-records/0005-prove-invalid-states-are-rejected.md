# 用负向证据证明非法状态无法表示

学习者使用 discriminated union 表达主体曝光状态，并主动构造“没有待曝光主体却声明环境光能照亮主体”的反例。TypeScript 以 TS2353 拒绝了该对象；删除反例后类型检查恢复通过，证明约束确实生效，而不仅是正向示例碰巧可以编译。

## Evidence

学习者提供了编译器指出 `ambientCanExposeSubject` 不属于 `hasSubjectNeedingExposure: false` 分支的错误，并确认清理临时反例后重新通过 typecheck。

## Implications

可以继续区分编译期不可表示的结构错误与需要运行时规则判断的领域冲突，并开始为决策函数设计正向和负向测试。
