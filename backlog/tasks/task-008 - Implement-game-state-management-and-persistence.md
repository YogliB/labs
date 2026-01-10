---
id: task-008
title: Implement game state management and persistence
status: Done
assignee: []
created_date: '2026-01-09 20:16'
updated_date: '2026-01-10 22:29'
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

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->

1. Create src/game/state.ts
2. Implement GameStateManager class with: load(repoPath: string) to load existing state or create new, save(state: GameState) to persist to JSON, update(changes: Partial<GameState>) to merge updates, reset() to clear state and start fresh
3. State file location logic: check for repo-specific at <repo>/.git-gaiden.json, fallback to global at ~/.git-gaiden/state/<repo-hash>.json
4. Implement progress calculation: commits explored / total commits ratio, branch coverage metrics
5. Add state validation on load (schema check)
6. Handle concurrent access (file locking if needed)
 <!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->

Use sync fs operations for simplicity (CLI context)

Consider zod or similar for state validation

State should include timestamp for last played info

<!-- SECTION:NOTES:END -->
