# Context Package: Add blue-hour rule

## Goal

Add one executable blue-hour exercise without making it eligible indoors.

## Current sources

- Spec: `docs/SPEC.md`
- ADR: `docs/adr/0001-controlled-baseline.md`
- Glossary: `GLOSSARY.md`
- Relevant code: `src/photography/generate-assignment.ts`
- Public seam test: `tests/generate-assignment.test.ts`

## Allowed paths

- `src/photography/`
- `tests/generate-assignment.test.ts`

## Non-goals

- No public input schema change
- No UI
- No prompt changes

## Acceptance evidence

- `npm run typecheck`
- `npm test`
- Test proves the exercise can appear for city inputs and cannot appear indoors.

## Stop conditions

- Existing sources conflict.
- Completion requires changing the public schema.
