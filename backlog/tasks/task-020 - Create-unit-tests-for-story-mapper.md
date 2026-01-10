---
id: task-020
title: Create unit tests for story mapper
status: Done
assignee: []
created_date: '2026-01-09 20:32'
updated_date: '2026-01-10 22:29'
labels:
    - testing
    - game
    - unit-tests
dependencies:
    - task-009
priority: medium
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->

Create comprehensive unit tests for src/game/mapper.ts. Tests should validate commit graph to story graph transformation, special commit handling (merges, reverts), branch point detection, and choice generation for different commit types.

<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria

<!-- AC:BEGIN -->

- [ ] #1 Unit tests created for src/game/mapper.ts
- [ ] #2 Tests cover mapCommitGraphToStory() main function
- [ ] #3 Tests validate StoryNode output for normal commits
- [ ] #4 Tests validate special handling: merge commits, revert commits, branch points
- [ ] #5 Tests verify choice generation for different commit types
- [ ] #6 Tests handle multi-branch topologies correctly
- [ ] #7 Tests validate story graph preserves git topology
- [ ] #8 Coverage for mapper.ts at 75%+ (lines, functions, branches, statements)
  <!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->

1. Create src/game/mapper.test.ts
2. Set up test fixtures: various CommitGraph topologies (linear, branched, merged, reverted)
3. Write tests for mapCommitGraphToStory function:
    - Linear history maps to sequential story nodes
    - Branch points generate explore branch choices
    - Merge commits marked as convergence events
    - Revert commits marked as time-travel events
4. Test choice generation for different commit types:
    - Normal commits: continue, explore branch X choices
    - Merge commits: accept merge, rewind before merge
    - Revert commits: undo revert, explore original timeline
5. Test edge cases:
    - Single commit repository
    - Deep branching with multiple levels
    - Multiple merges from different branches
    - Consecutive reverts
6. Validate StoryNode structure:
    - Has correct id, commitHash, choices
    - Choices have labels, type, nextCommitHash
7. Ensure story graph preserves topology and is fully traversable
 <!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->

Test with various commit graph topologies

Validate choice labels are meaningful

Test branch point detection accuracy

Ensure story graph is traversable

<!-- SECTION:NOTES:END -->
