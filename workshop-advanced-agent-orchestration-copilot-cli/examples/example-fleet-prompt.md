# Example `/fleet` prompt

Adapt the model names below to whatever `/model` shows in your account.

```text
/fleet Improve the Copilot CLI workshop materials in workshop-advanced-agent-orchestration-copilot-cli/.

Use Claude Opus 4.6 to analyze the current README flow and propose the best narrative improvements.
Use GPT-5.4 to make Markdown edits in the README and example files.
Use GPT-5-mini to summarize the final changes and flag any follow-up cleanup.

Keep the work scoped to Markdown files in workshop-advanced-agent-orchestration-copilot-cli/.
Do not touch files outside that folder.
```

## Why this is a good teaching example

- it is parallelizable
- it uses separate models for analysis, editing, and summarization
- it keeps the risk low by staying inside one workshop folder

## What to expect

- the CLI will spawn sub-agents for the analysis, editing, and summarization work
- participants will see task and status output as each subtask runs
- the main session will merge the results back into one final response

## Instructor note

If participants have different model names available, keep the structure the same and swap the names:

1. stronger model for analysis or planning
2. balanced model for edits
3. cheaper or faster model for summarization
