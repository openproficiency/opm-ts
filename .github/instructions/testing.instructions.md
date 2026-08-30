---
description: Instructions for TypeScript library tests
applyTo: "tests/**/*.ts"
---

# Test Instructions

- Use `node:test` and `node:assert/strict`; do not add another test framework.
- Keep cases independent and deterministic. Do not use mocks or loops.
- Give each test four clearly labeled sections: Description, Arrange, Act, and
  Assert.
- Declare every input used during Act in Arrange.
- Split unrelated situations into separate tests and use descriptive variable
  names when a test needs several related cases.
- Group related assertions.

Use upstream model examples for valid fixtures and focused invalid fixtures for
each schema boundary. Cover every public primitive with valid, invalid, and
boundary values. Add compile-time fixtures where public type behavior is part
of the contract.

Tests must remain platform-neutral and must not require network, filesystem,
database, registry, or cryptographic access.
