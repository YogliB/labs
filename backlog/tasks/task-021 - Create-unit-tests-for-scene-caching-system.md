---
id: task-021
title: Create unit tests for scene caching system
status: Done
assignee: []
created_date: '2026-01-09 20:32'
updated_date: '2026-01-10 22:29'
labels:
    - testing
    - narrative
    - unit-tests
dependencies:
    - task-010
priority: medium
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->

Create comprehensive unit tests for src/narrative/cache.ts. Tests should validate scene caching, retrieval, storage, LRU eviction, and concurrent access handling. Mock file system to avoid creating actual cache files during testing.

<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria

<!-- AC:BEGIN -->

- [ ] #1 Unit tests created for src/narrative/cache.ts
- [ ] #2 Tests cover SceneCache.get() for cache hit and miss
- [ ] #3 Tests cover SceneCache.set() stores scenes correctly
- [ ] #4 Tests cover SceneCache.clear() removes all cached scenes
- [ ] #5 Tests cover SceneCache.prune() LRU eviction
- [ ] #6 Tests validate cache file format and location
- [ ] #7 Tests handle concurrent access gracefully
- [ ] #8 Coverage for cache.ts at 75%+ (lines, functions, branches, statements)
  <!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->

1. Create src/narrative/cache.test.ts
2. Mock fs module using vitest.mock() to avoid actual file operations
3. Write tests for SceneCache class:
    - get(hash, modelId) returns null on cache miss
    - get(hash, modelId) returns Scene on cache hit
    - set(hash, modelId, scene) stores scene with correct key
4. Write tests for cache operations:
    - clear() removes all cached scenes
    - prune(maxSizeMB) evicts oldest entries when full
    - Cache size tracking works correctly
5. Test cache file format:
    - Files stored as <hash>-<modelId>.json
    - Valid JSON serialization of Scene objects
    - Cache directory structure correct
6. Test edge cases:
    - Multiple scenes with same hash but different modelId
    - Empty Scene object caching
    - Zero-size cache (prune edge case)
7. Test metadata:
    - Timestamp tracking for LRU
    - Model version for invalidation detection
8. Validate concurrent access doesn't cause data loss
 <!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->

Mock fs module for file operations

Test cache key generation (commitHash + modelId)

Validate JSON serialization of Scene objects

Test LRU eviction ordering

<!-- SECTION:NOTES:END -->
