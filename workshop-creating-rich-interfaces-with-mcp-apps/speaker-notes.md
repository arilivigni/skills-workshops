# Speaker Notes — Workshop 2: Creating Rich Interfaces with MCP Apps

> **Use this file alongside the [Workshop README](./README.md).**
> These notes are written in first-person delivery style. Adjust phrasing to fit your own voice.

---

## Before the Room Opens (Day Before)

- Clone the repository and open it in a Codespace or dev container so you have a working environment.
- Run `npm install` inside `workshop-creating-rich-interfaces-with-mcp-apps/` and verify the example server compiles: `npx tsc --noEmit`.
- Open `examples/example-mcp-server.ts` and read through it end-to-end. You will be demoing from this file live.
- If your AI host supports MCP Apps (VS Code + GitHub Copilot, Claude Desktop), register the example server and confirm the full loop works: prompt → UI shown → submit → chat resumes.
- Have `workshop-creating-rich-interfaces-with-mcp-apps/activities/activity-1.md` open in a side panel as your facilitation guide.
- Print or bookmark this speaker-notes file so you can glance at it without switching windows.

---

## 00:00 – Welcome and Setup (5 minutes)

> _While participants arrive and open their editors._

**Say:**
> "Welcome to Workshop 2. By the end of the next hour you will have built a working MCP server that shows a live interactive form inside an AI chat — and the chat will actually wait for you to fill it in before it responds. That's the thing we're going to make work today."

**Say** (once most people are settled):
> "Quick show of hands — who has built an MCP tool before? Great. Who has heard of MCP but not built anything yet? Perfect, that's exactly who this is designed for. We'll cover everything from scratch."

**Pre-flight — ask the room to run these in their terminal:**
```
node --version   # expect 18 or higher
npm --version
npx tsc --version
```

> _If anyone is missing Node.js, direct them to the Codespace option. Do not let setup block the room — pair struggling participants with a neighbor and keep moving._

**Transition:**
> "Good. Let's talk about what MCP Apps actually are before we write any code."

---

## 00:05 – Section 1: Introduction to MCP Apps (10 minutes)

### Slide / Whiteboard: The Problem with Plain Text

**Say:**
> "Imagine you ask an AI: 'Turn on the living room lights.' The AI doesn't know which bulb you mean, or what color or brightness. Without MCP Apps, the only tool it has is text. It asks a follow-up question. You answer. It asks another. This is slow and error-prone — especially when the options are visual, like colors."

**Draw on the whiteboard** (or show the diagram from the README):
```
Without MCP Apps         →   With MCP Apps
AI guesses or asks again  →  Form appears in chat → user picks → chat continues
```

**Say:**
> "MCP Apps solve this by letting the server return a real HTML form directly inside the chat. The user picks the bulb, picks the color, clicks Submit — and only then does the AI continue. No guessing. No back-and-forth."

---

### How the System Works — Four Parts

**Say:**
> "There are four moving pieces. I want you to write these down because we will build them one by one."

**Write on the board as you say each one:**

1. **MCP Server** — TypeScript process, talks to the AI host over standard I/O.
2. **UI Resource** — a bundled HTML file the server serves. This is the form the user sees.
3. **show_ui tool** — the tool that, when called, returns the UI and then _waits_.
4. **submit_form tool** — the tool the UI form calls when the user clicks Submit. It's what unblocks the wait.

**Say:**
> "The magic is in the word 'waits.' The server doesn't return immediately. It holds a Promise open. The AI host sees the tool as still in progress and freezes the chat. When submit_form is called, the Promise resolves, and the chat continues. That's the entire trick."

---

### Real-World Use Cases

**Say:**
> "This isn't just for smart home demos. Think about:"
- "A deployment approval form before a CI job runs"
- "A credential picker that never exposes secrets in the conversation"
- "A diff reviewer where you approve or reject each change before the AI continues"
- "Any time the AI needs structured input that's awkward to type as freeform text"

---

### Live Demo (if your host supports MCP Apps)

> _Open a terminal. Navigate to the workshop directory._

**Say:**
> "Let me show you the finished version before we build it. This is what you'll have by the end of the hour."

```bash
cd workshop-creating-rich-interfaces-with-mcp-apps
# If demo project is pre-built:
npm start
# Then open your AI host and type:
# "Set the lights to something warm."
```

