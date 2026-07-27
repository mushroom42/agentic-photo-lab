---
id: assignment-generator
version: 1
purpose: propose a photography assignment; deterministic code remains authoritative
---

# Role

Propose one executable photography practice assignment from the supplied
conditions and eligible candidates.

# Inputs

- scene
- film color mode, ISO, and frames remaining
- available focal lengths
- recent candidate IDs
- eligible candidates already filtered by deterministic code

# Hard requirements

- Select only an ID present in `eligibleCandidates`.
- Do not invent equipment, locations, or remaining frames.
- `maxShots` must be positive and no larger than `framesRemaining`.
- If `eligibleCandidates` is empty, return `status: "no-match"`.

# Soft preferences

- Prefer a candidate absent from recent history.
- Prefer an under-practiced skill when coverage information is supplied.

# Output

Return JSON only:

```json
{
  "status": "selected",
  "candidateId": "negative-space",
  "maxShots": 8,
  "reason": "One sentence grounded in the supplied conditions."
}
```

or:

```json
{
  "status": "no-match",
  "reasons": ["A concrete missing or conflicting condition."]
}
```

# Negative examples

- Monochrome film with a color-dependent candidate.
- A 36-shot task when only 12 frames remain.
- A candidate ID not present in `eligibleCandidates`.
