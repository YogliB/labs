# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Package Manager and Runtime

This project uses **Bun** as the package manager and runtime. Node version is pinned to 24.13.1 via Volta. Always use `bun` instead of `npm` or `yarn`.

```bash
bun install          # Install dependencies (also sets up Husky hooks)
bun run format       # Format all files with Prettier
bun run lint         # Lint and auto-fix with ESLint
bun run knip         # Detect unused exports and dependencies
```

For per-package commands (once packages exist), run them from the package directory or use Bun workspace filtering.

## Repository Structure

This is a **Bun monorepo** with packages under `packages/*`. The root manages shared tooling; all application code lives in individual packages.

Agent skills for specialized workflows live in `.agents/skills/`:
- `solidjs/` — SolidJS patterns, signals, stores, SolidStart
- `daisyui/` — DaisyUI/Tailwind component reference

Before working on UI tasks, load the relevant skill from `.agents/skills/`.

## Code Style

- **Tabs** for indentation (4 spaces wide), single quotes, LF line endings
- TypeScript strict mode throughout
- ESLint plugins active: `typescript-eslint` (strict + stylistic), `unicorn`, `sonarjs`, `import`, `storybook`, `prettier`
- Intention-revealing names; no comments unless the why is non-obvious

## UI Architecture: Atomic Design

All UI components follow Atomic Design and live under `components/` within each package:

```
components/
  atoms/          # Basic elements (buttons, inputs)
  molecules/      # Combinations of atoms
  organisms/      # Complex UI sections
  templates/      # Page layouts
  pages/          # Specific page instances
  experiments/    # Exploratory work — skip atomic breakdown here
```

Each subdirectory (`atoms/`, `molecules/`, etc.) must export all its components via an `index.ts` or `index.tsx` barrel file.

## Component Requirements

Every component must have:
1. A **Storybook story** for visual testing and documentation
2. A **Vitest test file** using the Playwright browser provider

Tests should be isolated, deterministic, and behavior-focused (user-centric scenarios).

## Git Hooks

Husky enforces quality gates automatically:
- **Pre-commit** (`lint-staged`): Prettier on all changed files; ESLint on `*.{js,ts,tsx}`
- **`--no-verify` is strictly prohibited** unless given explicit permission

Always ensure linting, formatting, type checking, and tests pass before committing.
