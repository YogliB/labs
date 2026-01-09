---
id: task-016
title: Configure vitest with coverage thresholds and reporting
status: Done
assignee: []
created_date: '2026-01-09 20:31'
updated_date: '2026-01-09 20:56'
labels:
    - testing
    - infrastructure
    - vitest
dependencies: []
priority: high
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->

Set up vitest configuration with per-file coverage reporting for functions, branches, statements, and lines. Enable autoUpdate for snapshot testing. Configure coverage to track only relevant source files in src/ directory and exclude build artifacts and tests.

<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria

<!-- AC:BEGIN -->

- [ ] #1 vitest.config.ts created with coverage config
- [ ] #2 Coverage includes functions, branches, statements, lines per-file
- [ ] #3 Per-file coverage reports generated in coverage/
- [ ] #4 autoUpdate enabled for snapshots
- [ ] #5 Only relevant source files included in coverage (src/)
- [ ] #6 dist/, node_modules/, test files excluded
- [ ] #7 npm run test:coverage runs successfully
- [ ] #8 Coverage report readable in HTML format
  <!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->

1. Install vitest, @vitest/ui, and @vitest/coverage-v8 as devDependencies
2. Create vitest.config.ts in package root with:
    - test.environment: 'node'
    - coverage.provider: 'v8'
    - coverage.reporter: ['text', 'html', 'json', 'json-summary']
    - coverage.include: ['src/**/*.ts', 'src/**/*.tsx']
    - coverage.exclude: ['node_modules/', 'dist/', '**/*.test.ts', '**/*.spec.ts']
    - coverage.all: true
    - coverage.lines, functions, statements, branches thresholds (start at 70%)
    - snapshot.snapshotFormat with autoUpdate: true
3. Add scripts to package.json: test (vitest), test:ui (vitest --ui), test:coverage (vitest --coverage)
4. Create .nycrc or coverage config for per-file reporting
5. Verify HTML coverage report generated in coverage/ directory
 <!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->

Use @vitest/coverage-v8 provider for detailed coverage

Consider coverage thresholds per metric

HTML reports easier to review than text

autoUpdate helpful for development iterations

<!-- SECTION:NOTES:END -->
