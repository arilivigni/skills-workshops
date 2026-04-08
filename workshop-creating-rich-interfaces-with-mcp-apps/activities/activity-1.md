# Activity 1: Building the Foundation — Hello World MCP Server

> **Time:** 15 minutes
> **Where:** Your terminal and editor with a new project folder
> **Goal:** Create a working MCP server in TypeScript that communicates over standard I/O and registers at least one tool

This activity establishes the structural foundation for the rest of the workshop. Everything in Activities 2 and 3 builds on top of what you create here.

---

## Using GitHub Copilot in This Workshop

Throughout these activities you can use **GitHub Copilot Chat** or **Inline Chat** to generate code instead of typing it by hand. Look for the **💬 Copilot Prompt** blocks — copy the text and paste it into:

- **Copilot Chat panel** — open with `Ctrl+Alt+I` (Windows/Linux) or `⌃⌘I` (Mac), or click the Copilot icon in the Activity Bar.
- **Inline Chat** — press `Ctrl+I` (Windows/Linux) or `⌘I` (Mac) inside any open file to open Copilot Chat at the cursor.

You can also **open a file in your editor first**, then use Inline Chat so Copilot has the file as context.

---

## What You're Building

By the end of this activity you will have:
1. A new TypeScript project with the MCP SDK installed
2. A `server.ts` that starts an MCP server using `StdioServerTransport`
3. At least one registered tool with a name, description, and input schema
4. A running server that accepts tool calls

---

## Part A - Initialize the Project

> **Suggested time:** 5 minutes

### Step A1 - Create a project folder

```bash
mkdir my-mcp-app && cd my-mcp-app
npm init -y
```

### Step A2 - Install dependencies

```bash
npm install @modelcontextprotocol/sdk
npm install --save-dev typescript @types/node
```

### Step A3 - Initialize TypeScript

```bash
npx tsc --init
```

Open `tsconfig.json` and make sure these options are set:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "Node16",
    "moduleResolution": "Node16",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true
  }
}
```

> 💬 **Copilot Prompt — generate tsconfig**
> Open `tsconfig.json` in VS Code, then use Inline Chat (`⌘I` / `Ctrl+I`) and paste:
> ```
> Replace this tsconfig with one targeting ES2022 using Node16 module resolution, outputting to dist/, sourcing from src/, with strict mode and skipLibCheck enabled.
> ```

### Step A4 - Add a build script

Open `package.json` and add the following inside `"scripts"`:

```json
"scripts": {
  "build": "tsc",
  "start": "node dist/server.js",
  "dev": "npx tsc && node dist/server.js"
}
```

Also add `"type": "module"` at the top level of `package.json` so Node.js treats `.js` files as ES modules.

### Success Criteria for Part A
- [ ] `package.json` exists with the correct dependencies
- [ ] `tsconfig.json` is configured for ES2022 modules and outputs to `dist/`
- [ ] `npm install` completes without errors

---

## Part B - Create the Server

> **Suggested time:** 7 minutes

### Step B1 - Create the source folder and file

```bash
mkdir src
touch src/server.ts
```

### Step B2 - Write the Hello World server

> 💬 **Copilot Prompt — generate the full server** (paste into Copilot Chat)
> ```
> Create a TypeScript MCP server using @modelcontextprotocol/sdk that:
> - Uses StdioServerTransport for stdio communication
> - Has a server name of "my-mcp-app" version "0.1.0" with tools capability
> - Registers a get_time tool with no required arguments that returns the current UTC time as ISO string text content
> - Handles the ListTools and CallTool request schemas
> - Logs startup to console.error (never console.log, to avoid corrupting the MCP stdio stream)
> - Has a main() async function that connects the transport and handles fatal errors
> Save this as src/server.ts using ES module imports with .js extensions.
> ```

Or write it by hand — add the following to `src/server.ts`:

```typescript
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

// 1. Create the server instance
const server = new Server(
  {
    name: "my-mcp-app",
    version: "0.1.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// 2. Register the list of tools the server exposes
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "get_time",
        description: "Returns the current UTC date and time.",
        inputSchema: {
          type: "object",
          properties: {},
          required: [],
        },
      },
    ],
  };
});

