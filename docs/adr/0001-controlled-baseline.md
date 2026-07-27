# ADR 0001: Start with a deterministic controlled baseline

## Status

Accepted

## Decision

The initial system will not call a live LLM. Photography generation and agent evaluation will be deterministic TypeScript modules.

## Rationale

Before comparing prompts, context packages, skills, or models, the project needs a stable oracle. Live model behavior would make failures difficult to attribute.

## Consequences

- The first benchmark measures recorded Agent runs rather than orchestrating them.
- Model adapters can be added later behind a separate seam.
- Hard photography constraints remain testable without network access.
