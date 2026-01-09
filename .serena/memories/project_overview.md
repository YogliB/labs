# Project Overview

This is a **labs** monorepo project for developing various packages and tools. It's a workspace-based setup using npm workspaces, with packages located in the `packages/` directory.

## Tech Stack

- **Language**: TypeScript
- **Linting**: ESLint with strict TypeScript rules, SonarJS, Unicorn, Import plugin
- **Formatting**: Prettier (tabs, single quotes, tab width 4)
- **Task Management**: Backlog.md MCP for all project management
- **Git Hooks**: Husky for pre-commit hooks
- **CI/CD**: Not yet configured

## Code Style & Conventions

- **Principle**: Code must explain itself - no comments allowed
- **Naming**: Functions = verbs (`fetchUserProfile`), Types = nouns (`RetryPolicy`)
- **Functions**: Small, focused, testable, prefer early returns
- **Design**: Clean Code, clarity > cleverness, YAGNI, no over-engineering
- **Types**: Express intent via types, not comments
- **Documentation**: In Markdown files, not code
- **Checklist**: SRP, DRY, KISS, pure functions, readable > optimal

## Project Structure

```
labs/
├── packages/          # Workspace packages
├── backlog/           # Task management (Backlog.md)
├── .husky/           # Git hooks
├── .ai/              # AI rules and instructions
├── AGENTS.md         # Generated coding rules
├── package.json      # Root workspace config
├── eslint.config.mjs # Linting config
├── .prettierrc       # Formatting config
└── .editorconfig     # Editor settings
```
