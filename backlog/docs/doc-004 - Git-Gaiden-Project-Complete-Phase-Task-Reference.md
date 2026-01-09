---
id: doc-004
title: Git Gaiden Project - Complete Phase & Task Reference
type: other
created_date: '2026-01-09 20:42'
---

# Git Gaiden Project - Complete Phase & Task Reference

## Project Overview

Git Gaiden is a local-first TypeScript CLI that turns any Git repository's history into a playable, choose-your-own-adventure game. Uses meow, ink.js, tsdown, and phi-3.5-mini for narrative generation.

**Package Name:** git-gaiden  
**CLI Command:** gaiden  
**Total Tasks:** 24 (13 implementation + 9 testing + 2 documentation)

---

## PHASE 1: Foundation & Setup (4 tasks)

**Goal:** Initialize project structure and establish testing infrastructure

**Tasks:**

- **task-003**: Initialize git-gaiden package structure and configuration
- **task-004**: Create core types and domain models
- **task-005**: Set up TypeScript and tsdown build configuration
- **task-016**: Configure vitest with coverage thresholds and reporting

**Priority:** All HIGH  
**Duration:** 3-4 hours  
**Dependencies:** None (foundation phase)

---

## PHASE 2: Git Parsing Module (2 tasks)

**Goal:** Parse git repositories and extract commit information

**Tasks:**

- **task-006**: Implement git parser module for repository analysis
- **task-017**: Create unit tests for git parser module

**Priority:** Both HIGH  
**Duration:** 3-5 hours  
**Dependencies:** Phase 1 complete  
**Test Coverage Target:** 80%+ (lines, functions, branches, statements)

---

## PHASE 3: Narrative Engine (2 tasks)

**Goal:** Transform commits into story scenes using LLM

**Tasks:**

- **task-007**: Implement narrative engine with local LLM integration
- **task-018**: Create unit tests for narrative engine

**Priority:** Both HIGH  
**Duration:** 5-7 hours  
**Dependencies:** Phase 1, 2 complete  
**Test Coverage Target:** 80%+ (lines, functions, branches, statements)

---

## PHASE 4: Game State & Story Mapping (4 tasks)

**Goal:** Manage game state and map git commits to story graph

**Tasks:**

- **task-008**: Implement game state management and persistence
- **task-009**: Build commit-to-story graph mapper
- **task-019**: Create unit tests for game state management
- **task-020**: Create unit tests for story mapper

**Priority:** All MEDIUM  
**Duration:** 5-7 hours  
**Dependencies:** Phase 1, 2, 3 complete  
**Test Coverage Target:** 75-80%+

---

## PHASE 5: Infrastructure - Caching & Configuration (4 tasks)

**Goal:** Add performance optimization and platform-specific configuration

**Tasks:**

- **task-010**: Implement scene caching system
- **task-011**: Create model download and initialization flow
- **task-021**: Create unit tests for scene caching system
- **task-022**: Create unit tests for config paths module

**Priority:** All MEDIUM  
**Duration:** 5-7 hours  
**Dependencies:** Phase 1-4 complete  
**Test Coverage Target:** 75-80%+

---

## PHASE 6: CLI & User Interface (3 tasks)

**Goal:** Build command-line interface and interactive UI

**Tasks:**

- **task-012**: Create CLI entry point with meow argument parsing
- **task-013**: Build Ink UI components for scene rendering
- **task-023**: Create integration tests for CLI flow

**Priority:** Tasks 012/013 HIGH, task-023 LOW  
**Duration:** 6-7 hours  
**Dependencies:** Phase 1-5 complete

---

## PHASE 7: Documentation & Continuous Integration (3 tasks)

**Goal:** Document project and set up automated testing/deployment

**Tasks:**

- **task-014**: Write package README.md documentation
- **task-015**: Update root README.md with git-gaiden reference
- **task-024**: Set up GitHub Actions workflow for automated testing and coverage

**Priority:** task-014 MEDIUM, task-015 LOW, task-024 LOW  
**Duration:** 2 hours  
**Dependencies:** All previous phases complete

---

## Summary Statistics

### Tasks by Category

| Category       | Count  |
| -------------- | ------ |
| Implementation | 13     |
| Testing        | 9      |
| Documentation  | 2      |
| **TOTAL**      | **24** |

### Tasks by Priority

| Priority | Count |
| -------- | ----- |
| HIGH     | 10    |
| MEDIUM   | 11    |
| LOW      | 3     |

### Duration per Phase

| Phase             | Implementation | Testing    | Total      |
| ----------------- | -------------- | ---------- | ---------- |
| 1: Foundation     | 2-3h           | 1h         | 3-4h       |
| 2: Git Parser     | 2-3h           | 1-2h       | 3-5h       |
| 3: Narrative      | 3-4h           | 2-3h       | 5-7h       |
| 4: Game Logic     | 3-4h           | 2-3h       | 5-7h       |
| 5: Infrastructure | 3-4h           | 2-3h       | 5-7h       |
| 6: CLI/UI         | 4-5h           | 2h         | 6-7h       |
| 7: Docs/CI        | 2h             | -          | 2h         |
| **TOTAL**         | **19-23h**     | **10-14h** | **29-37h** |

---

## Quick Reference: Phase Task Lists

```
PHASE 1: task-003, task-004, task-005, task-016
PHASE 2: task-006, task-017
PHASE 3: task-007, task-018
PHASE 4: task-008, task-009, task-019, task-020
PHASE 5: task-010, task-011, task-021, task-022
PHASE 6: task-012, task-013, task-023
PHASE 7: task-014, task-015, task-024
```

---

## Recommended Implementation Strategy

