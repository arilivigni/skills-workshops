# Workshop 3: Mastering GitHub Copilot CLI Workflows

> **Format:** Instructor-led live workshop · **Duration:** 60 minutes · **Level:** Intermediate
> **Inspired by:** [GitHub Copilot CLI blog series](https://github.blog/ai-and-ml/github-copilot/)

This workshop teaches participants how to unlock the full power of GitHub Copilot in the terminal. Rather than treating Copilot as a simple suggestion box, participants learn how to compose agentic workflows, build custom agents and sub-agents, use slash commands for fast context management, run parallel workstreams with Fleet, and package reusable capabilities as agent skills — all from the command line.

The session is designed for live delivery: a short mental-model introduction, three focused hands-on activities, visible checkpoints, and reusable artifacts participants can immediately apply in their own projects.

> **Copilot-first approach:** Each activity includes **💬 Copilot Prompt** blocks — copy-paste prompts for your active `gh copilot` terminal session. Participants can use these prompts to have Copilot generate agent configs, skill files, and Fleet manifests instead of writing them by hand, keeping the focus on understanding the patterns rather than YAML syntax.

---

## Welcome

- **Who is this for:** Developers and platform engineers who want to use GitHub Copilot beyond the IDE, running agentic workflows directly in the terminal
- **What you'll learn:** How to drive the Copilot CLI with slash commands, combine model families for a second opinion, create and orchestrate custom agents, run parallel agent workstreams with Fleet, and package reusable capabilities as skills
- **What you'll build:** A set of CLI configurations — slash-command workflows, a custom orchestrator agent, sub-agent definitions, and a packaged skill — you can take back to any project
- **How to use this README:** Walk the workshop in order from Section 1 through Activity 3; each section includes the instructor goal, the participant task, and a concrete example you can demo

In this workshop, you will:

1. Explain how the Copilot CLI assembles an agent session and where customization lands
2. Use slash commands to navigate, manage context, and change models mid-session
3. Combine model families to get a second opinion on generated code or plans
4. Build a custom orchestrator agent that delegates to specialized sub-agents
5. Run parallel workstreams with Fleet to tackle independent tasks simultaneously
6. Package a reusable capability as an agent skill and attach it to an agent config

---

## Learning Objectives

By the end of this workshop, participants will be able to:

1. **Navigate the Copilot CLI confidently** using slash commands for context management, session control, and agent switching.
2. **Use model families together** to get a second opinion that catches errors and improves quality before accepting generated output.
3. **Build a custom agent** with a defined role, tool set, and handoff strategy for the terminal.
4. **Compose an orchestrator that coordinates sub-agents**, delegating specialized tasks to focused agents rather than asking one agent to do everything.
5. **Run multiple agents in parallel with Fleet** to speed up independent workstreams.
6. **Create and attach an agent skill** that bundles instructions and helper scripts into a progressively loaded, portable capability.
7. **Choose the right CLI workflow pattern** — single agent, orchestrated agents, Fleet, or skills — for a given task.

---

## Prerequisites

**Knowledge**
- Comfortable working in a terminal
- Basic Git workflow (`clone`, `add`, `commit`, `push`)
- Familiarity with GitHub Copilot Chat or agent concepts at a high level
- Comfortable reading and editing Markdown and YAML files

**Tools & Accounts**
- [ ] GitHub account with an active Copilot license (Copilot Pro, Business, or Enterprise)
- [ ] `gh` CLI installed and authenticated (`gh auth login`)
- [ ] GitHub Copilot CLI installed (see Quick Setup below)
- [ ] Git installed and working in the terminal
- [ ] A code repository to use during the workshop

> **Instructor note:** The most common setup failure is authentication. Before the workshop starts, ask participants to run `gh copilot --version` and confirm they see a version number and not an error.

---

## Quick Setup

### Step 1 — Install and authenticate `gh`

```bash
# Install gh (if not already installed)
# macOS
brew install gh

# Linux (Debian/Ubuntu)
sudo apt install gh

# Authenticate
gh auth login
```

### Step 2 — Install the Copilot CLI extension

```bash
gh extension install github/gh-copilot
gh copilot --version
```

### Step 3 — Verify your Copilot access

```bash
gh copilot suggest "list all git branches sorted by last commit date"
```

You should receive a shell command suggestion. If authentication prompts appear, follow them before the workshop begins.

### Option — Use this workshop repo in a Codespace or dev container

This repository includes a top-level `.devcontainer/`. In **GitHub Codespaces**, create a codespace from this repository. In **VS Code**, run **Dev Containers: Reopen in Container** from the Command Palette.

Once the container starts, navigate to:
- `workshop-mastering-copilot-cli/README.md`
- `workshop-mastering-copilot-cli/examples/`

### Pre-flight Check

Before the workshop officially starts, ask participants to verify:
1. `gh copilot suggest "hello world"` returns a suggestion without errors.
2. Their terminal is open and their repository is cloned and writable.
3. Git works in the integrated terminal.

> **Facilitation recommendation:** If the audience is mixed, steer beginners toward the devcontainer path. The CLI and auth are pre-configured there.

---

## Workshop Agenda

| Time | Section | Format | Outcome |
|---|---|---|---|
| 00:00–15:00 | [1. How the Copilot CLI Works: Agent Sessions & Customization Layers](#section-1-how-the-copilot-cli-works-agent-sessions--customization-layers) | Concept + demo | Participants understand how a CLI agent session is assembled and where customization lands |
| 15:00–30:00 | [2. Activity 1 – Slash Commands & Second-Opinion Model Families](#section-2-activity-1--slash-commands--second-opinion-model-families) | Hands-on | Participants use slash commands fluently and apply a second model family to validate output |
| 30:00–45:00 | [3. Activity 2 – Custom Agents & Agent Orchestration](#section-3-activity-2--custom-agents--agent-orchestration) | Hands-on | Participants create a custom orchestrator agent and delegate tasks to specialized sub-agents |
| 45:00–60:00 | [4. Activity 3 – Agent Skills & Fleet](#section-4-activity-3--agent-skills--fleet) | Hands-on + debrief | Participants package a skill and run multiple agents in parallel with Fleet |

---

## Section 1: How the Copilot CLI Works: Agent Sessions & Customization Layers

**Duration:** 15 minutes
**Format:** Instructor explanation + short live demo

### Teaching Goal

Give participants a practical mental model for how the Copilot CLI constructs an agent session and then show the four customization layers that let them shape that session before and during execution.

### The CLI Agent Session Stack

When you start a Copilot CLI agent session, the agent receives:

```text
┌──────────────────────────────────────────────────────────────┐
│ Conversation Turn — what you typed or pasted right now      │
├──────────────────────────────────────────────────────────────┤
│ Session Context — prior turns, skill output, tool results   │
├──────────────────────────────────────────────────────────────┤
│ Environment Snapshot — shell env, working directory, git    │
├──────────────────────────────────────────────────────────────┤
│ Agent Config — role, tools, model, skill list, handoffs     │
├──────────────────────────────────────────────────────────────┤
│ Skill Instructions — loaded only when the skill is active   │
├──────────────────────────────────────────────────────────────┤
│ Core Identity — Copilot's built-in baseline role            │
└──────────────────────────────────────────────────────────────┘
```

### The Four CLI Customization Layers

| Layer | Where It Lives | When It Loads |
|---|---|---|
| **Slash commands** | Typed inline during a session | Immediately; change model, context, or session state |
| **Custom agents** | Agent config files (`.agent.md` or YAML) | At session start when the agent is invoked |
| **Agent skills** | `SKILL.md` + optional helper files | On demand when the agent judges the skill is relevant |
| **Fleet config** | Fleet manifest | When you invoke `gh copilot fleet` |

### Key Talking Points

- **Slash commands** are the fastest lever: they change model, clear context, switch agents, or compress history without restarting.
- **Custom agents** let you define a stable persona with specific tools, a workflow, and a preferred model for a class of task.
- **Agent orchestration** means one agent (the orchestrator) delegates to specialized sub-agents rather than trying to do everything itself.
- **Skills** keep large, specialized capabilities out of the default session context, loading them only when the current task needs them.
- **Fleet** runs multiple independent agent instances in parallel — useful when you have concurrent tasks that do not depend on each other.

### The Full Slash Command Reference

Show participants this full command list at the start of the session. They will use most of these in Activities 1–3.

**Agent environment**

| Command | What it does |
|---|---|
| `/init` | Initialize Copilot instructions for this repository, or suppress the init suggestion |
| `/agent` | Browse and select from available agents |
| `/skills` | Manage skills for enhanced capabilities |
| `/mcp` | Manage MCP server configuration |
| `/plugin` | Manage plugins and plugin marketplaces |

**Models and sub-agents**

| Command | What it does |
|---|---|
| `/model` | Select the AI model to use in this session |
| `/delegate` | Send this session to GitHub — Copilot will create a PR |
| `/fleet` | Enable fleet mode for parallel sub-agent execution |
| `/tasks` | View and manage background tasks (sub-agents and shell sessions) |

**Code**

| Command | What it does |
|---|---|
| `/ide` | Connect to an IDE workspace |
| `/diff` | Review the changes made in the current directory |
| `/pr` | Operate on pull requests for the current branch |
| `/review` | Run the code review agent to analyze changes |

**Session**

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

### Context Drift Talking Points

- A long-running agent session accumulates context the same way a long VS Code chat does.
- `/compact` compresses the conversation history in place — use it before switching phases or model families.
- `/context` shows exactly how many tokens are in use — the visual indicator is the fastest way to spot context pressure building.
- Orchestration helps because each sub-agent gets a short, focused context instead of a single agent accumulating everything.

### Suggested Live Demo

1. Open a terminal, run `gh copilot suggest "show only staged git changes"`, and show the result.
2. Start an agent session and type `/help` to show the full slash command list organized by category.
3. Run `/context` to show the token usage display — explain this is how you spot context pressure.
4. Ask the agent a question, then type `/model` to show model-switching in action.
5. Run `/diff` to show pending changes surfaced directly in the session.
6. Open the `examples/example-orchestrator.agent.md` file and walk through each section briefly.
7. Preview the Fleet config in `examples/example-fleet.yml` to show what parallel execution looks like.

### Checkpoint Question

> "If you want to run a code review with a different model than the one you used to write the code, what is the fastest way to do that?"

**Answer:** Use the `/model` slash command to switch model families within the same session, then paste the review prompt. Use `/compact` first if the session context is large.

---

## Section 2: Activity 1 – Slash Commands & Second-Opinion Model Families

**Duration:** 15 minutes
**Format:** Hands-on

📋 **Full instructions:** [activities/activity-1.md](./activities/activity-1.md)

### What Participants Do

1. Start a Copilot CLI agent session and run `/help` to see the full command list.
2. Try at least one command from each category: agent environment, models/sub-agents, code, and session.
3. Generate a Bash script using one model with a 💬 Copilot Prompt.
4. Use `/context` to check token usage, then switch model families with `/model`.
5. Get a second-opinion review using a focused 💬 Copilot Prompt.
6. Use `/compact`, `/rename`, and `/share` to manage the session.

### Suggested Example

Ask the first model to write a Bash script that backs up a directory. Then use the second model family to:
- catch errors or edge cases
- suggest safer alternatives
- propose improvements before the script is committed

### Success Criteria

- [ ] Participant ran `/help` and identified commands in all four categories.
- [ ] Participant used at least one command from each category.
- [ ] Participant switched model families during the session.
- [ ] Participant obtained a second-opinion review on generated output.
- [ ] Participant used `/context` and `/compact` to manage session state.
- [ ] Participant can explain when a second model family adds more value than staying with one.

### Instructor Notes

- Emphasize that `/model` and second-opinion are not about "more is better" — they are about using the right model for the right task.
- Some models are faster for iteration; others are stronger for synthesis and reasoning. The session-level switch is the key pattern.
- If participants finish early, have them try `/history` to see context accumulation and then `/clear` to reset.

---

## Section 3: Activity 2 – Custom Agents & Agent Orchestration

**Duration:** 15 minutes
**Format:** Hands-on

📋 **Full instructions:** [activities/activity-2.md](./activities/activity-2.md)

### What Participants Do

1. Use 💬 Copilot Prompts to generate agent configs for a **code-review sub-agent** and a **test-writer sub-agent**.
2. Use a 💬 Copilot Prompt to generate the **Orchestrator** agent config with handoffs to both sub-agents.
3. Use `/agent` to verify all agents are discoverable.
4. Invoke the orchestrator with a 💬 Copilot Prompt and use `/tasks` to monitor delegated sub-agent sessions.
5. Use `/diff` to review changes before committing and `/delegate` to optionally create a PR.

### Suggested Example

Orchestrator task: "Review and add tests for the function in `src/backup.sh`."
- The orchestrator routes the review portion to the `code-review` sub-agent.
- The orchestrator routes the test-writing portion to the `test-writer` sub-agent.
- Both sub-agents return their output to the orchestrator, which assembles the final response.

### Success Criteria

- [ ] Orchestrator agent config created (using a 💬 Copilot Prompt).
- [ ] At least two sub-agent configs created with distinct roles.
- [ ] `/agent` used to verify all agents are discoverable.
- [ ] Orchestrator used to delegate a real task.
- [ ] `/tasks` used to monitor sub-agent execution.
- [ ] Participant can explain why orchestration beats a single overloaded agent.

### Instructor Notes

- Keep emphasizing that narrow agents outperform broad ones — one job per sub-agent.
- Point out that `/agent` for discovery and `/tasks` for monitoring are the two new slash commands this activity introduces.
- If participants finish early, add a third sub-agent for documentation writing and wire it into the orchestrator.
- Draw the handoff arrow on a whiteboard if available: orchestrator → sub-agent → result → orchestrator → final output.

---

## Section 4: Activity 3 – Agent Skills & Fleet

**Duration:** 15 minutes
**Format:** Hands-on + debrief

📋 **Full instructions:** [activities/activity-3.md](./activities/activity-3.md)

### What Participants Do

1. Use 💬 Copilot Prompts to generate a `SKILL.md` and helper script for a `git-summary` skill.
2. Attach the skill to an agent config and verify it with `/skills`.
3. Use a 💬 Copilot Prompt to generate a Fleet manifest.
4. Invoke Fleet and use `/tasks` to monitor both agents executing simultaneously.
5. Use `/pr` or `/diff` to review outputs, then debrief on the decision map.

### Suggested Example

Skill: a `git-summary` skill that reads recent commit history and formats a concise summary.

Fleet run: run the `code-review` sub-agent and the `test-writer` sub-agent in parallel on the same feature branch, each producing independent output.

### Success Criteria

- [ ] `SKILL.md` exists with a clear name, description, and workflow.
- [ ] Skill is referenced in an agent config and verified with `/skills`.
- [ ] Fleet manifest created with at least two parallel agents.
- [ ] Fleet invoked and both agent outputs received.
- [ ] `/tasks` used to monitor Fleet agents while running.
- [ ] Participant can explain when Fleet is worth the added setup.

### Instructor Notes

- This is where the workshop thesis lands: the best CLI setup uses the right tool for the job — a single agent for simple tasks, orchestrated agents for complex multi-phase work, Fleet for independent parallel workstreams, and skills for portable capabilities.
- Point out that `/fleet`, `/tasks`, `/skills`, `/review`, and `/pr` are all new slash commands introduced in this activity.
- Keep the last 3–4 minutes for the debrief question.

### Suggested Example

1. **Create locally:** a `git-summary` skill that shells out to `git log --oneline -20`
2. **Run with Fleet:** send `code-review` and `test-writer` sub-agents to run in parallel on the same PR branch

---

## Hands-On Activities Summary

| Activity | Outcome | Why it matters |
|---|---|---|
| [Activity 1](./activities/activity-1.md) | Full slash command fluency + second-opinion model review with 💬 Copilot Prompts | Fastest levers for quality control without restarting a session |
| [Activity 2](./activities/activity-2.md) | Orchestrator + two focused sub-agents generated with 💬 Copilot Prompts | Shows that delegation beats one overloaded agent |
| [Activity 3](./activities/activity-3.md) | A packaged skill + a parallel Fleet run, both using 💬 Copilot Prompts | Shows progressive loading for reusable capabilities and parallelism for independent work |

---

## Stretch Goals

For advanced participants or post-workshop follow-up:

1. Add a third sub-agent — such as a documentation writer — and wire it into the orchestrator's routing logic.
2. Use `/share` to export a full session including the second-opinion review and the orchestrated output as a GitHub gist.
3. Add a `post-skill` step that commits skill output automatically to a file.
4. Write a Fleet manifest that fans out a code review across three different model families and compares the results.
5. Publish a skill to a shared skills registry so your team can install it.

---

## Resources

See [resources.md](./resources.md) for current Copilot CLI documentation, blog references, and the example artifacts included in this workshop.

---

## Instructor Notes: Common Questions, Talking Points, Troubleshooting

### Common Questions

| Question | Suggested Answer |
|---|---|
| "How is the CLI different from Copilot Chat in VS Code?" | The CLI is terminal-native and optimized for agentic, scriptable workflows. You can chain agents, run Fleet in parallel, and integrate with shell scripts and CI pipelines more naturally than in the IDE. |
| "When should I use an orchestrator instead of a single agent?" | When the task has distinct phases that benefit from different expertise or different models — for example, plan, implement, review, and document are all different jobs. |
| "What is Fleet actually doing?" | Fleet spawns multiple independent Copilot CLI agent instances in parallel. Each runs its own session and returns results. You are responsible for wiring the outputs together. |
| "How is a skill different from just adding more instructions to an agent?" | A skill is a package — it has a description for discovery, a workflow, and optional helper files. It loads only when the agent decides it is relevant. More instructions load unconditionally. |
| "Do I need all of these features?" | No. Start with slash commands. Add a custom agent when you repeat the same task profile. Add skills when you have large or specialized capabilities. Use Fleet only when tasks are genuinely independent. |

### Troubleshooting

| Symptom | Likely Cause | Fix |
|---|---|---|
| `gh copilot` command not found | Extension not installed | `gh extension install github/gh-copilot` |
| Authentication error on first run | `gh` not authenticated | `gh auth login` and follow the prompts |
| Model switch with `/model` not taking effect | Model name typo or model not available in the current plan | Check supported model names in `gh copilot models` |
| Sub-agent not receiving correct context | Orchestrator handoff prompt is too vague | Make the delegated task explicit in the handoff prompt |
| Fleet run only executes agents sequentially | Fleet config syntax error or missing parallel flag | Validate the Fleet manifest YAML and check for the `parallel: true` field |
| Skill not loading when expected | Skill description does not match the task vocabulary | Rewrite the description with the exact words the agent would associate with that task |
| `SKILL.md` helper script failing | Wrong relative path or missing dependency | Reference helper files from `SKILL.md` using relative paths and verify the dependency is installed |

### Facilitation Tips

- Start with `/help` on screen — it makes the slash-command system immediately concrete.
- When demonstrating second opinion, pick an example where the two models genuinely disagree. Error handling in shell scripts is a reliable source of divergence.
- In Activity 2, draw the orchestration flow before participants start. A simple whiteboard box-and-arrow diagram prevents confusion about which agent does what.
- In Activity 3, state the thesis clearly: Fleet is not always better — it is better only when tasks are truly independent.

---

## Exit Prompt

> "What is one workflow you currently do with a single long-running agent that you would now split into an orchestrator with sub-agents — or run with Fleet — when you get back to your real project?"
