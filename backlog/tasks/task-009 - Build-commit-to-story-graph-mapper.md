---
id: task-009
title: Build commit-to-story graph mapper
status: Done
assignee: []
created_date: '2026-01-09 20:16'
updated_date: '2026-01-10 22:29'
labels:
    - game
    - mapping
dependencies:
    - task-004
priority: medium
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->

Implement game/mapper.ts to transform CommitGraph into story graph (StoryNode tree). Map normal commits to scenes, merge commits to convergence events, reverts to time-travel moments. Create choice connections between branches.

<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria

<!-- AC:BEGIN -->

- [ ] #1 Maps any CommitGraph to valid story graph
- [ ] #2 Normal commits become straightforward scenes
- [ ] #3 Merge commits flagged as convergence events
- [ ] #4 Revert commits flagged as time-travel events
- [ ] #5 Branch points offer explore branch choices
- [ ] #6 Story graph preserves git graph topology
- [ ] #7 Output can drive scene-by-scene playthrough
  <!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->

1. Create src/game/mapper.ts
2. Implement mapCommitGraphToStory(graph: CommitGraph) that: creates StoryNode for each commit with scene ID, classifies commits (normal, merge, revert, branch point), generates choices based on commit type (normal: continue/explore branch X, merge: accept merge/rewind before merge, revert: undo revert/explore original timeline), links story nodes according to git graph topology
3. Implement branch detection: identify when commit has multiple children (branch point), create explore branch choices at branch points
4. Add special handling: merge commits create convergence scene type, revert commits create time-travel scene type
5. For MVP: prefer linear path with optional detours over full graph
 <!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->

MVP can simplify to mostly linear with occasional branches

Full graph traversal is future enhancement

Consider topological sort for commit ordering

<!-- SECTION:NOTES:END -->
