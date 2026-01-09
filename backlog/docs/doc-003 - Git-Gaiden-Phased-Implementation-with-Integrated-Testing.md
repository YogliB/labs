---
id: doc-003
title: Git Gaiden - Phased Implementation with Integrated Testing
type: other
created_date: '2026-01-09 20:37'
---

# Git Gaiden - Phased Task Breakdown with Integrated Testing

## Phase 1: Foundation & Setup

**Goal:** Initialize project structure and establish testing infrastructure

### Implementation

- **task-003**: Initialize git-gaiden package structure and configuration
- **task-004**: Create core types and domain models
- **task-005**: Set up TypeScript and tsdown build configuration

### Testing

- **task-016**: Configure vitest with coverage thresholds and reporting

**Rationale:** Vitest must be configured first to support all subsequent test tasks

---

## Phase 2: Git Parsing Module

**Goal:** Parse git repositories and extract commit information

### Implementation

- **task-006**: Implement git parser module for repository analysis

### Testing

- **task-017**: Create unit tests for git parser module

**Dependencies:** task-006 → task-017 (implementation then tests)

---

## Phase 3: Narrative Engine

**Goal:** Transform commits into story scenes using LLM

### Implementation

- **task-007**: Implement narrative engine with local LLM integration

### Testing

- **task-018**: Create unit tests for narrative engine

**Dependencies:** task-007 → task-018 (implementation then tests)

---

## Phase 4: Game State & Story Mapping

**Goal:** Manage game state and map git commits to story graph

### Implementation

- **task-008**: Implement game state management and persistence
- **task-009**: Build commit-to-story graph mapper

### Testing

- **task-019**: Create unit tests for game state management
- **task-020**: Create unit tests for story mapper

**Dependencies:**

- task-008 → task-019
- task-009 → task-020

---

## Phase 5: Infrastructure - Caching & Configuration

**Goal:** Add performance optimization and platform-specific configuration

### Implementation

- **task-010**: Implement scene caching system
- **task-011**: Create model download and initialization flow

### Testing

- **task-021**: Create unit tests for scene caching system
- **task-022**: Create unit tests for config paths module

**Dependencies:**

- task-010 → task-021
- task-011 → task-022

---

## Phase 6: CLI & User Interface

**Goal:** Build command-line interface and interactive UI

### Implementation

- **task-012**: Create CLI entry point with meow argument parsing
- **task-013**: Build Ink UI components for scene rendering

### Testing

- **task-023**: Create integration tests for CLI flow

**Dependencies:** task-012, task-013 → task-023 (both implementations complete before integration tests)

---

## Phase 7: Documentation & Continuous Integration

**Goal:** Document project and set up automated testing/deployment

### Documentation

- **task-014**: Write package README.md documentation
- **task-015**: Update root README.md with git-gaiden reference

### CI/CD

- **task-024**: Set up GitHub Actions workflow for automated testing and coverage

**Note:** Can be done in parallel with other phases; primarily blocks on all previous phases being testable

---

## Task Count by Phase

| Phase                   | Implementation | Testing | Total  |
| ----------------------- | -------------- | ------- | ------ |
| 1: Foundation           | 3              | 1       | 4      |
| 2: Git Parsing          | 1              | 1       | 2      |
| 3: Narrative Engine     | 1              | 1       | 2      |
| 4: Game State & Mapping | 2              | 2       | 4      |
| 5: Infrastructure       | 2              | 2       | 4      |
| 6: CLI & UI             | 2              | 1       | 3      |
| 7: Docs & CI/CD         | 2              | 1       | 3      |
| **TOTAL**               | **13**         | **9**   | **24** |

---

## Priority Distribution by Phase

### Phase 1 (Foundation)

- task-003: **HIGH** ✓
- task-004: **HIGH** ✓
- task-005: **HIGH** ✓
- task-016: **HIGH** ✓

### Phase 2 (Git Parsing)

- task-006: **HIGH** ✓
- task-017: **HIGH** ✓

### Phase 3 (Narrative Engine)

- task-007: **HIGH** ✓
- task-018: **HIGH** ✓

### Phase 4 (Game State & Mapping)

- task-008: **MEDIUM**
- task-009: **MEDIUM**
- task-019: **MEDIUM**
- task-020: **MEDIUM**

### Phase 5 (Infrastructure)

- task-010: **MEDIUM**
- task-011: **MEDIUM**
- task-021: **MEDIUM**
- task-022: **MEDIUM**

### Phase 6 (CLI & UI)

