---
description: Instructions for private schema conversion
applyTo: "src/**/conversion.ts"
---

# Schema Conversion Instructions

## Representations

- Default public types use camelCase properties and JavaScript `Date` objects.
- Generated schema types preserve kebab-case properties and ISO date-time
  strings but remain private to the package.

## Conversion

- Keep schema conversion functions private to their model area.
- Expose only namespaced domain `parse` and `serialize` functions.
- Preserve dynamic map keys, topic references, requirement operators, and
  signature hashes exactly.
- Let invalid `Date` objects fail through `Date#toISOString`; never substitute
  a value.
- Keep conversion deterministic and synchronous.
- Do not add I/O or model policy.
