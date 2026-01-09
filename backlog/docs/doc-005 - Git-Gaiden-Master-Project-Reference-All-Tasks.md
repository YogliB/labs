---
id: doc-005
title: Git Gaiden - Master Project Reference (All Tasks)
type: other
created_date: '2026-01-09 20:44'
---

# Git Gaiden - Master Project Reference

**Project:** Git Gaiden - Turn Git history into choose-your-own-adventure games  
**Language:** TypeScript  
**Stack:** meow, ink.js, tsdown, phi-3.5-mini, simple-git, vitest  
**Total Tasks:** 24 (13 implementation + 9 testing + 2 documentation)  
**Estimated Duration:** 29-37 hours

---

## PHASE 1: Foundation & Setup

**Goal:** Initialize project structure and establish testing infrastructure  
**Duration:** 3-4 hours  
**Priority:** All HIGH  
**Status:** Ready to start

### Implementation Tasks

- **task-003** ⭐ Initialize git-gaiden package structure and configuration
- **task-004** ⭐ Create core types and domain models
- **task-005** ⭐ Set up TypeScript and tsdown build configuration

### Testing Tasks

- **task-016** ⭐ Configure vitest with coverage thresholds and reporting

### Key Outputs

- `packages/git-gaiden/` directory with complete folder structure
- `package.json` with all dependencies (meow, ink, react, simple-git, tsdown)
- Core types: Commit, Scene, Choice, GameState, CommitGraph, BranchInfo
- TypeScript config with strict mode enabled
- tsdown config for ESM bundling with `#!/usr/bin/env node` shebang
- vitest config with per-file coverage (lines, functions, branches, statements)
- Test scripts: `npm run test`, `npm run test:ui`, `npm run test:coverage`

### Dependencies

None (foundation phase)

---

## PHASE 2: Git Parsing Module

**Goal:** Extract and parse git repository history  
**Duration:** 3-5 hours  
**Priority:** Both HIGH  
**Status:** Depends on Phase 1

### Implementation Task

- **task-006** ⭐ Implement git parser module for repository analysis
    - `parseRepository(repoPath, options?)` function
    - Helpers: `detectMerges()`, `detectReverts()`, `buildBranchGraph()`
    - Returns CommitGraph with all commits, branches, metadata
    - Handles merges, reverts, multi-branch topologies

### Testing Task

- **task-017** ⭐ Create unit tests for git parser module
    - Mock simple-git to avoid real git operations
    - Test coverage: **80%+** (lines, functions, branches, statements)
    - ~12-15 test cases covering all functions and edge cases

### Key Features

- Supports `--branch` filter option
- Extracts: hash, message, author, date, parents, file changes, diff stats
- Identifies: merge commits, revert commits, branch points
- Handles edge cases: empty repo, single commit, large repos (1000+ commits)

### Dependencies

- Phase 1 must be complete

---

## PHASE 3: Narrative Engine

**Goal:** Transform commits into story scenes using LLM  
**Duration:** 5-7 hours  
**Priority:** Both HIGH  
**Status:** Depends on Phase 1, 2

### Implementation Task

- **task-007** ⭐ Implement narrative engine with local LLM integration
    - `NarrativeEngine` class with `initialize()` and `generateScene()`
    - `buildScenePrompt()` formats commits for LLM
    - Strict output format: `SCENE: ... SAFE: ... RISKY: ... META: ...`
    - Generates: 2-3 sentence scene text + 2-3 choices
    - Choice types: safe, risky, meta
    - Deterministic template fallback (no model required)

### Testing Task

- **task-018** ⭐ Create unit tests for narrative engine
    - Mock LLM inference to avoid actual model calls
    - Test coverage: **80%+** (lines, functions, branches, statements)
    - ~15-18 test cases for generation, prompts, fallback behavior

### Key Features

- Context injection: previous commits, branch name, contributor info
- Error handling with graceful fallback
- Edge cases: empty messages, many files, special commits (merges/reverts)
- Choice validation and type classification

### Dependencies

- Phase 1, 2 must be complete

---

## PHASE 4: Game State & Story Mapping

**Goal:** Manage game progress and map commits to story graph  
**Duration:** 5-7 hours  
**Priority:** All MEDIUM  
**Status:** Depends on Phase 1, 2, 3

### Implementation Tasks

- **task-008** ⭐ Implement game state management and persistence
    - `GameStateManager` class: `load()`, `save()`, `update()`, `reset()`
    - State structure: currentCommit, visitedCommits, progress, branchPath
    - Persistence: JSON at `<repo>/.git-gaiden.json` or `~/.git-gaiden/state/<hash>.json`
    - Progress metrics: commits explored ratio, branch coverage
