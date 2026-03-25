# Activity 3: Custom Agents & Agent Skills

> **⏱ Time:** 13 minutes  
> **🟡 Flexible** — complete the agent portion first; use the skill portion if time remains  
> **📍 Where:** VS Code with your workshop repository open  
> **🔗 Prerequisite:** [Activity 1](./activity-1.md) and [Activity 2](./activity-2.md)

This activity helps participants understand two advanced customization types:
- **Custom agents** for specialized roles
- **Agent skills** for reusable capabilities and workflows

---

## The Difference in One Sentence Each

- **Custom agent:** “Act like this specialist, with these tools and boundaries.”
- **Agent skill:** “When this type of task appears, load this reusable capability package.”

If you remember only one thing, remember this:
- use an **agent** for a role
- use a **skill** for a reusable capability or workflow

---

# Part A — Build a Custom Agent

> **Suggested time:** 9 minutes  
> **Priority:** Must-do

## Step A1 — Pick a Specialist Role

Choose a role that would genuinely help in your workflow.

Examples:
- documentation reviewer
- security reviewer
- test generator
- API design reviewer
- refactor coach

Write down:
- the role name
- what it should do
- what it should avoid doing
- what tools it needs

---

## Step A2 — Create the Agent File

Create the folder and file:

```bash
mkdir -p .github/agents
touch .github/agents/doc-writer.agent.md
```

Custom agents in VS Code are stored as Markdown files with the `.agent.md` extension.

> **Tip:** Keep your first agent simple. You can always add more tools or model preferences later.

Use this starter template:

```markdown
---
name: Doc Writer
description: Helps write and improve code documentation in this repository
tools: ['search/codebase']
---

# Role
You are a documentation specialist for this codebase.

# Responsibilities
- Improve JSDoc, docstrings, and README content
- Read related files before suggesting documentation
- Prefer concise, concrete explanations

# Boundaries
- Do not refactor code unless asked
- Do not review style or performance unless it affects documentation

# Output Format
- Start with a short summary
- Then list recommended documentation changes
- End with any unanswered questions
```

---

## Step A3 — Personalize the Agent

Make the instructions specific to your workflow.

Ideas:
- require a certain review format
- enforce your team's vocabulary
- make the agent ask clarifying questions before acting
- force the agent to stay narrow and avoid generic advice

Examples:
- “Always point out missing examples in public APIs.”
- “Use our severity levels: Critical, Warning, Suggestion.”
- “If the request is ambiguous, ask one clarifying question before proposing edits.”

---

## Step A4 — Run the Agent

In VS Code, open Copilot Chat and select your custom agent from the agents picker.

Then give it a real task, such as:

```text
Review the documentation in src/utils/parser.ts and suggest improvements.
```

```text
Generate JSDoc for the public functions in this file.
```

Observe:
- does it stay in role?
- does it follow your requested output format?
- does it avoid tasks you told it not to do?

### Success Criteria for Part A
- [ ] A `.agent.md` file exists in `.github/agents/`
- [ ] The file has YAML frontmatter and Markdown instructions
- [ ] The agent has a specific role and clear boundaries
- [ ] You ran the agent on a real task

---

# Part B — Understand or Scaffold an Agent Skill

> **Suggested time:** 4 minutes  
> **Priority:** Flexible

Agent skills are useful when you want something more reusable than a prompt file and more portable than a repo-specific instruction.

A skill can include:
- a `SKILL.md` file with instructions
- examples
- supporting resources
- scripts or templates

## Step B1 — Create a Starter Skill Folder

```bash
mkdir -p .github/skills/pr-review-helper
touch .github/skills/pr-review-helper/SKILL.md
```

Add this starter template:

```markdown
---
name: pr-review-helper
description: Helps perform structured pull request reviews. Use this when asked to review a PR for risks, missing tests, and rollout concerns.
---

# PR Review Helper

## When to Use This Skill
Use this skill when reviewing a pull request, a branch diff, or a set of staged changes.

## Workflow
1. Summarize the change
2. Identify risky areas
3. Check for missing tests or docs
4. Highlight rollout or migration concerns
5. End with clear next steps
```

## Step B2 — Explain Why This Is a Skill

Write one sentence below the workflow answering:

> Why is this better as a skill than as a one-off prompt?

Examples:
- because it is a repeated multi-step review pattern
- because the team can share it
- because it may later include examples or scripts

### Success Criteria for Part B
- [ ] `.github/skills/<skill-name>/SKILL.md` exists **or** you can clearly explain the structure verbally
- [ ] You can explain when a skill is a better fit than a prompt file

---

## Commit Your Work

```bash
git add .github/agents/ .github/skills/
git commit -m "chore: add custom agent and starter skill"
```

> If you only completed the agent portion, commit just `.github/agents/`.

---

## Troubleshooting

| Problem | What to Check |
|---|---|
| Agent does not appear in VS Code | Confirm the file is in `.github/agents/` and ends with `.agent.md` |
| Agent behavior is too generic | Strengthen the role, responsibilities, and boundaries |
| Frontmatter errors | Check YAML punctuation, brackets, and indentation |
| Skill is not recognized | Confirm the path is `.github/skills/<name>/SKILL.md` and the `name` matches the folder |

---

## Quick Debrief Prompt

Answer in one sentence:
- What role did you turn into an agent?
- What workflow might eventually become a team skill?

---

*← [Activity 2](./activity-2.md) · [Back to Workshop README](../README.md)*
