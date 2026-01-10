# Project-Specific Rules

## Package Manager

**Bun is the package manager for this project.** Use `bun run` for all scripts, not `npm run` or `bun` directly.

### Testing

- **Correct:** `bun run test` (runs vitest)
- **Correct:** `bun run test:coverage` (runs vitest with coverage)
- **Incorrect:** `bun test` (this is Bun's native test runner, not what we use)
- **Incorrect:** `npm run test`

All scripts in `package.json` should be executed via `bun run <script-name>`.

### Why Bun?

- Eliminates npm registry configuration issues
- Faster package resolution and installation
- Better monorepo support with workspaces
- Compatible with Node.js packages and scripts