- **task-009** ⭐ Build commit-to-story graph mapper
    - `mapCommitGraphToStory()` transforms CommitGraph → StoryNode tree
    - Commit classification: normal, merge, revert, branch point
    - Special scene types: convergence (merges), time-travel (reverts)
    - Choice generation per type: continue, explore branch, accept merge, undo revert
    - MVP: linear path with occasional detours (not full graph)

### Testing Tasks

- **task-019** ⭐ Create unit tests for game state management
    - Mock fs module to avoid actual file I/O
    - Test coverage: **80%+** (lines, functions, branches, statements)
    - ~12-16 test cases for load/save/update/reset/progress
- **task-020** ⭐ Create unit tests for story mapper
    - Test various CommitGraph topologies (linear, branched, merged)
    - Test coverage: **75-80%+** (lines, functions, branches, statements)
    - ~16-20 test cases for transformation, commit types, branches

### Key Features

- State validation and error handling (missing/corrupted files)
- Timestamp tracking for "last played" info
- Branch point detection and explore branch choices
- Story graph traversability and topology preservation

### Dependencies

- Phase 1, 2, 3 must be complete

---

## PHASE 5: Infrastructure - Caching & Configuration

**Goal:** Add performance optimization and platform-specific setup  
**Duration:** 5-7 hours  
**Priority:** All MEDIUM  
**Status:** Depends on Phase 1-4

### Implementation Tasks

- **task-010** ⭐ Implement scene caching system
    - `SceneCache` class: `get()`, `set()`, `clear()`, `prune()`
    - Cache key: (commitHash, modelId)
    - Storage: `~/.git-gaiden/cache/<hash>-<modelId>.json`
    - LRU eviction with 100MB default max size
    - Metadata: timestamp (LRU), model version (invalidation)
- **task-011** ⭐ Create model download and initialization flow
    - `config/paths.ts` with XDG-compliant directory resolution
    - Paths: modelsDir, cacheDir, stateDir (platform-specific)
    - Model downloader: checks cache, downloads from HuggingFace if needed
    - Progress indicator during download (Ink spinner)
    - Lazy initialization: load only when first scene generated
    - `--model` CLI flag (default: phi-3.5-mini-instruct)

### Testing Tasks

- **task-021** ⭐ Create unit tests for scene caching system
    - Mock fs module for file operations
    - Test coverage: **75-80%+** (lines, functions, branches, statements)
    - ~10-14 test cases for cache hit/miss, LRU, persistence
- **task-022** ⭐ Create unit tests for config paths module
    - Mock process.env for environment variables
    - Test coverage: **80%+** (lines, functions, branches, statements)
    - ~14-18 test cases for XDG resolution, platform handling, directory creation

### Key Features

- XDG-compliant caching (Linux), fallback to platform defaults (macOS/Windows)
- Validation: checksum and file size verification for downloads
- Error handling: network, disk space, corrupt downloads
- `--no-cache` CLI flag to bypass caching

### Dependencies

- Phase 1-4 must be complete

---

## PHASE 6: CLI & User Interface

**Goal:** Build command-line interface and interactive terminal UI  
**Duration:** 6-7 hours  
**Priority:** task-012/013 HIGH, task-023 LOW  
**Status:** Depends on Phase 1-5

### Implementation Tasks

- **task-012** ⭐ Create CLI entry point with meow argument parsing
    - meow setup with flags: `--branch`, `--start`, `--model`, `--reset`, `--no-cache`, `--help`
    - Main flow: parse args → validate repo → load state → parse git → init engine → start UI
    - Default repo path: `process.cwd()`
    - Welcome message with game stats (commits, branches)
    - Error handling: invalid paths, not a git repo, missing permissions
- **task-013** ⭐ Build Ink UI components for scene rendering
    - `Game.tsx` (main): accepts storyGraph, gameState, callbacks
    - `SceneView.tsx`: displays scene text (2-3 sentences), commit context
    - `ChoiceList.tsx`: @inkjs/ui SelectInput, styled by type (safe=green, risky=yellow, meta=blue)
    - `ProgressBar.tsx`: shows X/Y commits explored, current branch, elapsed time
    - `LoadingScreen.tsx`: shows during model download/scene generation
    - Keyboard shortcuts: Ctrl+C (quit), R (restart), H (help)

### Testing Task

- **task-023** ⭐ Create integration tests for CLI flow
    - Mock git parser, narrative engine, game state, Ink rendering
    - Test CLI argument parsing, flag combinations, orchestration
    - Test error scenarios: invalid repo, missing git, permissions
    - Test help output and user-friendly error messages
    - ~8-12 integration test cases

### Key Features

