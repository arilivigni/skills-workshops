# Project Context

> This file is automatically included in Copilot Chat for this workspace.
> Keep it focused on durable repo guidance, not one-off tasks.

> This customization type does **not** select a model. It applies regardless of which chat model is active.
> Pair it with `.github/instructions/*.instructions.md` when only certain files or folders need extra rules.

## What This Project Is
- Internal analytics dashboard for learning program outcomes and ROI reporting
- Used by program managers, executives, and analysts
- Accuracy, explainability, and safe data handling matter more than novelty

## Stack Snapshot
- Frontend: Next.js + React + TypeScript
- Backend: Python APIs for analytics and data processing
- Data: SQL, CSV imports, and scheduled reporting jobs

## Architecture Rules
- Keep UI rendering, business rules, and data access concerns separate
- Reuse existing query helpers and chart patterns before adding new abstractions
- Favor small incremental edits over sweeping refactors

## Engineering Guardrails
- Validate user-supplied filters and uploaded data before use
- Avoid silent failures; surface actionable errors
- Add or update tests when behavior changes
- Prefer clear names over clever abbreviations

## Response Preferences
- Start with the main outcome first
- Keep explanations concise unless deeper reasoning is requested
- Flag risk areas early, especially around data quality and reporting logic
