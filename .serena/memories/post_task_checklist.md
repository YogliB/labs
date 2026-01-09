# Post Task Checklist

After completing any coding task, run these commands in order:

1. **Format code**: `npm run format`
    - Ensures consistent formatting with Prettier (tabs, single quotes)

2. **Lint code**: `npm run lint`
    - Fixes ESLint issues automatically
    - Checks for TypeScript errors, code quality, imports

3. **Test code**: `npm test` (if tests exist)
    - Runs unit tests to ensure functionality
    - Checks test coverage if configured

4. **Commit changes**: `git add . && git commit -m "descriptive message"`
    - Husky hooks will run format and lint automatically
    - Use clear, descriptive commit messages

5. **Push changes**: `git push`
    - Makes changes available to others

## Notes

- All changes should be committed with passing lint and format checks
- If lint fails, address the issues before committing
- Tests should pass before pushing (when applicable)
- Use Backlog.md to track task progress and completion
