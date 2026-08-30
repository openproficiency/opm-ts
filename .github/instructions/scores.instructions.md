---
description: Instructions for canonical score primitives
applyTo: "src/scores.ts"
---

# Score Instructions

Implement only the pure score primitives described in `PLAN.md`.

- Derive the public `Score` union from the generated transcript-entry wire type;
  do not maintain a second handwritten union.
- Keep one canonical, immutable score tuple in schema order:
  `unaware`, `aware`, `familiar`, `competent`, `fluent`.
- Export only the planned tuple, guard, index, label, and comparison primitives.
- Preserve Open Proficiency Model terminology.
- Keep all helpers deterministic, side-effect free, platform-neutral, and free
  of runtime dependencies.
- Handle untrusted input through the score guard or an explicit structured
  failure; do not accept arbitrary strings as scores.

Do not calculate scores from evidence, propagate topic scores, evaluate
interpretations, select current transcript scores, or add policy. Those belong
to future domain-algorithms work.
