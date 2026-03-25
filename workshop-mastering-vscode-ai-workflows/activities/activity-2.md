# Activity 2: Targeted Instructions & Prompt Files

> **⏱ Time:** 14 minutes total  
> **🔵 Must-do**  
> **📍 Where:** VS Code with your workshop repository open  
> **🔗 Prerequisite:** [Activity 1](./activity-1.md)

This activity has two short builds:
- **Part A:** create a targeted instructions file for a specific file type or folder
- **Part B:** create a reusable prompt file for a task you do repeatedly

---

## What You're Building

By the end of this activity you will have:
1. One `*.instructions.md` file in `.github/instructions/` that activates automatically for matching files
2. One `.prompt.md` file in `.github/prompts/` that you can run from the `/` menu in Copilot Chat

These solve different problems:
- **Targeted instructions** shape behavior automatically in specific contexts
- **Prompt files** package repeated tasks you want to invoke on demand

---

# Part A — Targeted Instructions

> **Suggested time:** 7 minutes

## Step A1 — Pick a Scoped Context

Choose one area of your repo where the assistant should behave differently.

Good examples:
- test files
- API handlers
- UI components
- docs files
- database access code

Write down:
- the folder or file type
- the behavior you want
- 2-4 rules that apply there but not everywhere

Examples:
- Tests should use Arrange-Act-Assert
- API handlers must validate input before use
- Docs should use second person and active voice
- UI components should prioritize accessibility and semantic HTML

---

## Step A2 — Create the Instructions File

Create the folder and file:

```bash
mkdir -p .github/instructions
touch .github/instructions/testing.instructions.md
```

Use the `.instructions.md` extension so VS Code recognizes it as a file-based instructions file.

Add YAML frontmatter with an `applyTo` glob.

### Example: test file instructions

```markdown
---
name: Testing Rules
description: Additional guidance for unit and integration test files
applyTo: "**/*.test.ts"
---

# Testing Rules

- Write tests using Arrange-Act-Assert
- Name tests as full behavior statements starting with "should"
- Test public behavior, not internal implementation details
- Reset mocks after each test
- Avoid TODO comments in tests
```

> If your project uses another language, change the glob. Examples: `**/*.spec.ts`, `**/*.py`, `**/*_test.go`, `docs/**/*.md`.

---

## Step A3 — Personalize the Rules

Now make the file real for your own workflow.

Add at least one rule that is specific to your project, team, or habits.

Examples:
- “In controller tests, always mock at the service layer, not the DB layer.”
- “For docs files, always include a short prerequisites section.”
- “In React components, prefer accessible labels over placeholder-only forms.”
- “For API tests, always assert both status code and response body shape.”

This is the workshop's personalization moment for Activity 2.

---

## Step A4 — Test It

Open a file that matches your `applyTo` glob and ask Copilot for help.

Examples:
```text
Add a test for the updateStatus function
```

```text
Improve this API handler to validate incoming input
```

Then compare by asking a similar question in a non-matching file.

### Success Criteria for Part A
- [ ] A file exists in `.github/instructions/`
- [ ] The file ends with `.instructions.md`
- [ ] It includes `applyTo` in YAML frontmatter
- [ ] The body contains specific, useful rules
- [ ] You tested it in at least one matching file

---

# Part B — Prompt Files

> **Suggested time:** 7 minutes

## Step B1 — Choose a Repeated Task

Pick a task you do often enough that retyping the prompt feels wasteful.

Good examples:
- writing PR descriptions
- generating unit test scaffolds
- producing README sections
- creating code review checklists
- asking for a security review
- generating migration notes

Write down:
- what task the prompt should do
- what output format you want
- what must always be included

---

## Step B2 — Create the Prompt File

Create the folder and file:

```bash
mkdir -p .github/prompts
touch .github/prompts/pr-description.prompt.md
```

### Example prompt file

```markdown
---
description: Generate a structured PR description for the current branch
---

# PR Description Generator

Review the current changes and write a PR description with these sections:
- Summary
- What Changed
- Testing Done
- Risks or Follow-up

Requirements:
- Be specific about what changed
- Do not use vague filler like "misc updates"
- Mention if docs, tests, or config changed
```

---

## Step B3 — Personalize the Prompt

Add at least one requirement that is specific to your team or workflow.

Examples:
- “Flag breaking API changes explicitly.”
- “Call out database migration risk if schema files changed.”
- “Use our team severity labels: Critical, Warning, Suggestion.”
- “Always include manual verification steps.”

---

## Step B4 — Run the Prompt

Open Copilot Chat and type `/`.

Your prompt file should appear in the menu. Select it and run it.

If it does not appear:
- confirm the file is in `.github/prompts/`
- confirm the extension is `.prompt.md`
- reload the VS Code window

### Success Criteria for Part B
- [ ] A `.prompt.md` file exists in `.github/prompts/`
- [ ] It includes a description in frontmatter
- [ ] It captures a repeated task
- [ ] It includes at least one personalized requirement
- [ ] You successfully invoked it from Copilot Chat

---

## Quick Reflection

Before moving on, answer these in your own words:
1. When would you use a targeted instructions file instead of a prompt file?
2. Which one will save you more time in your real workflow?

---

## Commit Your Work

```bash
git add .github/instructions/ .github/prompts/
git commit -m "chore: add targeted instructions and prompt files"
```

---

## Troubleshooting

| Problem | What to Check |
|---|---|
| Instructions don't seem active | Verify the file ends with `.instructions.md` and has a valid `applyTo` glob |
| Prompt file missing from `/` menu | Verify the file ends with `.prompt.md` and is inside `.github/prompts/` |
| Results still feel generic | Your rules may be too vague; rewrite them with stronger, concrete language |
| Matching files don't trigger the instruction | Open a file that clearly matches the glob and try again |

---

*← [Activity 1](./activity-1.md) · [Back to Workshop README](../README.md) · [Next: Activity 3 →](./activity-3.md)*
