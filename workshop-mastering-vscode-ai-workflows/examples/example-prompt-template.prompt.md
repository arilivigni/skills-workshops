---
name: draft-release-notes
description: Draft release notes from the current branch changes
model: GPT-5.4
---

# Draft Release Notes

## Model Choice
- Default option in this example: `GPT-5.4`
- Good alternative for deeper synthesis: `Claude Opus 4.6`
- Update the `model` frontmatter when you want the prompt to hardcode a different model for this task

Review the current branch changes and write release notes with these sections:
- Summary
- User-visible changes
- Risk areas
- Follow-up actions

Requirements:
- Be concrete and avoid filler
- Call out breaking changes explicitly
- Mention docs, migrations, or config changes when relevant
- If the task needs deeper synthesis, change the frontmatter to `model: Claude Opus 4.6`
