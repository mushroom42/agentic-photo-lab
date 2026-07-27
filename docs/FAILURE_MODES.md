# Failure Mode Registry

## FM-001: Prompt-only hard constraint

- Symptom: An Agent-generated assignment violates a photography constraint.
- Cause: The constraint existed only in natural language.
- Detection: Public seam or property test rejects the assignment.
- Guardrail: Enforce every hard constraint in deterministic code.

## FM-002: Stale context

- Symptom: A change follows an obsolete schema or decision.
- Cause: The context package referenced an old source.
- Detection: Diff conflicts with current spec or ADR.
- Guardrail: Include paths and revision identifiers in every context package.

## FM-003: Tautological test

- Symptom: Tests pass while behavior is wrong.
- Cause: Expected results repeat the implementation algorithm.
- Detection: Mutation or worked-example review shows the test cannot disagree.
- Guardrail: Use literals and examples derived from the spec.

## FM-004: Scope drift

- Symptom: The Agent modifies unrelated files while completing a small task.
- Cause: Allowed paths or non-goals were absent.
- Detection: Compare changed paths with the task contract.
- Guardrail: Evaluate every run for scope violations.

## FM-005: Source/runtime resolution mismatch

- Symptom: TypeScript compiles, but direct test execution cannot resolve NodeNext `.js` imports to `.ts` sources.
- Cause: The source runner and production module resolver follow different rules.
- Detection: The first public test fails before reaching assertions with `ERR_MODULE_NOT_FOUND`.
- Guardrail: Compile before executing tests so validation uses production module resolution.

## Recording template

```yaml
id:
task:
symptom:
category:
cause:
detection:
fix:
prevention:
```
