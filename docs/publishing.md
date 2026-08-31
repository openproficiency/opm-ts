# Publishing

This is the maintainer runbook for releasing
[`@openproficiency/typescript`](https://www.npmjs.com/package/@openproficiency/typescript).
The release starts with a reviewed pull request and finishes when its merge to
`main` triggers the **Publish package** workflow. Do not run `npm publish`
locally or from a pull request.

## Before you start

- Make sure the release contains everything intended for the new version.
- Choose a version that has not already been published. The package version is
  independent of the Open Proficiency Model version.
- Make sure the peer `temp-typescript-app` is next to this repository:
  `../temp-typescript-app`.

## 1. Prepare the release

Set the exact new version. This updates both `package.json` and
`package-lock.json` without creating a Git tag:

```bash
npm version <version> --no-git-tag-version
```

Use [semantic versioning](https://docs.npmjs.com/about-semantic-versioning/)
to choose `<version>`. You can check the currently published version with:

```bash
npm view @openproficiency/typescript version
```

Run all checks and preview the files that npm will receive:

```bash
npm run check
npm pack --dry-run
```

Besides npm's package metadata, the package should contain only `dist/`,
`schemas/`, `LICENSE`, and `README.md`. Review the version and package contents
in the release pull request.

## 2. Test the exact package

Create the tarball in the peer app, install it, and run the consumer check:

```bash
npm pack --pack-destination ../temp-typescript-app
cd ../temp-typescript-app
npm install ./openproficiency-typescript-<version>.tgz
npm run check
```

Fix any consumer failure in this package, create a fresh tarball, and repeat
the check before merging.

## 3. Let the pull request validate

The **Validate package** workflow runs the package checks and an
`npm publish --dry-run`. It creates an installable prerelease tarball named:

```text
openproficiency-typescript-<version>-pr-<pull-request>-<commit>
```

The workflow's coverage comment reports the artifact name. To inspect or test
that artifact instead of a local tarball:

```bash
gh run download <run-id> --name <artifact-name> --dir ./pr-package
```

PR artifacts are retained for seven days. They are never published to npm.

## 4. Publish from `main`

Merge the release pull request. A push to `main` starts the
[**Publish package** workflow](../.github/workflows/publish-package.yml),
which:

1. installs the locked dependencies and runs the package checks
2. builds one `.tgz` artifact and retains it for one day
3. publishes that exact artifact to the public npm registry with provenance
4. creates a `v<version>` GitHub release with generated notes and the `.tgz`
   attached

The `publish` job uses the `production` GitHub environment and npm trusted
publishing. Its `id-token: write` permission supplies the short-lived OIDC
identity, so no long-lived npm token is stored in GitHub. Its `contents: write`
permission creates the GitHub release.

## 5. Confirm the release

Wait for the **Publish package** workflow to succeed, then confirm that npm
returns the new version:

```bash
npm view @openproficiency/typescript@<version> version
gh release view v<version>
```

The release is complete when npm prints `<version>` and the GitHub release is available.
