# Activity 1: Custom Instructions vs. Prompt Files

> **Time:** 15 minutes
> **Where:** VS Code with your workshop repository open
> **Goal:** Learn which guidance should be always-on and which guidance should be reusable on demand

This activity teaches the core split from the workshop:
- **Custom instructions** are for durable project rules and architecture context.
- **Focused instructions** in `.github/instructions/` are for rules that should apply only to certain files or folders.
- **Prompt files** are for repeatable task prompts you want to invoke intentionally.

---

## What You're Building

By the end of this activity you will have:
1. A `.github/copilot-instructions.md` file for repo-wide guidance
2. A focused `*.instructions.md` file in `.github/instructions/`
3. A `.prompt.md` file in `.github/prompts/` for a repeated workflow
4. A concrete example of a prompt file that pins a model for a specific task

---

## Before You Start

Open Copilot Chat and ask a generic question about your repo, for example:

```text
What architecture patterns should I follow in this repository?
```

Notice what is missing or too generic. You will compare this to the result after your instruction file exists.

---

## Part A - Create Durable Custom Instructions

> **Suggested time:** 7 minutes

### Step A1 - Create the file

```bash
mkdir -p .github
touch .github/copilot-instructions.md
```

### Step A2 - Add the right kind of content

Custom instructions are best for guidance that should apply to almost every chat in this repo.

Good content:
- architecture cues
- stack choices
- naming conventions
- testing expectations
- security and error-handling guardrails
- your preferred response style

Bad content:
- one-off tasks
- temporary sprint notes
- issue-specific details
- giant pasted specs that only matter once

### Step A3 - Use this starter template

```markdown
# Project Context
- This repository is for: [describe the product or system]
- Primary language/runtime: [describe stack]
- Main frameworks/libraries: [list the important ones]

## Architecture Rules
- Keep [describe important modules or layers] separate
- Prefer [patterns you want] over [patterns you want to avoid]
- Follow existing naming and folder conventions before introducing new patterns

## Engineering Guardrails
- Validate external input before use
- Reuse existing helpers before adding new abstractions
- Add tests for new behavior changes
- Keep explanations concise unless deeper reasoning is requested

## My Workflow Preferences
- Start with a short answer, then add detail only if needed
- Flag risks and assumptions early
- When proposing code changes, explain the smallest sensible path first
```

### Step A4 - Keep it compact

Tell participants why this matters:
- these instructions ride along all the time
- long files cause dilution and context rot
- the goal is durable signal, not maximum word count

### Step A5 - Test it

Ask the same question again or try:

```text
Suggest a safe way to add a new feature in this repo.
```

Look for better use of the right stack, patterns, and response style.

### Success Criteria for Part A
- [ ] `.github/copilot-instructions.md` exists
- [ ] It contains durable repo guidance, not one-off tasks
- [ ] It includes at least one personal workflow preference
- [ ] You observed a more repo-aware response

---

## Part B - Add Focused Instructions in `.github/instructions/`

> **Suggested time:** 4 minutes

### Step B1 - Create the file

```bash
mkdir -p .github/instructions
touch .github/instructions/docs.instructions.md
```

### Step B2 - Add a focused rule set

Use focused instructions when the rule should apply only in a narrower context than the whole repo.

```markdown
---
name: Docs Writing Rules
description: Additional guidance for workshop and documentation markdown files
applyTo: "**/*.md"
---

# Documentation Instructions

- Lead with the main takeaway
- Prefer short sections with practical headings
- Use examples to make abstract AI customization concepts concrete
- Keep workshop directions action-oriented and easy to scan live
```

### Step B3 - Explain the split inside instructions

Use this rule of thumb:
- `.github/copilot-instructions.md` = repo-wide defaults
- `.github/instructions/*.instructions.md` = focused rules for matching files

### Success Criteria for Part B
- [ ] A `*.instructions.md` file exists in `.github/instructions/`
- [ ] The file includes `applyTo` in frontmatter
- [ ] The rules are clearly narrower than the repo-wide instruction file

---

## Part C - Create a Reusable Prompt File

> **Suggested time:** 8 minutes

### Step C1 - Pick a repeated task

Choose something you repeatedly ask for, such as:
- summarize a diff for review
- draft release notes
- create a small implementation plan
- produce a code review checklist
- write migration notes

### Step C2 - Create the prompt file

```bash
mkdir -p .github/prompts
touch .github/prompts/draft-release-notes.prompt.md
```

### Step C3 - Add frontmatter and pin a model

Use a prompt file when you want a repeatable ask with optional model/tool settings.

```markdown
---
name: draft-release-notes
description: Draft release notes from the current branch changes
model: GPT-5.4
---

# Draft Release Notes

Review the current branch changes and write release notes with these sections:
- Summary
- User-visible changes
- Risk areas
- Follow-up actions

Requirements:
- Be concrete
- Call out breaking changes explicitly
- Mention docs or migrations if they changed
```

> If your environment offers a premium model for this task, try swapping `model: GPT-5.4` for `Claude Opus 4.6` and compare. The important lesson is that prompt files can carry task-specific model preferences.

### Step C4 - Run it from chat

In Copilot Chat, type `/` and select your prompt file.

Then compare that experience to the instruction file:
- the repo-wide instruction file shapes every request
- the focused instruction file shapes matching files automatically
- the prompt file injects a specific task prompt only when invoked

### Step C5 - Explain the difference in one sentence

Finish with this rule of thumb:

> If it should happen in every chat, use `.github/copilot-instructions.md`. If it should happen only for matching files, use `.github/instructions/*.instructions.md`. If it should happen only when you ask for it, use a prompt file.

### Success Criteria for Part C
- [ ] A `.prompt.md` file exists in `.github/prompts/`
- [ ] The file includes `description` and `model` in frontmatter
- [ ] The prompt captures a repeated task
- [ ] You ran it from the `/` menu

---

## Quick Reflection

Answer in your own words:
1. What belongs in repo-wide instructions in your repo?
2. What belongs in focused instructions in `.github/instructions/`?
3. What repeated task is now a better fit for a prompt file?

---

## Commit Your Work

```bash
git add .github/copilot-instructions.md .github/instructions/ .github/prompts/
git commit -m "chore: add instructions and prompt files"
```

---

## Troubleshooting

| Problem | What to Check |
|---|---|
| Instructions still feel generic | Split repo-wide guidance from focused file-specific guidance and sharpen both |
| Focused instructions do not activate | Confirm the file is in `.github/instructions/`, ends with `.instructions.md`, and has a matching `applyTo` glob |
| Prompt file missing from `/` menu | Confirm the file is in `.github/prompts/` and ends with `.prompt.md` |
| Model pin seems ignored | Use a model available in your Copilot plan or remove the model temporarily |
| Everything is getting too long | Move durable guidance into instructions and keep prompt files narrowly scoped |

---

*← [Back to Workshop README](../README.md) · [Next: Activity 2 →](./activity-2.md)*
