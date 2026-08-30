---
description: Instructions for score interpretation document primitives
applyTo: "src/documents.ts"
---

# Score Interpretation Instructions

Implement only the score interpretation foundation described in `PLAN.md`.

- Treat the vendored Open Proficiency Model `v0.1.0` schemas as the runtime
  contract. Do not strengthen or reinterpret them from prose.
- Keep generated `ScoreInterpretation` and `ScoreInterpretationList` wire types
  as literal schema projections; never edit generated types by hand.
- Enumerate score interpretation maps immutably. Expose each map key as a
  separate derived ID without inserting it into or otherwise changing the wire
  object.
- Preserve requirement expressions exactly as represented by the validated wire
  document.

Do not evaluate `all`, `any`, or `at-least-N` requirements, resolve
dependencies, parse YAML/JSON text, provide authoring APIs, or add score policy.
Interpretation evaluation belongs to the future domain-algorithms work.
