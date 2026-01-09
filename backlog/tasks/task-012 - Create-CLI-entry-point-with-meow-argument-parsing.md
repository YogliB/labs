---
id: task-012
title: Create CLI entry point with meow argument parsing
status: To Do
assignee: []
created_date: '2026-01-09 20:17'
updated_date: '2026-01-09 20:17'
labels:
    - cli
    - infrastructure
dependencies:
    - task-005
    - task-006
    - task-007
    - task-008
priority: high
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->

Build src/cli/index.ts as main entry point using meow for argument parsing. Handle flags (--branch, --start, --model, --reset, --no-cache), validate inputs, orchestrate git parsing, narrative engine, and state management. This is the glue code for all modules.

<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria

<!-- AC:BEGIN -->

- [ ] #1 gaiden command works from anywhere
- [ ] #2 --help shows clear usage instructions
- [ ] #3 --branch filters to specific branch
- [ ] #4 --start begins from specific commit hash
- [ ] #5 --model specifies alternative model
- [ ] #6 --reset clears state and restarts
- [ ] #7 --no-cache bypasses scene cache
- [ ] #8 Clear error messages for invalid inputs
- [ ] #9 Orchestrates all modules correctly
  <!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->

1. Create src/cli/index.ts with shebang
2. Set up meow CLI with: usage help text and examples, flags (--branch, --start, --model, --reset, --no-cache, --help), default to run in current directory
3. Implement main flow: parse arguments with meow, validate repo path (default: process.cwd()), load or create game state, parse git repository, map commit graph to story, initialize narrative engine, start Ink UI (pass state + callbacks)
4. Handle --reset flag: clear state and cache
5. Add error handling for invalid paths, missing git, etc.
6. Show welcome message with game stats (commits, branches)
 <!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->

Keep CLI entry thin, delegate to modules

Meow provides clean flag parsing and help

Consider --verbose flag for debugging

<!-- SECTION:NOTES:END -->
