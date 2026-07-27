# Issue tracker: Local Markdown

This repository stores issues and specs (also called PRDs) as Markdown files in
`.scratch/`.

## Conventions

- One directory per feature: `.scratch/<feature-slug>/`
- Feature spec: `.scratch/<feature-slug>/spec.md`
- One implementation ticket per file:
  `.scratch/<feature-slug>/issues/<NN>-<slug>.md`
- Ticket numbering starts at `01`; never combine all tickets into one file.
- Triage state is a `Status:` line near the top of each issue.
- Comments and conversation history are appended under `## Comments`.

## Skill operations

When a skill says "publish to the issue tracker", create the appropriate file
under `.scratch/<feature-slug>/`.

When a skill says "fetch the relevant ticket", read the referenced issue file.
The user will normally provide its path or number.
