# Activity 1: Inspect the Agent Environment

> **Time:** 15 minutes
> **Where:** A terminal in the root of this repository
> **Goal:** Learn how to orient yourself in Copilot CLI before handing it real work

This activity is intentionally exploratory. Before participants delegate anything to the CLI, they should know how to inspect the session, inspect the current repo, inspect available agents, skills, and plugins, and find the right slash commands from `/help`.

---

## What You'll Use

By the end of this activity you will have used:

1. `/help` to inspect the CLI surface area
2. `/env` to inspect the current environment
3. `/model` to inspect the selected model
4. `/agent` to inspect available agents
5. `/skills list` to inspect available skills
6. `/plugin` to inspect installed plugins and browse shared marketplaces
7. `/plan`, `/resume`, and optionally `/chronicle`

Use this repository so the demo stays concrete:

- the repo already exposes a custom agent in `.github/agents/agentic-workflows.agent.md`
- the repo already exposes a local skill in `.github/skills/write-a-prd/`

---

## Part A - Start the CLI

> **Suggested time:** 2 minutes

### Step A1 - Open a terminal at the repo root

If you are in the devcontainer, the repo root should already be your current folder. If not, change into it now.

### Step A2 - Start the interactive session

```bash
copilot
```

If prompted to trust the current folder, accept it for this workshop repo.

### Success checkpoint

- [ ] The Copilot CLI session opens
- [ ] You are in the repo root

---

## Part B - Use `/help` as your map

> **Suggested time:** 4 minutes

### Step B1 - Open the command reference

```text
/help
```

Ask participants to scroll and locate these groups:

- **Agent Environment**
- **Models and subagents**
- **Code**

### Step B2 - Call out the commands that matter in this workshop

Specifically highlight:

- `/env`
- `/model`
- `/agent`
- `/skills`
- `/plugin`
- `/plan`
- `/resume`
- `/chronicle`

### Instructor talking point

Do not try to memorize every slash command. The habit to teach is:

1. open `/help`
2. identify the command group
3. run the smallest command that tells you what the CLI currently knows

---

## Part C - Inspect the current session and repo

> **Suggested time:** 5 minutes

### Step C1 - Inspect the environment

```text
/env
```

Ask participants to notice the kinds of information the CLI exposes about the current repository and session.

### Step C2 - Inspect the active model

```text
/model
```

Explain that participants may see different models depending on their plan and account entitlements. The important lesson is that model choice is visible and explicit in the CLI.

### Step C3 - Inspect available agents

```text
/agent
```

In this repository, point out the existing `agentic-workflows` agent. It is a real repo-level agent, not a mock example.

### Step C4 - Inspect available skills

```text
/skills list
```

In this repository, point out the `write-a-prd` skill. If participants do not see it immediately, confirm they started the CLI from the repo root.

### Optional step - Get more detail about a skill

```text
/skills info
```

Use the picker or prompt flow to inspect the location of the skill and show that the repo-local skill is being discovered from the current project.

### Step C5 - Inspect plugins and shared marketplaces

First, inspect installed plugins:

```text
/plugin list
```

Then browse the Awesome Copilot marketplace:

```text
/plugin marketplace browse awesome-copilot
```

If the marketplace is unknown in an older setup, register it once from the shell:

```bash
copilot plugin marketplace add github/awesome-copilot
```

Then run the browse command again.

### Teaching point

`/skills` shows capabilities already available to the agent. `/plugin` is how you discover and install larger bundles of capabilities from a marketplace.

---

## Part D - Try session-oriented commands

> **Suggested time:** 3 minutes

### Step D1 - Start a plan

```text
/plan Draft a safe docs-only change I could make in this workshop folder to improve the command walkthrough.
```

You do not need to accept the plan yet. The purpose of this step is to show how plan mode changes the interaction from "do work now" to "help me structure the work first."

### Step D2 - Inspect how resuming works

Explain both forms:

- `copilot --continue` - resume the most recent session from the shell
- `/resume` - switch to another session from inside the CLI

You can demo `/resume` directly if you already have recent sessions on your machine.

### Optional step - Try `/chronicle`

`/chronicle` is experimental. If it is available in your CLI version, enable experiments first:

```text
/experimental on
/chronicle tips
```

If `/chronicle` is not available, skip it and reinforce that `/resume` is the non-experimental baseline session-history feature.

---

## Debrief

Ask participants:

1. What command would you run first before trusting the CLI with a larger task?
2. What did `/agent`, `/skills list`, and `/plugin marketplace browse awesome-copilot` tell you about this environment?
3. Why is `/plan` a better starting point than "just do it" for larger changes?

---

## Success Criteria

- [ ] You used `/help` to locate command groups instead of guessing
- [ ] You used `/env` and `/model` to inspect the active session context
- [ ] You saw a real repo agent with `/agent`
- [ ] You saw a real repo skill with `/skills list`
- [ ] You browsed the Awesome Copilot marketplace with `/plugin`
- [ ] You understand that `/chronicle` may require `/experimental on`