> _Show the form appearing. Select a bulb. Pick a warm color. Submit._
> _Show the AI responding with the exact values you chose._

**Say:**
> "Notice the chat froze while the form was open. That's the Promise at work. And the AI used our exact input — it didn't guess."

---

### Checkpoint

Ask the room:
> "Why does the chat halt after the UI is shown?"

Wait for answers. Then confirm:
> "The `show_ui` handler returns a Promise that's never resolved until `submit_form` is called. The AI host waits for that resolution. That's it."

**Transition:**
> "Alright. Let's build this from scratch. Open Activity 1."

---

## 00:15 – Activity 1: Building the Foundation (15 minutes)

> _Participants follow `activities/activity-1.md`. Walk the room while they work._

### At the start — explain the goal in one sentence:

**Say:**
> "In the next 15 minutes you're going to have a real MCP server running in your terminal. It won't have UI yet — that's Activity 2. Right now we're just getting the structure right."

---

### While participants work — watch for these common issues:

**Module resolution errors** (`Cannot find module`):
> "Make sure your tsconfig has `"module": "Node16"` and `"moduleResolution": "Node16"`. And your imports need `.js` extensions even for TypeScript files — that's a Node.js ESM quirk."

**Server exits immediately:**
> "The server needs to stay alive waiting for stdin messages. If it exits right away, you probably missed `await server.connect(transport)` or there's an unhandled error. Check your terminal for the error message."

**`console.log` garbling the output:**
> "This one trips everyone up. The MCP protocol talks over stdout. If you log to stdout with `console.log`, you corrupt the protocol stream. Use `console.error` for all your diagnostic messages — it goes to stderr and is completely separate."

---

### At 12 minutes — call out:

> "Two minutes left. If you haven't started Part C yet, that's okay — make sure Part B works first. The echo tool in Part C is just repeating the pattern you already built."

---

### Checkpoint (at 15 min):

**Say:**
> "Raise your hand if your server starts and prints the startup message. Good. Keep your hand up if you also have the echo tool working."

> _If many people are still stuck on startup, do a quick live walkthrough of the minimum working server before moving on._

**Transition:**
> "Great. Now let's give this server a face. Open Activity 2."

---

## 00:30 – Activity 2: Integrating the UI (15 minutes)

> _Participants follow `activities/activity-2.md`._

### At the start:

**Say:**
> "This section has three independent pieces: the HTML form, the TypeScript logic, and the Vite build. They connect at the end when we register the bundled output as an MCP resource."

**Say:**
> "You don't need to know anything about Vite. What Vite is doing for us is very specific: it takes our HTML and TypeScript and combines them into a single self-contained HTML file. That single file is what the MCP server will return as the UI. No CDN, no separate assets — everything in one file."

---

### While participants work — watch for these issues:

**Vite build fails with a path error:**
> "Check that `root: 'ui'` is set in `vite.config.ts` and that your `ui/index.html` actually exists. Vite needs to find the entry point."

**Output has a separate `.js` file:**
> "You need `inlineDynamicImports: true` in the Rollup output options. Without it, Vite produces separate asset chunks. The MCP server can only serve one file, so everything has to be inline."

**`readFileSync` fails at runtime:**
> "The path to `dist/ui/index.html` must be correct relative to your compiled `dist/server.js`. Use the `__dirname` equivalent for ESM modules: `dirname(fileURLToPath(import.meta.url))`."

---

### Sidebar if participants ask about Pico CSS:

**Say:**
> "Pico is just a classless CSS framework we're using to make the form look clean without writing any CSS ourselves. You can swap it for Tailwind, Bootstrap, or nothing at all — the important thing is the form elements, not the styling."

---

### At 12 minutes — call out:

> "Two minutes left. Priority is getting `vite build` to succeed and confirming `dist/ui/index.html` exists. The resource registration step can carry into a quick minute before Activity 3 if needed."

---

### Checkpoint (at 15 min):

**Say:**
> "Who has a `dist/ui/index.html` that contains inlined JavaScript? If you open it in a browser, does the form render?"

> _Quick demo: open `dist/ui/index.html` directly in a browser to show the form is working before wiring it to the server._