- task-012: **HIGH** ✓
- task-013: **HIGH** ✓
- task-023: **LOW**

### Phase 7 (Docs & CI/CD)

- task-014: **MEDIUM**
- task-015: **LOW**
- task-024: **LOW**

---

## Recommended Implementation Strategy

### Critical Path (Must Do First)

1. **Phase 1** - Sets up entire project and testing infrastructure
2. **Phase 2** - Core git parsing capability
3. **Phase 3** - Core narrative generation capability

### Essential Path (Before MVP)

4. **Phase 4** - Game state and story graph (enables playable experience)
5. **Phase 6** - CLI and UI (enables user interaction)

### Polish & Distribution

6. **Phase 5** - Caching and config (optimization, but not blocking MVP)
7. **Phase 7** - Documentation and CI/CD (for publication and maintenance)

---

## Testing Per Phase

### Phase 1: Foundational Testing

- vitest configuration with coverage reporting
- Enables all subsequent tests to run
- No unit tests needed yet (no implementation to test)

### Phase 2: Unit Tests for Git Parser

- Mock simple-git to avoid real git operations
- Test parsing logic, helpers, edge cases
- Target coverage: 80%+

### Phase 3: Unit Tests for Narrative Engine

- Mock LLM inference to avoid actual model calls
- Test prompt generation, scene creation, fallbacks
- Target coverage: 80%+

### Phase 4: Unit Tests for Game Logic

- Mock file operations for state persistence
- Test state management, progress tracking, story mapping
- Target coverage: 75-80%+

### Phase 5: Unit Tests for Infrastructure

- Mock file operations for caching and config
- Test LRU eviction, path resolution, environment handling
- Target coverage: 75-80%+

### Phase 6: Integration Tests

- Mock all core modules (git, narrative, state)
- Test CLI argument parsing and flag handling
- Test module orchestration (git → narrative → state → UI)
- No coverage threshold (integration level)

### Phase 7: No New Tests

- Documentation and CI/CD don't require tests
- GitHub Actions workflow verifies all previous tests pass

---

## Phase Duration Estimates

| Phase     | Implementation | Testing    | Total      | Status       |
| --------- | -------------- | ---------- | ---------- | ------------ |
| 1         | 2-3h           | 1h         | 3-4h       | Foundation   |
| 2         | 2-3h           | 1-2h       | 3-5h       | Critical     |
| 3         | 3-4h           | 2-3h       | 5-7h       | Critical     |
| 4         | 3-4h           | 2-3h       | 5-7h       | Essential    |
| 5         | 3-4h           | 2-3h       | 5-7h       | Polish       |
| 6         | 4-5h           | 2h         | 6-7h       | Essential    |
| 7         | 2h             | -          | 2h         | Distribution |
| **TOTAL** | **19-23h**     | **10-14h** | **29-37h** | Complete     |

---

## Test Coverage Summary by Phase

### Phase 1: Vitest Setup (foundational)

- No coverage % targets (setup phase)
- Outputs: vitest.config.ts, test scripts in package.json
- Enables: all subsequent test execution

### Phase 2: Git Parser (critical)

- **Target:** 80%+ lines, functions, branches, statements
- **Files:** src/git/parser.ts
- **Tests:** 12-15 test cases

### Phase 3: Narrative Engine (critical)

- **Target:** 80%+ lines, functions, branches, statements
- **Files:** src/narrative/engine.ts, src/narrative/prompts.ts
- **Tests:** 15-18 test cases

### Phase 4: Game Logic (essential)

- **Target:** 75-80%+ lines, functions, branches, statements
- **Files:** src/game/state.ts, src/game/mapper.ts
- **Tests:** 18-22 test cases

### Phase 5: Infrastructure (polish)

- **Target:** 75-80%+ lines, functions, branches, statements
- **Files:** src/narrative/cache.ts, src/config/paths.ts
- **Tests:** 12-16 test cases

### Phase 6: Integration (UI level)

- **Target:** End-to-end flow validation
- **Files:** src/cli/index.ts
- **Tests:** 8-12 integration test cases

### Phase 7: CI/CD (automation)

- **Outputs:** GitHub Actions workflow
- **Enables:** Automated testing on every PR/push
- **Validates:** All coverage thresholds in CI

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

## Next Steps

1. Start Phase 1: Foundation and vitest setup
2. After each implementation task: Immediately follow with corresponding test task
3. Before moving to next phase: Ensure previous phase tests all pass with ≥75% coverage
4. Phase 7 (last): Documentation and CI/CD setup after all modules tested