### Critical Path (MVP Blocking)

1. **Phase 1** → Foundation & testing infrastructure
2. **Phase 2** → Git parsing capability
3. **Phase 3** → Narrative generation capability
4. **Phase 4** → Game state & story graph
5. **Phase 6** → CLI & user interface

### Polish & Distribution (After MVP)

6. **Phase 5** → Caching & config (optimization)
7. **Phase 7** → Documentation & CI/CD

---

## Testing Strategy

### Integrated Testing Approach

- **Phase 1:** Vitest foundation (enables all tests)
- **Phases 2-5:** Implement module → immediately write unit tests
- **Phase 6:** Implement CLI/UI → integration test
- **Phase 7:** No tests (documentation + CI verification)

### Coverage Targets by Phase

| Phase | Modules                             | Target      | Metrics                                |
| ----- | ----------------------------------- | ----------- | -------------------------------------- |
| 1     | -                                   | N/A         | Setup only                             |
| 2     | git/parser.ts                       | 80%+        | lines, functions, branches, statements |
| 3     | narrative/engine.ts, prompts.ts     | 80%+        | lines, functions, branches, statements |
| 4     | game/state.ts, mapper.ts            | 75-80%+     | lines, functions, branches, statements |
| 5     | narrative/cache.ts, config/paths.ts | 75-80%+     | lines, functions, branches, statements |
| 6     | cli/index.ts                        | Integration | end-to-end flow                        |
| 7     | -                                   | N/A         | CI/CD only                             |

### Test Framework Setup

- **Framework:** Vitest
- **Coverage Provider:** @vitest/coverage-v8
- **Reporters:** text, html, json, json-summary
- **Snapshots:** autoUpdate enabled
- **Environment:** node (not jsdom)
- **Mocking:** vitest.mock() for simple-git, fs, process.env, models

---

## Task Dependencies

### Phase 1 (No Dependencies)

```
task-003 ─────┬─→ task-004 ─┐
              │             └─→ task-005
              └─→ task-016
```

### Phase 2 (Depends on Phase 1)

```
task-006 ─→ task-017
```

### Phase 3 (Depends on Phase 1, 2)

```
task-007 ─→ task-018
```

### Phase 4 (Depends on Phase 1, 2, 3)

```
task-008 ─→ task-019
task-009 ─→ task-020
```

### Phase 5 (Depends on Phase 1-4)

```
task-010 ─→ task-021
task-011 ─→ task-022
```

### Phase 6 (Depends on Phase 1-5)

```
task-012 ┐
         ├─→ task-023
task-013 ┘
```

### Phase 7 (Depends on Phase 1-6)

```
task-014 ─→ task-015
task-024 (depends on all previous)
```

---

## Key Implementation Notes

### Phase 1: Foundation

- Sets up git-gaiden package under packages/
- Defines all core types (Commit, Scene, GameState, etc.)
- Configures TypeScript with strict mode
- Configures tsdown for ESM bundling with shebang
- Configures vitest with per-file coverage reporting

### Phase 2: Git Parser

- parseRepository() extracts commits, branches, merges, reverts
- Mocks simple-git for testing (no real git calls)
- 80%+ coverage target
- ~12-15 test cases

### Phase 3: Narrative Engine

- NarrativeEngine transforms commits to scenes
- buildScenePrompt() formats for LLM
- Deterministic fallback (no model required)
- Mock model inference in tests
- 80%+ coverage target

### Phase 4: Game Logic

- GameStateManager persists state to JSON
- mapCommitGraphToStory() creates story graph
- Handles merges, reverts, branches
- Mock fs for testing
- 75-80%+ coverage target

### Phase 5: Infrastructure

- SceneCache with LRU eviction (100MB default)
- config/paths.ts for XDG-compliant directories
- Model downloader with progress indicator
- Mock fs and process.env in tests
- 75-80%+ coverage target

### Phase 6: CLI & UI

- meow CLI with flags: --branch, --start, --model, --reset, --no-cache
- Ink components: Game, SceneView, ChoiceList, ProgressBar, LoadingScreen
- Integration tests for end-to-end flow
- Mock all modules in integration tests

### Phase 7: Documentation & CI

- Package README: features, installation, usage, examples
- Root README: add git-gaiden to projects list
- GitHub Actions: test on Node 18, 20, 22; upload to Codecov

---

## Reference Documents in Backlog

- **doc-001**: Git Gaiden - Task Breakdown (detailed 13-task implementation breakdown)
- **doc-002**: Git Gaiden - Testing & Coverage Tasks Summary (detailed 9-task testing breakdown)
- **doc-003**: Git Gaiden - Phased Implementation with Integrated Testing (comprehensive phase guide)
- **THIS DOCUMENT**: Git Gaiden Project - Complete Phase & Task Reference (quick lookup reference)

---

## How to Use This Reference

### Find Tasks for a Specific Phase

Look up the phase number and see all task numbers listed.

**Example:** "What tasks are in Phase 2?"  
→ **Answer:** task-006 (implementation), task-017 (testing)

### Follow Implementation Order

Use the Critical Path section for MVP blocking order.

**Example:** "What order should I implement phases?"  
→ **Answer:** Phase 1 → 2 → 3 → 4 → 6 → 5 → 7

### Check Test Requirements

Each phase lists its coverage target (75-80%+) and metrics.

**Example:** "What's the coverage target for Phase 4?"  
→ **Answer:** 75-80%+ for lines, functions, branches, statements

### Verify Dependencies

Check the Task Dependencies section to see what must complete first.

**Example:** "Can I start Phase 4 yet?"  
→ **Answer:** No, wait for Phase 1, 2, 3 to complete first
