# Workshop 2: Creating Rich Interfaces with MCP Apps

> **Format:** Instructor-led live workshop · **Duration:** 60 minutes · **Level:** Intermediate
> **Topic:** Model Context Protocol (MCP) apps that return rich, interactive UIs directly inside the AI chat

This workshop teaches participants how to build Model Context Protocol (MCP) apps that return rich, interactive User Interfaces directly inside the AI chat — replacing plain-text responses with live controls, smart forms, and data widgets that the user can interact with without leaving the conversation.

The session is designed for live delivery: a short concept introduction, focused hands-on exercises, visible checkpoints, and reusable starter artifacts participants can take back to their own projects.

> **Copilot-first approach:** Each activity includes **💬 Copilot Prompt** blocks — copy-paste prompts for **GitHub Copilot Chat** or **Inline Chat** (`⌘I` / `Ctrl+I`). Participants can use these prompts to generate code with Copilot instead of typing it by hand, keeping the focus on understanding the MCP patterns rather than TypeScript syntax.

---

## Welcome

- **Who is this for:** Developers who want to build interactive, in-chat UI experiences using MCP apps and TypeScript
- **What you'll learn:** How to build an MCP server, bundle a front-end UI resource with Vite, register the UI with an MCP app, and use Promises to synchronize the chat with user input
- **What you'll build:** A working MCP app that halts the chat, renders an interactive HTML form in the AI chat window, and resumes processing once the user submits their input
- **How to use this README:** Walk the workshop in order from Section 1 through Activity 3; each section includes the instructor goal, the participant task, and a concrete example you can demo

In this workshop, you will:

1. Explain what MCP Apps are and how they return interactive UI to the chat
2. Build a Hello World MCP server with TypeScript and standard I/O
3. Bundle an HTML form and TypeScript file into a single UI resource using Vite
4. Register the UI resource with the MCP server using the `ext-apps` package and UI schema
5. Establish bidirectional communication and use a Promise to halt the chat until user input arrives

---

## Learning Objectives

By the end of this workshop, participants will be able to:

1. **Explain what MCP Apps are** and how they differ from regular MCP tools that return plain text.
2. **Set up a basic MCP server** using TypeScript and standard I/O communication.
3. **Register standard tools** within the MCP server following the MCP protocol.
4. **Create an interactive HTML form** with a companion TypeScript file for front-end logic.
5. **Use Vite to bundle** the HTML and TypeScript files into a single self-contained UI resource.
6. **Register the bundled UI resource** in the MCP server using the `ext-apps` package and UI schema.
7. **Establish bidirectional communication** between the UI form and a server tool via form submission events.
8. **Use Promises to halt the chat** so the AI waits for user input before continuing to generate a response.

---

## Prerequisites

**Knowledge**
- Comfortable using the terminal and a code editor
- Basic familiarity with TypeScript (interfaces, async/await, type annotations)
- Basic familiarity with HTML forms
- Some understanding of what a server-side tool or API endpoint is

**Tools & Accounts**
- [ ] Node.js 18+ and npm installed
- [ ] TypeScript installed globally or available via `npx`
- [ ] VS Code installed (or another editor with TypeScript support)
- [ ] VS Code with the GitHub Copilot extension installed and signed in
- [ ] Git installed and working in the terminal

> **Instructor note:** Participants do not need prior MCP experience. The first 15 minutes establish the concept before any code is written.

---

## Quick Setup

Participants will create a new MCP server project from scratch during the workshop.

### Option A - Create a new project folder (recommended)
```bash
mkdir my-mcp-app && cd my-mcp-app
npm init -y
npm install --save-dev typescript @types/node
npm install @modelcontextprotocol/sdk
npx tsc --init
```

### Option B - Use this workshop repo in a Codespace or dev container

This repository includes a top-level `.devcontainer/` using `mcr.microsoft.com/devcontainers/base:jammy`.

- In **GitHub Codespaces**, create a codespace from this repository.
- In **VS Code**, run **Dev Containers: Reopen in Container** from the Command Palette.

Once the container starts, navigate to:
- `workshop-creating-rich-interfaces-with-mcp-apps/README.md`
- `workshop-creating-rich-interfaces-with-mcp-apps/examples/`

