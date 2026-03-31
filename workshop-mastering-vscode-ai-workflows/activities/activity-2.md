# Activity 2: Custom Agents for Structured Workflows

> **Time:** 15 minutes
> **Where:** VS Code with your workshop repository open
> **Goal:** Build a custom planning agent and use it to separate planning from implementation

This activity turns the workshop's context-rot lesson into a workflow pattern:
- use a **larger premium model** for planning and synthesis
- write the plan to a Markdown artifact
- switch to a **smaller everyday model** for iterative implementation

---

## What You're Building

By the end of this activity you will have:
1. A custom **Plan Mode** agent in `.github/agents/`
2. A repeatable workflow for gathering context and producing a concise plan
3. A clearer reason to separate planning from implementation instead of doing both in one long chat

---

## Part A - Create a Planning Agent

> **Suggested time:** 8 minutes

### Step A1 - Create the file

```bash
mkdir -p .github/agents
touch .github/agents/plan-mode.agent.md
```

### Step A2 - Use this starter template

```markdown
---
name: Plan Mode
description: Gather context, produce a concise implementation plan, and stop before making code changes.
tools: ['search/codebase', 'search/usages', 'web/fetch']
model: ['Claude Opus 4.6', 'GPT-5.4']
handoffs:
  - label: Start Implementation
    agent: agent
    prompt: Implement the approved plan step by step. Keep changes small and explain tradeoffs only when necessary.
    send: false
---

# Role
You are the planning agent for this repository.

# Workflow
1. Read the relevant code and docs before proposing a plan.
2. Ask one clarifying question if a requirement is still ambiguous.
3. Produce a concise plan with scope, risks, and implementation steps.
4. Write or update a Markdown plan document if the user asks for an artifact.
5. Stop after planning. Do not make code changes.

# Output Format
- Summary
- Assumptions
- Implementation Steps
- Risks
- Suggested handoff

# Boundaries
- Do not edit code.
- Do not suggest a giant rewrite when an incremental change is possible.
- Do not skip reading the existing repo structure.
```

### Step A3 - Explain why this is useful

Talk through the design:
- the planning agent has a specific identity
- it uses read-oriented tools
- it prefers a larger model because planning benefits from synthesis
- it ends before implementation, which keeps the task focused

---

## Part B - Use the Agent in a Plan-Then-Implement Workflow

> **Suggested time:** 7 minutes

### Step B1 - Give the agent a real task

Try a prompt like:

```text
Plan how to add a CSV import feature to this repository. Keep the plan under 10 bullet points and include major risks.
```

or

```text
Review this repo and create a small Markdown implementation plan for adding audit logging.
```

### Step B2 - Write the plan down

If you want a reusable artifact, save the output into a Markdown file such as:

```text
docs/implementation-plan.md
```

The workshop point is not the exact filename. The point is to externalize the plan so you do not keep re-pasting or re-explaining it in every turn.

### Step B3 - Switch to implementation deliberately

After the plan is approved:
1. switch back to the default coding agent or your implementation agent
2. choose a smaller everyday model if that fits your plan or budget
3. implement the plan in small steps instead of one giant prompt

### Step B4 - State the workflow strategy

Use this summary line:

> Big model for planning and synthesis. Smaller model for execution and iteration.

### Success Criteria
- [ ] A `.agent.md` file exists in `.github/agents/`
- [ ] The agent has a clear role, workflow, and boundaries
- [ ] You used it on a real planning task
- [ ] You can explain why the implementation step happens separately

---

## Optional Extension

If you finish early, create a second agent such as `.github/agents/implement-mode.agent.md` that:
- focuses on small code changes
- prefers the current default model or a lower-cost one
- never replans the whole task unless asked

---

## Commit Your Work

```bash
git add .github/agents/
git commit -m "chore: add planning agent workflow"
```

---

## Troubleshooting

| Problem | What to Check |
|---|---|
| Agent is too generic | Strengthen the role, workflow, and boundaries |
| Agent tries to code anyway | Add a stronger stop condition such as "Do not edit code" |
| Handoff is unclear | Make the handoff prompt more explicit about implementing the approved plan |
| Planning output is too long | Add a length limit and a stronger output format |

---

*← [Activity 1](./activity-1.md) · [Back to Workshop README](../README.md) · [Next: Activity 3 →](./activity-3.md)*
