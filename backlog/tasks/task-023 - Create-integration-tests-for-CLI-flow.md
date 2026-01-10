---
id: task-023
title: Create integration tests for CLI flow
status: Done
assignee: []
created_date: '2026-01-09 20:32'
updated_date: '2026-01-10 22:30'
labels:
    - testing
    - cli
    - integration-tests
dependencies:
    - task-012
priority: low
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->

Create integration tests for src/cli/index.ts that validate the complete CLI flow: argument parsing, orchestration of core modules, flag handling, and error scenarios. Tests should use mocked modules to avoid actual git/model operations.

<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria

<!-- AC:BEGIN -->

- [ ] #1 Integration tests created for end-to-end CLI flow
- [ ] #2 Tests validate CLI argument parsing via meow
- [ ] #3 Tests validate orchestration of git parsing → narrative engine → game state
- [ ] #4 Tests validate --reset flag behavior
- [ ] #5 Tests validate --model flag behavior
- [ ] #6 Tests validate --no-cache flag behavior
- [ ] #7 Tests verify error handling for invalid repos
- [ ] #8 Integration test suite runs in test environment without actual LLM calls
  <!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->

1. Create src/cli/index.test.ts for integration tests
2. Set up test environment: mock git parser, narrative engine, game state manager
3. Write integration tests for main CLI flow:
    - Parse arguments correctly with meow
    - Validate repo path defaults to cwd()
    - Load or create game state before running
    - Parse git repository successfully
    - Initialize narrative engine
    - Start game loop (Ink UI)
4. Test flag combinations:
    - --branch flag filters to specific branch
    - --start flag begins from specific commit
    - --model flag selects different model
    - --reset flag clears state and cache
    - --no-cache flag bypasses cache
5. Test error scenarios:
    - Invalid repo path error message
    - Not a git repository error
    - Missing permissions error
    - Network/model loading errors
6. Test help output:
    - --help displays usage information
    - Usage includes all flags and examples
7. Validate end-to-end flow works with mocked modules
 <!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->

Mock git parser, narrative engine, game state, and Ink rendering

Test flag combinations and interactions

Validate CLI help output

Test error messages are user-friendly

<!-- SECTION:NOTES:END -->
