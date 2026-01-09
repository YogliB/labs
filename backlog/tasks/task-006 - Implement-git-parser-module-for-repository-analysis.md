---
id: task-006
title: Implement git parser module for repository analysis
status: To Do
assignee: []
created_date: '2026-01-09 20:15'
labels:
    - git
    - core
dependencies:
    - task-004
priority: high
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->

Build the git/parser.ts module using simple-git to extract commit history, branches, graph structure, and file statistics. Must handle merge commits, reverts, and multi-branch topologies. Output structured CommitGraph for consumption by mapper.

<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria

<!-- AC:BEGIN -->

- [ ] #1 Parses any valid git repository
- [ ] #2 Returns CommitGraph with all commits, branches, and metadata
- [ ] #3 Correctly identifies merge and revert commits
- [ ] #4 File change stats included for each commit
- [ ] #5 Handles repositories with 1000+ commits efficiently
- [ ] #6 Clear error messages for invalid repo paths
- [ ] #7 Supports --branch filter to parse specific branch only
  <!-- AC:END -->
