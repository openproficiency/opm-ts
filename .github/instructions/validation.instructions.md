---
description: Instructions for schema snapshots, generated types, and validation
applyTo: "schemas/**/*.json,scripts/generate-types-from-schemas.mjs,src/**/*.schema.ts,src/model/schema-registry.ts"
---

# Validation Instructions

## Schema Snapshot

- Treat the vendored Open Proficiency Model schemas as authoritative.
- Preserve vendored schema files byte-for-byte and record their hashes in
  `schemas/upstream.json`.
- Never fetch a moving branch during build, test, or publication.
- Keep generation-only `$ref` normalization out of vendored schemas.

## Generation and Validation

- Generate schema types with `json-schema-to-typescript`; never edit them by
  hand.
- Use one Ajv 2020 instance with `ajv-formats`.
- Keep validators private and expose namespaced domain `parse` functions.
- Limit validation to model-schema conformance.

## Boundaries

- Convert between schema and domain objects through each area's private
  `conversion.ts`.
- Do not add model policy, resolution, signing, verification, or I/O.
