# Example Agent Skill

Copy the structure below into `.github/skills/<skill-name>/SKILL.md` when you want to scaffold a reusable skill.

```markdown
---
name: pr-review-helper
description: Helps perform structured pull request reviews. Use this when asked to review a PR, branch diff, or staged changes for risks, testing gaps, and rollout concerns.
---

# PR Review Helper

## When to Use This Skill
Use this skill when reviewing code changes that need a structured summary and risk check.

## Workflow
1. Summarize the change in plain language
2. Identify risky or high-impact areas
3. Check for missing tests, docs, or migrations
4. Call out deployment or rollout concerns
5. End with recommended next steps

## Output Format
- Summary
- Risks
- Missing Coverage
- Rollout Notes
- Next Steps
```
