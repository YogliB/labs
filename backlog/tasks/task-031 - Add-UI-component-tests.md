---
id: task-031
title: Add UI component tests
status: To Do
assignee: []
created_date: '2026-01-10 22:35'
updated_date: '2026-01-10 22:38'
labels:
    - testing
    - phase-6
    - ui
    - react
dependencies: []
priority: medium
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->

Implement tests for Ink UI components (game.tsx, scene-view.tsx, progress-bar.tsx, loading-screen.tsx). Currently all have 0% coverage. Consider snapshot tests for React components.

<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria

<!-- AC:BEGIN -->

- [ ] #1 Test files created for all UI components
- [ ] #2 game.tsx tested with snapshot and behavior tests
- [ ] #3 scene-view.tsx tested
- [ ] #4 progress-bar.tsx tested
- [ ] #5 loading-screen.tsx tested
- [ ] #6 Ink/React rendering properly mocked
- [ ] #7 Component props and state changes tested
- [ ] #8 Keyboard shortcuts tested (where applicable)
- [ ] #9 At least 10-15 test cases covering all components
- [ ] #10 Tests pass successfully
  <!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->

1. Create test files for each UI component
2. Mock Ink and React to avoid actual terminal rendering
3. Test Game.tsx: main component accepts storyGraph, gameState, callbacks
4. Test SceneView.tsx: displays scene text and commit context correctly
5. Test ProgressBar.tsx: shows commits explored, branch, elapsed time
6. Test LoadingScreen.tsx: displays during model download/scene generation
7. Use snapshot tests to verify component output structure
8. Test component props handling and edge cases
9. Test keyboard shortcuts (Ctrl+C, R, H) if applicable
10. Aim for 10-15 test cases across all components
<!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->

All UI components (game.tsx, scene-view.tsx, progress-bar.tsx, loading-screen.tsx) currently have 0% coverage. While not explicitly required by doc-005, testing UI components will significantly improve overall coverage and prevent regression. Consider using snapshot tests for component output.

<!-- SECTION:NOTES:END -->
