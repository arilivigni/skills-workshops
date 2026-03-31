# Activity 3: Implementing Agent Skills

> **Time:** 15 minutes
> **Where:** VS Code with your workshop repository open
> **Goal:** Package a reusable capability as a skill and understand progressive loading

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
3. A simple explanation of how progressive loading protects your context window

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

## Part C - Connect It Back to the Workshop

> **Suggested time:** 5 minutes

### Why this works well as a skill
- it is a reusable capability
- it may need helper code and extra files
- it should not consume context in every conversation
- it is useful across repos and even across AI tools that support skills

### Success Criteria
- [ ] `.github/skills/pdf-reader/SKILL.md` exists
- [ ] The `name` matches the folder name
- [ ] The description says what the skill does and when to use it
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

---

## Quick Debrief

Answer in one sentence:
- What capability did you package as a skill?
- Why is it better as a skill than as an always-on instruction?

---

*← [Activity 2](./activity-2.md) · [Back to Workshop README](../README.md)*
