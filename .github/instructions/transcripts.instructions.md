---
description: Instructions for transcript wire types and validation
applyTo: "src/generated/**/*.ts,src/validation.ts"
---

# Transcript Instructions

Implement only the transcript foundation described in `PLAN.md`.

- Generate `TranscriptEntry`, `Transcript`, and
  `TranscriptEntryVerification` directly from the vendored Open Proficiency
  Model `v0.1.0` schemas. Never edit generated types by hand.
- Accept `unknown` at validation boundaries.
- Provide a non-throwing validator, a narrowing type guard, and an assertion
  helper for each schema-defined document.
- Return package-owned, structured validation details with useful instance
  paths and schema keywords. Assertion errors must carry the same details.
- Compile validators as standalone ESM so importing the package adds no runtime
  dependency and works in Node.js 20+ and modern browsers.

Validation establishes schema conformance only. Do not parse text, sign or
verify entries, perform revocation checks, apply expiry/current-score policy,
propagate scores, or perform I/O.
