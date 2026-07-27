# Domain Docs

This is a single-context repository.

## Before exploring

1. Read the root `CONTEXT.md`.
2. Read ADRs under `docs/adr/` relevant to the area being changed.
3. Use the vocabulary in `GLOSSARY.md`.

If a required file is absent, continue silently. Domain documentation is
created when a term or decision is actually resolved.

## Consumer rules

- Use glossary terms in issue titles, hypotheses, tests, and proposals.
- Do not silently invent synonyms for established concepts.
- If a needed concept is missing, reconsider whether it belongs in the domain
  or record it for a domain-modeling discussion.
- Explicitly flag any proposal that contradicts an accepted ADR.

## Layout

```text
/
├── CONTEXT.md
├── GLOSSARY.md
├── docs/
│   ├── agents/
│   └── adr/
└── src/
```
