---
id: task-028
title: Create narrative engine unit tests
status: Done
assignee: []
created_date: '2026-01-10 22:35'
updated_date: '2026-01-10 22:54'
labels:
    - testing
    - phase-3
    - narrative
    - high-priority
dependencies: []
priority: high
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->

Implement comprehensive unit tests for the narrative engine module to achieve 80%+ coverage. The narrative engine is core functionality currently with 0% test coverage, blocking Phase 3 completion.

<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria

<!-- AC:BEGIN -->

- [ ] #1 engine.test.ts created in src/narrative/**tests**/
- [ ] #2 @xenova/transformers properly mocked
- [ ] #3 initialize() method tested
- [ ] #4 generateScene() tested with multiple commit types
- [ ] #5 Context injection tested
- [ ] #6 Error handling and fallback behavior tested
- [ ] #7 Edge cases covered (empty messages, large diffs, special commits)
- [ ] #8 Choice generation and validation tested
- [ ] #9 Test coverage for narrative/engine.ts achieves 80%+
- [ ] #10 15-18 test cases implemented
- [ ] #11 All tests pass
  <!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->

1. Create src/narrative/**tests**/engine.test.ts
2. Mock @xenova/transformers to avoid actual model calls
3. Test NarrativeEngine.initialize() method
4. Test NarrativeEngine.generateScene() with various commit types
5. Test context injection (previous commits, branch name, contributor info)
6. Test error handling and graceful fallback to template
7. Test edge cases: empty messages, many files, merge/revert commits
8. Test choice validation and type classification (safe, risky, meta)
9. Verify prompt building integration (will need prompts.ts from task-027)
10. Aim for 80%+ coverage with 15-18 test cases
<!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->

This is spec task-018 from doc-005 Phase 3. Currently narrative/engine.ts has 0% test coverage despite being core functionality. The engine is currently a stub with deterministic template - tests should cover both the current stub behavior and prepare for actual LLM integration.

<!-- SECTION:NOTES:END -->
