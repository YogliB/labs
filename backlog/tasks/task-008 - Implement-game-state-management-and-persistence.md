---
id: task-008
title: Implement game state management and persistence
status: To Do
assignee: []
created_date: '2026-01-09 20:16'
labels:
    - game
    - state
dependencies:
    - task-004
priority: medium
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->

Create game/state.ts to track player progress through the story: current scene, visited commits, branch choices, and progress metrics. Persist to JSON file in ~/.git-gaiden/state/ or per-repo .git-gaiden.json. Support save/load/reset operations.

<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria

<!-- AC:BEGIN -->

- [ ] #1 State persists across CLI runs
- [ ] #2 load() creates new state for first run
- [ ] #3 save() writes valid JSON to correct location
- [ ] #4 update() merges changes without losing data
- [ ] #5 reset() clears state and allows restart
- [ ] #6 Progress metrics accurately reflect exploration
- [ ] #7 Handles missing or corrupted state files gracefully
  <!-- AC:END -->
