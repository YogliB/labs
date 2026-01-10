---
id: task-032
title: Implement actual LLM integration in narrative engine
status: Done
assignee: []
created_date: '2026-01-10 22:37'
updated_date: '2026-01-10 23:17'
labels:
    - implementation
    - phase-3
    - narrative
    - llm
    - enhancement
dependencies: []
priority: medium
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->

Replace stub implementation in narrative/engine.ts with actual LLM integration using @xenova/transformers. Connect to the model initialization from config/model.ts and implement actual scene generation with the LLM.

<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria

<!-- AC:BEGIN -->

- [ ] #1 NarrativeEngine uses actual LLM via @xenova/transformers
- [ ] #2 Engine integrates with initializeModel() from config/model.ts
- [ ] #3 generateScene() calls LLM with properly formatted prompts
- [ ] #4 LLM response parsed according to SCENE/SAFE/RISKY/META format
- [ ] #5 Fallback to deterministic template still works on LLM errors
- [ ] #6 Progress indicator shown during model initialization
- [ ] #7 Generated scenes match expected format
- [ ] #8 Edge cases handled gracefully
- [ ] #9 Tests updated to reflect actual LLM integration
  <!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->

1. Import and use initializeModel() from config/model.ts
2. Update NarrativeEngine.initialize() to load the actual LLM model
3. Update generateScene() to call the LLM with formatted prompts (from prompts.ts)
4. Parse LLM response to extract SCENE text and SAFE/RISKY/META choices
5. Implement response validation and error handling
6. Keep deterministic template as fallback for errors
7. Add progress callback for model download/initialization
8. Test with actual phi-3.5-mini model locally
9. Update existing tests (task-028) to handle both stub and LLM modes
 <!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->

Currently narrative/engine.ts is a stub with only deterministic template fallback. This task upgrades it to use the actual LLM integration. This is an enhancement beyond the minimum spec requirements and can be deferred if time-constrained, since the stub functionality allows the game to work.

<!-- SECTION:NOTES:END -->
