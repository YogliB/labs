---
id: task-007
title: Implement narrative engine with local LLM integration
status: To Do
assignee: []
created_date: '2026-01-09 20:16'
labels:
    - narrative
    - llm
    - core
dependencies:
    - task-004
priority: high
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->

Create narrative/engine.ts that transforms a Commit into a Scene using phi-3.5-mini local model. Must build structured prompts, enforce output format parsing, and provide consistent scene generation. This is the core git-to-story transformation.

<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria

<!-- AC:BEGIN -->

- [ ] #1 generateScene() returns valid Scene for any Commit
- [ ] #2 Output strictly matches Scene type definition
- [ ] #3 Scenes are 2-3 sentences, concise and engaging
- [ ] #4 At least 2 choices generated (safe, risky, or meta)
- [ ] #5 Handles model errors gracefully (fallback to template)
- [ ] #6 Context (previous scene, branch) influences generation
- [ ] #7 Prompts are well-structured and produce consistent results
  <!-- AC:END -->
