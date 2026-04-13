# Activity 1: Slash Commands & Second-Opinion Model Families

> **Time:** 15 minutes
> **Where:** Terminal with `gh copilot` installed and authenticated
> **Goal:** Master the full slash command surface and use a second model family to review and improve generated output

This activity focuses on the two fastest CLI levers for quality control:
- **Slash commands** for navigating, resetting, managing agents, and reconfiguring a session without restarting.
- **Model families** for combining different models so the second catches what the first misses.

---

## Using Copilot Prompts in This Workshop

Throughout these activities, look for the **💬 Copilot Prompt** blocks. Copy the text and paste it directly into your active `gh copilot` session in the terminal.

> **How to open a session:** Run `gh copilot` in your terminal to start an interactive agent session. Then paste any 💬 Copilot Prompt at the `>` prompt and press Enter.

You can also use these prompts with `gh copilot suggest "<prompt>"` for one-off commands.

---

## What You're Building

By the end of this activity you will have:
1. Hands-on fluency with the full slash command surface, organized by category
2. A two-step generate-then-review workflow using two model families
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

## Part A – The Full Slash Command Surface

> **Suggested time:** 7 minutes

### Step A1 – Start an interactive agent session

```bash
gh copilot
```

### Step A2 – Run `/help` first

```text
/help
```

Every available slash command appears here. Use this as your reference during the workshop. The commands are grouped by category — let's walk through each group.

### Step A3 – Agent environment commands

These commands configure the environment your agent runs in.

| Command | What it does |
|---|---|
| `/init` | Initialize Copilot instructions for this repository, or suppress the init suggestion |
| `/agent` | Browse and select from available agents |
| `/skills` | Manage skills for enhanced capabilities |
| `/mcp` | Manage MCP server configuration |
| `/plugin` | Manage plugins and plugin marketplaces |

**Try it:**

```text
/init
```

This sets up a `.github/copilot-instructions.md` for your repo, or tells you one already exists.

```text
/skills
```

Lists the skills currently available to your agent. This is how you confirm a skill you created is discoverable before using it in a task.

### Step A4 – Models and sub-agents commands

These commands control which model runs and how agents delegate to each other.

| Command | What it does |
|---|---|
| `/model` | Select the AI model to use in this session |
| `/delegate` | Send this session to GitHub — Copilot will create a PR |
| `/fleet` | Enable fleet mode for parallel sub-agent execution |
| `/tasks` | View and manage background tasks (sub-agents and shell sessions) |

**Try it:**

```text
/model
```

See the current model and select a different one from the list. You will use this in Part B to get a second opinion.

```text
/tasks
```

Shows any background sub-agent tasks running right now. This is useful in Activity 3 when Fleet agents run in parallel.

### Step A5 – Code commands

These commands operate on the code in your current working directory.

| Command | What it does |
|---|---|
| `/ide` | Connect to an IDE workspace |
| `/diff` | Review the changes made in the current directory |
| `/pr` | Operate on pull requests for the current branch |
| `/review` | Run the code review agent to analyze changes |

**Try it:**

```text
/diff
```

Shows the pending changes in your working directory — like `git diff` but surfaced directly in the agent session so you can act on them immediately.

```text
/review
```

Runs the built-in code review agent on your current changes. You will use this again in Activity 2 to compare it with a custom review sub-agent.

### Step A6 – Session management commands

These commands manage conversation context, output, and session state.

| Command | What it does |
|---|---|
| `/resume` | Switch to a different session (optionally specify session ID or task ID) |
| `/rename` | Rename the current session, or auto-generate a name from the conversation |
| `/context` | Show context window token usage and visualization |
| `/usage` | Display session usage metrics and statistics |
| `/session` | View and manage sessions |
| `/compact` | Summarize conversation history to reduce context window usage |
| `/share` | Share session or research report to markdown file, HTML file, or GitHub gist |
| `/remote` | Enable steering your session from GitHub web and mobile |
| `/copy` | Copy the last response to the clipboard |
| `/rewind` | Rewind the last turn and revert file changes |

**Try it:**

```text
/context
```

