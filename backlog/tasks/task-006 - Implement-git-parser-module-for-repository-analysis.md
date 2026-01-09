---
id: task-006
title: Implement git parser module for repository analysis
status: To Do
assignee: []
created_date: '2026-01-09 20:15'
updated_date: '2026-01-09 20:15'
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

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->

1. Create src/git/parser.ts
2. Implement parseRepository(repoPath: string, options?: ParseOptions) that: validates repo path exists and is git repo, uses simple-git to get log with stats and graph topology, extracts commit metadata (hash, message, author, date, parents), gets file changes and diff stats (+/- LOC) per commit, identifies merge commits (multiple parents), identifies revert commits (message pattern "Revert"), builds branch list and maps commits to branches
3. Implement helper functions: detectMerges(commits) to find merge commits, detectReverts(commits) to find revert commits, buildBranchGraph(commits) to map branches to commit lists
4. Add error handling for invalid repos, empty repos
5. Support options: branch filter, commit range, max commits
 <!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->

Use simple-git's log() with format options for rich data

Consider performance for large repos (pagination/streaming)

May need to limit file diff depth for performance

<!-- SECTION:NOTES:END -->
