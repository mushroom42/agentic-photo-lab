# 区分编译通过与公共 API 正确

学习者已经修正了只导出接口、未导出其关联类型的问题，并通过构建生成的声明内容确认 `PrimaryAmbientLightRole`、`LightingPracticeGoal`、`AddedLightPolicy` 与 `LightingContext` 都属于模块公共 API。这建立了“工具通过不等于需求完成，应检查与需求对应的产物证据”的认识。

## Evidence

学习者在收到公共 API 缺失反馈后补充类型导出，并提供了生成声明中四个导出声明的内容。