This shows how much of your context window is in use. As a session grows, context token usage rises. When you see it getting high, use `/compact` to compress the conversation history without losing key information.

```text
/compact
```

Summarizes the conversation history in place, reclaiming context window space. Use this before starting a new phase of a long task so the agent has fresh headroom.

### Success Criteria for Part A

- [ ] You ran `/help` and saw commands organized by category
- [ ] You tried at least one command from each category group
- [ ] You ran `/context` and can interpret the token usage display
- [ ] You used `/compact` or `/diff` at least once

---

## Part B – Generate with One Model, Review with a Second

> **Suggested time:** 8 minutes

### Step B1 – Understand the second-opinion pattern

The core idea: use one model family to generate, and a different model family to review.

Why this works:
- Different model families have different strengths and blind spots.
- A fast model generates quickly; a stronger reasoning model catches logic errors or edge cases.
- Getting a second opinion before committing code costs a few extra seconds and can save hours of debugging.

### Step B2 – Check and note the current model

```text
/model
```

Remember the model name — for example, `gpt-4.1` or `claude-sonnet-4.5`. This is your generation model.

### Step B3 – Generate a Bash script

> 💬 **Copilot Prompt — generate backup script** (paste into your `gh copilot` session)
>
> ```
> Write a Bash script that backs up a directory passed as the first argument to a timestamped folder in /tmp. Include error handling for: a missing argument, a non-existent source directory, and a failure to create the destination. Print a success message with the destination path when the backup completes.
> ```

Copy the output to a file called `backup.sh`.

### Step B4 – Check context usage after generation

```text
/context
```

Notice that the script generation consumed context tokens. For longer tasks, use `/compact` before switching to the review phase to give the new model clean headroom.

### Step B5 – Switch to a second model family

```text
/model
```

Select a different model family. If you were on a GPT model, switch to Claude, or vice versa.

```text
/model claude-sonnet-4.5
```

or

```text
/model gpt-4.1
```

### Step B6 – Get a second-opinion review

> 💬 **Copilot Prompt — second-opinion review** (paste into your `gh copilot` session)
>
> ```
> Review the backup.sh script from this session. Look specifically for:
> - Missing error handling or edge cases
> - Security issues such as unsafe input handling or insecure temp directory usage
> - Race conditions or portability issues
> - Any change that would make it safer for production use
> Provide a structured report with severity levels for each issue found.
> ```

### Step B7 – Compare and decide

Read both responses:
1. What did the second model catch that the first missed?
2. Are there genuine disagreements between the models?
3. Which suggestions are worth incorporating?

### Step B8 – Share the session output

> 💬 **Copilot Prompt — share the session**
>
> ```
> /share
> ```

This saves the full session — including both the generated script and the review — to a Markdown file or GitHub gist. Use this to keep a record of the second-opinion review before closing the session.

### Step B9 – Start a clean session for the next activity

```text
/compact
```

Then:

```text
/rename backup-script-session
```

This compresses the history and labels the session before you move on.

### Success Criteria for Part B

- [ ] You generated the backup script with the first model
- [ ] You checked `/context` before switching models
- [ ] You switched model families with `/model`
- [ ] You obtained a second-opinion review with a focused prompt
- [ ] You used `/share` to save the session output
- [ ] You used `/compact` and `/rename` to manage the session

---

## Quick Reflection

Answer in your own words:
1. When would you use `/compact` instead of starting a brand new session?
2. Which task profiles benefit most from a second-opinion model review?
3. What is one type of code in your real project you would always want a second model to review before committing?

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
| Model switch does not seem to change behavior | Use `/compact` first, then re-run the prompt after switching |
| Second model gives the same answer as the first | Use a more focused review prompt — ask for specific edge cases or security issues |
| `/context` shows very high usage | Run `/compact` to summarize the conversation before continuing |
| `/share` produces an empty file | Confirm you have at least one completed turn in the current session |
| `gh copilot` command not found | Run `gh extension install github/gh-copilot` then try again |

---

*← [Back to Workshop README](../README.md) · [Next: Activity 2 →](./activity-2.md)*
