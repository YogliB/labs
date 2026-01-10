---
id: task-013
title: Build Ink UI components for scene rendering
status: Done
assignee: []
created_date: '2026-01-09 20:17'
updated_date: '2026-01-10 22:29'
labels:
    - cli
    - ui
dependencies:
    - task-012
priority: high
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->

Create Ink React components for rendering scenes, choices, and game UI. Use @inkjs/ui for SelectInput. Implement scene display, choice selection, progress indicator, and navigation flow. This is the player-facing interface.

<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria

<!-- AC:BEGIN -->

- [ ] #1 Scene text renders clearly with formatting
- [ ] #2 Choices displayed as interactive select list
- [ ] #3 Choice selection advances to next scene
- [ ] #4 Progress indicator shows exploration status
- [ ] #5 Loading states shown during async operations
- [ ] #6 Game state persists between sessions
- [ ] #7 UI is responsive and intuitive
- [ ] #8 Handles errors gracefully (shows error scene)
  <!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->

1. Create src/cli/components/ directory
2. Implement Game.tsx (main component): accept props (storyGraph, gameState, callbacks), manage current scene state, handle choice selection → update state → next scene
3. Implement SceneView.tsx: display current scene text (2-3 sentences), render in styled box with color, show commit context (hash, author, message)
4. Implement ChoiceList.tsx: use @inkjs/ui SelectInput for choice selection, style choices by type (safe=green, risky=yellow, meta=blue), handle Enter key to confirm selection
5. Implement ProgressBar.tsx: show X/Y commits explored, show current branch, show elapsed time or other stats
6. Implement LoadingScreen.tsx: show during model download, show during scene generation, use Ink Spinner component
7. Wire up callbacks: onChoiceSelected(choice) → update state → load next scene
8. Add keyboard shortcuts: Ctrl+C to quit, R to restart, H for help
 <!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->

Keep UI minimal and focused for MVP

Ink uses React patterns but renders to terminal

Test with various terminal sizes/colors

Consider ASCII art for flavor

<!-- SECTION:NOTES:END -->
