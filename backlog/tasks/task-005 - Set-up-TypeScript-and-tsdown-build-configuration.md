---
id: task-005
title: Set up TypeScript and tsdown build configuration
status: To Do
assignee: []
created_date: '2026-01-09 20:15'
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
