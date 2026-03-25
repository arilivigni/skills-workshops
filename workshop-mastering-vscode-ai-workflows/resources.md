# Resources — Workshop 1: Mastering VS Code AI Workflows & Context

A curated list of official references and workshop support material.

---

## Official Documentation

### VS Code Copilot Customization
- **[Customization Overview](https://code.visualstudio.com/docs/copilot/copilot-customization)**  
  Good starting point for understanding instructions, prompts, agents, skills, and related customization options.

- **[Custom Instructions](https://code.visualstudio.com/docs/copilot/customization/custom-instructions)**  
  Covers `.github/copilot-instructions.md`, `*.instructions.md`, `applyTo` globs, and related file locations.

- **[Prompt Files](https://code.visualstudio.com/docs/copilot/customization/prompt-files)**  
  Covers `.prompt.md` files, frontmatter, and how to invoke prompts from Copilot Chat.

- **[Custom Agents](https://code.visualstudio.com/docs/copilot/customization/custom-agents)**  
  Covers `.agent.md` files, frontmatter, tools, agent selection, and agent-specific behaviors.

- **[Agent Skills](https://code.visualstudio.com/docs/copilot/customization/agent-skills)**  
  Covers `.github/skills/<skill-name>/SKILL.md`, skill metadata, and when skills are the right fit.

### GitHub Copilot Docs
- **[GitHub Copilot in your IDE](https://docs.github.com/en/copilot/using-github-copilot/using-github-copilot-in-your-ide)**
- **[Adding Custom Instructions for GitHub Copilot](https://docs.github.com/en/copilot/customizing-copilot/adding-custom-instructions-for-github-copilot)**
- **[Prompt Engineering for GitHub Copilot](https://docs.github.com/en/copilot/using-github-copilot/prompt-engineering-for-github-copilot)**

---

## GitHub Skills References

- **[Customize Your GitHub Copilot Experience](https://github.com/skills/customize-your-github-copilot-experience)**  
  The GitHub Skill that inspired this workshop structure.

- **[Getting Started with GitHub Copilot](https://github.com/skills/getting-started-with-github-copilot)**  
  Useful prerequisite for participants who need more baseline practice.

- **[All GitHub Skills](https://learn.github.com/skills)**

---

## Workshop Example Files

The `examples/` folder in this workshop includes:

| File | Purpose |
|---|---|
| `example-copilot-instructions.md` | Example repository-wide instructions file |
| `example-targeted-instructions.md` | Example targeted instructions content |
| `example-prompt-template.prompt.md` | Example reusable prompt file |
| `example-agent.md` | Example custom agent definition |
| `example-skill.md` | Example starter skill |

---

## Suggested Follow-up Practice

After the workshop, try one of these in a real repository:
1. Add a real `.github/copilot-instructions.md` to a team repo
2. Create two targeted instruction files for two different parts of the codebase
3. Turn a repeated engineering task into a prompt file
4. Create a specialist agent that supports your real review workflow
5. Package a repeated multi-step process as a skill with `SKILL.md` and examples

---

## Troubleshooting & Community

- **[VS Code Copilot issue tracker](https://github.com/microsoft/vscode-copilot-release/issues)**
- **[GitHub Community Discussions — Copilot](https://github.com/orgs/community/discussions/categories/copilot)**
- **[GitHub Copilot changelog](https://github.blog/changelog/label/copilot/)**

---

*← [Back to Workshop README](./README.md)*
