# Activity 3: Agent Skills & Fleet

> **Time:** 15 minutes
> **Where:** Terminal with `gh copilot` installed and authenticated
> **Goal:** Package a reusable capability as an agent skill and run multiple agents in parallel with Fleet

This activity focuses on the two most powerful CLI efficiency features:
- **Agent skills** package specialized instructions and helper code into a progressively loaded capability — the agent sees the skill description first and loads the full content only when needed.
- **Fleet** runs multiple independent Copilot CLI agent instances in parallel — delivering concurrent workstreams from a single command.

> **💬 Copilot Prompts in this activity:** Look for the 💬 Copilot Prompt blocks. Paste those prompts into your active `gh copilot` session to have Copilot generate skill files and Fleet manifests for you.

---

## What You're Building

By the end of this activity you will have:
1. A `git-summary` skill with a `SKILL.md` and a helper script attached to an agent config
2. A Fleet manifest that runs the `code-review` and `test-writer` sub-agents from Activity 2 in parallel
3. A clear understanding of when to reach for skills, when to reach for Fleet, and when neither is needed

---

## Why Skills Instead of More Instructions?

The workshop answer:
- **Instructions** are for rules that should always be present.
- **Skills** are for capabilities that should load only when the current task needs them.

Progressive loading works in three steps:
1. The agent first sees only the **skill name and description**.
2. The **body of `SKILL.md`** loads when the skill is selected or judged relevant.
3. **Helper scripts and extra files** load only when the agent actually needs to execute them.

This keeps the session context lean and ensures large specialized capabilities do not consume context window space unless they are genuinely in use.

---

## Part A – Create the Skill

> **Suggested time:** 5 minutes

### Step A1 – Create the skill folder and files

```bash
mkdir -p .github/skills/git-summary
touch .github/skills/git-summary/SKILL.md
touch .github/skills/git-summary/summarize_git.sh
```

### Step A2 – Generate the skill with Copilot

> 💬 **Copilot Prompt — generate git-summary SKILL.md** (paste into your `gh copilot` session)
>
> ```
> Generate a SKILL.md file for an agent skill called "git-summary". The skill should:
> - Have a description that says it produces a concise summary of recent Git commits and should be used when asked to summarize recent changes, generate a changelog, or review what has been committed recently
> - Have a workflow that: runs a helper script to get the last 20 commits, groups them by conventional commit type if present, writes a plain-language summary of changes and contributors, and flags any commits touching security-sensitive paths or marked as breaking changes
> - Reference a helper script called summarize_git.sh
> - Have an output format with Recent Changes Summary, Notable Commits, and Flagged Items sections
> Save as .github/skills/git-summary/SKILL.md using the SKILL.md frontmatter format with name and description fields.
> ```

Or write it by hand:

```markdown
---
name: git-summary
description: Produce a concise summary of recent Git commits in the current repository. Use this skill when asked to summarize recent changes, generate a changelog, or review what has been committed recently.
---

# Git Summary Skill

## When to Use This Skill
Use this skill when the task involves summarizing recent commits, generating a changelog section, or understanding what work has been merged recently.

## Workflow
1. Run the helper script to retrieve the last 20 commits.
2. Group commits by type if conventional commits are in use (feat, fix, chore, docs, etc.).
3. Write a plain-language summary of what changed and who contributed.
4. Flag any commits that touch security-sensitive paths or include breaking changes.

## Resources
- Helper script: [summarize_git.sh](./summarize_git.sh)
```

### Step A3 – Generate the helper script with Copilot

> 💬 **Copilot Prompt — generate summarize_git.sh** (paste into your `gh copilot` session)
>
> ```
> Generate a Bash script called summarize_git.sh that:
> - Accepts an optional first argument N (default 20) for the number of commits to show
> - Validates that the current directory is inside a Git repository and exits with an error if not
> - Runs git log with --oneline --no-merges for the last N commits using a format that shows: short hash, subject, author name, and relative time
> - Uses set -euo pipefail for safety
> Save as .github/skills/git-summary/summarize_git.sh
> ```

Or write it by hand:

```bash
#!/usr/bin/env bash
# summarize_git.sh — print the last N commits (default 20) in a concise format
set -euo pipefail

N="${1:-20}"

if ! git rev-parse --is-inside-work-tree &>/dev/null; then
  echo "Error: not inside a Git repository" >&2
  exit 1
fi

git log --oneline --no-merges -n "$N" --pretty=format:"%h %s (%an, %ar)"
```

Make it executable:

