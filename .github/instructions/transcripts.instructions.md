---
description: Instructions for transcript primitives and canonical scores
applyTo: "src/transcript/**/*.ts,src/transcript-entry/**/*.ts"
---

# Transcript Instructions

## Scope

Maintain schema-backed `Transcript`, `TranscriptEntry`, and
`TranscriptEntryVerification` primitives with pure score helpers.

## Model Types

- Generate `TranscriptEntry`, `Transcript`, and
  `TranscriptEntryVerification` directly from the vendored Open Proficiency
  Model `v0.1.0` schemas. Never edit generated types by hand.
- Keep generated forms private. Default transcript types use camelCase and
  `Date` for date-time values.

## Scores

- Keep the public `Score` union and one immutable score tuple in schema order:
  `unaware`, `aware`, `familiar`, `competent`, `fluent`.
- Export only the tuple, guard, index, label, and comparison primitives.
- Preserve Open Proficiency Model terminology.
- Keep score helpers deterministic, side-effect free, platform-neutral, and
  free of runtime dependencies.
- Handle untrusted input through the score guard or an explicit structured
  failure; do not accept arbitrary strings as scores.

## Boundaries

Do not parse text, calculate or propagate scores, evaluate interpretations,
select current transcript scores, add expiry or score policy, sign or verify
entries, perform revocation checks, or perform I/O.
