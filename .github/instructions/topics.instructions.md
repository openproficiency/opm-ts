---
description: Instructions for topic document and reference primitives
applyTo: "src/documents.ts,src/references.ts"
---

# Topic Instructions

Implement only the topic foundation described in `PLAN.md`.

- Treat the vendored Open Proficiency Model `v0.1.0` schemas as the runtime
  contract. Do not strengthen or reinterpret them from prose.
- Keep generated `Topic` and `TopicList` wire types as literal schema
  projections; never edit generated types by hand.
- Parse and format only schema-supported qualified topic-list and topic
  references. Return structured failures for malformed input.
- Reference helpers are syntax-only. Do not fetch, resolve, or verify referenced
  documents.
- Enumerate topic maps immutably. Expose each map key as a separate derived ID
  without inserting it into or otherwise changing the wire object.

Do not add YAML/JSON text parsing, authoring or mutation APIs, dependency
resolution, topic hierarchy algorithms, score propagation, signing, or I/O.
