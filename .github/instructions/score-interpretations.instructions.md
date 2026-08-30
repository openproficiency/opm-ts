---
description: Instructions for score interpretation and list primitives
applyTo: "src/score-interpretation/**/*.ts,src/score-interpretation-list/**/*.ts"
---

# Score Interpretation Instructions

## Scope

Maintain schema-backed `ScoreInterpretation` and
`ScoreInterpretationList` primitives and immutable map enumeration.

## Model Types

- Treat the vendored Open Proficiency Model `v0.1.0` schemas as the runtime
  contract. Do not strengthen or reinterpret them from prose.
- Keep generated schema types private. Default `ScoreInterpretationList` uses
  camelCase and `Date` for `issuedAt`.

## Interpretation Maps

- Enumerate score interpretation maps immutably. Expose each map key as a
  separate derived ID without changing the domain object.
- Preserve requirement expressions exactly as represented by model data.
- Do not camel-case interpretation IDs, topic references, or requirement
  operator keys; they are model data.

## Boundaries

Do not evaluate `all`, `any`, or `at-least-N` requirements, resolve
dependencies, parse YAML/JSON text, provide authoring APIs, or add score policy.