- Full module orchestration: git → narrative → state → UI
- State persistence between sessions
- Graceful error handling with friendly messages
- Terminal-friendly UI (Ink/React for CLI)

### Dependencies

- Phase 1-5 must be complete

---

## PHASE 7: Documentation & Continuous Integration

**Goal:** Document project and set up automated testing/deployment  
**Duration:** 2 hours  
**Priority:** task-014 MEDIUM, task-015 LOW, task-024 LOW  
**Status:** Depends on Phase 1-6

### Documentation Tasks

- **task-014** ⭐ Write package README.md documentation
    - Title, tagline, features, installation, usage, options, examples
    - How it works (brief architecture overview)
    - Requirements: Node 18+, Git
    - Keep concise: <200 lines
- **task-015** ⭐ Update root README.md with git-gaiden reference
    - Add `## Projects` or `## Packages` section if not exists
    - Entry: **git-gaiden**: Turn Git history into choose-your-own-adventure games. [Read more](./packages/git-gaiden)
    - Keep minimal: 1-2 lines, consistent formatting

### CI/CD Task

- **task-024** ⭐ Set up GitHub Actions workflow for automated testing and coverage
    - Trigger: push to main, PRs to main, manual workflow_dispatch
    - Matrix: Node 18, 20, 22
    - Steps: checkout → setup Node → cache deps → install → test:coverage
    - Coverage reporting: upload to Codecov
    - Artifacts: archive HTML coverage report
    - Target: <5 min build time, fail if coverage drops

### Key Features

- Automated testing on every PR/push
- Coverage reporting with Codecov integration
- Multi-version Node.js testing
- Performance-optimized with dependency caching

### Dependencies

- Phase 1-6 must be complete

---

## Complete Task Reference

### By Phase

```
PHASE 1 (Foundation):     task-003, task-004, task-005, task-016
PHASE 2 (Git Parser):     task-006, task-017
PHASE 3 (Narrative):      task-007, task-018
PHASE 4 (Game Logic):     task-008, task-009, task-019, task-020
PHASE 5 (Infrastructure): task-010, task-011, task-021, task-022
PHASE 6 (CLI/UI):         task-012, task-013, task-023
PHASE 7 (Docs/CI):        task-014, task-015, task-024
```

### By Priority

**HIGH (10 tasks):** task-003, task-004, task-005, task-006, task-007, task-012, task-013, task-016, task-017, task-018

**MEDIUM (11 tasks):** task-001, task-008, task-009, task-010, task-011, task-014, task-019, task-020, task-021, task-022

**LOW (3 tasks):** task-015, task-023, task-024

### By Category

**Implementation (13):** task-003, task-004, task-005, task-006, task-007, task-008, task-009, task-010, task-011, task-012, task-013, task-014, task-015

**Testing (9):** task-016, task-017, task-018, task-019, task-020, task-021, task-022, task-023, task-024

---

## Implementation Timeline

### Phase Durations

| Phase             | Tasks  | Duration   | Status           |
| ----------------- | ------ | ---------- | ---------------- |
| 1: Foundation     | 4      | 3-4h       | 🟢 Ready         |
| 2: Git Parser     | 2      | 3-5h       | 🟡 After Phase 1 |
| 3: Narrative      | 2      | 5-7h       | 🟡 After Phase 2 |
| 4: Game Logic     | 4      | 5-7h       | 🟡 After Phase 3 |
| 5: Infrastructure | 4      | 5-7h       | 🟡 After Phase 4 |
| 6: CLI/UI         | 3      | 6-7h       | 🟡 After Phase 5 |
| 7: Docs/CI        | 3      | 2h         | 🟡 After Phase 6 |
| **TOTAL**         | **24** | **29-37h** |                  |

### Recommended Implementation Order

**Critical Path (MVP Blocking):**

1. **Phase 1** → Foundation & testing infrastructure
2. **Phase 2** → Git parsing (core capability)
3. **Phase 3** → Narrative engine (core capability)
4. **Phase 4** → Game state & story graph (enables playable experience)
5. **Phase 6** → CLI & UI (enables user interaction)

**Polish & Distribution (After MVP):** 6. **Phase 5** → Caching & config (performance optimization) 7. **Phase 7** → Documentation & CI/CD (publication & maintenance)

---

## Testing Strategy

### Integrated Testing Approach

- **Phase 1:** Vitest foundation (enables all tests)
- **Phases 2-5:** Implement module → immediately write unit tests
- **Phase 6:** Implement both → integration test
- **Phase 7:** No tests (documentation + CI verification)

### Coverage Targets by Phase

