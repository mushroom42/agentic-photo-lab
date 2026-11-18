# 理解独立 Oracle 与独立运行

学习者已经能够说明 Agent 无权自行定义任务完成，只有独立 Oracle 验证后的结果才可接受；也能够区分 harness 启动的两个隔离试验与 Agent 内部生成的从属 subagent。

## Evidence

学习者指出完成权属于 Oracle，并用“独立关系”与“从属关系”解释顶层实验编排和 subagent 的区别。

## Implications

可以进一步学习把 harness 设计成确定性的控制平面，让一个或多个概率性 Agent 在其中工作，而不是用更多 Agent 代替权限控制、状态重置和结果验证。
