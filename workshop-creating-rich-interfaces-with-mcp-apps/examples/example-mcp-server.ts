import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListResourcesRequestSchema,
  ListToolsRequestSchema,
  ReadResourceRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { readFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// ---------------------------------------------------------------------------
// Session store: pending form Promises keyed by session ID
// ---------------------------------------------------------------------------

const pendingForms = new Map<
  string,
  {
    resolve: (data: { bulb: string; color: string; brightness: number }) => void;
    reject: (reason?: unknown) => void;
  }
>();

// ---------------------------------------------------------------------------
// MCP Server setup
// ---------------------------------------------------------------------------

const server = new Server(
  {
    name: "bulb-controller-mcp-app",
    version: "0.1.0",
  },
  {
    capabilities: {
      tools: {},
      resources: {},
    },
  }
);

// ---------------------------------------------------------------------------
// Tools: list
// ---------------------------------------------------------------------------

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
    ],
  };
});

// ---------------------------------------------------------------------------
// Tools: call handlers
// ---------------------------------------------------------------------------

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  // --- get_time ---
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

  // --- echo ---
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

  // --- show_ui ---
  // Suspends the chat by returning a Promise that is only resolved when
  // submit_form is called with the matching session_id.
  if (request.params.name === "show_ui") {
    const { session_id } = request.params.arguments as { session_id: string };

    console.error(
      `[show_ui] session ${session_id} — waiting for form submission`
    );

    const TIMEOUT_MS = 5 * 60 * 1000; // 5 minutes

    const formData = await Promise.race([
      new Promise<{ bulb: string; color: string; brightness: number }>((resolve, reject) => {
        pendingForms.set(session_id, { resolve, reject });
      }),
      new Promise<never>((_resolve, reject) =>
        setTimeout(
          () => reject(new Error("Form submission timed out after 5 minutes")),
          TIMEOUT_MS
        )
      ),
    ]).finally(() => {
      pendingForms.delete(session_id);
    });

    return {
      content: [
        {
          type: "text",
          text: `User selected bulb "${formData.bulb}" with color "${formData.color}" at ${formData.brightness}% brightness.`,
        },
      ],
    };
  }

  // --- submit_form ---
  // Called by the UI form. Resolves the pending Promise stored by show_ui.
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

  throw new Error(`Unknown tool: ${request.params.name}`);
});

// ---------------------------------------------------------------------------
// Resources: list
// ---------------------------------------------------------------------------

server.setRequestHandler(ListResourcesRequestSchema, async () => {
  return {
    resources: [
      {
        uri: "app://bulb-controller",
        name: "Bulb Controller",
        description: "Interactive UI for selecting a bulb and color.",
        mimeType: "text/html",
      },
    ],
  };
});

// ---------------------------------------------------------------------------
// Resources: read (serves the bundled Vite HTML)
// ---------------------------------------------------------------------------

server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
  if (request.params.uri === "app://bulb-controller") {
    const htmlPath = join(__dirname, "../dist/ui/index.html");
    const html = readFileSync(htmlPath, "utf-8");
    return {
      contents: [
        {
          uri: "app://bulb-controller",
          mimeType: "text/html",
          text: html,
        },
      ],
    };
  }

  throw new Error(`Unknown resource: ${request.params.uri}`);
});

// ---------------------------------------------------------------------------
// Start
// ---------------------------------------------------------------------------

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Bulb Controller MCP server running on stdio");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
