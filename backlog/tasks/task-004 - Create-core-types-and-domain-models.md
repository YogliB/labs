---
id: task-004
title: Create core types and domain models
status: To Do
assignee: []
created_date: '2026-01-09 20:15'
labels:
    - types
    - core
dependencies:
    - task-003
priority: high
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->

Define all TypeScript interfaces and types for the domain model: Commit, Scene, Choice, GameState, BranchInfo, CommitGraph. These types form the contract between all modules and must be comprehensive and well-documented with JSDoc.

<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria

<!-- AC:BEGIN -->

- [ ] #1 All domain types defined with correct structure
- [ ] #2 Types are exported and importable from their modules
- [ ] #3 JSDoc comments document purpose and field meanings
- [ ] #4 No TypeScript errors when importing types
- [ ] #5 Enums defined for fixed value sets (ChoiceType)
- [ ] #6 Optional fields correctly marked with ?
  <!-- AC:END -->
