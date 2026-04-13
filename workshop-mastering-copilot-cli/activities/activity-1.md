# Activity 1: Slash Commands & Second-Opinion Model Families

> **Time:** 15 minutes
> **Where:** Terminal with `gh copilot` installed and authenticated
> **Goal:** Master the core slash commands for session control and use a second model family to review and improve generated output

This activity focuses on the two fastest CLI levers for quality control:
- **Slash commands** for navigating, resetting, and reconfiguring a session without restarting.
- **Model families** for combining different models so the second catches what the first misses.

---

## What You're Building

By the end of this activity you will have:
1. Hands-on fluency with `/help`, `/model`, `/clear`, `/new`, and `/history`
2. A two-step workflow: generate with one model, review with a second
3. A concrete example you can repeat on any generated code or plan before committing it

---

## Before You Start

Open a terminal and verify your setup:

```bash
gh copilot --version
gh copilot suggest "list the 10 most recently modified files"
```

You should see a shell command suggestion. If you get an authentication error, run `gh auth login` first.

---

## Part A – Core Slash Commands

> **Suggested time:** 6 minutes

### Step A1 – Start an agent session

```bash
gh copilot suggest --shell-out
```

Or start an interactive session:

```bash
gh copilot
```

### Step A2 – Explore the `/help` command

Type `/help` and read the output. Every slash command the CLI supports will be listed here.

Key commands to know:

| Command | What it does |
|---|---|
| `/help` | List all available slash commands |
| `/model` | Show the current model and switch to a different one |
| `/new` | Start a fresh conversation (preserves agent config, clears conversation) |
| `/clear` | Clear the current session context |
| `/history` | Show recent conversation turns |
| `/skills` | List available skills for the current agent |
| `/exit` | Exit the session |

### Step A3 – Check the current model

```text
/model
```

Note the model name. This is the model your agent is using for all turns in this session.

### Step A4 – Ask a question and observe the response

Ask the agent to write a small Bash script:

```text
Write a Bash script that backs up a directory passed as the first argument to a timestamped folder in /tmp. Include error handling for a missing argument and a non-existent source directory.
```

Copy the script to a file called `backup.sh`.

### Step A5 – Use `/history` to review what happened

```text
/history
```

You can see the conversation turns that have accumulated in this session. This is your context window.

### Success Criteria for Part A

- [ ] You ran `/help` and found at least three commands you did not know before
- [ ] You checked the current model with `/model`
- [ ] You generated a Bash script
- [ ] You ran `/history` and observed the session context

---

## Part B – Second-Opinion Model Families

> **Suggested time:** 9 minutes

### Step B1 – Understand the second-opinion pattern

The core idea: use one model family to generate, and a different model family to review.

Why this works:
- Different model families have different strengths and blind spots.
- A fast model generates quickly; a stronger reasoning model catches logic errors or edge cases.
- Getting a second opinion before committing code costs a few extra seconds and can save hours of debugging.

### Step B2 – Note the current model

You already checked this with `/model`. Remember the model name — for example, `gpt-4.1` or `claude-sonnet-4.5`.

### Step B3 – Switch to a second model family

```text
/model
```

Select a different model family from the list. For example, if you were on a GPT family model, switch to a Claude family model, or vice versa.

```text
/model claude-sonnet-4.5
```

or

```text
/model gpt-4.1
```

### Step B4 – Ask the second model to review the script

```text
Review the backup.sh script from this session. Look specifically for:
- Missing error handling
- Edge cases the script does not handle
- Security issues (such as unsafe input handling or insecure temp directory use)
- Any improvements that would make it safer for production use
```

### Step B5 – Compare the two responses

Read both responses carefully:

1. What did the second model catch that the first model missed?
2. Are there disagreements between the two models?
3. Which suggestions are worth incorporating?

This is the second-opinion pattern in action.

### Step B6 – Use `/new` to start a clean session

```text
/new
```

This clears the conversation turns but keeps your agent config and model settings in place. Use this when you want to start a new task without carrying old context forward.

Compare this with `/clear`:
- `/new` — start fresh conversation, keep agent config
- `/clear` — remove current context accumulation mid-session

### Success Criteria for Part B

- [ ] You switched model families with `/model`
- [ ] You obtained a second-opinion review of the generated script
- [ ] You can describe at least one thing the second model caught or improved
- [ ] You used `/new` to start a fresh session

---

## Quick Reflection

Answer in your own words:
1. When would you use `/new` instead of just continuing the same session?
2. Which task profiles benefit most from a second-opinion model review?
3. What is one type of code you would always want a second model to review before committing?

---

## Commit Your Work

```bash
# Save your backup script with the second-opinion improvements incorporated
git add backup.sh
git commit -m "chore: add backup script with second-opinion review improvements"
```

---

## Troubleshooting

| Problem | What to Check |
|---|---|
| `/model` shows no alternatives | Check your Copilot plan — some plans have a narrower model selection |
| Model switch does not seem to change the behavior | Restart the session after switching and re-run the same prompt |
| Second model gives the same answer as the first | Try a more focused review prompt — ask for specific edge cases or security issues |
| `/history` is empty | Context may have been cleared; regenerate the script in the same session first |
| `gh copilot` command not found | Run `gh extension install github/gh-copilot` then try again |

---

*← [Back to Workshop README](../README.md) · [Next: Activity 2 →](./activity-2.md)*
