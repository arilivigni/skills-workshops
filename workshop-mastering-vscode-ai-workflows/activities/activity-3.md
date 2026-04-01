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
1. A starter skill in `.github/skills/<skill-name>/SKILL.md`
2. A real example of a skill that uses Python to extract text from PDFs
3. One installed skill from the marketplace or an agent plugin
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

### Step C2 - Install a plugin that provides a skill

Install any plugin from the default marketplace that exposes at least one skill.

What to look for:
- the plugin mentions a skill, slash command, or bundled chat customization
- the plugin is from a source you trust
- the plugin's purpose is easy to demo quickly

> **Instructor tip:** Preview availability can vary. If the room does not have a good plugin option, the instructor can demo this step while participants continue with the local skill.

### Step C3 - Verify the installed skill appears

After installation:
1. Open chat and type `/`
2. Or run **Chat: Open Chat Customizations** and inspect the **Skills** tab
3. Confirm the installed skill appears alongside your local `pdf-reader` skill

### Step C4 - Run the installed skill once

Use the installed skill on a small task from its domain.

Examples:
- if it is a markdown or docs skill, run it on a workshop markdown file
- if it is a testing skill, run it against a simple test-related prompt
- if it is a review skill, ask it to inspect a small diff or file

The important learning outcome is not the exact plugin. It is understanding that **skills can come from your repo or from installed marketplace plugins**.

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
- [ ] The `name` matches the folder name
- [ ] The description says what the skill does and when to use it
- [ ] One marketplace-installed skill is visible and invoked once
- [ ] You can explain progressive loading in one sentence

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
| Marketplace skill is not visible | Verify the plugin is installed and enabled, then reopen the Skills view or `/` menu |

---

## Quick Debrief

Answer in one sentence:
- What capability did you package as a skill?
- Which installed skill did you try from the marketplace?
- Why is a skill better than an always-on instruction for that workflow?

---

*← [Activity 2](./activity-2.md) · [Back to Workshop README](../README.md)*
