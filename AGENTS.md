# AGENTS.md

## UI Design System

The UI design system for all code in this monorepo is Atomic Design. Organize components into atoms (basic elements like buttons), molecules (combinations of atoms), organisms (complex UI sections), templates (page layouts), and pages (specific instances).

Atomic components should be placed in corresponding subdirectories under `components/`: `atoms/`, `molecules/`, `organisms/`, `templates/`, `pages/`. Each subdirectory must have an `index.ts` or `index.tsx` file that exports all components within it.

For experiments (e.g., "create 5 variations for X"), bypass Atomic Design to prioritize speed and simplicity. Place experimental components directly in `components/experiments/` without breaking them into atomic parts.

## Component Standards

Each component must have:

- A Storybook story for visual testing and documentation
- A corresponding test file using Vitest for unit and integration tests

## Testing

All tests use Vitest with browser testing support (Playwright provider). Tests should be isolated, deterministic, and fast. Focus on user-centric scenarios and behavior assertions.

## Commits and Verification

When committing and pushing, using `--no-verify` is strictly prohibited unless given direct instruction or explicit permission. Always run linting, formatting, type checking, and tests before commits. Husky hooks enforce pre-commit and pre-push checks.

## Code Reuse in Monorepo

Leverage existing code wherever possible. Reuse components, utilities, and patterns from packages like `commit-crawl`. Take inspiration from existing implementations (e.g., SolidJS components with UnoCSS/DaisyUI styling, file-based routing). Follow established conventions from instruction files (e.g., no comments, intention-revealing names, honesty in communication).

## Agent Skills Integration

Before tasks involving UI design, load the `frontend-design` skill. For new features, use `test-driven-development`. For code reviews, apply `verification-before-completion`. Reference `.agents/skills/` for specialized workflows.
