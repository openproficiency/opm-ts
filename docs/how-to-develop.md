# How to develop

## Develop

Install the exact dependency versions from the lockfile:

```bash
npm ci
```

Run the complete local check:

```bash
npm run check
```

This checks generated types, type-checks the package and tests, runs the test
suite, and builds `dist/`.

Run one step while iterating:

```bash
npm run typecheck
npm test
npm run build
```

## Run unit tests

Run the unit test suite:

```bash
npm test
```

Run the tests and print the coverage report in the terminal:

```bash
npx tsx --test --experimental-test-coverage tests/**/*.test.ts
```

The workflow uses `npm run test:coverage` instead, which writes the report to
`lcov.info` for automated reporting.

## Generated types

Files named `src/**/*.schema.ts` are generated from the vendored schemas. Do
not edit them directly.

Regenerate them after an intentional schema change:

```bash
npm run generate-types
```

Check that generated files are current without changing them:

```bash
npm run check:generated-types
```

## Update the model schemas

This package keeps a local copy of the JSON Schemas from
[`openproficiency/model`](https://github.com/openproficiency/model). Each copy
is tied to a model release and commit so consumers always validate against a
known version.

Schema updates are uncommon, so they are intentionally reviewed and applied
by hand instead of through an update script.

### Choose the model release

Start with a released tag from `openproficiency/model` and resolve it to its
exact commit SHA. Use that commit, rather than a branch, for the rest of the
update so the source cannot change underneath you.

### Replace the schemas

Download all seven schema files from that commit and replace the matching
files in `schemas/`:

- `topic.schema.json`
- `topic-list.schema.json`
- `score-interpretation.schema.json`
- `score-interpretation-list.schema.json`
- `transcript-entry.schema.json`
- `transcript.schema.json`
- `transcript-entry-verification.schema.json`

Keep these files byte-for-byte identical to upstream. If a schema needs a
correction, make it in `openproficiency/model` first instead of editing the
vendored copy.

### Record where they came from

Update `schemas/upstream.json` with:

- the release `tag`
- the resolved `commit`
- the current UTC `retrievedAt` timestamp
- a new SHA-256 hash for every schema file

Then update `OPEN_PROFICIENCY_MODEL_VERSION` and
`OPEN_PROFICIENCY_MODEL_COMMIT` in `src/model/version.ts` to match.

### Regenerate and adapt

Generate the private TypeScript schema types:

```bash
npm run generate-types
```

Review the generated `src/**/*.schema.ts` diff before changing the public
domain types, conversion code, fixtures, or tests needed for the new model
shape. Do not expose the generated schema types as public API.

If the model documentation and schemas disagree, record the discrepancy and
fix it upstream rather than silently choosing an interpretation here.

### Check the result

Run the complete package checks:

```bash
npm run check
```

If the change is ready for release, continue with the
[publishing runbook](publishing.md). It covers versioning, package inspection,
PR artifacts, peer-app verification, and publication.
