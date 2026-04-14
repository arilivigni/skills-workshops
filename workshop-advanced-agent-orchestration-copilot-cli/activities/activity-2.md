# Activity 2: Plan Mode, Autopilot, and `/fleet`

> **Time:** 15 minutes
> **Where:** Copilot CLI in a throwaway branch of this repository
> **Goal:** Run a low-risk autonomous workflow and see when plan mode, autopilot mode, and `/fleet` each help

This activity uses a Markdown-only task so the room can focus on orchestration behavior rather than build tools or test failures.

---

## What You'll Practice

By the end of this activity you will:

1. Create a plan before implementation
2. Switch from planning into autopilot
3. Ask the CLI to parallelize work with `/fleet`
4. Use model choice intentionally across subtasks

---

## Part A - Pick a safe task

> **Suggested time:** 2 minutes

Use a low-risk change in this workshop folder on a throwaway branch. Good candidates:

- improve wording in `examples/example-command-cheatsheet.md`
- add one clarification paragraph to `README.md`
- update a heading or table cell in an example file

Avoid broad feature work for this activity. The point is to observe orchestration, not to risk the repo.

If you have not already created a demo branch, do it now in a second terminal:

```bash
git switch -c workshop-3-demo
```

---

## Part B - Create the plan first

> **Suggested time:** 4 minutes

Switch into plan mode and ask for a concrete Markdown-only plan.

Example prompt:

```text
Create a concise plan to improve workshop-advanced-agent-orchestration-copilot-cli/examples/example-command-cheatsheet.md so it is easier for first-time Copilot CLI users to scan. Keep the task limited to Markdown edits in this workshop folder.
```

Discuss the plan with the room before accepting it:

- Is the task bounded?
- Is it safe for autopilot?
- Would you change the scope before handing it off?

### Teaching point

Plan mode is where you constrain the task. Autopilot gets better when the scope is precise before it starts.

---

## Part C - Hand the plan to autopilot

> **Suggested time:** 4 minutes

Once you have a plan you like, accept it and choose the autopilot option.

If the CLI asks about permissions, narrate the tradeoff:

- **Enable all permissions** for a fully autonomous demo
- **Limited permissions** if you want the agent to stop before certain actions

Use autopilot for this kind of task because:

- the scope is clear
- the files are safe to edit
- the task does not need frequent human judgment

### Optional command-line version

If you want to show non-interactive autopilot, use a second shell:

```bash
copilot --autopilot --yolo --max-autopilot-continues 10 -p "Improve workshop-advanced-agent-orchestration-copilot-cli/examples/example-command-cheatsheet.md for readability. Limit work to markdown edits in this workshop folder."
```

Explain that `--max-autopilot-continues` is the safety brake that keeps the loop bounded.

---

## Part D - Parallelize the same kind of work with `/fleet`

> **Suggested time:** 4 minutes

Now give the CLI a task that can be broken into multiple subtasks. For example, update both the cheat sheet and one README paragraph.

Use the example prompt below and adapt the model names to whatever `/model` shows in your account:

```text
/fleet Improve workshop-advanced-agent-orchestration-copilot-cli/examples/example-command-cheatsheet.md and the "Suggested Walkthrough Order" section of workshop-advanced-agent-orchestration-copilot-cli/README.md.

Use Claude Opus 4.6 to analyze the current structure and propose the best wording changes.
Use GPT-5.4 to make the Markdown edits.
Use GPT-5-mini to summarize the final changes and call out any follow-up cleanup.

Keep all edits inside workshop-advanced-agent-orchestration-copilot-cli/.
```

### What to point out live

- `/fleet` is not just "go faster"; it creates separate sub-agent context windows
- different subtasks can use different models
- the orchestrator can merge the results back into one coherent outcome

If your CLI version exposes a task monitor such as `/tasks`, use it to show the sub-agents in flight.

---

## Debrief

Ask participants:

1. When would you stop at plan mode instead of accepting autopilot?
2. What kind of task is better for `/fleet` than for one agent?
3. When is it worth paying for a stronger model on one subtask but not another?

---

## Success Criteria

- [ ] You used plan mode before implementation
- [ ] You handed a bounded task to autopilot
- [ ] You used `/fleet` for a multi-part task
- [ ] You can explain the difference between autonomy and parallelism