// 3. Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name === "get_time") {
    return {
      content: [
        {
          type: "text",
          text: `Current UTC time: ${new Date().toISOString()}`,
        },
      ],
    };
  }

  throw new Error(`Unknown tool: ${request.params.name}`);
});

// 4. Connect over standard I/O
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("MCP server running on stdio");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
```

### Step B3 - Explain each part

Walk through the four numbered sections with participants:

1. **Server instance** — gives the server a name, version, and a capabilities declaration. The host uses this to know what the server can do.
2. **ListTools handler** — returns the list of tools the server exposes. The AI model uses this to discover what tools are available.
3. **CallTool handler** — receives tool call requests and dispatches them to the correct implementation. Returns a content array.
4. **StdioServerTransport** — wires the server to read from stdin and write to stdout. This is the communication channel between the AI host and your server.

### Step B4 - Build and run the server

```bash
npm run dev
```

You should see:

```
MCP server running on stdio
```

The server is now running and waiting for messages on stdin. Press `Ctrl+C` to stop it.

### Success Criteria for Part B
- [ ] `src/server.ts` exists and compiles without errors
- [ ] The server starts and prints the startup message
- [ ] You can explain what each of the four numbered sections does
- [ ] You can explain why `console.error` is used instead of `console.log` for the startup message

> **Tip:** `console.log` writes to stdout, which is the MCP communication channel. Always use `console.error` for diagnostic messages so they go to stderr and do not corrupt the MCP protocol stream.

---

## Part C - Register a Second Tool

> **Suggested time:** 3 minutes

To reinforce the pattern, add a second tool that takes an input argument.

> 💬 **Copilot Prompt — add echo tool** (open `src/server.ts`, then use Inline Chat `⌘I` / `Ctrl+I`)
> ```
> Add an echo tool to this MCP server that accepts a required "message" string argument and returns the message prefixed with "Echo: ". Register it in the ListTools handler and add a handler branch in CallTool.
> ```

Or add it by hand:

### Step C1 - Add `echo` to the tools list

Inside the `tools` array in `ListToolsRequestSchema`, add:

```typescript
{
  name: "echo",
  description: "Repeats the provided message back to the caller.",
  inputSchema: {
    type: "object",
    properties: {
      message: {
        type: "string",
        description: "The message to echo back.",
      },
    },
    required: ["message"],
  },
},
```

### Step C2 - Handle `echo` in the call handler

Add a new `if` branch inside `CallToolRequestSchema`:

```typescript
if (request.params.name === "echo") {
  const message = (request.params.arguments as { message: string }).message;
  return {
    content: [
      {
        type: "text",
        text: `Echo: ${message}`,
      },
    ],
  };
}
```

### Step C3 - Rebuild and verify

```bash
npm run dev
```

The server should still start cleanly. In Activity 2, when you add the UI resource, you will follow the same pattern: register a new tool and handle its call.

### Success Criteria for Part C
- [ ] `echo` tool is listed in `ListToolsRequestSchema`
- [ ] `echo` tool call is handled and returns the message
- [ ] Server rebuilds and starts without errors

---

## Commit Your Work

```bash
git init
git add package.json tsconfig.json src/server.ts
git commit -m "feat: hello world MCP server with get_time and echo tools"
```

---

## Troubleshooting

| Problem | What to Check |
|---|---|
| `Cannot find module '@modelcontextprotocol/sdk'` | Run `npm install` again and confirm `node_modules` exists |
| TypeScript module resolution errors | Confirm `"module": "Node16"` and `"moduleResolution": "Node16"` in `tsconfig.json` and that imports use `.js` extensions |
| Server exits immediately | Confirm `server.connect(transport)` is awaited and the process does not exit before the first message |
| Tool call returns an error | Confirm the tool name in `CallToolRequestSchema` matches the name in `ListToolsRequestSchema` exactly |
| `console.log` interferes with MCP messages | Replace `console.log` with `console.error` for all non-MCP output |

---

*← [Back to Workshop README](../README.md) · [Next: Activity 2 →](./activity-2.md)*
