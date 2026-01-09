---
id: task-022
title: Create unit tests for config paths module
status: To Do
assignee: []
created_date: '2026-01-09 20:32'
updated_date: '2026-01-09 20:32'
labels:
    - testing
    - infrastructure
    - unit-tests
dependencies:
    - task-011
priority: medium
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->

Create comprehensive unit tests for src/config/paths.ts. Tests should validate XDG-compliant cache directory resolution, platform-specific path handling, directory creation, and environment variable parsing.

<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria

<!-- AC:BEGIN -->

- [ ] #1 Unit tests created for src/config/paths.ts
- [ ] #2 Tests validate XDG-compliant cache directory resolution
- [ ] #3 Tests validate modelsDir, cacheDir, stateDir path generation
- [ ] #4 Tests handle platform-specific paths (Windows, macOS, Linux)
- [ ] #5 Tests verify directories are created on first access
- [ ] #6 Tests handle missing/invalid XDG environment variables
- [ ] #7 Tests validate path separators for each platform
- [ ] #8 Coverage for paths.ts at 80%+ (lines, functions, branches, statements)
  <!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->

1. Create src/config/paths.test.ts
2. Mock process.env and fs using vitest.mock()
3. Write tests for path resolution:
    - XDG_CACHE_HOME when set: use ~/.cache/git-gaiden
    - XDG_CACHE_HOME unset: fallback to ~/.cache or platform default
    - Windows fallback: %APPDATA%/git-gaiden
    - macOS: ~/Library/Caches/git-gaiden
4. Write tests for path exports:
    - modelsDir path correct for each platform
    - cacheDir path correct for each platform
    - stateDir path correct for each platform
5. Test directory creation:
    - ensureDir creates directories if missing
    - ensureDir is idempotent (safe to call multiple times)
    - Handles permission errors gracefully
6. Test environment handling:
    - Respects XDG_CACHE_HOME when set
    - Falls back correctly when unset
    - Handles empty XDG_CACHE_HOME as unset
7. Test edge cases:
    - Paths with spaces or special characters
    - Very long paths
    - Relative vs absolute path handling
      <!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->

Mock process.env for environment variables

Test both XDG and fallback paths

Validate path separator handling per OS

Test directory creation is idempotent

<!-- SECTION:NOTES:END -->
