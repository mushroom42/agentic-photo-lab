# 构建第一份可评估的 Coding Agent 任务 Prompt

学习者将一句模糊的“完善函数并处理 invalid”请求，迭代成包含 Task、Outcome、Relevant context、Constraints 与 Verification 的版本化 Prompt。最终版本用精确字段值定义两个无效输入，声明失败返回、修改范围、公共类型约束和验证命令，并保留内部实现方式作为 Agent 的自主空间。

## Evidence

`prompts/lighting-invalid-context.v1.md` 保存了经三轮审查确认的实验输入；迭代过程中，学习者修正了具体样例与抽象要求冲突、任务信息误放 Context、验证要求混杂以及局部修改造成 requirement regression 等问题。

## Implications

可以从固定 commit 使用该 Prompt 运行第一轮隔离 Agent 实验，并用原始 diff、验证结果和人工返工记录检验“精确任务契约能否降低猜测与越界修改”的假设。
