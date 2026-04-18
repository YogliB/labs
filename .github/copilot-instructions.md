# Copilot Instructions for Labs Monorepo

## Architecture Overview

- **Monorepo Structure**: Uses Bun workspaces with packages under `packages/`.
- **Code Quality**: Lint with `bun run lint` (ESLint + Prettier auto-fix), format with `bun run format`, check unused deps with `bun run knip`. Husky pre-commit hooks enforce via lint-staged.

## Project Conventions

- **TypeScript**: Strict mode enabled; use ESLint rules from `unicorn`, `sonarjs`, `import` plugins.
- **Commits**: Pre-commit hooks run lint/format; ensure clean builds before pushing.
