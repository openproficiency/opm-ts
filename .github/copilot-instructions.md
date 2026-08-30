# Open Proficiency TypeScript

## Design

- Keep code simple and flat. Do not add an abstraction until more than one
  caller needs it.
- Prefer platform APIs and established packages over custom implementations.
- Keep the public API focused and intuitive.
- Let consumers import only what they need.
- Support ESM on Node.js 20+ and modern browsers.

## Model Boundary

- Treat the Open Proficiency Model `v0.1.0` schemas as the runtime source of
  truth.
- Use the tag and resolved commit recorded in `schemas/upstream.json`.
- Use camelCase properties and `Date` objects in default TypeScript types.
- Keep schema types, validation, and conversion private.
- Keep generated files machine-owned; change the schema or generator instead.

Model documentation is at https://github.com/openproficiency/model.

## Boundaries

Do not add I/O, cryptography, dependency resolution, domain algorithms,
authoring tools, or rendering.

## Publishing

Run `npm run check` and `npm pack --dry-run` before publishing.

Publish manually, never from a pull request. Verify the packed package in
`temp-typescript-app` before release.