# Activity 1: Repository-Wide Custom Instructions

> **⏱ Time:** 15 minutes  
> **🔵 Must-do**  
> **📍 Where:** VS Code with your workshop repository open

---

## What You're Building

A `.github/copilot-instructions.md` file — the single most impactful thing you can do to improve Copilot's usefulness in your project. This file is automatically included in every Copilot Chat conversation when your workspace is open, without you having to reference it each time.

Think of it as a **permanent briefing document** you hand to the AI assistant every time it shows up for work.

---

## Before You Start

Open VS Code with your workshop repository. Verify Copilot Chat is available:

1. Open **Copilot Chat** from the Activity Bar or run **Chat: Focus on Chat View** from the Command Palette  
2. Type: `What language and framework does this project use?`  
3. Note the response — it may be generic or uncertain. After this activity, it will be specific.

---

## Step 1 — Create the Instructions File

In your repository root, create the directory and file:

```bash
mkdir -p .github
touch .github/copilot-instructions.md
```

Or use VS Code's Explorer: right-click in the file tree → **New Folder** → `.github`, then **New File** → `copilot-instructions.md`.

Open the file in the editor.

---

## Step 2 — Write Your Instructions

Your instructions should answer the questions an AI assistant would need to be immediately useful on your project. Use the template below as a **starting point** — then replace every placeholder with something true and specific to your project.

> **Key principle:** Vague instructions produce vague improvements. Specific instructions produce specific improvements.

### Starter Template

```markdown
# Project: [Your Project Name]

## What This Project Does
[One or two sentences. What problem does this solve? Who uses it?]

## Language & Runtime
- Primary language: [e.g., TypeScript 5.x / Python 3.12 / Go 1.22]
- Runtime: [e.g., Node.js 20 / CPython / standard Go toolchain]
- Package manager: [e.g., pnpm / poetry / go modules]

## Key Frameworks & Libraries
- [Framework name]: [one-line description of how it's used]
- [Library name]: [one-line description of how it's used]
- [Add more as relevant]

## Code Style & Conventions
- [e.g., Use async/await, never .then() chains]
- [e.g., Prefer named exports over default exports]
- [e.g., All public functions must have JSDoc comments]
- [e.g., Use early returns to reduce nesting]
- [e.g., Error handling: always throw typed errors, never swallow]

## Project Structure
- `src/` — [describe what lives here]
- `tests/` — [describe testing conventions]
- [Add other directories that matter]

## What to Avoid
- [e.g., Do not use `var`, always `const` or `let`]
- [e.g., Do not use deprecated APIs from X library]
- [e.g., Do not add new dependencies without discussing first]
- [e.g., Do not generate commented-out code]

## Testing
- Framework: [e.g., Vitest / pytest / Go's testing package]
- Convention: [e.g., test files live next to source files as `*.test.ts`]
- Coverage target: [e.g., aim for >80% branch coverage on new code]
```

**Fill this in for your real project.** If you're using the GitHub Skill template repo, describe what you know about it or what kind of project you *wish* you were configuring.

---

## Step 3 — Add a Personalization Section

At the bottom of your file, add a section that is **entirely personal to your workflow** — things about how you like to work, not just what the project requires.

This is the personalization moment: Copilot's behavior should reflect *you*, not just the project.

Examples of personal workflow preferences:
```markdown
## My Workflow Preferences
- When I ask for code examples, show the simplest version first, then offer a more robust version
- I prefer explanations that start with the "why" before the "how"
- When suggesting refactors, show the before/after side by side
- I work in short focused sessions — keep responses concise unless I ask for depth
- Flag potential performance or security concerns proactively, even if I didn't ask
```

Write your own — make it real.

---

## Step 4 — Test Your Instructions

With the file saved, go back to Copilot Chat and ask the **same question** from Before You Start:

```
What language and framework does this project use?
```

Compare to your earlier response. Then try a task-oriented prompt:

```
Write a utility function that [something relevant to your project]
```

Observe:
- Does the response use the right language/framework?
- Does it follow the conventions you specified?
- Does it avoid the things you said to avoid?

If something is off, go back to the file and sharpen the relevant instruction.

---

## Step 5 — Commit

```bash
git add .github/copilot-instructions.md
git commit -m "chore: add repository-wide Copilot instructions"
```

---

## ✅ Success Criteria

Before moving on, confirm:

- [ ] `.github/copilot-instructions.md` exists and contains meaningful, project-specific content (not just placeholder text)
- [ ] You have tested Copilot Chat and observed the instructions taking effect
- [ ] You have added at least one personal workflow preference
- [ ] The file is committed to your repository

---

## 💡 Pro Tips

- **Be specific about negatives.** "Don't use `var`" is more useful than "write clean code."
- **Keep it maintained.** Treat this file like a living document. Update it when your stack or conventions change.
- **It's a team artifact.** When you're done, this file benefits every developer on the team — not just you.
- **Length sweet spot:** 100–300 lines is typical. Under 50 is probably too vague; over 500 may have diminishing returns.

---

## 🆘 Troubleshooting

| Problem | Solution |
|---|---|
| Copilot still gives generic responses | Make sure the file is saved. Then ask a prompt that should obviously trigger the instructions and, if needed, reload the VS Code window (`Ctrl+Shift+P` → "Developer: Reload Window"). Commit the file once you're happy with it so the setup is shared with your team. |
| File not found in Explorer | Ensure the directory is named `.github` (with a dot) and the file is `copilot-instructions.md` (exact name). |
| Instructions seem partially applied | Check for formatting issues — use plain Markdown, avoid HTML tags or unusual characters. |

---

*← [Back to Workshop README](../README.md) · [Next: Activity 2 →](./activity-2.md)*
