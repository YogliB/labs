---
name: masterplan-update-status
description: Sync PR status across an entire masterplan document, ensuring consistency between GitHub and the plan.
---

# Update Masterplan Status Command

## Description

Sync PR status across an entire masterplan document, ensuring consistency between GitHub and the plan.

## Trigger

User asks to update status in a masterplan file.

## Steps

1. **Identify Context**: Determine target file and PR(s).
2. **Get Status**: Use `gh pr view` (if network available) or manual input.
3. **Map Status**:
    - OPEN(draft) → 🟣 Planned
    - OPEN(active) → 🟡 In Progress
    - OPEN(review) → 🟠 Pending Review
    - READY_FOR_REVIEW → 🔵 Ready
    - MERGED → 🟢 Completed
    - CLOSED → ⚫ Cancelled
4. **Update**:
    - Implementation Table.
    - PR Headers.
    - Status Fields.
    - Deployment Headers.
    - Cross-Repo Tables.
5. **Link**: Ensure PR links are present and correct.
6. **Save**: Write updated content to file.

## Output Format

Updated Markdown file content.

## Examples (Optional)

`/update-masterplan-status @plan.md PR1`
