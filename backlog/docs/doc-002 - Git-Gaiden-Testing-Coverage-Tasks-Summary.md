---
id: doc-002
title: Git Gaiden - Testing & Coverage Tasks Summary
type: other
created_date: '2026-01-09 20:33'
---

# Git Gaiden Testing & Coverage Tasks Summary

## Overview

Created **9 comprehensive testing tasks** for vitest setup with per-file coverage reporting, autoUpdate snapshots, and automated CI/CD.

---

## Testing Tasks Created

### High Priority Tests (3)

#### Task 016: Configure vitest with coverage thresholds and reporting

- **Priority:** High
- **Status:** To Do
- **Description:** Set up vitest configuration with per-file coverage for functions, branches, statements, lines. Enable autoUpdate for snapshots. Coverage tracks only relevant src/ files.
- **Key Features:**
    - vitest.config.ts with coverage config
    - Per-file coverage reports (HTML, JSON, text)
    - autoUpdate enabled for snapshots
    - Coverage thresholds: 70%+ per metric
    - Excludes: dist/, node_modules/, test files
- **Acceptance Criteria:** 8 items
- **Implementation Plan:**
    1. Install vitest, @vitest/ui, @vitest/coverage-v8
    2. Create vitest.config.ts with coverage/snapshot config
    3. Add test scripts to package.json
    4. Verify HTML coverage report generation

---

#### Task 017: Create unit tests for git parser module

- **Priority:** High
- **Dependencies:** task-006 (Git Parser implementation)
- **Description:** Comprehensive unit tests for src/git/parser.ts with mocked simple-git.
- **Coverage Target:** 80%+ (lines, functions, branches, statements)
- **Test Areas:**
    - parseRepository() main function
    - detectMerges() helper
    - detectReverts() helper
    - buildBranchGraph() helper
    - CommitGraph output validation
    - Edge cases: empty repo, single commit, multiple branches
- **Implementation Plan:** 7 major test areas with specific test cases
- **Key Notes:**
    - Mock simple-git with vitest.mock()
    - Use test fixtures for git data
    - Test both happy path and error cases
    - Validate type safety of outputs

---

#### Task 018: Create unit tests for narrative engine

- **Priority:** High
- **Dependencies:** task-007 (Narrative Engine implementation)
- **Description:** Comprehensive unit tests for src/narrative/engine.ts and src/narrative/prompts.ts.
- **Coverage Target:** 80%+ (lines, functions, branches, statements)
- **Test Areas:**
    - NarrativeEngine.initialize() model loading
    - NarrativeEngine.generateScene() scene generation
    - buildScenePrompt() prompt formatting
    - Scene output validation
    - Choice generation (minimum 2, correct types)
    - Model error handling with fallback
    - Edge cases: empty message, many files, special commits
- **Key Notes:**
    - Mock model inference (no actual LLM calls)
    - Test deterministic template fallback
    - Validate scene text is 2-3 sentences
    - Test choice type classification (safe/risky/meta)

---

### Medium Priority Tests (5)

#### Task 019: Create unit tests for game state management

- **Priority:** Medium
- **Dependencies:** task-008 (Game State implementation)
- **Coverage Target:** 80%+ (lines, functions, branches, statements)
- **Test Areas:**
    - GameStateManager.load() with new/existing state
    - GameStateManager.save() persistence
    - GameStateManager.update() merging
    - GameStateManager.reset() clearing
    - Progress metrics calculation
    - State file location logic (repo-specific vs global)
    - Error handling: missing/corrupted files
- **Key Notes:**
    - Mock fs module with vitest.mock()
    - Test state file location logic
    - Validate JSON structure
    - Test timestamp/last-played tracking

---

#### Task 020: Create unit tests for story mapper

- **Priority:** Medium
- **Dependencies:** task-009 (Story Mapper implementation)
- **Coverage Target:** 75%+ (lines, functions, branches, statements)
- **Test Areas:**
    - mapCommitGraphToStory() transformation
    - Normal commit handling
    - Merge commit convergence events
    - Revert commit time-travel events
    - Branch point detection
    - Choice generation for different commit types
    - Multi-branch topology handling
    - Story graph traversability
- **Test Fixtures:** Various CommitGraph topologies
- **Key Notes:**
    - Test with various topologies (linear, branched, merged)
    - Validate choice labels are meaningful
    - Ensure story graph is fully traversable

---

#### Task 021: Create unit tests for scene caching system

- **Priority:** Medium
- **Dependencies:** task-010 (Scene Cache implementation)
- **Coverage Target:** 75%+ (lines, functions, branches, statements)
- **Test Areas:**
    - SceneCache.get() cache hit/miss
    - SceneCache.set() storage
    - SceneCache.clear() clearing
    - SceneCache.prune() LRU eviction
    - Cache file format validation
    - Concurrent access handling
    - Edge cases: multiple models, empty scenes
- **Key Notes:**
    - Mock fs module for file operations
    - Test cache key generation
    - Validate JSON serialization
    - Test LRU eviction ordering

---

#### Task 022: Create unit tests for config paths module

- **Priority:** Medium
- **Dependencies:** task-011 (Model Download implementation)
- **Coverage Target:** 80%+ (lines, functions, branches, statements)
- **Test Areas:**
    - XDG-compliant cache directory resolution
    - Platform-specific paths (Windows, macOS, Linux)
    - modelsDir, cacheDir, stateDir generation
    - Directory creation on first access
    - Environment variable handling
    - Fallback path logic
    - Edge cases: spaces, special chars, long paths
