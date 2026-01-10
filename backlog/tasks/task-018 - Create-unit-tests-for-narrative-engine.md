---
id: task-018
title: Create unit tests for narrative engine
status: Done
assignee: []
created_date: '2026-01-09 20:31'
updated_date: '2026-01-10 22:30'
labels:
  - testing
  - narrative
  - unit-tests
dependencies:
  - task-007
priority: high
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Create comprehensive unit tests for src/narrative/engine.ts and src/narrative/prompts.ts. Tests should validate scene generation, prompt construction, choice creation, error handling, and fallback behavior. Mock model inference to test logic without actual LLM calls.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Unit tests created for src/narrative/engine.ts and prompts.ts
- [ ] #2 Tests cover NarrativeEngine.initialize() method
- [ ] #3 Tests cover NarrativeEngine.generateScene() main function
- [ ] #4 Tests cover buildScenePrompt() prompt generation
- [ ] #5 Tests validate Scene output structure and types
- [ ] #6 Tests verify choice generation (minimum 2 choices, correct types)
- [ ] #7 Tests handle model errors gracefully with fallback
- [ ] #8 Coverage for engine.ts at 80%+ (lines, functions, branches, statements)
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
1. Create src/narrative/engine.test.ts
2. Create src/narrative/prompts.test.ts
3. Set up test fixtures: sample commits with various metadata
4. Write tests for NarrativeEngine class:
    - initialize(modelId) loads model successfully
    - generateScene(commit) returns valid Scene
    - generateScene with context influences output
    - Error handling when model fails (fallback to deterministic)
5. Write tests for prompt building:
    - buildScenePrompt formats commit data correctly
    - Prompts include commit message, author, files changed
    - System prompt enforces output format
6. Test Scene output validation:
    - Scene has id, sceneText, choices array
    - Scene text is 2-3 sentences (rough check)
    - Choices have id, label, type (safe/risky/meta)
7. Mock model inference so tests don't require actual model
8. Test edge cases: empty message, many files, revert commit, merge commit
<!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Mock model inference to avoid actual LLM calls

Test deterministic template fallback

Validate scene text is 2-3 sentences

Test choice type classification (safe, risky, meta)
<!-- SECTION:NOTES:END -->
