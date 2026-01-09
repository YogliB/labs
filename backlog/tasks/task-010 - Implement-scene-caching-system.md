---
id: task-010
title: Implement scene caching system
status: To Do
assignee: []
created_date: '2026-01-09 20:16'
updated_date: '2026-01-09 20:17'
labels:
    - narrative
    - cache
dependencies:
    - task-007
priority: medium
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->

Create narrative/cache.ts to cache generated scenes keyed by (commitHash, modelId) to avoid regeneration. Store in ~/.git-gaiden/cache/ as JSON files. Implement cache hit/miss logic, LRU eviction, and cache invalidation.

<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria

<!-- AC:BEGIN -->

- [ ] #1 Scenes retrieved from cache on second request
- [ ] #2 Cache keyed by commit hash + model ID
- [ ] #3 Cache stored in ~/.git-gaiden/cache/ directory
- [ ] #4 LRU eviction works when cache exceeds size limit
- [ ] #5 clear() removes all cached scenes
- [ ] #6 --no-cache flag bypasses cache completely
- [ ] #7 Cache operations don't block scene generation
  <!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->

1. Create src/narrative/cache.ts
2. Implement SceneCache class with: get(commitHash: string, modelId: string) to retrieve cached scene, set(commitHash: string, modelId: string, scene: Scene) to store scene, clear() to wipe cache, prune(maxSizeMB: number) for LRU eviction
3. Cache storage: directory ~/.git-gaiden/cache/, file format <commitHash>-<modelId>.json
4. Add cache metadata: timestamp for LRU, model version for invalidation
5. Implement size management: track total cache size, evict oldest when exceeds limit (default 100MB)
6. Add --no-cache CLI flag to bypass cache
 <!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->

Cache is optional optimization, not critical for MVP

Consider async cache operations to not block UI

May want per-repo cache vs global cache

<!-- SECTION:NOTES:END -->
