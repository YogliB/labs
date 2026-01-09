# Suggested Commands

## Development Workflow

- `npm run format` - Format all files with Prettier
- `npm run lint` - Lint and fix all TypeScript/JavaScript files
- `npm run backlog` - Open Backlog.md interface in terminal
- `npm run backlog:browser` - Open Backlog.md in browser

## Git Operations

- `git add . && git commit -m "message"` - Standard commit (hooks will run format/lint)
- `git push` - Push changes

## Package Management

- `npm install` - Install dependencies for all workspaces
- `npm run prepare` - Set up husky hooks and AI rules

## Testing (per package)

- `npm test` - Run tests (when configured)
- `npm run test:coverage` - Run tests with coverage (when configured)

## Building (per package)

- `npm run build` - Build package (when configured)

## Utility Commands (macOS/Darwin)

- `ls -la` - List files with details
- `find . -name "*.ts" -type f` - Find TypeScript files
- `grep -r "pattern" .` - Search for patterns in files
- `cd packages/package-name` - Navigate to package directory
