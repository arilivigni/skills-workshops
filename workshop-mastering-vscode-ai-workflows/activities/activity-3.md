# Activity 3: Implementing Agent Skills

> **Time:** 15 minutes
> **Where:** VS Code with your workshop repository open
> **Goal:** Create one local skill, use one marketplace-installed skill, and understand progressive loading

This activity focuses on the most context-efficient customization type in the workshop.

A skill is a **capability package**:
- instructions in `SKILL.md`
- optional scripts
- optional templates or examples
- loaded only when relevant

---

## What You're Building

By the end of this activity you will have:
1. A local `pdf-reader` skill in `.github/skills/pdf-reader/SKILL.md`
2. A real example of a skill that uses Python to extract text from PDFs
3. One installed marketplace skill (`@github` from the GitHub Pull Requests extension)
4. A simple explanation of how progressive loading protects your context window

---

## Why a Skill Instead of More Instructions?

Use this workshop answer:
- **Instructions** are for rules that should always be around.
- **Skills** are for capabilities that should load only when the task needs them.

That difference is what makes skills useful against context rot.

---

## Part A - Create the Skill Folder

> **Suggested time:** 5 minutes

### Step A1 - Create the folder and files

```bash
mkdir -p .github/skills/pdf-reader
touch .github/skills/pdf-reader/SKILL.md
touch .github/skills/pdf-reader/extract_pdf.py
```

### Step A2 - Add this starter `SKILL.md`

```markdown
---
name: pdf-reader
description: Extract and summarize text from PDF files with Python. Use this when asked to inspect, quote, or summarize PDF content from a local file.
---

# PDF Reader Skill

## When to Use This Skill
Use this skill when the task involves reading or summarizing a PDF instead of a normal text file.

## Workflow
1. Confirm which PDF file should be read.
2. Run the helper script to extract text from the PDF.
3. Review the extracted text before answering.
4. Summarize or quote only the sections relevant to the user's request.
5. Mention extraction limits if the PDF is image-only or malformed.

## Resources
- Helper script: [extract_pdf.py](./extract_pdf.py)
```

### Step A3 - Explain the loading story

Describe progressive loading in three steps:
1. VS Code first sees only the **skill name and description**.
2. The **body of `SKILL.md`** loads only if the skill is selected or judged relevant.
3. Extra files like **`extract_pdf.py`** load only when the agent actually needs them.

That is the context-saving idea participants should remember.

---

## Part B - Add the Helper Script

> **Suggested time:** 5 minutes

Use this simple Python example:

```python
from pathlib import Path
import sys

from pypdf import PdfReader


def main() -> None:
    if len(sys.argv) < 2:
        raise SystemExit("Usage: python extract_pdf.py <path-to-pdf>")

    pdf_path = Path(sys.argv[1]).expanduser().resolve()
    reader = PdfReader(str(pdf_path))
    text = "\n".join(page.extract_text() or "" for page in reader.pages)
    print(text)


if __name__ == "__main__":
    main()
```

If participants do not have Python ready, keep the script conceptual and focus on why a script belongs inside a skill folder.

---

## Part C - Install and Use a Marketplace Skill

> **Suggested time:** 3 minutes

VS Code can surface skills from installed **agent plugins**. This is the easiest way to show that skills are not only local files; they can also come from shared marketplace packages.

### Step C1 - Open the plugin view

Use one of these paths:
1. Open **Extensions**
2. Search for `@agentPlugins`

Or:
1. Open Copilot Chat
2. Use the gear menu to open **Chat Customizations**
3. Go to **Plugins**

### Step C2 - Install a recommended marketplace skill plugin

Install the **GitHub Pull Requests** extension (`GitHub.vscode-pull-request-github`) from the VS Code marketplace. This extension exposes the `@github` agent with built-in skills for working with pull requests, issues, and code search.

```
Name: GitHub Pull Requests
ID: GitHub.vscode-pull-request-github
Publisher: GitHub
```

To install from the terminal:
```bash
code --install-extension GitHub.vscode-pull-request-github
```

> **Why this plugin:** It is officially maintained by GitHub, exposes clearly named skills (`@github`), and is directly relevant to any developer workflow. The skills it provides — such as searching code, managing pull requests, and querying issues — are easy to demo in any repository.

> **Instructor tip:** If the `@github` agent is already installed, skip to Step C3 to verify the skill appears in the Skills view. If the room does not have extension install access, the instructor can demo this step while participants review the local `pdf-reader` skill they just built.

### Step C3 - Verify the installed skill appears

After installation:
1. Open Copilot Chat and type `@github` — the agent should appear with its available skills listed
2. Or run **Chat: Open Chat Customizations** and inspect the **Skills** tab
3. Confirm the marketplace skill appears alongside your local `pdf-reader` skill

### Step C4 - Run the installed skill once using the proper invocation pattern

Invoke the `@github` skill with a focused task. The proper pattern is to mention the agent with `@` and then describe your task:

```text
@github Search for all open issues in this repository that mention "bug"
```

Or to use a skill directly:
```text
@github /search What files in this repo handle PDF reading?
```

Compare this invocation pattern with the local `pdf-reader` skill:
- **Local skill** (`pdf-reader`): selected from the skills picker when asked to summarize a PDF
- **Marketplace skill** (`@github`): invoked directly by mentioning the agent name with `@` or selecting from the skills picker

The important learning outcome is not the exact plugin. It is understanding that **skills can come from your repo or from installed marketplace plugins**, and the invocation pattern for both follows the same VS Code skills interface.

---

## Part D - Connect It Back to the Workshop

> **Suggested time:** 5 minutes

### Why this works well as a skill
- it is a reusable capability
- it may need helper code and extra files
- it should not consume context in every conversation
- it is useful across repos and even across AI tools that support skills
- it can be shared through plugins and marketplaces instead of being rewritten by every team

### Success Criteria
- [ ] `.github/skills/pdf-reader/SKILL.md` exists
- [ ] The `name` in the frontmatter matches the folder name (`pdf-reader`)
- [ ] The description says what the skill does and when to use it
- [ ] The `@github` marketplace skill (or equivalent) is visible in chat and invoked at least once
- [ ] You can explain how skills save context window space
- [ ] You can describe why the PDF workflow is a better fit for a skill than for always-on instructions

Use this one-sentence version if needed:

> Skills save context because the agent sees the name and description first, then loads instructions and helper files only when the task actually needs them.

---

## Commit Your Work

```bash
git add .github/skills/
git commit -m "chore: add pdf reader skill"
```

---

## Troubleshooting

| Problem | What to Check |
|---|---|
| Skill is not recognized | Confirm the path is `.github/skills/pdf-reader/SKILL.md` |
| Skill is hard to discover | Make the description say exactly when to use it |
| Script path is broken | Reference helper files with relative links from `SKILL.md` |
| PDF extraction fails on scanned documents | Explain that image-only PDFs may need OCR, not plain text extraction |
| Marketplace skill is not visible | Verify the plugin is installed and enabled, then reopen the Skills view or type `@` in chat |
| `@github` agent is not responding | Confirm the GitHub Pull Requests extension is installed and you are signed in to GitHub |

---

## Quick Debrief

Answer in one sentence:
- What capability did you package as a local skill? (`pdf-reader`)
- Which marketplace skill did you invoke? (`@github` from the GitHub Pull Requests extension)
- Why is a skill better than an always-on instruction for that workflow?

---

*← [Activity 2](./activity-2.md) · [Back to Workshop README](../README.md)*
