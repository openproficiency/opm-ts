# Publish the package

Automated, trusted npm publishing (OIDC trusted publishing + provenance from
protected GitHub Releases) is deferred until after `0.1.0`. Until then,
releases are published manually by a maintainer.

## Procedure

1. Run `npm run check` and `npm pack --dry-run` locally; confirm the tarball
   only contains `dist/`, `schemas/`, `LICENSE`, and `README.md`.
2. Publish to the public registry:
   ```sh
   npm publish
   ```
   `0.0.1` is already published. `0.0.2` (the current domain-only
   `parse*`/`serialize*` API refinement) is the next manual patch candidate —
   it has not been published yet.
3. In the peer `temp-typescript-app`, install the published version and run
   its consumer check against the real package (not a local link) to
   exercise domain types, `parse*`/`serialize*` functions, schema exports, and
   helpers.
4. If a defect is found, fix it in this package and publish a new `0.0.x`
   patch release. Repeat step 3 until the peer app passes cleanly against a
   published version.
5. Once proven, publish the same code as `0.1.0` and merge it to `main`.

## Rules

- Never publish from a pull request or CI workflow — only a maintainer
  publishes, from a local checkout of the reviewed commit.
- Do not skip the peer-consumer check (step 3) between `0.0.x` releases.
- After `0.1.0` ships, trusted publishing and provenance can be configured;
  do not add that workflow before the bootstrap process above has proven the
  package.
