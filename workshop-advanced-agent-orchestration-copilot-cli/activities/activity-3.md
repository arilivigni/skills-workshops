# Activity 3: Skills, Plugins, Progressive Loading, and Shared Catalogs

> **Time:** 15 minutes
> **Where:** Copilot CLI in this repository
> **Goal:** Use a real local skill, then install and use a shared plugin from `github/awesome-copilot`

Skills are one of the best examples of context-efficient customization. The CLI does not stuff the full contents of every skill into the prompt all the time. Instead, it sees the skill name and description first, and only loads the full skill instructions when the skill is actually relevant.

---

## What You'll Practice

By the end of this activity you will:

1. Inspect a local repo skill with `/skills`
2. Invoke a local skill explicitly
3. Explain how skills differ from agents and plugins
4. Browse and install a shared plugin from the `awesome-copilot` marketplace
5. Run a command contributed by that plugin

---

## Part A - Inspect the local skill in this repo

> **Suggested time:** 4 minutes

This repository already includes a local skill:

- `.github/skills/write-a-prd/`

In the CLI, list available skills:

```text
/skills list
```

Then inspect details:

```text
/skills info
```

Use the picker to select `write-a-prd` and show the skill location.

### Teaching point

This is the easiest way to prove that the CLI discovered a repo-local skill without copying anything to your home directory.

---

## Part B - Invoke the local skill explicitly

> **Suggested time:** 4 minutes

Use the skill name in the prompt so participants see the invocation pattern clearly.

Example:

```text
Use /write-a-prd to draft a PRD in the chat for a follow-up lab to this workshop that focuses on code review workflows in Copilot CLI. Keep the output in the chat only and do not create a GitHub issue.
```

### What to point out

- The skill name is used like a slash command in the prompt
- The skill injects detailed instructions only when needed
- You can still add task-specific constraints in the same prompt

---

## Part C - Compare skills, agents, and plugins

> **Suggested time:** 3 minutes

Give participants this quick framing:

- **Instructions** - baseline rules that shape almost every task
- **Agents** - reusable identities or workflows that change how Copilot approaches a task
- **Skills** - task-specific instruction bundles that load on demand
- **Plugins** - installation/distribution units that can include agents, skills, prompts, hooks, or other capabilities

If useful, show:

```text
/plugin list
```

Then contrast it with:

```text
/skills list
```

---

## Part D - Bring in a shared plugin from the catalog

> **Suggested time:** 4 minutes

Open the shared catalog:

- <https://github.com/github/awesome-copilot/blob/main/docs/README.skills.md>
- <https://github.com/github/awesome-copilot/blob/main/docs/README.plugins.md>

Start by browsing the marketplace directly from the CLI:

```text
/plugin marketplace browse awesome-copilot
```

For this workshop, use one of these concrete examples:

- `project-planning@awesome-copilot` - planning-oriented commands, agents, and PRD helpers
- `structured-autonomy@awesome-copilot` - planning and implementation workflow commands aligned to this workshop's orchestration theme

If the marketplace is unknown in an older setup, register it once from the shell:

```bash
copilot plugin marketplace add github/awesome-copilot
```

Then install a plugin from the shell:

```bash
copilot plugin install project-planning@awesome-copilot
```

Or swap in:

```bash
copilot plugin install structured-autonomy@awesome-copilot
```

After installation, verify what the CLI now sees:

```text
/plugin list
/env
```

Then try a plugin-provided command. For example:

```text
/project-planning:create-implementation-plan
```

or:

```text
/structured-autonomy:structured-autonomy-plan
```

### Teaching point

The `awesome-copilot` catalog is a discovery surface, but `/plugin` is the operational workflow. A plugin installs a curated bundle of capabilities at once, whereas a skill is a single task-focused capability that gets loaded on demand.

---

## Debrief

Ask participants:

1. What instruction belongs in a skill instead of baseline instructions?
2. What is one task in your daily work that is repetitive enough to deserve its own skill?
3. Which shared plugin from the Awesome Copilot marketplace would you install first?

---

## Success Criteria

- [ ] You listed the local repo skill
- [ ] You invoked a skill explicitly in a prompt
- [ ] You browsed the `awesome-copilot` marketplace with `/plugin`
- [ ] You installed or planned a concrete plugin install such as `project-planning@awesome-copilot`
- [ ] You can explain why skills help conserve context
- [ ] You can explain why plugins are a better distribution mechanism for larger bundles of capabilities