| Phase     | Modules                             | Target      | Test Count      |
| --------- | ----------------------------------- | ----------- | --------------- |
| 1         | -                                   | N/A         | Setup only      |
| 2         | git/parser.ts                       | 80%+        | 12-15 cases     |
| 3         | narrative/engine.ts, prompts.ts     | 80%+        | 15-18 cases     |
| 4         | game/state.ts, mapper.ts            | 75-80%+     | 28-36 cases     |
| 5         | narrative/cache.ts, config/paths.ts | 75-80%+     | 24-32 cases     |
| 6         | cli/index.ts                        | Integration | 8-12 cases      |
| 7         | -                                   | N/A         | CI/CD only      |
| **TOTAL** | **8 modules**                       | **75-80%+** | **50-70 cases** |

### Coverage Metrics

- **Lines:** 70-80% minimum (higher for critical modules)
- **Functions:** 70-80% minimum
- **Branches:** 70-80% minimum
- **Statements:** 70-80% minimum

### Test Framework

- **Framework:** Vitest
- **Coverage:** @vitest/coverage-v8
- **Reporters:** text, html, json, json-summary
- **Snapshots:** autoUpdate enabled
- **Environment:** node (not jsdom)
- **Mocking Strategy:**
    - simple-git: vitest.mock() for git operations
    - fs module: vitest.mock() for file operations
    - process.env: vitest.mock() for environment variables
    - Model inference: vitest.mock() to avoid actual LLM calls
    - Ink/React: vitest.mock() to avoid terminal output

---

## Task Dependencies Map

```
PHASE 1 (Independent)
task-003 ──┬─→ task-004 ──┐
           │              └─→ task-005
           └─→ task-016

↓ (All Phase 1 must complete)

PHASE 2
task-006 ─→ task-017

↓ (Phase 1 + 2 must complete)

PHASE 3
task-007 ─→ task-018

↓ (Phase 1 + 2 + 3 must complete)

PHASE 4
task-008 ─→ task-019
task-009 ─→ task-020

↓ (Phase 1-4 must complete)

PHASE 5
task-010 ─→ task-021
task-011 ─→ task-022

↓ (Phase 1-5 must complete)

PHASE 6
task-012 ┐
         ├─→ task-023
task-013 ┘

↓ (Phase 1-6 must complete)

PHASE 7
task-014 ─→ task-015
task-024 (depends on all previous)
```

---

## Quick Lookup Guide

### "What tasks are in Phase X?"

Look up the phase section above to see all task numbers.

### "What's the test coverage target?"

75-80%+ for lines, functions, branches, statements (per-file reporting)

### "What order should I implement?"

Follow the Critical Path section: Phase 1 → 2 → 3 → 4 → 6 → 5 → 7

### "Can I start Phase X yet?"

Check dependencies above. All previous phases must be complete.

### "How long will this take?"

29-37 hours total (19-23h implementation, 10-14h testing)

### "Which tasks can I work on in parallel?"

- Within Phase 1: task-003, task-004, task-005 can be partially parallel
- Across phases: must wait for previous phase completion
- Task X and its test can be done sequentially (implement then test)

---

## Key Implementation Notes

### Technologies & Dependencies

- **TypeScript** (^5.7.0) - Type safety
- **meow** (^13.2.0) - CLI argument parsing
- **ink** (^5.0.1) - React for terminal
- **react** (^18.3.1) - UI library
- **@inkjs/ui** (^2.0.0) - Ink UI components
- **simple-git** (^3.27.0) - Git operations
- **tsdown** (^0.3.0) - ESM bundling
- **vitest** (latest) - Testing framework

### File Structure

```
packages/git-gaiden/
├── src/
│   ├── cli/
│   │   ├── index.ts          (task-012)
│   │   └── components/       (task-013)
│   ├── git/
│   │   ├── types.ts          (task-004)
│   │   └── parser.ts         (task-006)
│   ├── narrative/
│   │   ├── types.ts          (task-004)
│   │   ├── engine.ts         (task-007)
│   │   ├── prompts.ts        (task-007)
│   │   └── cache.ts          (task-010)
│   ├── game/
│   │   ├── types.ts          (task-004)
│   │   ├── state.ts          (task-008)
│   │   └── mapper.ts         (task-009)
│   └── config/
│       └── paths.ts          (task-011)
├── tsconfig.json             (task-005)
├── tsdown.config.ts          (task-005)
├── vitest.config.ts          (task-016)
├── package.json              (task-003)
└── README.md                 (task-014)
```

---

## Success Criteria

✅ All 24 tasks complete  
✅ 75-80%+ test coverage (per-file)  
✅ CI/CD pipeline green  
✅ All tests passing  
✅ CLI executable (`gaiden` command works)  
✅ Documentation complete  
✅ Package publishable to npm
