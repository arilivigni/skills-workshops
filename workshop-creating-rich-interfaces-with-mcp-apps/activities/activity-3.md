# Activity 3: Bidirectional Communication & Halting Chat

> **Time:** 15 minutes
> **Where:** Your `my-mcp-app` project folder from Activities 1 and 2
> **Goal:** Wire up the HTML form to a server tool via MCP, use a Promise to halt the chat, and resolve it when the user submits the form

This activity delivers the core capability of MCP Apps: the AI chat halts until the user interacts with the UI, then resumes automatically with the user's input.

---

## What You're Building

By the end of this activity you will have:

1. A `show_ui` tool that returns the UI resource reference and suspends the chat using an unresolved Promise
2. A `submit_form` tool that resolves the Promise with the form data
3. An updated `ui.ts` that calls `submit_form` via a JavaScript MCP bridge when the user clicks Submit
4. A working end-to-end loop: prompt → UI shown → user submits → AI continues with data
5. A direct `set_light` tool for explicit requests so the UI is only used when clarification or a visual picker is needed

---

## The Promise Pattern

Before writing any code, draw this on the board:

```text
AI calls show_ui
      │
      ▼
show_ui stores resolve/reject in a Map
show_ui returns UI resource reference
      │
      ▼
Chat HALTS — the AI is waiting for the Promise to resolve
      │
      ▼
User sees the form in chat and fills it in
User clicks Submit
      │
      ▼
ui.ts calls submit_form tool with { bulb, color }
      │
      ▼
submit_form looks up the stored resolve callback
submit_form calls resolve({ bulb, color })
      │
      ▼
Promise resolves — chat RESUMES
AI processes the submitted values and responds
```

The key insight: `show_ui` does not return immediately. It stores the Promise's resolve function and returns a reference to the UI. The AI host knows to wait for the Promise. Only when `submit_form` calls `resolve()` does the chat continue.

For a better end-user experience, keep both interaction modes in the same server:

- Use `set_light` when the user already specified a bulb plus a color or brightness clearly enough to act.
- Use `show_ui` when the assistant should not guess, needs confirmation, or the user would benefit from picking visually.

---

## Part A - Add the `show_ui` Tool

> **Suggested time:** 6 minutes

> 💬 **Copilot Prompt — add the session store and show_ui tool** (open `src/server.ts`, then use Inline Chat `⌘I` / `Ctrl+I`)
>
> ```
> Add to this MCP server:
> 1. A Map called pendingForms at the top of the file (below imports) that stores Promise resolvers keyed by session_id string. Each entry should have resolve and reject callbacks typed for { bulb: string; color: string; brightness: number }.
> 2. A show_ui tool registered in ListTools with a required "session_id" string argument. Its description should explain it shows the Bulb Controller UI and suspends the chat.
> 3. A show_ui handler in CallTool that:
>    - Creates a 5-minute timeout using Promise.race
>    - Stores the Promise resolver in pendingForms keyed by session_id
>    - Awaits the Promise (which halts the chat until submit_form resolves it)
>    - Cleans up the pendingForms entry in a finally block
>    - Returns the bulb, color, and brightness as a text content result after the Promise resolves
>    - Logs to console.error that it is waiting for form submission
> ```

### Step A1 - Add a session store

At the top of `src/server.ts`, below the imports, add:

```typescript
// Store pending Promise resolvers keyed by session ID
const pendingForms = new Map<
  string,
  {
    resolve: (data: {
      bulb: string;
      color: string;
      brightness: number;
    }) => void;
    reject: (reason?: unknown) => void;
  }
>();
```

### Step A2 - Register `show_ui` in the tools list

Add the following tool to the array returned by `ListToolsRequestSchema`:

```typescript
{
  name: "show_ui",
  description:
    "Shows the interactive Bulb Controller UI in the chat. " +
    "Call this when the user wants to change a bulb but has not specified which bulb or color. " +
    "The tool suspends the chat until the user submits the form.",
  inputSchema: {
    type: "object",
    properties: {
      session_id: {
        type: "string",
        description: "A unique identifier for this interaction session.",
      },
    },
    required: ["session_id"],
  },
},
```

### Step A3 - Handle the `show_ui` call

Add the following case inside `CallToolRequestSchema`:

