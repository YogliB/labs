---
id: task-001
title: Create CLI entry point with meow argument parsing
status: To Do
assignee: []
created_date: '2026-01-09 20:11'
updated_date: '2026-01-09 20:11'
labels:
    - narrative
    - infrastructure
    - llm
dependencies: []
priority: high
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->

Implement the model download, caching, and initialization system for phi-3.5-mini. This module should handle first-time setup, show progress during download, and cache models locally in ~/.git-gaiden/models/. Must work in Node.js environment with fallback to CPU if needed.

<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria

<!-- AC:BEGIN -->

- [ ] #1 Model downloads to correct cache location on first run
- [ ] #2 Progress bar shows download status in CLI
- [ ] #3 Model loads successfully and can be used for inference
- [ ] #4 Subsequent runs use cached model without re-downloading
- [ ] #5 Handles network failures with clear error messages
- [ ] #6 Supports --model flag to specify different model IDs
  <!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->

1. Research and select appropriate JS/TS library for local model inference (e.g., transformers.js, onnxruntime-node)
2. Create `config/paths.ts` with XDG-compliant cache directory logic (~/.git-gaiden or platform-specific)
3. Implement model download with progress indication (using Ink spinner/progress bar)
4. Add model validation (checksum/size verification)
5. Implement lazy initialization pattern (don't load until first use)
6. Add CLI flag support for `--model <model-id>` to select different models
7. Handle errors gracefully (network failures, disk space, etc.)
 <!-- SECTION:PLAN:END -->
