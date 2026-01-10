---
id: task-007
title: Implement narrative engine with local LLM integration
status: Done
assignee: []
created_date: '2026-01-09 20:16'
updated_date: '2026-01-10 22:30'
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

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->

1. Create src/narrative/engine.ts
2. Implement NarrativeEngine class with: initialize(modelId: string) to load model (uses model downloader), generateScene(commit: Commit, context?: GameState) as main method
3. Create src/narrative/prompts.ts with: buildScenePrompt(commit) to format commit data into LLM prompt, include system prompt defining output format, enforce strict structure (SCENE: ... SAFE: ... RISKY: ... META: ...)
4. Implement response parsing to: extract scene text, parse choice options (2-3 choices minimum), validate and type-cast to Scene interface, handle malformed responses with retry or fallback
5. Add context injection (previous commits, branch name, contributor info)
6. Implement deterministic fallback for when model unavailable
 <!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->

Start with deterministic template fallback, add model later

Prompt engineering is critical for quality

Consider few-shot examples in system prompt

May need temperature tuning for creativity vs consistency

<!-- SECTION:NOTES:END -->