```bash
chmod +x .github/skills/git-summary/summarize_git.sh
```

### Step A4 – Attach the skill to an agent

Open `.github/agents/orchestrator.agent.md` (from Activity 2) and add the `skills` field to the frontmatter:

```markdown
---
name: Orchestrator
description: Coordinate code review and test-writing tasks. Delegate to sub-agents. Assemble outputs into a summary.
tools: ['read_file']
model: gpt-4.1
skills:
  - git-summary
handoffs:
  - label: Send to Code Review
    agent: code-review
    prompt: "Review the following code for bugs, security issues, and improvements: {{task}}"
    send: true
  - label: Send to Test Writer
    agent: test-writer
    prompt: "Write test cases for the following code, covering the happy path, edge cases, and error conditions: {{task}}"
    send: true
---
```

### Step A5 – Verify the skill is discoverable

Start the orchestrator and run:

```text
/skills
```

Confirm `git-summary` appears in the skill list. This is the progressive loading discovery step — the agent now sees the skill name and description before deciding whether to load the full content.

### Step A6 – Test the skill

> 💬 **Copilot Prompt — test the git-summary skill** (paste into your `gh copilot` session after starting the orchestrator)
>
> ```
> Summarize the last 10 commits in this repository. Group them by type and flag any commits that touch security-related paths.
> ```

The agent will load the `git-summary` skill, run the helper script, and return a plain-language summary.

### Step A7 – Review the result before sharing

```text
/review
```

Runs the built-in code review agent on any changes made during this session — useful to confirm the skill output or any generated files look correct before proceeding.

```text
/share
```

Save the session output — including the skill result — to a Markdown file or GitHub gist for reference.

### Success Criteria for Part A

- [ ] `.github/skills/git-summary/SKILL.md` exists with a clear name, description, and workflow
- [ ] `summarize_git.sh` exists and is executable
- [ ] The skill is referenced in an agent config's `skills` list
- [ ] You ran `/skills` and confirmed the skill is discoverable
- [ ] You can explain how progressive loading keeps the skill from consuming context until it is needed

---

## Part B – Run Parallel Workstreams with Fleet

> **Suggested time:** 7 minutes

### Step B1 – Understand Fleet

Fleet spawns multiple independent Copilot CLI agent instances in parallel. Each runs its own session and returns results independently. You assemble the outputs after all instances complete.

When Fleet is worth it:
- Tasks are **truly independent** — neither result depends on the other.
- Tasks are **time-consuming** — running them sequentially would waste time.
- You want **multiple perspectives** at the same time — for example, review and testing happening simultaneously.

When Fleet is NOT worth it:
- One task depends on the output of another.
- The overhead of configuring Fleet outweighs the time saved.
- You only have one task.

### Step B2 – Enable Fleet mode from inside a session

From inside any active `gh copilot` session, you can enable Fleet mode with:

```text
/fleet
```

This activates parallel sub-agent execution for the current session. Alternatively, use a Fleet manifest file (Step B3) to define the parallel agents declaratively.

### Step B3 – Generate the Fleet manifest with Copilot

> 💬 **Copilot Prompt — generate Fleet manifest** (paste into your `gh copilot` session)
>
> ```
> Generate a Fleet manifest YAML file called fleet.yml. It should:
> - Have name "review-and-test" and a description that says it runs code review and test writing in parallel on a target file
> - Set parallel to true
> - Have two agent entries:
>   1. id "review" using .github/agents/code-review.agent.md — task is to review backup.sh for bugs, security issues, and improvement opportunities — output to .github/fleet-output/review-report.md
>   2. id "tests" using .github/agents/test-writer.agent.md — task is to write bats-core style test cases for backup.sh covering the happy path, edge cases, and error conditions — output to .github/fleet-output/test-cases.sh
> - Include a comment block at the top explaining how to run it with gh copilot fleet
> Save as .github/fleet.yml
> ```

Or write it by hand:

Create `.github/fleet.yml`:

```bash
touch .github/fleet.yml
```

Add this content:

```yaml
# Fleet manifest — runs code-review and test-writer sub-agents in parallel
name: review-and-test
description: Run code review and test writing in parallel on a target file
parallel: true

agents:
  - id: review
    agent: .github/agents/code-review.agent.md
    task: "Review backup.sh for bugs, security issues, and improvement opportunities."
    output: .github/fleet-output/review-report.md

  - id: tests
    agent: .github/agents/test-writer.agent.md
    task: "Write test cases for backup.sh covering the happy path, edge cases, and error conditions."
    output: .github/fleet-output/test-cases.sh
```

