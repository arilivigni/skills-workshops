# Activity 2: Custom Agents & Agent Orchestration

> **Time:** 15 minutes
> **Where:** Terminal with `gh copilot` installed and authenticated
> **Goal:** Build a custom orchestrator agent that delegates specialized tasks to focused sub-agents

This activity teaches the core orchestration pattern:
- A single **orchestrator agent** receives a complex task and breaks it into pieces.
- Each piece is delegated to a **sub-agent** with a narrow, well-defined role.
- The orchestrator assembles the sub-agent outputs into a final result.

---

## What You're Building

By the end of this activity you will have:
1. A custom **Orchestrator** agent config that routes tasks to sub-agents
2. A **code-review** sub-agent focused on catching bugs and security issues
3. A **test-writer** sub-agent focused on adding test cases
4. A working delegation workflow you can adapt to any multi-phase task

---

## Why Orchestration Instead of One Big Agent?

Use this workshop rule of thumb:
- **One agent** is fine for a single-phase task with a clear scope.
- **Orchestrated agents** are better when the task has distinct phases — each requiring different expertise, different tools, or a different model.

Examples where orchestration wins:
- Plan → Implement → Review → Document
- Analyze → Test → Summarize
- Fetch data → Transform → Validate → Commit

---

## Part A – Create the Sub-agents

> **Suggested time:** 7 minutes

### Step A1 – Create the agent config directory

```bash
mkdir -p .github/agents
```

### Step A2 – Create the code-review sub-agent

Create `.github/agents/code-review.agent.md`:

```bash
touch .github/agents/code-review.agent.md
```

Add this content:

```markdown
---
name: Code Review
description: Review code for bugs, security issues, and improvement opportunities. Do not make changes — produce a structured review report only.
tools: ['read_file', 'search/codebase']
model: claude-sonnet-4.5
---

# Role
You are a code reviewer. Your job is to analyze code carefully and produce a structured review.

# Workflow
1. Read the target file or code snippet.
2. Check for: logic errors, edge cases, security issues, and missing error handling.
3. Check for: naming clarity, unnecessary complexity, and duplication.
4. Produce a structured review report.
5. Stop after the review. Do not write or suggest replacement code.

# Output Format
## Summary
[One sentence: overall quality assessment]

## Issues Found
- [Severity: Critical/High/Medium/Low] [Issue description]

## Suggestions
- [Suggestion description]

## Verdict
[Approve / Request Changes]

# Boundaries
- Do not write replacement code.
- Do not make assumptions about intent without evidence in the code.
- Limit the review to the file or snippet provided.
```

### Step A3 – Create the test-writer sub-agent

Create `.github/agents/test-writer.agent.md`:

```bash
touch .github/agents/test-writer.agent.md
```

Add this content:

```markdown
---
name: Test Writer
description: Write test cases for a given function or script. Focus on edge cases and error paths. Do not modify the source under test.
tools: ['read_file', 'write_file']
model: gpt-4.1
---

# Role
You are a test engineer. Your job is to write clear, focused test cases.

# Workflow
1. Read the source file or code snippet.
2. Identify: the happy path, edge cases, and error conditions.
3. Write test cases for all three categories.
4. Output the tests as a separate file — do not modify the source.

# Output Format
- One test function per case
- Descriptive test names that state what is being tested
- Comments explaining non-obvious cases

# Boundaries
- Do not modify the source file under test.
- Do not add production code — only test code.
- Stop after writing the test file.
```

---

## Part B – Create the Orchestrator Agent

> **Suggested time:** 5 minutes

### Step B1 – Create the orchestrator agent

Create `.github/agents/orchestrator.agent.md`:

```bash
touch .github/agents/orchestrator.agent.md
```

Add this content:

```markdown
---
name: Orchestrator
description: Coordinate code review and test-writing tasks. Delegate to the code-review and test-writer sub-agents. Assemble their outputs into a single summary.
tools: ['read_file']
model: gpt-4.1
handoffs:
  - label: Send to Code Review
    agent: code-review
    prompt: "Review the following code for bugs, security issues, and improvements: {{task}}"
    send: true
  - label: Send to Test Writer
    agent: test-writer
    prompt: "Write test cases for the following code, covering the happy path, edge cases, and error conditions: {{task}}"
    send: true
---

# Role
You are the orchestrator. You receive a task involving both code review and testing, and you coordinate the right sub-agents to handle each part.

# Workflow
1. Read the task and identify whether it needs review, tests, or both.
2. Delegate the review task to the Code Review sub-agent via handoff.
3. Delegate the test-writing task to the Test Writer sub-agent via handoff.
4. Collect both outputs.
5. Produce a combined summary: review findings first, test file second.

# Output Format
## Code Review Report
[Paste or summarize the Code Review sub-agent output]

## Test Cases
[Paste or reference the Test Writer sub-agent output]

## Next Steps
[List any Critical or High issues that must be fixed before merging]

# Boundaries
- Do not do the review or test-writing yourself — always delegate.
- Do not modify source code.
- Do not combine the sub-agent tasks into one handoff.
```

---

## Part C – Use the Orchestrator on a Real Task

> **Suggested time:** 3 minutes

### Step C1 – Start the orchestrator session

```bash
gh copilot --agent .github/agents/orchestrator.agent.md
```

### Step C2 – Give it a real task

```text
Review and add tests for the backup.sh script we created in Activity 1. Focus on error handling and edge cases.
```

### Step C3 – Observe the handoffs

Watch how the orchestrator:
1. Reads the task
2. Delegates the review to the `code-review` sub-agent
3. Delegates the test-writing to the `test-writer` sub-agent
4. Assembles both outputs

### Step C4 – State the orchestration rule

Finish with this statement:

> Narrow agents beat one overloaded agent. Each sub-agent has one job, one model preference, and one output format. The orchestrator's job is routing and assembly — not doing the work itself.

### Success Criteria

- [ ] `code-review.agent.md` exists in `.github/agents/`
- [ ] `test-writer.agent.md` exists in `.github/agents/`
- [ ] `orchestrator.agent.md` exists in `.github/agents/`
- [ ] The orchestrator was used to delegate a real task to both sub-agents
- [ ] You can explain why the orchestrator does not do the review or testing itself

---

## Optional Extension

If you finish early, create a third sub-agent:

```bash
touch .github/agents/doc-writer.agent.md
```

Give it the role of writing concise inline documentation for any reviewed and tested function. Then add a third handoff in the orchestrator to route documentation tasks to it.

---

## Commit Your Work

```bash
git add .github/agents/
git commit -m "chore: add orchestrator and sub-agent configs"
```

---

## Troubleshooting

| Problem | What to Check |
|---|---|
| Agent not found | Confirm the agent file path is correct and the `--agent` flag points to the right file |
| Handoff not triggering | Confirm the handoff `agent` field matches the target agent's `name` in its frontmatter |
| Sub-agent does the wrong task | Strengthen the role and boundaries sections — be explicit about what it must not do |
| Orchestrator doing the work itself | Add a clear rule: "Always delegate. Do not do the review or testing yourself." |
| Sub-agent output is too long | Add a length limit in the output format section: "Limit the report to 20 bullet points maximum" |

---

*← [Activity 1](./activity-1.md) · [Back to Workshop README](../README.md) · [Next: Activity 3 →](./activity-3.md)*
