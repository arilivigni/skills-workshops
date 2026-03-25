# Workshop 1: Mastering VS Code AI Workflows & Context

> **Format:** Instructor-led live workshop · **Duration:** 60 minutes · **Level:** Intermediate  
> **Inspired by:** [Customize Your GitHub Copilot Experience](https://github.com/skills/customize-your-github-copilot-experience) (GitHub Skills)

This workshop helps participants move beyond one-off prompting and learn how to shape **persistent AI behavior in VS Code**. Instead of relying on repeated reminders in chat, participants will build a layered customization setup that gives GitHub Copilot stronger context about their project, workflow, and task types.

The session is built for live delivery: short concept framing, fast hands-on cycles, visible checkpoints, and practical examples that participants can reuse in real repositories.

---

## Learning Objectives

By the end of this workshop, participants will be able to:

1. **Explain the practical AI context stack** in VS Code: system context, user prompt, workspace/repository context, custom instructions, prompt files, custom agents, and agent skills.
2. **Create repository-wide custom instructions** that improve Copilot's default behavior for an entire project.
3. **Create targeted instruction files and reusable prompt files** for specific file types and recurring tasks.
4. **Build a custom agent** with a focused role, clear boundaries, and the right tool access for a specialized workflow.
5. **Describe when to use an agent skill instead of an instruction, prompt, or agent**, and optionally scaffold a starter skill folder.

---

## Prerequisites

**Knowledge**
- Comfortable using VS Code and opening the integrated terminal
- Basic familiarity with GitHub Copilot Chat in VS Code
- Basic Git workflow (`clone`, `add`, `commit`)
- Comfortable editing Markdown files

**Tools & Accounts**
- [ ] VS Code installed and updated
- [ ] GitHub Copilot and GitHub Copilot Chat extensions installed
- [ ] GitHub account with an active Copilot license
- [ ] Git installed and working in the terminal
- [ ] A repository to use during the workshop (personal repo or template-based practice repo)

> **Instructor note:** The most common failure point is authentication or extension setup. Ask participants to open Copilot Chat and send a simple prompt before the workshop starts.

---

## Quick Setup

Participants need an open repository in VS Code.

### Option A — Use a practice repository (recommended for consistent facilitation)
```bash
gh repo create my-copilot-workshop --template skills/customize-your-github-copilot-experience --public --clone
cd my-copilot-workshop
code .
```

### Option B — Use a real repository
```bash
cd ~/path/to/your-project
code .
```

### Pre-flight Check
Before the workshop officially starts, ask participants to verify:
1. Copilot Chat opens in VS Code
2. They can send and receive a response
3. Their repository is writable
4. Git works in the integrated terminal

> **Facilitation recommendation:** If the audience is mixed, let confident participants use their own repos and steer beginners toward the template repo for easier troubleshooting.

---

## Workshop Agenda

> Sections marked **🔵 Must-do** are core. Sections marked **🟡 Flexible** can be shortened, demoed, or assigned as follow-up if time runs tight.

| Time | Section | Format | Priority |
|---|---|---|---|
| 00:00–05:00 | [1. Welcome & Framing](#section-1-welcome--framing) | Instructor-led | 🔵 Must-do |
| 05:00–13:00 | [2. The AI Context Stack](#section-2-the-ai-context-stack) | Concept + demo | 🔵 Must-do |
| 13:00–28:00 | [3. Activity 1 — Repository-Wide Custom Instructions](#section-3-activity-1--repository-wide-custom-instructions) | Hands-on | 🔵 Must-do |
| 28:00–42:00 | [4. Activity 2 — Targeted Instructions & Prompt Files](#section-4-activity-2--targeted-instructions--prompt-files) | Hands-on | 🔵 Must-do |
| 42:00–55:00 | [5. Activity 3 — Custom Agents & Agent Skills](#section-5-activity-3--custom-agents--agent-skills) | Hands-on / demo | 🟡 Flexible |
| 55:00–60:00 | [6. Wrap-up & Next Steps](#section-6-wrap-up--next-steps) | Instructor-led | 🔵 Must-do |

**Built-in buffer:** Activities are intentionally scoped to leave 1-2 minutes of slack inside each block for questions, slow setup, or regrouping.

---

## Section 1: Welcome & Framing

**Duration:** 5 minutes  
**Format:** Instructor-led

### Talking Points
- This workshop is not about clever prompts alone.
- The real productivity gain comes from **engineering the context around the assistant**.
- If an assistant keeps missing your standards, your stack, or your preferred output format, you should not have to re-teach it every chat.
- Today participants will build a reusable setup they can keep in version control.

### Opening Question
> “When Copilot gives you something generic or off-target, what do you usually do next?”

Take 2-3 answers. Then land the point: most people retry the prompt, but this workshop focuses on **fixing the environment instead of retyping the same guidance**.

---

## Section 2: The AI Context Stack

**Duration:** 8 minutes  
**Format:** Instructor explanation + short live demo

### The Practical Context Model

Use this stack to explain what shapes AI behavior in practice:

```
┌──────────────────────────────────────────────────────┐
│ 7. Current User Prompt                              │
│    What you ask right now                           │
├──────────────────────────────────────────────────────┤
│ 6. Agent Skills                                     │
│    Reusable, task-specific capabilities and         │
│    resources loaded when relevant                   │
├──────────────────────────────────────────────────────┤
│ 5. Custom Agents                                    │
│    Role, instructions, tools, model preferences     │
├──────────────────────────────────────────────────────┤
│ 4. Prompt Files                                     │
│    Reusable task templates invoked with /           │
├──────────────────────────────────────────────────────┤
│ 3. Custom Instructions                              │
│    Repo-wide or targeted instructions files         │
├──────────────────────────────────────────────────────┤
│ 2. Workspace / Repository Context                   │
│    Open files, selections, repo structure, diffs    │
├──────────────────────────────────────────────────────┤
│ 1. User / Tool Configuration                        │
│    VS Code settings, enabled tools, environment     │
├──────────────────────────────────────────────────────┤
│ 0. System Context                                   │
│    Product-level baseline behavior you don't edit   │
└──────────────────────────────────────────────────────┘
```

### What to Say About Each Layer
- **System context:** The baseline behavior provided by the product. Participants cannot edit this directly.
- **User prompt:** Still matters. It tells the assistant what job to do right now.
- **Workspace/repository context:** Open tabs, selected code, repo files, naming patterns, and current changes strongly influence results.
- **Custom instructions:** Durable guidance for how the assistant should behave in a project or file scope.
- **Prompt files:** Saved task templates for repeated workflows.
- **Custom agents:** Named specialists with their own instructions and tool boundaries.
- **Agent skills:** Reusable capabilities packaged as a small folder, often including instructions, examples, or scripts for more complex workflows.

> **Key message:** These layers are additive. A prompt file can benefit from repo instructions. A custom agent still operates inside the repository context. A skill adds reusable capability without replacing the other layers.

### Live Demo (suggested)
1. Ask Copilot a generic question in a repo with no custom files.
2. Add a short `.github/copilot-instructions.md`.
3. Ask the same question again.
4. Narrate the difference: the assistant did not become smarter in general; it became better informed.

### Checkpoint Question
> “If I want tests and UI files to follow different conventions, which customization type is the best fit?”

**Answer:** targeted custom instructions.

---

## Section 3: Activity 1 — Repository-Wide Custom Instructions

**Duration:** 15 minutes  
**Format:** Hands-on  
**Priority:** 🔵 Must-do

📋 **Full instructions:** [activities/activity-1.md](./activities/activity-1.md)

### What Participants Do
1. Create `.github/copilot-instructions.md`
2. Add project-specific guidance: stack, conventions, architecture cues, things to avoid
3. Add one **personal workflow preference** section
4. Test the effect in Copilot Chat with a real question

### Success Criteria
- [ ] `.github/copilot-instructions.md` exists
- [ ] File includes real, project-specific content
- [ ] Participant can point to at least one visible response improvement
- [ ] File includes at least one personal preference, not just team conventions

### Instructor Notes
- Coach specificity: “avoid `any` in TypeScript” is better than “write good code.”
- Encourage participants to include both **positive guidance** and **negative guardrails**.
- If someone finishes early, ask them to improve the file based on a failed or vague response.

---

## Section 4: Activity 2 — Targeted Instructions & Prompt Files

**Duration:** 14 minutes  
**Format:** Hands-on  
**Priority:** 🔵 Must-do

📋 **Full instructions:** [activities/activity-2.md](./activities/activity-2.md)

### What Participants Do
**Part A — Targeted instructions**
1. Create a `*.instructions.md` file in `.github/instructions/`
2. Add an `applyTo` glob so it applies automatically to a specific file type or folder
3. Test behavior in a matching file

**Part B — Prompt files**
1. Create a `.prompt.md` file in `.github/prompts/`
2. Capture a repeated task from their workflow
3. Add at least one team- or project-specific requirement
4. Invoke it from Copilot Chat using `/`

### Success Criteria
- [ ] At least one targeted instructions file exists and contains `applyTo`
- [ ] At least one `.prompt.md` file exists
- [ ] Participant can explain the difference between an always-on instruction and a manually invoked prompt file
- [ ] Prompt file includes a personalization detail unique to the participant's workflow

### Instructor Notes
- Participants often confuse instructions and prompt files. Reinforce:
  - **Instructions** = always-on or automatically applied
  - **Prompt files** = manually invoked for a task
- If people are stuck, suggest common prompt ideas: PR description, test scaffold, README helper, security review.
- Encourage them to open both a matching file and a non-matching file when testing targeted instructions.

---

## Section 5: Activity 3 — Custom Agents & Agent Skills

**Duration:** 13 minutes  
**Format:** Hands-on with optional instructor demo  
**Priority:** 🟡 Flexible

📋 **Full instructions:** [activities/activity-3.md](./activities/activity-3.md)

### What Participants Do
**Must-do core:**
1. Create one custom agent in `.github/agents/` using a `.agent.md` file
2. Define its purpose, tools, and boundaries
3. Activate it in VS Code and run a real task

**Optional extension if time allows:**
4. Scaffold one starter skill in `.github/skills/<skill-name>/SKILL.md`
5. Write a description explaining when the skill should be used

### Success Criteria
- [ ] A `.agent.md` file exists in `.github/agents/`
- [ ] Participant can explain what makes the agent specialized
- [ ] Participant runs the agent on a real task
- [ ] Participant can state when a skill is a better fit than an agent or prompt

### Instructor Notes
- If time is short, demo the agent live and make the skill portion conceptual only.
- If participants are unsure what role to create, suggest: documentation reviewer, test generator, API reviewer, security reviewer.
- Explain the distinction clearly:
  - **Agent** = a persona / role with tools and behavior
  - **Skill** = a reusable capability package that can be loaded when relevant

---

## Section 6: Wrap-up & Next Steps

**Duration:** 5 minutes  
**Format:** Instructor-led

### Recap Talking Points
1. Better AI results are often a **context design problem**, not a prompting problem.
2. The highest-ROI first step is usually `.github/copilot-instructions.md`.
3. Different customization types solve different problems:
   - instructions for standards
   - prompt files for repeated tasks
   - agents for roles
   - skills for reusable capabilities
4. The strongest workshop outcome is not “I learned a feature.” It is “I now have a working setup I can evolve.”

### Exit Prompt
> “What is one AI customization you are going to bring back to a real repository this week?”

---

## Hands-On Activities Summary

| Activity | Outcome | Must-do? | Success Signal |
|---|---|---|---|
| [Activity 1](./activities/activity-1.md) | Repository-wide instructions file | Yes | Copilot starts responding with better project awareness |
| [Activity 2](./activities/activity-2.md) | One targeted instructions file + one prompt file | Yes | Different file scopes and reusable prompts behave as intended |
| [Activity 3](./activities/activity-3.md) | One custom agent, plus optional starter skill | Flexible | Agent acts like a specialist; participant can explain when a skill fits |

---

## Stretch Goals

For advanced participants or post-workshop follow-up:

1. **Create two targeted instruction files** for different parts of the repo and compare outcomes.
2. **Turn a real repeated team workflow into a prompt file** and commit it for teammates.
3. **Build a second custom agent** with a different tool set and compare behavior.
4. **Create a real agent skill** with `SKILL.md`, examples, and a support file.
5. **Add org- or team-level guidance** by aligning repo customizations with broader engineering standards.

---

## Resources

See [resources.md](./resources.md) for official documentation, the original GitHub Skill, and reference examples included in this workshop folder.

---

## Instructor Notes: Common Questions, Talking Points, Troubleshooting

### Common Questions

| Question | Suggested Answer |
|---|---|
| “What should go in repo instructions versus a prompt file?” | Put durable project standards in instructions. Put task-specific workflows in prompt files. |
| “What is the difference between a custom agent and a skill?” | An agent defines a role and tool set. A skill packages a reusable capability or workflow that can load when relevant. |
| “Can I use my own project instead of the template?” | Yes, and that is often more valuable. The template just makes facilitation easier. |
| “Do these files need to be committed?” | They take effect locally when saved, but commit them if you want your team to share the configuration. |
| “Do I need all customization types?” | No. Start with repo instructions, then add prompt files or agents only where they solve a clear problem. |

### Troubleshooting

| Symptom | Likely Cause | Fix |
|---|---|---|
| Copilot seems generic even after adding instructions | File is too vague or not saved | Save the file, sharpen the wording, ask a concrete test prompt |
| Targeted instructions do not seem to activate | Wrong file name, wrong extension, or bad `applyTo` glob | Use `*.instructions.md`, add YAML frontmatter, verify the glob matches a real file |
| Prompt file does not show in `/` menu | Wrong extension or folder | Use `.prompt.md` in `.github/prompts/`, then reload VS Code if needed |
| Agent does not appear in VS Code | Wrong file type or invalid frontmatter | Use `.agent.md` in `.github/agents/`, check YAML frontmatter, reload the window |
| Skill is not discoverable | Wrong folder structure | Use `.github/skills/<skill-name>/SKILL.md` and make sure `name` matches the folder |

### Facilitation Tips
- Keep the lecture portions short. Participants learn fastest once their hands are on the files.
- Walk the room during activity time; do not wait for participants to self-identify as blocked.
- Normalize iteration. The first version of a customization is rarely the final one.
- If time is running short, keep Activities 1 and 2 intact and convert most of Activity 3 into an instructor demo.
- Ask participants to personalize at least one artifact. That moment makes the workshop feel relevant instead of theoretical.

---

## Facilitator Tips

- **Keep the pace visible:** Call out time remaining at the halfway point of each activity.
- **Use real examples:** Show one mediocre AI response and one improved one.
- **Favor examples over abstraction:** When explaining context layers, connect each layer to a file or action participants can see.
- **Protect the must-do outcomes:** Everyone should leave with repo instructions and at least one prompt or targeted instruction file.
- **Close with action:** Encourage participants to commit what they created before they leave.
