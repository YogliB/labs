---
id: task-026
title: Implement CLI integration tests
status: To Do
assignee: []
created_date: '2026-01-10 22:35'
updated_date: '2026-01-10 22:38'
labels:
    - testing
    - phase-6
    - cli
    - integration
    - high-priority
dependencies: []
priority: high
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->

Create integration tests for the CLI flow to test orchestration of git parser, narrative engine, game state, and UI. Currently cli.test.ts exists but shows 0% coverage.

<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria

<!-- AC:BEGIN -->

- [ ] #1 CLI integration tests exist in cli/**tests**/cli.test.ts
- [ ] #2 All CLI flags are tested (--branch, --start, --model, --reset, --no-cache, --help)
- [ ] #3 Module orchestration flow is fully tested with mocked dependencies
- [ ] #4 Error scenarios are covered (invalid repo, missing git, permissions)
- [ ] #5 Test coverage for cli/index.tsx shows improvement from 0%
- [ ] #6 At least 8-12 integration test cases implemented
- [ ] #7 All tests pass successfully
  <!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->

1. Review cli.test.ts and identify why coverage shows 0%
2. Mock all dependencies: git parser, narrative engine, game state manager
3. Mock Ink rendering to avoid actual terminal output
4. Test argument parsing for all CLI flags (--branch, --start, --model, --reset, --no-cache)
5. Test main orchestration flow: parse args → validate repo → load state → parse git → init engine → start UI
6. Test error scenarios: invalid repo path, not a git repo, missing permissions
7. Test flag combinations and default values
8. Verify help output and error messages are user-friendly
9. Aim for 8-12 integration test cases covering all critical paths
 <!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->

This is spec task-023 from doc-005 Phase 6. Currently cli.test.ts exists but shows 0% coverage, suggesting tests may be incomplete or not running properly. Focus on integration testing rather than unit testing - verify the CLI correctly orchestrates all modules together.

<!-- SECTION:NOTES:END -->
