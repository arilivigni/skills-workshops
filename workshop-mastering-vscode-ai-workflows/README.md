# Workshop 1: Mastering VS Code AI Workflows & Agent Customization

> **Format:** Instructor-led live workshop · **Duration:** 60 minutes · **Level:** Intermediate
> **Inspired by:** [Customize Your GitHub Copilot Experience](https://github.com/skills/customize-your-github-copilot-experience) (GitHub Skills)

This workshop teaches participants how to customize AI agent behavior in VS Code with the tools that matter most in practice: **custom instructions, prompt files, custom agents, and agent skills**. Instead of treating Copilot as a single chat box, participants learn how VS Code assembles context, where each customization type lands, and how to keep the assistant effective as prompts and context grow.

The session is designed for live delivery: a short mental-model lecture, focused hands-on exercises, visible checkpoints, and reusable artifacts participants can take back to real repositories.

---

## Welcome

- **Who is this for:** Developers, educators, and workshop facilitators who want to tailor GitHub Copilot behavior inside VS Code
- **What you'll learn:** How to shape Copilot with repo-wide instructions, focused instructions, prompt files, custom agents, and agent skills
- **What you'll build:** A workshop repo containing layered AI customizations you can demo live and adapt to a real project
- **How to use this README:** Walk the workshop in order from Section 1 through Activity 3; each section below includes the instructor goal, the participant task, and a concrete example you can demo

In this workshop, you will:

1. Explain how VS Code builds agent context and why context rot happens
2. Create repo-wide and focused custom instructions, then compare them to prompt files
3. Build a planning agent for structured plan-then-implement workflows
4. Create one local skill and use one skill provided by an installed marketplace plugin

---

## Learning Objectives

By the end of this workshop, participants will be able to:

1. **Explain how VS Code assembles agent context** from core identity, system rules, tool instructions, output guidance, workspace context, and user-side prompt inputs.
2. **Describe context rot** and explain why overly long context windows lower accuracy, consistency, and task focus.
3. **Use custom instructions for durable project guidance** and **prompt files for reusable task prompts**, including model-pinned prompt files.
4. **Create a custom planning agent** with a narrow role, clear workflow, and the right tool boundaries.
5. **Explain and scaffold an agent skill** that uses progressive loading to save context window space.
6. **Choose the right customization layer** for a real workflow instead of solving every problem with a longer chat prompt.

---

## Prerequisites

**Knowledge**
- Comfortable using VS Code and the integrated terminal
- Basic familiarity with GitHub Copilot Chat in VS Code
- Basic Git workflow (`clone`, `add`, `commit`)
- Comfortable editing Markdown files

**Tools & Accounts**
- [ ] VS Code installed and updated
- [ ] GitHub Copilot and GitHub Copilot Chat extensions installed
- [ ] GitHub account with an active Copilot license
- [ ] Git installed and working in the terminal
- [ ] A repository to use during the workshop (personal repo or template-based practice repo)

> **Instructor note:** The most common failure point is still authentication or extension setup. Before the workshop begins, ask participants to open Copilot Chat and send one simple prompt successfully.

---

## Quick Setup

Participants need an open repository in VS Code.

### Option A - Use a practice repository (recommended for consistent facilitation)
```bash
gh repo create my-copilot-workshop --template skills/customize-your-github-copilot-experience --public --clone
cd my-copilot-workshop
code .
```

### Option B - Use a real repository
```bash
cd ~/path/to/your-project
code .
```

### Pre-flight Check
Before the workshop officially starts, ask participants to verify:
1. Copilot Chat opens in VS Code.
2. They can send and receive a response.
3. Their repository is writable.
4. Git works in the integrated terminal.

> **Facilitation recommendation:** If the audience is mixed, let confident participants use their own repos and steer beginners toward the template repo for easier troubleshooting.

---

## Workshop Agenda

| Time | Section | Format | Outcome |
|---|---|---|---|
| 00:00-15:00 | [1. The Anatomy of the Agent System Prompt & Context Rot](#section-1-the-anatomy-of-the-agent-system-prompt--context-rot) | Concept + demo | Participants understand where each customization layer lands and why long context hurts quality |
| 15:00-30:00 | [2. Activity 1 - Custom Instructions vs. Prompt Files](#section-2-activity-1---custom-instructions-vs-prompt-files) | Hands-on | Participants create durable instructions and one reusable prompt file |
| 30:00-45:00 | [3. Activity 2 - Custom Agents for Structured Workflows](#section-3-activity-2---custom-agents-for-structured-workflows) | Hands-on | Participants build a planning agent and use it as part of a plan-then-implement workflow |
| 45:00-60:00 | [4. Activity 3 - Implementing Agent Skills](#section-4-activity-3---implementing-agent-skills) | Hands-on + debrief | Participants create one local skill and use one marketplace-installed skill |

---

## Section 1: The Anatomy of the Agent System Prompt & Context Rot

**Duration:** 15 minutes
**Format:** Instructor explanation + short live demo

### Teaching Goal
Give participants a practical mental model for where customization lands in VS Code, then show why pushing too much information into one giant context window eventually makes the model worse instead of better.

### The Practical Context Stack

Use this workshop model to explain what the agent effectively receives:

```text
┌──────────────────────────────────────────────────────────────┐
│ User Prompt 4 - prior turns and follow-up context           │
├──────────────────────────────────────────────────────────────┤
│ User Prompt 3 - reusable prompt-file text                   │
├──────────────────────────────────────────────────────────────┤
│ User Prompt 2 - attached files, selections, and inputs      │
├──────────────────────────────────────────────────────────────┤
│ User Prompt 1 - what the user is asking right now           │
├──────────────────────────────────────────────────────────────┤
│ Workspace Info - repo structure, open files, diffs, state   │
├──────────────────────────────────────────────────────────────┤
│ Output Format - response shape and UI expectations          │
├──────────────────────────────────────────────────────────────┤
│ Tool Instructions - what tools exist and how to use them    │
├──────────────────────────────────────────────────────────────┤
│ General Rules - product guardrails and behavior rules       │
├──────────────────────────────────────────────────────────────┤
│ Core Identity - the assistant's base role                   │
└──────────────────────────────────────────────────────────────┘
```

### What to Say About Each Layer
- **Core identity:** the product-level baseline role the assistant starts with.
- **General rules:** platform guardrails, safety rules, and operating constraints.
- **Tool instructions:** what actions the model is allowed to take and how those tools should be used.
- **Output format:** how responses should be shaped for the UI or task at hand.
- **Workspace info:** repo structure, open files, selections, diffs, and environment state.
- **User prompts 1-4:** the current ask plus extra user-side prompt inputs such as prompt files, attachments, and prior chat turns.

### Where the Customization Types Fit
- **Custom instructions:** best for high-level project architecture, durable coding rules, and team conventions. Use `.github/copilot-instructions.md` for repo-wide guidance and `.github/instructions/*.instructions.md` for focused rules that apply to specific file types or folders.
- **Prompt files:** reusable, task-specific prompts that are injected on the user-prompt side when invoked.
- **Custom agents:** specialized personas with their own tools, workflow, and model preferences.
- **Agent skills:** portable capabilities that load only when needed.

### Context Rot Talking Points
Use plain language:
- The model does not become more reliable just because you keep adding text.
- As context grows, the assistant is more likely to miss constraints, over-index on stale details, or produce bland summaries instead of precise work.
- Long context windows often hide the important instruction instead of strengthening it.

### How to Explain Context Rot
When the context window becomes bloated, quality drops in familiar ways:
- answers become generic even when good instructions exist
- the model forgets or ignores the most important rule
- it repeats stale assumptions from earlier turns
- it spends tokens re-reading context instead of solving the task

### Mitigation Strategies
1. Keep **always-on instructions short and durable**.
2. Put **repeated tasks in prompt files** instead of pasting long prompts into chat.
3. Use **custom agents** to split planning, implementation, and review into separate workflows.
4. Use **skills** for larger capabilities so detailed instructions load progressively instead of every time.

### Suggested Live Demo
1. Start with a generic repo and ask Copilot for help.
2. Show a short `.github/copilot-instructions.md`.
3. Add one focused file such as `.github/instructions/docs.instructions.md` with an `applyTo` glob and show how it differs from repo-wide guidance.
4. Invoke a `.prompt.md` file from `/` and point out that it lands as task text, not as a repo-wide rule.
5. Explain why these are better than keeping a 40-message chat alive forever.

### Suggested Example
Use a simple docs workflow throughout the first half of the workshop:
- repo-wide guidance in `.github/copilot-instructions.md`
- markdown-specific guidance in `.github/instructions/docs.instructions.md`
- a `/draft-release-notes` prompt file in `.github/prompts/`

### Checkpoint Question
> "If I want a rule to influence every task in this repo, where should it live?"

**Answer:** custom instructions, not a one-off prompt file.

---

## Section 2: Activity 1 - Custom Instructions vs. Prompt Files

**Duration:** 15 minutes
**Format:** Hands-on

📋 **Full instructions:** [activities/activity-1.md](./activities/activity-1.md)

### What Participants Do
1. Create or improve `.github/copilot-instructions.md` with repo-wide architecture, conventions, and workflow preferences.
2. Create one focused `*.instructions.md` file in `.github/instructions/` for a specific file type or folder.
3. Create one `.prompt.md` file in `.github/prompts/` for a repeated task.
4. Pin a model in the prompt file frontmatter to show that prompt files can influence model choice.
5. Compare when to use repo-wide instructions, focused instructions, and reusable task prompts.

### Suggested Example
- `.github/copilot-instructions.md` for overall project and response rules
- `.github/instructions/docs.instructions.md` for markdown-specific guidance
- `.github/prompts/draft-release-notes.prompt.md` for an on-demand workflow

### Success Criteria
- [ ] `.github/copilot-instructions.md` contains durable project guidance.
- [ ] A focused `*.instructions.md` file exists in `.github/instructions/`.
- [ ] A `.prompt.md` file exists in `.github/prompts/`.
- [ ] The prompt file has a `model` in frontmatter.
- [ ] The participant can explain the difference between repo-wide instructions, focused instructions, and prompt files.

### Instructor Notes
- Keep repeating the distinction: **instructions are standards**, **prompt files are reusable asks**.
- Inside instructions, separate **repo-wide guidance** from **focused file-based guidance**.
- Coach participants away from stuffing one-off tasks into repo instructions.

---

## Section 3: Activity 2 - Custom Agents for Structured Workflows

**Duration:** 15 minutes
**Format:** Hands-on

📋 **Full instructions:** [activities/activity-2.md](./activities/activity-2.md)

### What Participants Do
1. Create a **Plan Mode** custom agent in `.github/agents/`.
2. Give it a narrow role: gather context, ask for missing details, produce a concise implementation plan, and stop.
3. Prefer a larger premium model for the planning step.
4. Use the plan to switch into a smaller everyday model for implementation work.

### Suggested Example
Ask the agent to plan a small feature such as:
- “Plan how to add CSV import to this repo”
- “Plan a docs refactor for the workshop README”

### Success Criteria
- [ ] A `.agent.md` file exists in `.github/agents/`.
- [ ] The agent has explicit workflow steps and boundaries.
- [ ] The agent is used for a real planning task.
- [ ] The participant can explain why planning and implementation are intentionally split.

### Instructor Notes
- Emphasize that this is not about making one super-agent do everything.
- The key design idea is **separation of concerns**: premium planning, cheaper iterative execution.
- If participants finish early, have them add a handoff or a second implementation-focused agent.

---

## Section 4: Activity 3 - Implementing Agent Skills

**Duration:** 15 minutes
**Format:** Hands-on + debrief

📋 **Full instructions:** [activities/activity-3.md](./activities/activity-3.md)

### What Participants Do
1. Create one local skill folder with `SKILL.md`.
2. Write the skill name and description so the agent can decide when to load it.
3. Explain progressive loading: discovery first, instructions second, resources only when needed.
4. Use a real-world example such as a skill that extracts and reads PDF content with Python.
5. Install one agent plugin from the marketplace that provides a skill and invoke that skill from chat.

### Success Criteria
- [ ] `.github/skills/<skill-name>/SKILL.md` exists.
- [ ] The skill description clearly says what it does and when to use it.
- [ ] A marketplace-installed plugin skill is visible in chat and used once.
- [ ] The participant can explain how skills save context window space.
- [ ] The participant can describe why the PDF workflow is a better fit for a skill than for always-on instructions.

### Instructor Notes
- This section is where the context-rot story pays off: skills keep large workflows out of the main prompt until needed.
- If time is short, scaffold the local skill first, then demo the marketplace-installed skill yourself.
- Use the last 2-3 minutes for the workshop exit question and one takeaway per participant.

### Suggested Example
1. **Create locally:** a `pdf-reader` skill with `extract_pdf.py`
2. **Use from marketplace:** install an agent plugin from the default marketplace that exposes at least one skill, then run that skill from `/` or the skills picker

---

## Hands-On Activities Summary

| Activity | Outcome | Why it matters |
|---|---|---|
| [Activity 1](./activities/activity-1.md) | Repo-wide instructions + focused instructions + one model-aware prompt file | Shows the difference between persistent guidance layers and reusable task prompts |
| [Activity 2](./activities/activity-2.md) | A planning agent with explicit workflow boundaries | Demonstrates how custom agents structure work instead of just adding more text |
| [Activity 3](./activities/activity-3.md) | One local skill plus one marketplace-installed skill | Shows progressive loading and how shared skills appear in real workflows |

---

## Stretch Goals

For advanced participants or post-workshop follow-up:

1. Add one targeted `*.instructions.md` file for a specific folder or file type.
2. Create a second prompt file that uses a different model for a different task profile.
3. Add a handoff from a planning agent to an implementation or review agent.
4. Package a real multi-file workflow as a skill with scripts and examples.
5. Audit an existing long-running chat and refactor it into instructions, prompts, agents, and skills.

---

## Resources

See [resources.md](./resources.md) for current VS Code customization docs, GitHub references, and the example artifacts included in this workshop.

---

## Instructor Notes: Common Questions, Talking Points, Troubleshooting

### Common Questions

| Question | Suggested Answer |
|---|---|
| "What belongs in custom instructions versus a prompt file?" | Put durable repo guidance in instructions. Put reusable task requests in prompt files. |
| "Why not keep everything in one long chat?" | Because long context eventually hurts recall, precision, and focus. Split stable guidance from task-specific context. |
| "When should I create a custom agent?" | When the job needs a stable persona, a workflow, tool boundaries, or different model preferences. |
| "When is a skill a better fit than an agent?" | When you need a portable capability package with instructions, scripts, or examples that should load only when relevant. |
| "Do I need every layer?" | No. Start with repo instructions, then add prompt files, agents, and skills only where they solve a real repeat problem. |

### Troubleshooting

| Symptom | Likely Cause | Fix |
|---|---|---|
| Copilot still sounds generic after adding instructions | Instructions are vague or overloaded | Shorten the file and make the rules concrete and durable |
| Prompt file does not appear in `/` | Wrong folder or extension | Use `.github/prompts/*.prompt.md`, then reload VS Code if needed |
| Prompt file runs but ignores the intended model | Model not available in the current plan or environment | Try a supported model name or remove the pin temporarily |
| Planner agent behaves like a general assistant | Role and workflow are underspecified | Add clear steps, boundaries, and tool restrictions |
| Skill is not discoverable | Name/path mismatch or vague description | Make the folder and `name` match exactly and describe when to use the skill |

### Facilitation Tips
- Keep the first 15 minutes visual. Draw the stack and physically point to where each customization lands.
- When discussing context rot, use symptoms participants already recognize: "It forgot my rules" and "It got more generic after a long chat."
- In Activity 2, explicitly celebrate narrow agents. Narrow beats clever.
- In Activity 3, connect progressive loading back to the workshop thesis: the best context is often the context you did **not** load yet.

---

## Exit Prompt

> "What is one AI workflow you will split into instructions, a prompt file, an agent, or a skill when you get back to your real repo?"
