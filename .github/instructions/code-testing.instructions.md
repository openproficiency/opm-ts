---
description: Instructions for TypeScript library tests
applyTo: "tests/**/*.ts"
---

# Test Instructions

## Layout

- Mirror the `src/` area structure under `tests/`. For example,
  `src/topic-list` maps to `tests/topic-list`.
- Name each test file after the primitive it covers, such as
  `topic-list.test.ts` or `dependencies.test.ts`.
- Do not add root-level tests or generic helper directories.

## Tools and Isolation

- Use `node:test` and `node:assert/strict`; do not add another test framework.
- Keep cases independent and deterministic. Do not use mocks or loops.
- Do not require network, filesystem, database, registry, or cryptographic
  access.

## Test Structure

- Name each `describe` after only the namespace-qualified public function
  exercised in Act, such as `ScoreInterpretation.parse`.
- Use separate `describe` blocks for different primary functions.
- Give each test four clearly labeled sections: Description, Arrange, Act, and
  Assert.
- Declare every input used during Act in Arrange.
- Split unrelated situations into separate tests.
- Use descriptive names when a test has several related values.
- Group related assertions.

## Test Data

- Keep tests self-contained and duplicate Arrange data by default.
- Add a local `fixtures.ts` only when inline data would make one Arrange
  section genuinely long.
- Never import fixtures across areas.
- Single-quote every key in unknown JSON or model-data candidates, including
  nested objects and arrays.
- Leave keys unquoted in typed camelCase domain objects.

## Coverage

- Use upstream model examples for valid data.
- Use focused invalid values for each schema boundary.
- Cover valid, invalid, and boundary values for every public primitive.
- Add compile-time checks when public type behavior is part of the contract.
