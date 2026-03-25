# Project: Acme Task Manager API

> This file is automatically included in every GitHub Copilot Chat conversation
> in this workspace. It does not need to be referenced explicitly in prompts.

---

## What This Project Does

A REST API backend for a team task management application. It handles task creation,
assignment, status tracking, and notification dispatch. Consumed by a React frontend
and a mobile app. Uptime and data consistency are critical.

---

## Language & Runtime

- **Language:** TypeScript 5.x (strict mode enabled)
- **Runtime:** Node.js 20 LTS
- **Package manager:** pnpm
- **Module system:** ESM throughout — no CommonJS `require()`

---

## Key Frameworks & Libraries

- **Express 4.x:** HTTP server and routing. All routes live in `src/routes/`.
- **Prisma 5.x:** Database ORM. Schema in `prisma/schema.prisma`. Never write raw SQL.
- **Zod:** Request validation. Every route handler validates its input with a Zod schema before processing.
- **Vitest:** Test framework. Tests co-located with source files as `*.test.ts`.
- **Pino:** Structured JSON logging. Use `logger.info()`, never `console.log()`.

---

## Code Style & Conventions

- Use `async/await` consistently — never `.then()` / `.catch()` chains
- Prefer named exports over default exports
- All public functions and class methods must have JSDoc comments with `@param` and `@returns`
- Use early returns to reduce nesting — avoid deeply nested if-else blocks
- Typed errors only: throw instances of custom error classes (see `src/errors/`), never plain `Error` or string throws
- Avoid `any` type — use `unknown` and narrow with type guards if necessary
- Use `const` by default; `let` only when reassignment is needed; never `var`
- File names: `camelCase.ts` for modules, `PascalCase.ts` for classes

---

## Project Structure

```
src/
  routes/       # Express route handlers — thin, delegate to services
  services/     # Business logic — where the real work happens
  repositories/ # Database access via Prisma — no business logic here
  middleware/   # Auth, validation, error handling middleware
  errors/       # Custom typed error classes
  utils/        # Pure utility functions with no side effects
  types/        # Shared TypeScript type definitions and interfaces
prisma/
  schema.prisma # Database schema
  migrations/   # Never edit these manually
tests/
  integration/  # Integration tests requiring a running DB
  fixtures/     # Shared test data factories
```

---

## Error Handling

- Use the custom error classes in `src/errors/` — `NotFoundError`, `ValidationError`, `AuthorizationError`, `ConflictError`
- The global error middleware in `src/middleware/errorHandler.ts` handles formatting and logging
- Never expose internal error details (stack traces, DB errors) in API responses
- Always log errors with full context before re-throwing or responding

---

## What to Avoid

- Do **not** use `console.log` — use the `logger` from `src/utils/logger.ts`
- Do **not** write raw SQL — use Prisma's query builder
- Do **not** add business logic to route handlers — delegate to services
- Do **not** add database queries to services — delegate to repositories
- Do **not** use `any` type
- Do **not** generate commented-out code blocks
- Do **not** use synchronous file system operations (`fs.readFileSync`)
- Do **not** import directly from `node_modules` paths — always use package names

---

## Testing

- Framework: **Vitest**
- Test files: co-located with source, named `[module].test.ts`
- Integration tests: in `tests/integration/`, run against a test database
- Mocking: use `vi.mock()` for external dependencies; never mock the module under test
- Coverage target: >80% branch coverage on new service and repository code
- Every new public function must have at least one unit test

---

## Security Reminders

- All routes require authentication via the `authMiddleware` unless explicitly marked public
- User input is always validated with Zod schemas before use
- Never log or return password hashes, tokens, or sensitive PII
- Use parameterized queries (Prisma handles this — don't bypass it)