```typescript
if (request.params.name === "show_ui") {
  const { session_id } = request.params.arguments as { session_id: string };

  // Return a Promise that stays unresolved until submit_form is called
  const formData = await new Promise<{
    bulb: string;
    color: string;
    brightness: number;
  }>((resolve, reject) => {
    pendingForms.set(session_id, { resolve, reject });
  });

  // This line runs only after the user submits the form
  return {
    content: [
      {
        type: "text",
        text: `User selected bulb "${formData.bulb}" with color "${formData.color}" at ${formData.brightness}% brightness.`,
      },
    ],
  };
}
```

> **Important:** The `await new Promise(...)` line suspends the handler. The MCP host sees the tool call as in-progress and keeps the chat halted. The `pendingForms.set(...)` stores the resolver so `submit_form` can use it later.

### Step A4 - Show the UI resource along with the pending state

Before the `await`, add a resource reference so the host knows which UI to display. Insert this just before the `await`:

```typescript
// Signal to the host that a UI resource should be shown
// The exact mechanism depends on your MCP host.
// For hosts that support the ext-apps protocol, include the resource URI
// in a special content block alongside the pending tool call.
console.error(`[show_ui] session ${session_id} — waiting for form submission`);
```

> **Instructor note:** The mechanism for attaching the UI resource to the pending tool call response varies by MCP host. Check the host-specific documentation for the correct response shape. The `pendingForms` Map and the awaited Promise are the universal pattern; the resource reference method is host-specific.

---

## Part B - Add the `submit_form` Tool

> **Suggested time:** 4 minutes

> 💬 **Copilot Prompt — add submit_form tool** (open `src/server.ts`, then use Inline Chat `⌘I` / `Ctrl+I`)
>
> ```
> Add a submit_form tool to this MCP server:
> 1. Register it in ListTools with required arguments: session_id (string), bulb (string), color (string), brightness (number). The description should say it is called by the UI when the user submits the form and resolves the pending show_ui Promise.
> 2. Add a handler in CallTool that:
>    - Reads session_id, bulb, color, brightness from request.params.arguments
>    - Looks up the session in pendingForms Map
>    - Throws an error if not found ("No pending form for session: <id>")
>    - Deletes the entry from pendingForms
>    - Calls pending.resolve({ bulb, color, brightness })
>    - Returns a text content result confirming the submitted values
> ```

### Step B1 - Register `submit_form` in the tools list

Add the following tool to the `ListToolsRequestSchema` array:

```typescript
{
  name: "submit_form",
  description:
    "Called by the Bulb Controller UI when the user submits the form. " +
    "Resolves the pending show_ui Promise with the selected bulb, color, and brightness.",
  inputSchema: {
    type: "object",
    properties: {
      session_id: {
        type: "string",
        description: "The session ID provided to show_ui.",
      },
      bulb: {
        type: "string",
        description: "The name of the selected bulb.",
      },
      color: {
        type: "string",
        description: "The selected hex color code.",
      },
      brightness: {
        type: "number",
        description: "The brightness level (1–100).",
      },
    },
    required: ["session_id", "bulb", "color", "brightness"],
  },
},
```

### Step B2 - Handle the `submit_form` call

Add the following case inside `CallToolRequestSchema`:

```typescript
if (request.params.name === "submit_form") {
  const { session_id, bulb, color, brightness } = request.params.arguments as {
    session_id: string;
    bulb: string;
    color: string;
    brightness: number;
  };

  const pending = pendingForms.get(session_id);
  if (!pending) {
    throw new Error(`No pending form for session: ${session_id}`);
  }

  // Clean up and resolve the Promise
  pendingForms.delete(session_id);
  pending.resolve({ bulb, color, brightness });

  return {
    content: [
      {
        type: "text",
        text: `Form submitted: bulb="${bulb}", color="${color}", brightness=${brightness}`,
      },
    ],
  };
}
```

### Step B3 - Explain what resolving the Promise does

When `pending.resolve({ bulb, color, brightness })` is called:

- The `await new Promise(...)` in `show_ui` unblocks.
- `formData` now contains `{ bulb, color, brightness }`.
- `show_ui` returns its final content to the AI.
- The AI host receives the tool result and resumes generating the chat response.

---

