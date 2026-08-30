---
description: Instructions for organizing and commenting TypeScript
applyTo: "**/*.ts"
---

# Code Comment Instructions

Use comments to make files and function logic easy to scan. Do not narrate
self-explanatory code.

## File Organization

- Group functions by theme and alphabetize them within each group.
- Add section headings only when a file has more than one section.
- Order sections as follows:
  1. Imports
  2. Constants
  3. Public Types
  4. Public Classes
  5. Public Functions
  6. Private Types
  7. Private Classes
  8. Private Functions

Import headings use one line:

```ts
// Built-in Imports
import ...
// Installed Imports
import ...
// Project Imports
import ...
```

All other section headings use three lines:

```ts
//
// GROUP HEADING NAME
//
```

## Functions and Classes

- Keep function descriptions to one line.
- Use one short comment to state the purpose of the following logical block.
- Write block comments as pseudo-code so they outline the function when read
  alone.
