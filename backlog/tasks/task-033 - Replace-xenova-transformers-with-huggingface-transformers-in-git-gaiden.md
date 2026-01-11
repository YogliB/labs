---
id: task-033
title: Replace @xenova/transformers with @huggingface/transformers in git-gaiden
status: To Do
assignee: []
created_date: '2026-01-11 10:36'
updated_date: '2026-01-11 10:41'
labels:
    - dependency-upgrade
    - git-gaiden
    - transformers
dependencies: []
priority: high
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->

Replace the current @xenova/transformers package (v2.17.2) with @huggingface/transformers in the git-gaiden project. This migration involves:

1. Updating the package dependency in package.json
2. Updating import statements across the codebase (config/model.ts, narrative/engine.ts, and related test files)
3. Adjusting API calls to match the new package API
4. Updating environment configuration and model loading logic
5. Updating mocks in test files to work with the new package

The @huggingface/transformers package provides official Hugging Face support with better maintained APIs and broader community support compared to the community fork (@xenova/transformers).

<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria

<!-- AC:BEGIN -->

- [ ] #1 Package.json updated with @huggingface/transformers dependency and @xenova/transformers removed
- [ ] #2 @huggingface/transformers imports work correctly in src/config/model.ts
- [ ] #3 @huggingface/transformers imports work correctly in src/narrative/engine.ts
- [ ] #4 Model initialization and caching logic functions as before with new package API
- [ ] #5 All test files updated to mock @huggingface/transformers correctly
- [ ] #6 Full test suite passes (bun run test)
- [ ] #7 Build succeeds (bun run build)
- [ ] #8 No TypeScript compilation errors
- [ ] #9 Model pipeline can be initialized and generate text successfully in development
- [ ] #10 No breaking changes in NarrativeEngine or model initialization behavior from user perspective
  <!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->

1. Review @huggingface/transformers API documentation and compare with current @xenova/transformers usage
2. Update package.json: replace @xenova/transformers@2.17.2 with @huggingface/transformers latest stable version
3. Update src/config/model.ts: change import statements and adjust pipeline initialization, env configuration
4. Update src/narrative/engine.ts: verify compatibility of model pipeline calls and adjust if needed
5. Update test files: src/config/**tests**/model.test.ts and src/narrative/**tests**/engine.test.ts to mock the new package
6. Verify model caching logic works with the new package
7. Run full test suite to ensure no regressions
8. Test model initialization and inference in development mode (bun run dev)
9. Verify production build works correctly (bun run build)
 <!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->

- Current version: @xenova/transformers@2.17.2
- Target: @huggingface/transformers (check latest stable version)
- The model being used is 'onnx-community/Phi-3.5-mini-instruct-onnx-web' which should remain compatible
- Key files affected: package.json, src/config/model.ts, src/narrative/engine.ts, src/config/**tests**/model.test.ts, src/narrative/**tests**/engine.test.ts
- Consider any behavioral differences in model caching, progress callbacks, and error handling between packages
  <!-- SECTION:NOTES:END -->
