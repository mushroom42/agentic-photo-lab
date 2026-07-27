# Agent Autonomy Policy

| Risk | Examples | Agent authority | Required gate |
|---|---|---|---|
| Low | Documentation, isolated test fixtures | May act | Typecheck/test where relevant |
| Medium | Domain implementation, refactor | May implement within declared paths | Tests plus human diff review |
| High | Public schema, dependency, migration | Propose first | Human approval before change |
| Critical | External write, release, destructive Git/data action | No autonomous action | Explicit human approval |

An Agent must stop when:

- sources of truth conflict;
- the task needs paths outside its allowed scope;
- required credentials or external authority are missing;
- a destructive action is not explicitly authorized;
- validation repeatedly fails without a supported diagnosis.
