---
id: task-027
title: Create narrative/prompts.ts module
status: Done
assignee: []
created_date: '2026-01-10 22:35'
updated_date: '2026-01-10 22:53'
labels:
    - implementation
    - phase-3
    - narrative
    - missing-file
dependencies: []
priority: high
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->

Implement the missing prompts.ts module for building scene prompts and formatting commits for LLM consumption. Doc-005 explicitly specifies this file as part of task-007.

<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria

<!-- AC:BEGIN -->

- [ ] #1 src/narrative/prompts.ts file created
- [ ] #2 buildScenePrompt() function implemented
- [ ] #3 Prompt template includes SCENE, SAFE, RISKY, META sections
- [ ] #4 Context injection working: previous commits, branch name, contributor info
- [ ] #5 Edge cases handled: empty messages, large file counts, merge/revert commits
- [ ] #6 Type definitions added for prompt parameters
- [ ] #7 Output format clearly documented
- [ ] #8 Module can be imported and used by narrative engine
  <!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->

1. Create src/narrative/prompts.ts module
2. Implement buildScenePrompt() function that formats commits for LLM
3. Include context injection: previous commits, branch name, contributor info
4. Design prompt template with clear sections: SCENE, SAFE, RISKY, META
5. Handle edge cases: empty commit messages, many files changed, special commits (merges/reverts)
6. Add type definitions for prompt parameters and output format
7. Export utility functions for prompt formatting
8. Document expected LLM output format
 <!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->

This module was specified in doc-005 Phase 3 (task-007) but is missing from the codebase. It's a critical component for formatting prompts before sending to the LLM. The prompt structure should guide the LLM to generate 2-3 sentence scenes plus 2-3 choices categorized by type.

<!-- SECTION:NOTES:END -->
