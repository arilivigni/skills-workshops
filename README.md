# Skills Workshops

A collection of **instructor-led live workshops** built on top of [GitHub Skills](https://learn.github.com/skills) exercises. Each workshop transforms a self-paced skill into a structured, hands-on, classroom-ready experience — complete with a detailed instructor guide, timed agenda, hands-on activities, and facilitator tips.

## What's in this Repo

| Workshop | Theme | Duration | Skill Inspiration |
|---|---|---|---|
| [Workshop 1: Mastering VS Code AI Workflows & Context](./workshop-mastering-vscode-ai-workflows/README.md) | AI context layers, instructions, prompts, agents, and skills in VS Code | 60 min | [Customize Your GitHub Copilot Experience](https://github.com/skills/customize-your-github-copilot-experience) |
| [Workshop 2: Creating Rich Interfaces with MCP Apps](./workshop-creating-rich-interfaces-with-mcp-apps/README.md) | Building MCP servers that return interactive UIs directly inside the AI chat | 60 min | [Model Context Protocol](https://modelcontextprotocol.io) |
| [Workshop 3: Advanced Agent Orchestration & The Copilot CLI](./workshop-advanced-agent-orchestration-copilot-cli/README.md) | Use the GitHub Copilot CLI to run autonomous autopilot loops and configure multiple AI models as sub-agents in a coordinated team | 60 min | [GitHub Copilot CLI blog series](https://github.blog/ai-and-ml/github-copilot/) |

## How These Workshops Are Structured

Each workshop folder contains:

```
workshop-XX-title/
├── README.md          # Full instructor guide with agenda, talking points & troubleshooting
├── activities/        # Step-by-step hands-on activity files
│   ├── activity-1.md
│   ├── activity-2.md
│   └── activity-3.md
├── examples/          # Sample files, starter templates, and expected outputs
└── resources.md       # Curated links and reference material
```

## Who These Are For

- **Instructors & workshop facilitators** delivering live GitHub Copilot or AI tooling training
- **Developer advocates** running hands-on labs at conferences, meetups, or internal learning days
- **Educators** building curriculum around GitHub Skills and AI-assisted development

## Codespaces and Dev Containers

This repo includes a top-level `.devcontainer/` so you can open it directly in:
- **GitHub Codespaces**
- **VS Code Dev Containers**

The container uses `mcr.microsoft.com/devcontainers/base:jammy` and preps the workshop environment for Copilot demos, Markdown editing, and the PDF skill example.

## Contributing

Each workshop is self-contained and designed to be runnable with minimal prep. See individual workshop `README.md` files for prerequisites and setup instructions.
