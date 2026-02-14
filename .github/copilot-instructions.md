# Copilot Instructions for Labs Monorepo

## Architecture Overview

- **Monorepo Structure**: Uses Bun workspaces with packages under `packages/`. Currently contains `commit-crawl`, a client-side SolidJS app for interactive git commit exploration.
- **Frontend Stack**: SolidJS with @solidjs/start (Vinxi) for SSR-ready routing. File-based routes in `src/routes/`, components in `src/components/`.
- **Styling**: UnoCSS with Wind4 preset and DaisyUI components. Import `virtual:uno.css` and `daisyui/dist/full.css` in `app.tsx`.
- **Data Flow**: Pure client-side; no backend or external APIs yet. Reactive UI with SolidJS signals/effects.
- **Example**: `terminal-home.tsx` demonstrates terminal-themed UI using UnoCSS classes (e.g., `min-h-screen bg-black text-green-400`) and DaisyUI buttons.

## Key Workflows

- **Development**: Run `bun run cc:dev` (root script) to start Vinxi dev server. Builds with `vinxi build`, serves with `vinxi start`.
- **Component Development**: Use `bun run cc:storybook` for Storybook at port 6006. Tests via Vitest with Playwright browser provider.
- **Code Quality**: Lint with `bun run lint` (ESLint + Prettier auto-fix), format with `bun run format`, check unused deps with `bun run knip`. Husky pre-commit hooks enforce via lint-staged.
- **Build Verification**: Always run `vinxi build` after changes; check for TypeScript errors and unused imports.

## Project Conventions

- **Imports**: Use `~` alias for `src/` (configured in `vite.config.ts`). Import SolidJS from `solid-js`, router from `@solidjs/router`.
- **Styling**: Prefer UnoCSS utility classes over custom CSS. DaisyUI for pre-built components (e.g., buttons in `terminal-home.tsx`).
- **TypeScript**: Strict mode enabled; use ESLint rules from `unicorn`, `sonarjs`, `import` plugins. Ignore virtual imports like `virtual:uno.css`.
- **Routing**: File-based with `@solidjs/start/router`. Wrap routes in `<Suspense>` for async loading.
- **Testing**: Vitest for unit tests, integrated with Storybook. No manual test files observed yet—add `.test.ts` or `.stories.ts` as needed.
- **Commits**: Pre-commit hooks run lint/format; ensure clean builds before pushing.

## Integration Points

- None currently; app is self-contained. Future git integration likely via client-side parsing (inspired by `terminal-home.tsx` mock commands).

Reference: `packages/commit-crawl/src/app.tsx`, `vite.config.ts`, root `eslint.config.mjs`.
