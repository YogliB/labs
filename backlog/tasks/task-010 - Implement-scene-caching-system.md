---
id: task-010
title: Implement scene caching system
status: To Do
assignee: []
created_date: '2026-01-09 20:16'
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