### Step B4 – Create the output directory

```bash
mkdir -p .github/fleet-output
```

### Step B5 – Run Fleet

```bash
gh copilot fleet .github/fleet.yml
```

Both agents start in parallel. While they run, open another terminal and type:

```bash
gh copilot
```

Then:

```text
/tasks
```

This shows both Fleet agents as background tasks. You can monitor their progress, view partial output, or resume a specific task with `/resume <task-id>`.

### Step B6 – Review outputs when both agents complete

```bash
cat .github/fleet-output/review-report.md
cat .github/fleet-output/test-cases.sh
```

Then run `/pr` to operate on the current branch — you can open a PR directly from the Fleet output.

```text
/pr
```

### Step B7 – State the Fleet rule

Finish with this summary:

> Fleet is for independent, concurrent work. If task B depends on task A, Fleet is the wrong tool — use an orchestrator with sequential handoffs instead.

### Success Criteria for Part B

- [ ] `.github/fleet.yml` exists with `parallel: true` and at least two agents
- [ ] Fleet was invoked and both agent outputs were received
- [ ] You used `/tasks` to monitor the running Fleet agents
- [ ] You used `/pr` or `/diff` to review the output before merging
- [ ] You can explain when Fleet adds value and when it does not

---

## Part C – Connect It Back to the Workshop

> **Suggested time:** 3 minutes

### The full CLI slash command and workflow decision map

Use this table to decide which pattern to reach for:

| Situation | Pattern / Command to Use |
|---|---|
| One simple task, one model | Default agent session |
| Want a quality check on output | Second-opinion model switch (`/model`) |
| Long multi-phase task with distinct roles | Orchestrated agents (`/agent`, handoffs) |
| Independent tasks that can run at the same time | Fleet (`/fleet`, fleet manifest) |
| Reusable capability with helper code | Agent skill (`/skills`) |
| Context window getting full | `/compact` to summarize history |
| Need to review pending changes | `/diff` or `/review` |
| Ready to open a PR | `/delegate` or `/pr` |
| Want to save session output | `/share` |
| Need to check token usage | `/context` |

### Why skills beat always-on instructions

- **Instructions** load unconditionally — they consume context whether or not the current task needs them.
- **Skills** load on demand — the agent sees the name and description first, loads the full instructions only when the task matches, and loads helper files only when execution requires them.

This is the same progressive loading principle from Workshop 1, applied to the terminal.

### Full success criteria for this activity

- [ ] `SKILL.md` exists with name, description, and workflow
- [ ] The skill is attached to an agent config and verified with `/skills`
- [ ] Fleet manifest exists with at least two parallel agents
- [ ] Fleet was run and both outputs were received
- [ ] You used `/tasks` to monitor Fleet agents
- [ ] You can fill in the decision map from memory
- [ ] You can explain progressive loading in one sentence

Use this one-sentence version if needed:

> Skills save context because the agent sees the name and description first, then loads instructions and helper files only when the task actually needs them.

---

## Commit Your Work

```bash
git add .github/skills/ .github/fleet.yml .github/fleet-output/
git commit -m "chore: add git-summary skill and fleet manifest"
```

---

## Troubleshooting

| Problem | What to Check |
|---|---|
| `/skills` does not show the skill | Confirm the path is `.github/skills/git-summary/SKILL.md` and the `skills` list in the agent config matches exactly |
| Helper script not found | Reference helper files with a relative path from `SKILL.md` and confirm the script is executable |
| `/fleet` enables Fleet mode but does not run the manifest | Use `gh copilot fleet .github/fleet.yml` from the shell to run a specific manifest file |
| Fleet only running agents sequentially | Confirm `parallel: true` is set at the top level of the Fleet manifest |
| Fleet manifest not recognized | Confirm the file is valid YAML — indentation errors will silently break parsing |
| Output files empty | Check that the `output` paths in the Fleet manifest are writable and the output directory exists |
| `/tasks` shows nothing | The Fleet agents may have already completed — check the output files directly |

---

## Quick Debrief

Answer in one sentence each:
- What capability did you package as a skill? (`git-summary` — summarize recent commits)
- What did Fleet run in parallel? (code review and test writing on the same file)
- When would you use an orchestrator instead of Fleet? (when task B depends on the output of task A)
- Which slash command shows you how full your context window is? (`/context`)

---

*← [Activity 2](./activity-2.md) · [Back to Workshop README](../README.md)*