## Part C - Wire the Form to `submit_form`

> **Suggested time:** 3 minutes

> 💬 **Copilot Prompt — update ui.ts to call submit_form** (open `ui/ui.ts`, then use Inline Chat `⌘I` / `Ctrl+I`)
>
> ```
> Update this TypeScript file so that instead of console.log, the form submit handler calls mcpHost.callTool("submit_form", { session_id: mcpHost.sessionId, bulb, color }).
> Add a TypeScript declare const for mcpHost with callTool (name: string, args: Record<string, unknown>) => Promise<void> and sessionId: string.
> On success, set statusEl.textContent to "Submitted! The chat will continue now." and add the inert attribute to the form so it cannot be submitted again.
> Wrap the callTool call in try/catch and show any error in statusEl.textContent.
> ```

### Step C1 - Update `ui/ui.ts`

Replace the `console.log` stub from Activity 2 with an actual MCP tool call:

```typescript
// ui.ts — updated to call submit_form via the MCP tool bridge

declare const mcpHost: {
  callTool: (name: string, args: Record<string, unknown>) => Promise<void>;
  sessionId: string;
};

const form = document.getElementById("bulb-form") as HTMLFormElement;
const statusEl = document.getElementById("status") as HTMLParagraphElement;

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const bulb = (document.getElementById("bulb") as HTMLSelectElement).value;
  const color = (document.getElementById("color") as HTMLInputElement).value;

  statusEl.textContent = "Submitting…";

  try {
    await mcpHost.callTool("submit_form", {
      session_id: mcpHost.sessionId,
      bulb,
      color,
    });
    statusEl.textContent = "Submitted! The chat will continue now.";
    form.setAttribute("inert", "");
  } catch (err) {
    statusEl.textContent = `Error: ${String(err)}`;
  }
});
```

> **Instructor note:** `mcpHost` is a global object injected by the MCP host into the UI's JavaScript context. The exact API shape (method names, session ID property) depends on your target host. Check the host-specific documentation for the bridge API. The pattern — calling a named tool with arguments from the front-end — is consistent across hosts.

### Step C2 - Rebuild the UI bundle

```bash
npm run build
```

Confirm `dist/ui/index.html` is updated. The inlined script should now include the `submit_form` call.

---

## Part D - Test the End-to-End Loop

> **Suggested time:** 2 minutes

### Step D1 - Start the MCP server from `.vscode/mcp.json`

This repository already includes a workspace MCP configuration at `.vscode/mcp.json`. Keep that file in the repo so everyone opening the workshop gets the same server definition.

The file points VS Code at the built server entrypoint:

```json
{
  "servers": {
    "my-mcp-app": {
      "command": "node",
      "args": [
        "/workspaces/skills-workshops/workshop-creating-rich-interfaces-with-mcp-apps/my-mcp-app/dist/server.js"
      ]
    }
  }
}
```

Before testing in chat:

1. From `my-mcp-app`, run `npm run build` so `dist/server.js` and `dist/ui/index.html` exist.
2. In VS Code, open the Command Palette (`⌘⇧P` / `Ctrl+Shift+P`) and run **MCP: Start Server**.
3. Choose `my-mcp-app` from the server list defined in `.vscode/mcp.json`.

If VS Code does not show the server immediately, reload the window once so it re-reads the workspace MCP configuration.

> **Why keep `.vscode/mcp.json` in the repo?** It is workspace setup, not application runtime code. Committing it gives participants and instructors the same MCP server definition without repeating the manual registration steps.

> 💬 **Copilot Chat Prompt — open a new chat and test the loop**
>
> ```
> Set the living room lights to a warm color.
> ```
>
> GitHub Copilot should recognize the ambiguity, call `show_ui`, and render the Bulb Controller form in the chat. Fill in the form and click Submit. Watch the chat resume with the values you selected.

### Step D2 - Verify the output

After submitting the form, Copilot should respond with something like:

```text
Done! Set the living room bulb to #ffd27f (warm white).
```

The exact wording will vary, but the values should match what you submitted in the form.

### Success Criteria

- [ ] `show_ui` suspends the chat until `submit_form` is called
- [ ] `submit_form` resolves the Promise and the chat resumes
- [ ] The AI response includes the values submitted in the form
- [ ] The form becomes inert (disabled) after submission to prevent double-submits

