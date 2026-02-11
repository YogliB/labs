# AI Coding Guidelines for labs

## Architecture Overview

This is a Bun-based monorepo with workspaces under `packages/`. The main project `commit-crawl` is a SolidStart application using Vinxi server, SolidJS for reactivity, and UnoCSS with wind4 preset for styling.

- **File-based routing**: Routes defined in `src/routes/` with file names like `index.tsx`, `about.tsx`, `[...404].tsx`
- **Path aliases**: `~/*` maps to `./src/*` (configured in `packages/commit-crawl/tsconfig.json`)
- **Components**: Placed in `src/components/`, imported with `~/components/...`

## Development Workflow

- **Package manager**: Use Bun for all operations (`bun install`, `bun run`)
- **Development**: `cd packages/commit-crawl && bun run dev` starts Vinxi dev server
- **Building**: `bun run build` in package directory
- **Linting/Formatting**: Root scripts `bun run lint` (ESLint with TypeScript, Prettier, SonarJS, Unicorn plugins) and `bun run format` (Prettier)

## Code Conventions

- **Styling**: Use UnoCSS utility classes (e.g., `text-sky-700`, `bg-gray-100` in `packages/commit-crawl/src/routes/index.tsx`). No custom CSS files.
- **JSX**: Preserve JSX (not transform) as per `packages/commit-crawl/tsconfig.json`
- **Imports**: Use path aliases for internal imports (e.g., `import Nav from "~/components/nav"` in `packages/commit-crawl/src/app.tsx`)
- **Router**: Use `@solidjs/router` with `<A>` for links, `useLocation()` for active states (see `packages/commit-crawl/src/components/nav.tsx`)
- **Suspense**: Wrap async content in `<Suspense>` (used in `packages/commit-crawl/src/app.tsx`)

## Key Files

- `packages/commit-crawl/app.config.ts`: Vite config with UnoCSS plugin
- `packages/commit-crawl/tsconfig.json`: TypeScript config with SolidJS JSX
- Root `eslint.config.mjs`: Shared linting rules across workspace
- Root `package.json`: Workspace config and dev scripts

## Communication Style

Follow the guidelines in `vscode-userdata:/Users/yogev.boaronben-har/Library/Application%20Support/Code/User/prompts/global.instructions.md`: Be direct, honest, challenge assumptions, correct technical errors without sugarcoating.</content>
<parameter name="filePath">/Users/yogev.boaronben-har/dev/oss/labs/AGENTS.md
