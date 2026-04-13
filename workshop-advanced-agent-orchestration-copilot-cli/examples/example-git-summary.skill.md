---
name: git-summary
description: Produce a concise summary of recent Git commits in the current repository. Use this skill when asked to summarize recent changes, generate a changelog section, or review what has been committed recently.
---

# Git Summary Skill

## When to Use This Skill
Use this skill when the task involves:
- Summarizing recent commits for a PR description or release note
- Generating a changelog section for the current sprint or version
- Understanding what work has been merged recently before starting a review

## Workflow
1. Run the helper script to retrieve the last 20 commits (or a custom count if specified).
2. Group commits by type if conventional commit prefixes are present (`feat:`, `fix:`, `chore:`, `docs:`, etc.).
3. Write a plain-language summary of what changed and who contributed.
4. Flag any commits that touch security-sensitive paths (auth, secrets, permissions) or include breaking-change markers.
5. Return the summary — do not make code changes.

## Resources
- Helper script: [summarize_git.sh](./summarize_git.sh)

## Output Format
### Recent Changes Summary
[Plain-language summary grouped by type if possible]

### Notable Commits
- [hash] [type] [description] — [author]

### Flagged Items
- [Any commits touching security paths or marked as breaking changes]
