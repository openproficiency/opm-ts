---
description: Instructions for topic and topic-list primitives
applyTo: "src/topic/**/*.ts,src/topic-list/**/*.ts"
---

# Topic Instructions

## Scope

Maintain schema-backed `Topic` and `TopicList` primitives, dependency syntax
helpers, and immutable map enumeration.

## Model Types

- Treat the vendored Open Proficiency Model `v0.1.0` schemas as the runtime
  contract. Do not strengthen or reinterpret them from prose.
- Keep generated schema types private. Default `Topic` and `TopicList` types
  use camelCase and `Date` for `issuedAt`.

## Dependencies

- Parse and format only schema-supported topic-list dependencies and
  dependency-topic identifiers. Use `semver` for versions and return `null`
  for malformed input.
- Keep dependency helpers syntax-only.

## Topic Maps

- Enumerate topic maps immutably. Expose each map key as a separate derived ID
  without changing the domain object.
- Keep topic identifiers and topic-map keys unchanged; they are data, not
  property names.

## Boundaries

Do not fetch, resolve, or verify dependency documents. Do not add YAML or JSON
text parsing, authoring or mutation APIs, topic hierarchy algorithms, score
propagation, signing, or I/O.
