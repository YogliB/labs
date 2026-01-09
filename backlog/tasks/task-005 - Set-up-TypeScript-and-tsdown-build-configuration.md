---
id: task-005
title: Set up TypeScript and tsdown build configuration
status: Done
assignee: []
created_date: '2026-01-09 20:15'
updated_date: '2026-01-09 20:53'
labels:
    - infrastructure
    - build
dependencies:
    - task-003
priority: high
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->

Configure TypeScript compiler options and tsdown bundler for ESM output, proper type generation, and CLI executable. Ensure the build produces a single optimized bundle with type definitions and correct bin configuration for npm.

<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria

<!-- AC:BEGIN -->

- [ ] #1 tsconfig.json configured with strict mode and modern ES target
- [ ] #2 tsdown.config.ts builds to single ESM bundle
- [ ] #3 Build output includes dist/cli.js with correct shebang
- [ ] #4 Type definitions generated in dist/
- [ ] #5 npm run build succeeds without errors
- [ ] #6 Built CLI is executable via node dist/cli.js
  <!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->

1. Create tsconfig.json in package root with: target ES2022, module ESNext, moduleResolution bundler, strict true, esModuleInterop true, skipLibCheck true, outDir dist, declaration true
2. Create tsdown.config.ts with: entry src/cli/index.ts, format esm, outDir dist, target node18, shims true (for **dirname, **filename), banner #!/usr/bin/env node
3. Add scripts to package.json: build (tsdown), dev (tsdown --watch), typecheck (tsc --noEmit)
4. Ensure dist/cli.js is executable and has shebang
 <!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->

tsdown handles bundling, tree-shaking, and minification

Ensure proper Node.js shims for ESM compatibility

May need to configure externals for native modules

<!-- SECTION:NOTES:END -->
