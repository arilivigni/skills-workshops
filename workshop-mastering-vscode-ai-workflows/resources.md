# Resources - Workshop 1: Mastering VS Code AI Workflows & Agent Customization

A curated list of current documentation and workshop support material for instructions, prompt files, custom agents, and skills in VS Code.

---

## Official VS Code Customization Documentation

- **[Customization Overview](https://code.visualstudio.com/docs/copilot/copilot-customization)**
  Starting point for understanding the full customization surface.

- **[Custom Instructions](https://code.visualstudio.com/docs/copilot/customization/custom-instructions)**
  Covers `.github/copilot-instructions.md`, `.github/instructions/*.instructions.md`, `applyTo` globs, and where instructions apply.

- **[Prompt Files](https://code.visualstudio.com/docs/copilot/customization/prompt-files)**
  Covers `.prompt.md` files, slash-command usage, tools, agents, and model frontmatter.

- **[Custom Agents](https://code.visualstudio.com/docs/copilot/customization/custom-agents)**
  Covers `.agent.md` files, tool restrictions, model preferences, and handoffs.

- **[Agent Skills](https://code.visualstudio.com/docs/copilot/customization/agent-skills)**
  Covers `SKILL.md`, portability, and progressive loading.

- **[Agent Plugins](https://code.visualstudio.com/docs/copilot/customization/agent-plugins)**
  Covers browsing and installing marketplace plugins that can provide shared skills.

- **[Chat Customizations Editor](https://code.visualstudio.com/docs/copilot/customization/overview#_chat-customizations-editor)**
  Useful for creating and managing instructions, prompts, agents, and skills from the VS Code UI.

---

## GitHub and Ecosystem References

- **[Customize Your GitHub Copilot Experience](https://github.com/skills/customize-your-github-copilot-experience)**
  The GitHub Skill that inspired this workshop.

- **[GitHub Copilot in Your IDE](https://docs.github.com/en/copilot/using-github-copilot/using-github-copilot-in-your-ide)**

- **[Adding Custom Instructions for GitHub Copilot](https://docs.github.com/en/copilot/customizing-copilot/adding-custom-instructions-for-github-copilot)**

- **[Prompt Engineering for GitHub Copilot](https://docs.github.com/en/copilot/using-github-copilot/prompt-engineering-for-github-copilot)**

- **[Agent Skills Open Standard](https://agentskills.io)**
  Background on the open skills format used across compatible agents.

- **[Awesome Copilot](https://github.com/github/awesome-copilot)**
  Community examples for instructions, prompts, agents, and skills.

- **[Copilot Plugins Marketplace Repo](https://github.com/github/copilot-plugins)**
  Default marketplace source that VS Code can browse for agent plugins and shared skills.

---

## Workshop Example Files

The `examples/` folder in this workshop includes:

| File | Purpose |
|---|---|
| `example-copilot-instructions.md` | Example repo-wide instructions focused on durable guidance |
| `example-targeted-instructions.md` | Example focused instructions for `.github/instructions/` with an `applyTo` scope |
| `example-prompt-template.prompt.md` | Example reusable prompt file with a pinned model |
| `example-agent.md` | Example planning agent with explicit workflow boundaries |
| `example-skill.md` | Example PDF reader skill |
| `example-pdf-reader.py` | Example helper script for PDF extraction |

---

## Suggested Follow-up Practice

After the workshop, try one of these in a real repository:
1. Trim an overgrown instruction file until only durable rules remain.
2. Convert one repeated chat request into a `.prompt.md` file with a task-appropriate model.
3. Create a planning agent with a handoff into implementation.
4. Package a real capability that needs scripts or templates as a skill.
5. Review a long-running chat and split it into the right customization layers.

---

## PDF Skill Support

For the PDF-reading skill example, the helper script in this workshop uses **pypdf**:
- **[pypdf Documentation](https://pypdf.readthedocs.io/)**

Use this as a concrete example of why a skill can bundle both instructions and helper code.

---

## Troubleshooting & Community

- **[VS Code Copilot issue tracker](https://github.com/microsoft/vscode-copilot-release/issues)**
- **[GitHub Community Discussions - Copilot](https://github.com/orgs/community/discussions/categories/copilot)**
- **[GitHub Copilot changelog](https://github.blog/changelog/label/copilot/)**

---

*← [Back to Workshop README](./README.md)*
