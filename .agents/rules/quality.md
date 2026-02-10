# Guardrails

## Linting

Never disable lint rules in any way unless given direct instructions to do so or clear permission from the user. This includes:

- Disabling rules via inline comments (e.g., `// eslint-disable-next-line`)
- Disabling rules in configuration files
- Suppressing warnings or errors in any linting tool
- Using escape hatches or workarounds to bypass lint checks

If a lint rule conflict arises, discuss it with the user first before making any changes to the linting configuration.

## Code Quality

Always format and lint files only after finishing a task, not in the middle of work. This prevents false-positives and ensures you're checking complete, coherent code rather than partially modified state. Run formatting and linting as the final step before marking work as complete.
