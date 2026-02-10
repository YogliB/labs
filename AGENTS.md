# AI Coding Guidelines for Labs Monorepo

## Architecture Overview

This is a monorepo using npm workspaces, containing experimental projects. The main package is `commit-crawl`, a SolidStart application.

- **Framework**: SolidJS with SolidStart for full-stack development
- **Styling**: UnoCSS with Wind4 preset for utility-first CSS
- **Build Tool**: Vinxi for server-side rendering and bundling
- **Language**: TypeScript throughout

## Development Workflow

- **Start dev server**: `cd packages/commit-crawl && npm run dev` (uses Vinxi dev server)
- **Build**: `cd packages/commit-crawl && npm run build`
- **Lint and format**: From root, `npm run lint` (ESLint with auto-fix) and `npm run format` (Prettier)
- **Backlog management**: `npm run backlog` or `npm run backlog:browser` using backlog.md

## Code Patterns

- **File-based routing**: Routes defined in `src/routes/` with file names like `index.tsx`, `about.tsx`
- **Component structure**: Components in `src/components/`, imported with `~` alias (e.g., `~/components/nav`)
- **Styling**: Use UnoCSS classes directly in JSX, e.g., `class="text-center mx-auto text-gray-700 p-4"`
- **Router usage**: Use `@solidjs/router` for navigation, e.g., `<A href="/about">` for links
- **Reactive state**: Use `createSignal` for local state, e.g., in `counter.tsx`

## File Structure

- `packages/commit-crawl/src/app.tsx`: Main app component with router setup
- `packages/commit-crawl/src/routes/`: Page components
- `packages/commit-crawl/src/components/`: Reusable components
- `packages/commit-crawl/app.config.ts`: Vite config with UnoCSS plugin
- Root `package.json`: Monorepo scripts and dev dependencies

## Conventions

- TypeScript with `type: "module"` in package.json
- ESLint config in root `eslint.config.mjs` with plugins for TypeScript, Prettier, etc.
- Prettier config in `.prettierrc`
- Git hooks with Husky for pre-commit linting
