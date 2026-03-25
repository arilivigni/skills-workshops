---
description: Generate a structured PR description based on the current branch's staged changes and commit history
---

# PR Description Generator

## When to Use This
Invoke this prompt when you have a feature branch ready for review and want a well-structured PR description that communicates what changed, why, and what reviewers should focus on.

## Instructions

Review the staged changes and git log for the current branch compared to `main`. Then write a complete PR description using the format below.

Be specific and concrete — avoid generic filler like "various improvements" or "code cleanup." Every section should contain actual information about this change.

## Output Format

```markdown
## Summary

[2-3 sentences. What does this PR do, and why is it needed? Reference the issue or user story if one exists.]

Closes #[issue-number] *(remove if no issue)*

---

## What Changed

### [Area 1 — e.g., Backend / API / Database]
- [Specific change 1]
- [Specific change 2]

### [Area 2 — e.g., Tests / Config]
- [Specific change 1]

---

## Why This Approach

[1-3 sentences explaining any non-obvious design choices. Why did you solve it this way? What alternatives were considered?]

---

## Testing Done

- [ ] Unit tests: [describe what's covered or added]
- [ ] Integration tests: [describe scenario tested]
- [ ] Manual verification: [describe what you tested by hand and what you observed]

---

## Breaking Changes

[List any breaking changes with migration instructions, or write: **None**]

---

## Checklist

- [ ] All tests pass (`pnpm test`)
- [ ] No new linting errors (`pnpm lint`)
- [ ] Documentation updated (if public API changed)
- [ ] No hardcoded credentials, tokens, or secrets
- [ ] Follows project coding conventions
- [ ] Reviewed my own diff before submitting
```

## Project-Specific Requirements

- If the PR touches `prisma/schema.prisma`, add a **Database Changes** section describing the migration and any rollback considerations
- If the PR changes any API route signatures (path, method, request/response shape), mark it as a **Breaking Change** even if it's additive, since clients may depend on the current shape
- Flag any dependency additions or upgrades with the package name, old version, and new version
- If deployment steps beyond the standard CI pipeline are required (environment variable changes, manual data migration, cache flush), add a **Deployment Notes** section
- Security-sensitive changes (auth, permissions, token handling) should be flagged with ⚠️ in the Summary line