### Pre-flight Check
Before the workshop officially starts, ask participants to verify:
1. `node --version` returns 18 or higher.
2. `npm --version` returns a usable npm version.
3. `npx tsc --version` works without errors.
4. Their editor opens TypeScript files with syntax highlighting.

> **Facilitation recommendation:** Run through the setup section yourself the day before. The npm install and tsc init steps are quick but worth pre-verifying in the exact node environment you plan to use.

---

## Workshop Agenda

| Time | Section | Format | Outcome |
|---|---|---|---|
| 00:00-15:00 | [1. Introduction to MCP Apps](#section-1-introduction-to-mcp-apps) | Concept + demo | Participants understand what MCP Apps are and why they return UI instead of plain text |
| 15:00-30:00 | [2. Activity 1 - Building the Foundation](#section-2-activity-1---building-the-foundation) | Hands-on | Participants set up a working Hello World MCP server with registered tools |
| 30:00-45:00 | [3. Activity 2 - Integrating the UI](#section-3-activity-2---integrating-the-ui) | Hands-on | Participants create an HTML form, bundle it with Vite, and register it in the MCP server |
| 45:00-60:00 | [4. Activity 3 - Bidirectional Communication & Halting Chat](#section-4-activity-3---bidirectional-communication--halting-chat) | Hands-on + debrief | Participants wire up form submission to a server tool and use a Promise to halt the chat |

---

## Section 1: Introduction to MCP Apps

**Duration:** 15 minutes
**Format:** Instructor explanation + short live demo

### Teaching Goal
Give participants a clear picture of what MCP Apps are, why they exist, and why returning interactive UI is better than returning plain text when user input is ambiguous or when the response would benefit from visual controls.

### What Are MCP Apps?

MCP Apps extend the Model Context Protocol so that MCP servers can return **interactive User Interfaces** directly inside the AI chat window. Instead of the AI model outputting plain text like "Here are the available bulb colors: red, green, blue," an MCP App can render a live color picker the user clicks inside the chat.

Draw this mental model for the room:

```text
Without MCP Apps                       With MCP Apps
─────────────────────────────────────────────────────────
User asks: "Turn on the lights"        User asks: "Turn on the lights"
                                                  │
AI returns: "Which bulb? Which                    ▼
color? Please specify..."              MCP App returns: ┌──────────────────┐
                                                        │  Pick your bulb  │
User replies: "The living room         │  ○ Living Room  │
bulb, warm white"                      │  ○ Bedroom      │
                                       │  Color: [████]  │
AI returns: "OK, set to warm           │  [Submit]       │
white."                                └──────────────────┘
                                       User clicks Submit
                                       Chat resumes with correct input
```

Key points to make:
- The UI is rendered **inside the chat** — the user never leaves the conversation.
- The MCP server controls what UI is shown and what happens when the user interacts with it.
- The chat **halts** while waiting for user input and **resumes** after the form is submitted.

### Real-World Example: Smart Bulb Controller

The canonical demo is a smart home assistant. When the user says something ambiguous like "set the lights," the AI does not guess. Instead, the MCP App renders an interactive controller that lets the user pick the exact bulb and color combination they want — and only then does the AI continue processing.

This pattern applies broadly:
- form-based configuration before running a deployment
- selecting options from a set of ambiguous choices
- approving AI-generated content before it is sent
- entering sensitive information (credentials, tokens) without exposing them in the conversation

### How the System Works

The system has four parts:

1. **MCP Server** — TypeScript process communicating via standard I/O. Registers tools and UI resources.
2. **UI Resource** — a bundled HTML + TypeScript file served by the MCP server. This is what the user sees in the chat.
3. **UI Tool** — a special MCP tool that, when called, returns the UI resource reference and holds a Promise open until the user submits the form.
4. **Submit Tool** — a second tool that the UI form calls when the user clicks Submit. It resolves the Promise and returns the collected data to the AI.

### Suggested Live Demo

1. Open a finished MCP app (from the `examples/` folder) in the terminal.
2. Start the server: `npm run dev`.
3. Open the AI chat and send an ambiguous prompt such as "set the lights."
4. Show the chat halting and the interactive form appearing.
5. Click a bulb, select a color, and click Submit.
6. Show the chat resuming with the correct, user-specified input.

### Checkpoint Question
> "Why does the chat halt after the UI is shown?"

**Answer:** The server returns an unresolved Promise when the UI tool is called. The AI waits for that Promise to resolve before it can continue processing and generating a response.

---

## Section 2: Activity 1 - Building the Foundation

**Duration:** 15 minutes
**Format:** Hands-on

📋 **Full instructions:** [activities/activity-1.md](./activities/activity-1.md)

### What Participants Do
1. Initialize a new TypeScript project with the MCP SDK dependency.
2. Create a minimal `server.ts` that starts a server over standard I/O.
3. Register at least one standard MCP tool with name, description, and input schema.
4. Run the server and verify it starts without errors.

### Suggested Example
A `get_time` tool that returns the current UTC timestamp. Simple, dependency-free, and easy to test interactively.

### Success Criteria
- [ ] `npm install` completes without errors.
- [ ] `server.ts` compiles with `npx tsc`.
- [ ] Server starts and accepts stdio communication.
- [ ] At least one tool is registered and returns a text response.
- [ ] Participant can explain what `StdioServerTransport` does.

### Instructor Notes
- Keep the first tool simple — the point is structure, not logic.
- Watch for participants who try to use `express` or HTTP. Redirect them to stdio for now.
- Once `StdioServerTransport` is working, the jump to UI resources in Activity 2 feels small.

---

## Section 3: Activity 2 - Integrating the UI

**Duration:** 15 minutes
**Format:** Hands-on

📋 **Full instructions:** [activities/activity-2.md](./activities/activity-2.md)

### What Participants Do
1. Create an `index.html` with a basic form using Pico CSS for quick, clean styling.
2. Create a companion `ui.ts` TypeScript file for front-end form logic.
3. Install Vite and configure it to output a single bundled file.
4. Run `vite build` and confirm a single output file is generated.
5. Register the bundled UI resource in `server.ts` using the `ext-apps` package and UI schema.

### Suggested Example
A color-picker form with a select for bulb name and a color input. No external dependencies beyond Pico CSS and Vite.

### Success Criteria
- [ ] `index.html` exists with a working form.
- [ ] `ui.ts` exists with the front-end logic stub.
- [ ] `vite build` produces a bundled output without errors.
- [ ] The bundled resource is registered in `server.ts` using the `ext-apps` package.
- [ ] Participant can explain what Vite is doing and why a single bundled file is needed.

### Instructor Notes
- The single-file bundle requirement is what makes the UI portable inside the MCP response.
- If participants get stuck on the Vite config, use the `examples/example-vite-config.ts` starter.
- Emphasize that the UI framework does not matter — Pico is used here only for quick styling.

---

## Section 4: Activity 3 - Bidirectional Communication & Halting Chat

**Duration:** 15 minutes
**Format:** Hands-on + debrief

📋 **Full instructions:** [activities/activity-3.md](./activities/activity-3.md)

### What Participants Do
1. Add a `show_ui` tool to the MCP server that returns the UI resource reference and an unresolved Promise.
2. Add a `submit_form` tool that resolves the Promise with the form data and returns the collected values.
3. Wire up the HTML form to call `submit_form` via the MCP tool call mechanism on form submission.
4. Test the full loop: prompt → UI shown → user submits → chat resumes with data.

### Suggested Example
The smart bulb controller: the user says "set the lights," the UI form appears, the user picks a bulb and color, submits, and the AI responds with a confirmation using the exact input.

### Success Criteria
- [ ] `show_ui` tool returns the UI resource and holds the chat.
- [ ] `submit_form` tool resolves the Promise and returns form data.
- [ ] The HTML form calls `submit_form` on submission.
- [ ] The end-to-end loop works: prompt → UI → submit → AI continues.
- [ ] Participant can explain the Promise pattern in one sentence.

### Instructor Notes
- This is where the Promise pattern lands. Take time to draw it on the whiteboard.
- Connect back to the first section: the Promise is what "halts the chat."
- Use the last 2-3 minutes for the workshop exit question and one key takeaway per participant.

---

## Hands-On Activities Summary

| Activity | Outcome | Why it matters |
|---|---|---|
| [Activity 1](./activities/activity-1.md) | Hello World MCP server with a registered tool | Establishes the MCP server structure before adding UI |
| [Activity 2](./activities/activity-2.md) | HTML form bundled with Vite and registered as a UI resource | Shows how the front-end UI is packaged and attached to the server |
| [Activity 3](./activities/activity-3.md) | Bidirectional form-to-tool communication with a halting Promise | Delivers the core capability: AI waits for user interaction before continuing |

---

## Stretch Goals

For advanced participants or post-workshop follow-up:

1. Replace the Pico CSS form with a custom-styled card layout and add input validation.
2. Add a third tool that fetches live data (such as current bulb state from a mock API) and pre-populates the UI form before it is shown.
3. Support multiple UI resources in one server (such as a bulb picker and a scene selector).
4. Add error handling to the `submit_form` tool so the Promise rejects cleanly when the user cancels.
5. Package the MCP app as a published npm package that other projects can install and configure.

---

## Resources

See [resources.md](./resources.md) for MCP documentation, ext-apps package references, Vite documentation, and the example artifacts included in this workshop.

See [speaker-notes.md](./speaker-notes.md) for timed delivery notes, exact talking points, facilitation cues, and a common-mistakes guide for instructors.

---

## Instructor Notes: Common Questions, Talking Points, Troubleshooting

### Common Questions

| Question | Suggested Answer |
|---|---|
| "Why use stdio instead of HTTP for the MCP server?" | stdio is the simplest transport and works with all current MCP hosts without any port or network configuration. |
| "Can I use React or Vue instead of plain HTML?" | Yes, as long as Vite can bundle it to a single file. For this workshop, plain HTML keeps the focus on the MCP pattern rather than the UI framework. |
| "What happens if the user never submits the form?" | The Promise stays unresolved and the chat stays halted. Add a timeout or a cancel button that rejects the Promise if needed. |
| "Is the UI shown in every MCP host?" | Not yet. MCP App support depends on the host (the AI app). Check the MCP documentation for the current list of supporting hosts. |
| "Why Vite and not webpack or esbuild?" | Vite is the simplest zero-config bundler for this use case. Any bundler that produces a single HTML file output will work. |

### Troubleshooting

| Symptom | Likely Cause | Fix |
|---|---|---|
| Server exits immediately on start | Missing or malformed `StdioServerTransport` setup | Check that `server.connect(transport)` is called and the process does not exit before the first tool call |
| TypeScript compile errors in `server.ts` | Incorrect import paths or missing type declarations | Run `npx tsc --noEmit` and fix each reported error; check `@modelcontextprotocol/sdk` types are installed |
| Vite build fails | Missing `vite.config.ts` or wrong `build.rollupOptions` | Use the example Vite config from `examples/` and confirm the entry point path is correct |
| UI does not appear in chat | `ext-apps` resource not registered correctly | Verify the resource URI matches the bundled file name and the UI schema is correct |
| Chat does not halt | Promise is resolved immediately instead of being stored | Store the `resolve` and `reject` callbacks in a variable before returning from `show_ui`; call them only from `submit_form` |
| Form submission does nothing | `submit_form` call from the UI is not reaching the server | Check the MCP tool call from the front end and verify the tool name matches exactly |

### Facilitation Tips
- Draw the four-part system diagram at the start of Activity 1. Leave it on the board for the rest of the workshop.
- When introducing the Promise pattern, use a concrete analogy: "The server puts the chat on hold, like a waiter saying 'I'll be right back.' The form is the thing that lets them continue."
- In Activity 2, have participants run `vite build --watch` so they see the bundle update in real time.
- In Activity 3, call `show_ui` from the AI chat manually before wiring up the Promise, so participants can see the UI appear before adding the halting behavior.

---

## Exit Prompt

> "What user interaction in one of your own projects would work better as an in-chat UI form instead of a follow-up text prompt?"
