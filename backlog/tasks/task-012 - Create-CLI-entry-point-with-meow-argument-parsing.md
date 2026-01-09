---
id: task-012
title: Create CLI entry point with meow argument parsing
status: To Do
assignee: []
created_date: '2026-01-09 20:17'
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
