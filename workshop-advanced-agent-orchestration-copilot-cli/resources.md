# Resources - Workshop 3: Advanced Agent Orchestration & The Copilot CLI

A curated list of documentation, blog references, and workshop support material for the GitHub Copilot CLI — autonomous autopilot loops, slash commands, multi-model agent teams, agent orchestration, skills, and Fleet.

---

## GitHub Copilot CLI Blog References

These blog posts are the direct inspiration for this workshop. Read them for deeper context on each feature area.

- **[Power Agentic Workflows in Your Terminal with GitHub Copilot CLI](https://github.blog/ai-and-ml/github-copilot/power-agentic-workflows-in-your-terminal-with-github-copilot-cli/)**
  Overview of terminal-based agentic workflows: agent sessions, slash commands, custom agents, and the foundational CLI patterns.

- **[From Idea to Pull Request: A Practical Guide to Building with GitHub Copilot CLI](https://github.blog/ai-and-ml/github-copilot/from-idea-to-pull-request-a-practical-guide-to-building-with-github-copilot-cli/)**
  End-to-end walkthrough of going from a task description to a ready-to-merge pull request using the Copilot CLI workflow.

- **[GitHub Copilot CLI Combines Model Families for a Second Opinion](https://github.blog/ai-and-ml/github-copilot/github-copilot-cli-combines-model-families-for-a-second-opinion/)**
  How to use `/model` and second-opinion mode to combine different model families, and when that pattern adds the most value.

- **[Run Multiple Agents at Once with Fleet in Copilot CLI](https://github.blog/ai-and-ml/github-copilot/run-multiple-agents-at-once-with-fleet-in-copilot-cli/)**
  In-depth guide to Fleet: the parallel agent execution feature, Fleet manifests, and patterns for using concurrent agents effectively.

---

## Official GitHub Copilot CLI Documentation

- **[GitHub Copilot in the CLI](https://docs.github.com/en/copilot/using-github-copilot/using-github-copilot-in-the-command-line)**
  Official documentation for `gh copilot suggest`, `gh copilot explain`, and the interactive agent session.

- **[About GitHub Copilot in the Command Line](https://docs.github.com/en/copilot/github-copilot-in-the-cli/about-github-copilot-in-the-cli)**
  Overview of what the Copilot CLI offers compared with the IDE experience.

- **[Installing GitHub Copilot in the CLI](https://docs.github.com/en/copilot/github-copilot-in-the-cli/installing-github-copilot-in-the-cli)**
  Step-by-step installation guide for `gh extension install github/gh-copilot`.

- **[Using GitHub Copilot in the CLI](https://docs.github.com/en/copilot/github-copilot-in-the-cli/using-github-copilot-in-the-cli)**
  Covers interactive mode, slash commands, and basic agent session usage.

---

## Agent Customization References

- **[Custom Agents (VS Code docs — concepts apply to CLI)](https://code.visualstudio.com/docs/copilot/customization/custom-agents)**
  Covers `.agent.md` files, tool restrictions, model preferences, and handoffs. The file format and frontmatter fields apply to both VS Code and CLI agents.

- **[Agent Skills Open Standard](https://agentskills.io)**
  Background on the open skills format used across compatible agents and tools, including the CLI skill format used in this workshop.

- **[Agent Skills (VS Code docs — concepts apply to CLI)](https://code.visualstudio.com/docs/copilot/customization/agent-skills)**
  Covers `SKILL.md` structure, progressive loading, and how skills differ from always-on instructions.

- **[Awesome Copilot](https://github.com/github/awesome-copilot)**
  Community examples for instructions, prompts, agents, and skills — including CLI-compatible patterns.

---

## `gh` CLI References

- **[gh CLI Manual](https://cli.github.com/manual/)**
  Full reference for all `gh` commands, including the `extension` subcommand used to install Copilot CLI.

- **[gh auth login](https://cli.github.com/manual/gh_auth_login)**
  Authentication setup — the first step before using any Copilot CLI features.

- **[gh extension install](https://cli.github.com/manual/gh_extension_install)**
  How to install `gh` CLI extensions, including `github/gh-copilot`.

---

## Workshop Example Files

The `examples/` folder in this workshop includes:

| File | Purpose |
|---|---|
| `example-orchestrator.agent.md` | Full orchestrator agent config with handoffs to sub-agents and an attached skill |
| `example-code-review.agent.md` | Code review sub-agent with focused role, tools, and structured output format |
| `example-test-writer.agent.md` | Test-writing sub-agent with clear boundaries and grouped output format |
| `example-git-summary.skill.md` | Git summary skill with progressive-loading description and workflow |
| `example-summarize-git.sh` | Helper script for the git-summary skill |
| `example-fleet.yml` | Fleet manifest running code-review and test-writer agents in parallel |

---

## Suggested Follow-up Practice

After the workshop, try one of these in a real repository:

1. Build a second-opinion workflow for your most error-prone code area — write first, switch models, review before committing.
2. Create a custom orchestrator for your team's most common multi-phase task: plan → implement → review → document.
3. Package a repeated shell-based workflow as an agent skill with a helper script.
4. Write a Fleet manifest that fans out a code review across two different model families and compare the reports.
5. Add a `doc-writer` sub-agent to the orchestrator and route documentation tasks to it after review and testing.

---

## Troubleshooting & Community

- **[GitHub Copilot issue tracker](https://github.com/github/copilot/issues)**
- **[gh CLI issue tracker](https://github.com/cli/cli/issues)**
- **[GitHub Community Discussions - Copilot](https://github.com/orgs/community/discussions/categories/copilot)**
- **[GitHub Copilot changelog](https://github.blog/changelog/label/copilot/)**

---

*← [Back to Workshop README](./README.md)*
