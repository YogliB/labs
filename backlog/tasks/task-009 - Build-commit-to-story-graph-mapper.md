---
id: task-009
title: Build commit-to-story graph mapper
status: To Do
assignee: []
created_date: '2026-01-09 20:16'
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