**Transition:**
> "This is the moment everything comes together. Open Activity 3."

---

## 00:45 – Activity 3: Bidirectional Communication & Halting Chat (15 minutes)

> _Participants follow `activities/activity-3.md`._

### At the start — draw the Promise flow on the board:

```
AI calls show_ui
   │
   ▼
show_ui stores resolve() in a Map
show_ui AWAITS a new Promise  ← chat halts here
   │
   ▼  (user sees the form and submits)
   │
submit_form is called
submit_form calls resolve()
   │
   ▼
show_ui Promise resolves
show_ui returns data to the AI
Chat resumes
```

**Say:**
> "The `await new Promise(...)` in `show_ui` is the pivot of this whole workshop. It's how you hand control from the server to the user — and hand it back when the user is done. The `pendingForms` Map is just a way to share the resolver function between `show_ui` and `submit_form`, since they're separate tool calls."

---

### While participants work — watch for these issues:

**`show_ui` resolves immediately:**
> "Check where you're calling `resolve`. It should only be called inside `submit_form`. If it's inside the Promise constructor itself, it resolves immediately."

**`submit_form` throws 'No pending form for session':**
> "The `session_id` passed to `show_ui` and the one passed to `submit_form` from the UI must match exactly. Check both sides."

**Form submits but chat doesn't resume:**
> "Add a `console.error` inside `submit_form` to confirm it's being reached. If the log appears but the chat doesn't resume, check that `pending.resolve` is actually being called."

**`mcpHost` is not defined in the UI:**
> "This global is injected by the MCP host into the UI context. The exact name may differ by host — check your host's documentation. For a local test, you can stub it: `window.mcpHost = { callTool: async (name, args) => console.log(name, args), sessionId: 'test' }`."

---

### At 10 minutes — call out:

> "Five minutes left. Priority is getting `show_ui` to await and `submit_form` to resolve. If you're not connected to a live AI host yet, test by calling the tools manually from a simple test script or the MCP Inspector."

---

### Checkpoint (at 15 min):

Ask the room:
> "In one sentence: what does the unresolved Promise give us?"

Accept any correct framing:
- "It halts the chat."
- "It keeps the tool call in-progress until the user submits."
- "It's how the server waits for the user without blocking Node.js."

---

## 00:58 – Debrief and Exit Prompt (2 minutes)

**Say:**
> "Let's zoom out. You built a full MCP server with four tools, a bundled HTML form, and a Promise-based handshake that lets the AI wait for real user input. That's not a toy — that's the actual pattern used in production MCP apps."

**Exit prompt — say:**
> "Before we close: what is one user interaction in your own project that would work better as an in-chat form instead of a follow-up text prompt?"

Go around the room (or ask for a few volunteers). Write the answers on the board.

**Say:**
> "Those are your next MCP apps. The pattern you built today applies directly to all of them."

---

## Post-Session Checklist

- [ ] Share the repository link and the PR with completed examples.
- [ ] Point participants to `resources.md` for MCP documentation and host compatibility info.
- [ ] Recommend the stretch goals in the README for participants who want to go further.
- [ ] If any participants had persistent setup problems, share the Codespace link so they can finish in a clean environment.

---

## Common Presenter Mistakes to Avoid

| Mistake | Better approach |
|---|---|
| Spending more than 2 minutes on any single stuck participant | Pair them with a neighbor; continue the session; circle back |
| Skipping the whiteboard diagram | The Promise pattern is abstract — the visual is essential |
| Demo-ing the finished server before explaining the four parts | Explain the four parts first; the demo lands better with context |
| Letting Activity 1 run over time | Cut Part C (echo tool) if needed — `get_time` alone is enough to move forward |
| Using `console.log` in live code demos | Always use `console.error`; this catches at least one person in every room |

---

## Timing Summary

| Time | What |
|---|---|
| 00:00–00:05 | Welcome, pre-flight checks |
| 00:05–00:15 | Section 1: Introduction, four parts, live demo |
| 00:15–00:30 | Activity 1: Hello World MCP server |
| 00:30–00:45 | Activity 2: HTML form, Vite bundle, resource registration |
| 00:45–00:58 | Activity 3: show_ui, submit_form, Promise halting |
| 00:58–01:00 | Debrief and exit prompt |
