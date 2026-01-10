---
id: task-017
title: Create unit tests for git parser module
status: Done
assignee: []
created_date: '2026-01-09 20:31'
updated_date: '2026-01-10 22:29'
labels:
  - testing
  - git
  - unit-tests
dependencies:
  - task-006
priority: high
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Create comprehensive unit tests for src/git/parser.ts module. Tests should validate parsing logic, helper functions (detectMerges, detectReverts, buildBranchGraph), CommitGraph output, and edge cases. Mock simple-git to avoid actual repository access during tests.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Unit tests created for src/git/parser.ts
- [ ] #2 Tests cover parseRepository main function
- [ ] #3 Tests cover detectMerges, detectReverts, buildBranchGraph helpers
- [ ] #4 Tests validate CommitGraph output structure
- [ ] #5 Tests handle edge cases (empty repo, single commit, multiple branches)
- [ ] #6 Tests mock simple-git to avoid actual git calls
- [ ] #7 Coverage for parser.ts at 80%+ (lines, functions, branches, statements)
- [ ] #8 Tests use descriptive names and organized in describe blocks
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
1. Create src/git/parser.test.ts
2. Set up test fixtures: sample commits, branches, merges, reverts for test data
3. Write tests for parseRepository function:
    - Valid repository with mixed commits
    - Empty repository (no commits)
    - Single branch vs multiple branches
    - Error: invalid path, not a git repo
4. Write tests for helper functions:
    - detectMerges: identify commits with multiple parents
    - detectReverts: identify revert commits by message pattern
    - buildBranchGraph: correctly map commits to branches
5. Mock simple-git using vitest.mock() to prevent actual git calls
6. Test CommitGraph return value structure and types
7. Validate coverage: aim for 85%+ per function, branch, statement, line
<!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Mock simple-git with vitest.mock()

Use test fixtures for git data

Test both happy path and error cases

Validate type safety of outputs
<!-- SECTION:NOTES:END -->
