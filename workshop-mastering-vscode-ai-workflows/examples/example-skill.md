# Example Agent Skill

Copy the structure below into `.github/skills/pdf-reader/SKILL.md` when you want a reusable capability for reading PDF files.

Skills do **not** choose a model directly. They are loaded by the current agent and model, which is why they work best as reusable capabilities rather than model-specific personas.

```markdown
---
name: pdf-reader
description: Extract and summarize text from PDF files with Python. Use this when asked to inspect, quote, or summarize PDF content from a local file.
---

# PDF Reader Skill

## When to Use This Skill
Use this skill when the task involves reading a PDF instead of a normal text file.

## Workflow
1. Confirm which PDF file should be read.
2. Run the helper script to extract text.
3. Review the extracted text before answering.
4. Summarize only the parts relevant to the request.
5. Mention extraction limits if the PDF is image-only or malformed.

## Resources
- Helper script: [extract_pdf.py](./extract_pdf.py)
```
