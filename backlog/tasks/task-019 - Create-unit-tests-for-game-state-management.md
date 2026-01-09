---
id: task-019
title: Create unit tests for game state management
status: To Do
assignee: []
created_date: '2026-01-09 20:32'
updated_date: '2026-01-09 20:32'
labels:
    - testing
    - game
    - unit-tests
dependencies:
    - task-008
priority: medium
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->

Create comprehensive unit tests for src/game/state.ts. Tests should validate state loading, saving, updating, resetting, and progress calculation. Mock file system to avoid creating actual state files during testing.

<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria

<!-- AC:BEGIN -->

- [ ] #1 Unit tests created for src/game/state.ts
- [ ] #2 Tests cover GameStateManager.load() with new and existing state
- [ ] #3 Tests cover GameStateManager.save() persists to correct location
- [ ] #4 Tests cover GameStateManager.update() merges changes without data loss
- [ ] #5 Tests cover GameStateManager.reset() clears state
- [ ] #6 Tests validate progress metrics calculation
- [ ] #7 Tests handle missing/corrupted state files gracefully
- [ ] #8 Coverage for state.ts at 80%+ (lines, functions, branches, statements)
  <!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->

1. Create src/game/state.test.ts
2. Mock fs module using vitest.mock() to avoid actual file I/O
3. Write tests for GameStateManager class:
    - load() returns new state for first run
    - load() returns existing state if file exists
    - save() writes valid JSON to correct location
    - save() creates directory if missing
4. Write tests for update method:
    - update(changes) merges with existing state
    - update() doesn't lose existing data
    - update() handles partial updates
5. Write tests for reset:
    - reset() clears all state
    - reset() creates fresh state for restart
6. Test state file location logic:
    - Prefer repo-specific .git-gaiden.json
    - Fallback to global ~/.git-gaiden/state/<hash>.json
7. Test progress calculation:
    - commits explored / total commits ratio
    - branch coverage metrics
8. Test error handling:
    - Missing state file returns default
    - Corrupted JSON handled gracefully
    - File permission errors
      <!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->

Mock fs module with vitest.mock()

Test state file location logic (repo-specific vs global)

Validate JSON structure of saved state

Test timestamp and last-played tracking

<!-- SECTION:NOTES:END -->
