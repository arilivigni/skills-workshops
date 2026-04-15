# Copilot CLI workshop cheat sheet

Use this as the instructor's quick-reference sheet during the walkthrough.

## Core orientation commands

| Command | Why use it in the workshop |
| ------- | -------------------------- |
| `/help` | Show the command groups and prove participants do not need to memorize everything |
| `/env` | Inspect the current session, repo, and environment context |
| `/model` | Show the active model and available model options |
| `/agent` | Inspect available agents and demo the repo's `agentic-workflows` agent |
| `/skills list` | Inspect available skills and demo the repo's `write-a-prd` skill |

## Session and planning commands

| Command | Why use it in the workshop |
| ------- | -------------------------- |
| `/plan` | Create a plan before implementation |
| `/resume` | Switch to a previous session or resume a known session ID |
| `copilot --continue` | Resume the most recent session from the shell |
| `/chronicle standup` | Generate a session-history summary if experimental features are enabled |
| `/chronicle tips` | Get usage advice from prior sessions if experimental features are enabled |

## Orchestration commands

| Command | Why use it in the workshop |
| ------- | -------------------------- |
| `/fleet` | Break a multi-part task into parallel sub-agent subtasks |
| `/tasks` | Observe sub-agent activity if this command is available in your CLI version |
| `Shift+Tab` | Cycle among interactive mode, plan mode, and autopilot mode |
| `copilot --autopilot --yolo --max-autopilot-continues 10 -p "..."` | Show non-interactive autopilot from the shell |

## Skills and distribution commands

| Command | Why use it in the workshop |
| ------- | -------------------------- |
| `/skills info` | Show the source or location of a skill |
| `/skills reload` | Reload skills after adding a new skill folder |
| `/plugin list` | Contrast installed plugin packages with skills |
| `/plugin marketplace browse awesome-copilot` | Browse the Awesome Copilot marketplace from inside the CLI |
| `copilot plugin install project-planning@awesome-copilot` | Install a planning-focused plugin from the shared marketplace |
| `copilot plugin marketplace add github/awesome-copilot` | Register the marketplace in older or custom setups |

## Plausible output you can show live

### `/env`

```text
Environment summary

Workspace:
  cwd: /workspaces/skills-workshops
  git repo: skills-workshops
  branch: workshop-3-demo

Loaded customizations:
  agents: agentic-workflows
  skills: write-a-prd
  plugins: project-planning@awesome-copilot
```

### `/skills list`

```text
Available skills

  write-a-prd
    Location: .github/skills/write-a-prd
```

### `/plugin list`

```text
Installed plugins

  project-planning@awesome-copilot
  structured-autonomy@awesome-copilot
```

### `/agent`

```text
Available agents

  agentic-workflows
    Source: .github/agents/agentic-workflows.agent.md
```

## Speaker note

Use `/help` first, then drill into the smallest command that answers the current question. That habit is more important than memorizing command names.
