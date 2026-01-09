---
id: task-011
title: Create model download and initialization flow
status: To Do
assignee: []
created_date: '2026-01-09 20:17'
updated_date: '2026-01-09 20:17'
labels:
    - infrastructure
    - llm
dependencies:
    - task-007
priority: medium
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->

Implement config/paths.ts and model download logic for phi-3.5-mini. Handle first-time download with progress indicator, caching in ~/.git-gaiden/models/, and lazy loading. Support --model flag to specify different models.

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

1. Create src/config/paths.ts with: XDG-compliant cache directory or platform-specific, define paths for modelsDir/cacheDir/stateDir, ensure directories exist on first access
2. Create model downloader (in narrative/engine.ts or separate) that: checks if model exists locally, downloads from HuggingFace or ONNX model hub if not, shows progress bar using Ink spinner/progress component, validates download (checksum, file size), stores in ~/.git-gaiden/models/<model-id>/
3. Implement lazy initialization: model only loaded when first scene generated, show Initializing model... message
4. Add --model CLI flag: default phi-3.5-mini-instruct, allow user to specify alternative model ID
5. Handle errors: network failure, disk space, corrupt download
 <!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->

Research transformers.js or onnxruntime-node for model inference

May need to use quantized models (q4/q8) for size/speed

Consider using @xenova/transformers for browser+node compatibility

<!-- SECTION:NOTES:END -->
