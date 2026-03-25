---
name: Testing Rules
description: Additional guidance for test files
applyTo: "**/*.test.ts,**/*.spec.ts"
---

# Testing Instructions

> These instructions apply when working inside test files.
> They extend the repository-wide Copilot instructions rather than replacing them.

## Testing Philosophy
- Each test verifies one specific behavior
- Test names should read like behavior statements beginning with `should`
- Tests should describe public behavior, not internal implementation details

## Test Structure
- Use Arrange-Act-Assert with a blank line between sections
- Prefer readable fixtures over large inline setup blocks
- Reset mocks after each test

## What to Avoid
- Do not leave TODO comments in test files
- Do not rely on test execution order
- Do not mock the function under test
