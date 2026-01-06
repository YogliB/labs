<CRITICAL_INSTRUCTION>

## BACKLOG WORKFLOW INSTRUCTIONS

This project uses Backlog.md MCP for all task and project management activities.

**CRITICAL GUIDANCE**

- If your client supports MCP resources, read `backlog://workflow/overview` to understand when and how to use Backlog for this project.
- If your client only supports tools or the above request fails, call `backlog.get_workflow_overview()` tool to load the tool-oriented overview (it lists the matching guide tools).

- **First time working here?** Read the overview resource IMMEDIATELY to learn the workflow
- **Already familiar?** You should have the overview cached ("## Backlog.md Overview (MCP)")
- **When to read it**: BEFORE creating tasks, or when you're unsure whether to track work

These guides cover:

- Decision framework for when to create tasks
- Search-first workflow to avoid duplicates
- Links to detailed guides for task creation, execution, and completion
- MCP tools reference

You MUST read the overview resource to understand the complete workflow. The information is NOT summarized here.

</CRITICAL_INSTRUCTION>

# Coding Rules

## Principle

Code must **explain itself** — no comments.

## Guidelines

- Use **clear, intention-revealing names**.
- Keep functions **small, focused, testable**.
- Prefer **simple control flow** (early returns).
- Express intent via **types & tests**.
- Document design in **Markdown**, not code.
- Follow **Clean Code**: clarity > cleverness.
- Don't over-engineer; YAGNI.

### Checklist

- **SRP**: one purpose per unit.
- **DRY**: no duplication.
- **KISS**: simple > complex.
- **Pure**: avoid side effects.
- **Readable > Optimal**.
- **Consistent style**.

## Naming

- Functions = verbs (`fetchUserProfile`)
- Types = nouns (`RetryPolicy`)
- Clarity > brevity (`timeoutMs` not `t`)
- Include units/context (`fileSizeBytes`)

## Comments

- Allowed: auto-generated headers/licenses.
- Forbidden: inline comments, docstrings, TODO/FIXME.

# Core Rules

- Use **user’s language** unless asked otherwise.
- Keep tone **natural, conversational, transparent when relevant**.
- **No unnecessary apologies**.
- If info is unknown, **say so**; use web search if allowed.
- **Validate facts** with credible sources, don’t rely only on internal knowledge.
- Avoid disclaimers except for **sensitive/high-risk topics**.
- Responses must be **concise, unique, non-repetitive**.
- Focus on **user intent**; answer directly.
- Break down **complex tasks** into clear steps.
- Offer **multiple solutions** when possible.
- Ask for **clarification** if unclear.
- **Cite sources** with links when referencing facts.
- **Correct mistakes** when identified.
- **Ask before creating files.** If unsure about scope, confirm: _"Create one file or multiple?"_ Default to minimal.
- **Minimize artifacts.** Don't create 5 files when 1 suffices. Pause if creating 3+ files—reconsider necessity.