- **Key Notes:**
    - Mock process.env for environment
    - Test both XDG and fallback paths
    - Validate path separator handling
    - Test directory creation is idempotent

---

### Low Priority Tests (2)

#### Task 023: Create integration tests for CLI flow

- **Priority:** Low
- **Dependencies:** task-012 (CLI Entry Point implementation)
- **Description:** End-to-end integration tests for src/cli/index.ts.
- **Test Areas:**
    - CLI argument parsing with meow
    - Module orchestration (git → narrative → state)
    - Flag validation: --branch, --start, --model, --reset, --no-cache
    - Error scenarios: invalid repo, missing perms
    - Help output validation
    - Error message user-friendliness
- **Key Notes:**
    - Mock all core modules
    - Test flag combinations
    - Validate CLI help output
    - No actual LLM/git calls in tests

---

#### Task 024: Set up GitHub Actions workflow for automated testing

- **Priority:** Low
- **Description:** CI/CD workflow for automated testing and coverage reporting.
- **Key Features:**
    - Runs on PR and main branch push
    - Tests on Node 18, 20, 22
    - Coverage upload to Codecov
    - Fail if coverage drops below thresholds
    - HTML coverage artifact archival
    - PR check visibility
- **Implementation Plan:** 8-step setup with caching/optimization
- **Key Notes:**
    - Integrate with Codecov
    - Cache node_modules for speed
    - Under 5-minute build time target
    - Add badges to README

---

## Testing Strategy Summary

### Coverage Requirements

- **Lines:** 70-80% minimum (higher for critical modules)
- **Branches:** 70-80% minimum
- **Statements:** 70-80% minimum
- **Functions:** 70-80% minimum

### Modules Tested

| Module               | Priority | Target Coverage | Status   |
| -------------------- | -------- | --------------- | -------- |
| git/parser.ts        | High     | 80%+            | task-017 |
| narrative/engine.ts  | High     | 80%+            | task-018 |
| narrative/prompts.ts | High     | 80%+            | task-018 |
| game/state.ts        | Medium   | 80%+            | task-019 |
| game/mapper.ts       | Medium   | 75%+            | task-020 |
| narrative/cache.ts   | Medium   | 75%+            | task-021 |
| config/paths.ts      | Medium   | 80%+            | task-022 |
| cli/index.ts         | Low      | (integration)   | task-023 |

### Excluded from Coverage

- node_modules/
- dist/ (build output)
- \*_/_.test.ts (test files)
- \*_/_.spec.ts (spec files)
- src/types.ts (pure type definitions)

### Test Setup

- **Framework:** Vitest
- **UI:** @vitest/ui (optional, for development)
- **Coverage:** @vitest/coverage-v8
- **Reporters:** text, HTML, JSON, JSON-summary
- **Snapshots:** autoUpdate enabled
- **Environment:** node (not jsdom)

### Mocking Strategy

- simple-git: vitest.mock() for git operations
- fs: vitest.mock() for file operations
- process.env: vitest.mock() for environment variables
- Model inference: vitest.mock() to avoid LLM calls
- Ink/React rendering: vitest.mock() to avoid terminal output

---

## Implementation Order

### Phase 1: Core Setup (Before Core Module Tests)

1. **task-016** - Configure vitest (FIRST)
    - Must complete before any tests can run
    - Sets up vitest.config.ts and scripts

### Phase 2: Unit Tests for Core Modules

2. **task-017** - Git parser tests (after task-006 implemented)
3. **task-018** - Narrative engine tests (after task-007 implemented)
4. **task-019** - Game state tests (after task-008 implemented)
5. **task-020** - Story mapper tests (after task-009 implemented)
6. **task-021** - Scene cache tests (after task-010 implemented)
7. **task-022** - Config paths tests (after task-011 implemented)

### Phase 3: Integration & CI

8. **task-023** - Integration tests (after task-012 implemented)
9. **task-024** - GitHub Actions workflow (last)

---

## Coverage Report Outputs

After running `npm run test:coverage`:

```
coverage/
├── index.html          # Browseable coverage report
├── coverage-final.json # Machine-readable coverage data
├── coverage-summary.json # Summary statistics
└── <module>.html       # Per-file coverage reports
```

Each file shows:

- Line coverage percentage
- Function coverage percentage
- Branch coverage percentage
- Statement coverage percentage
- Highlighted source code with coverage info

---

## Key Metrics

- **Total Testing Tasks:** 9
- **High Priority:** 3 (vitest setup + 2 core unit tests)
- **Medium Priority:** 5 (unit tests for remaining modules)
- **Low Priority:** 2 (integration + CI/CD)

- **Expected Coverage Target:** 75-80% overall
- **Test Files to Create:** 7 (parser, engine, prompts, state, mapper, cache, paths, index)
- **Estimated Test Cases:** 50-70 individual tests

---

## Notes

- All tests use mocks to avoid external dependencies (git, LLM, filesystem)
- Tests should be fast (~1-2 seconds total for full suite)
- Coverage reports include both summary and per-file details
- autoUpdate enabled for snapshot-based tests
- CI workflow ensures coverage doesn't regress on new PRs