---

## Optional: Add a Cancel / Timeout

For a more robust implementation, add a timeout that rejects the Promise if the user does not submit within a set period.

> 💬 **Copilot Prompt — add timeout and cancel handling** (open `src/server.ts`, then use Inline Chat `⌘I` / `Ctrl+I`)
>
> ```
> Wrap the show_ui Promise in a Promise.race with a 5-minute timeout that rejects with "Form submission timed out". Clean up the pendingForms Map entry in a finally block to avoid memory leaks.
> ```

```typescript
// In show_ui, wrap the Promise with a timeout
const TIMEOUT_MS = 5 * 60 * 1000; // 5 minutes

const formData = await Promise.race([
  new Promise<{ bulb: string; color: string; brightness: number }>(
    (resolve, reject) => {
      pendingForms.set(session_id, { resolve, reject });
    },
  ),
  new Promise<never>((_, reject) =>
    setTimeout(
      () => reject(new Error("Form submission timed out")),
      TIMEOUT_MS,
    ),
  ),
]);
```

Clean up the `pendingForms` Map entry in a `finally` block to avoid memory leaks:

```typescript
try {
  const formData = await Promise.race([...]);
  return { content: [{ type: "text", text: `User selected...` }] };
} finally {
  pendingForms.delete(session_id);
}
```

---

## Commit Your Work

```bash
git add src/server.ts ui/ui.ts
git commit -m "feat: add show_ui and submit_form tools with Promise-based chat halting"
```

---

## Quick Debrief

Answer in one sentence:

- Why does `show_ui` use `await new Promise(...)`?
- What happens to the chat if `submit_form` is never called?
- How would you add a Cancel button that rejects the Promise?

---

## Presenter Script

Use this short explanation to close the activity:

> "This MCP app is not a normal website and it is not served from a separate web server. VS Code starts it as an MCP server using the workspace MCP configuration, and the server runs over standard input and output, not HTTP.
>
> The main entry point is `server.ts`. That server exposes tools and one UI resource. The tools are the app's machine-facing input points. In this example, we have a direct tool called `set_light` for clear requests, and a `show_ui` tool for ambiguous requests where the assistant should not guess.
>
> The UI itself starts as `ui/index.html` plus the browser logic in `ui/ui.ts`. Those files are bundled, and the server returns them as an MCP resource called `app://bulb-controller`.
>
> If the user says something explicit, like 'set the living room light to a cool color,' Copilot can call the direct tool and the server returns a plain text result confirming the new light state. If the user says something ambiguous, like 'set the lights,' Copilot can call `show_ui`, and the form appears inside the chat window itself. When the user submits the form, the UI calls back into the server through `submit_form`, the pending request resolves, and the chat continues.
>
> So the big idea is: MCP apps can return either text outputs or interactive UI, and the host chat experience decides when to render that UI inline."

---

## Troubleshooting

| Problem                                            | What to Check                                                                           |
| -------------------------------------------------- | --------------------------------------------------------------------------------------- |
| Chat does not halt after `show_ui` is called       | Verify `await new Promise(...)` is used and `resolve` is not called immediately         |
| `submit_form` throws "No pending form for session" | Confirm the `session_id` passed to `show_ui` matches the one used in `submit_form`      |
| Form submits but chat does not resume              | Check that `pendingForms.get(session_id)` returns a valid entry and `resolve` is called |
| `mcpHost` is not defined in the UI                 | Check the GitHub Copilot documentation for the injected bridge object name and API      |
| Memory leak warning after many submissions         | Add `pendingForms.delete(session_id)` after resolving and in a `finally` block          |

---

## Workshop Recap

| Activity   | What you built                                         | Key concept                                              |
| ---------- | ------------------------------------------------------ | -------------------------------------------------------- |
| Activity 1 | Hello World MCP server with registered tools           | StdioServerTransport and the ListTools/CallTool pattern  |
| Activity 2 | HTML form + Vite bundle + UI resource registration     | Single-file bundling and MCP resource registration       |
| Activity 3 | `show_ui` + `submit_form` + Promise-based chat halting | Bidirectional UI communication and async chat suspension |

---

_← [Activity 2](./activity-2.md) · [Back to Workshop README](../README.md)_
