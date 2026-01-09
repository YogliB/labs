---
id: task-025
title: Implement theme system for CLI UI
status: Done
assignee: []
created_date: '2026-01-09 21:18'
updated_date: '2026-01-09 21:21'
labels: []
dependencies: []
priority: medium
---

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->

1. Define Theme interface and theme objects in src/game/types.ts or new src/ui/types.ts
2. Create ThemeProvider component in src/ui/ThemeProvider.tsx using React.createContext
3. Update CLI in src/cli/index.ts to accept --theme flag and pass theme to app
4. Wrap Game component with ThemeProvider in main app
5. Update UI components (SceneView, ChoiceList, ProgressBar) to use theme colors from useContext
6. Add theme validation and default fallback
7. Test with different themes
 <!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->

Use React Context API to provide theme colors to Ink components. Define theme interfaces and objects. Update CLI to accept --theme flag. Modify UI components (SceneView, ChoiceList, etc.) to use themed colors instead of hardcoded ones.

<!-- SECTION:NOTES:END -->
