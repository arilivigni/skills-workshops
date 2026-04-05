# Resources - Workshop 2: Creating Rich Interfaces with MCP Apps

A curated list of documentation, reference material, and workshop support artifacts for building MCP apps that return interactive UIs inside the AI chat.

---

## Model Context Protocol (MCP) Documentation

- **[Model Context Protocol — Official Site](https://modelcontextprotocol.io)**
  Starting point for the MCP specification, concepts, and host compatibility.

- **[MCP TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk)**
  The official TypeScript SDK used to build MCP servers in this workshop. Includes `Server`, `StdioServerTransport`, and all schema types.

- **[MCP Specification: Tools](https://spec.modelcontextprotocol.io/specification/server/tools/)**
  Covers the `ListTools` and `CallTool` request/response shapes, input schemas, and tool result content types.

- **[MCP Specification: Resources](https://spec.modelcontextprotocol.io/specification/server/resources/)**
  Covers the `ListResources` and `ReadResource` request/response shapes and MIME type handling.

- **[MCP Transports](https://spec.modelcontextprotocol.io/specification/basic/transports/)**
  Explains the stdio and HTTP+SSE transport options. This workshop uses stdio.

---

## MCP Apps and UI Extensions

- **[MCP Apps Overview](https://modelcontextprotocol.io/docs/concepts/apps)**
  Background on how MCP servers can return interactive UI content to the chat host.

- **[ext-apps Package](https://www.npmjs.com/package/@github/mcp-ext-apps)**
  The npm package used to register UI app resources in MCP servers targeting GitHub Copilot and compatible hosts.

- **[UI Schema Reference](https://modelcontextprotocol.io/docs/concepts/apps#ui-schema)**
  Documents the resource URI format, MIME types, and UI schema fields required to register an app resource.

---

## Front-End Tools

- **[Vite Documentation](https://vitejs.dev/guide/)**
  The build tool used to bundle HTML and TypeScript into a single self-contained file for MCP resource delivery.

- **[Vite Build Options — Rollup](https://vitejs.dev/config/build-options.html#build-rollupoptions)**
  Reference for `inlineDynamicImports` and other bundle output options used in this workshop.

- **[Pico CSS](https://picocss.com)**
  The classless CSS framework used to style the HTML form without introducing a component library dependency.

- **[TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)**
  Reference for TypeScript syntax, type declarations, and the `declare global` pattern used in `ui.ts`.

---

## Node.js and Runtime References

- **[Node.js ESM Modules](https://nodejs.org/api/esm.html)**
  Covers `import.meta.url`, `fileURLToPath`, and `__dirname` equivalents needed for Node.js ES module projects.

- **[Node.js `fs.readFileSync`](https://nodejs.org/api/fs.html#fsreadfilesyncpath-options)**
  Used in the server to read the bundled HTML file from disk when serving it as a resource.

---

## Host Compatibility References

- **[GitHub Copilot MCP Support](https://docs.github.com/en/copilot/using-github-copilot/using-github-copilot-mcp)**
  Documentation for using MCP servers with GitHub Copilot in VS Code, including how the `mcpHost` bridge is injected.

- **[Claude Desktop MCP Configuration](https://modelcontextprotocol.io/quickstart/user)**
  Instructions for registering an MCP server in Claude Desktop for testing.

- **[VS Code MCP Server Setup](https://code.visualstudio.com/docs/copilot/model-context-protocol)**
  How to configure and test MCP servers inside VS Code with GitHub Copilot.

---

## Workshop Example Files

The `examples/` folder in this workshop includes:

| File | Purpose |
|---|---|
| `example-mcp-server.ts` | Complete MCP server with all four tools: `get_time`, `echo`, `show_ui`, and `submit_form` |
| `example-ui.html` | HTML form for the Bulb Controller with Pico CSS styling and a brightness slider |
| `example-ui.ts` | TypeScript front-end logic that calls `submit_form` via `mcpHost.callTool` on form submission |
| `example-vite-config.ts` | Vite configuration for bundling the UI into a single self-contained HTML file |

---

## Suggested Follow-up Practice

After the workshop, try one of these in a real project:

1. Replace the Pico CSS form with a custom-styled layout and add client-side input validation before calling `submit_form`.
2. Add a Cancel button that calls `mcpHost.callTool("cancel_form", ...)` and rejects the server-side Promise.
3. Add a `fetch_state` tool that reads current smart-home state from a mock API and pre-populates the form before it is shown.
4. Support multiple concurrent UI sessions by storing multiple pending Promises in the `pendingForms` Map simultaneously.
5. Package the full MCP app as a published npm package with a documented configuration interface.

---

## Troubleshooting & Community

- **[MCP GitHub Discussions](https://github.com/modelcontextprotocol/modelcontextprotocol/discussions)**
  Community forum for questions, issues, and feature requests related to the MCP specification.

- **[MCP TypeScript SDK Issues](https://github.com/modelcontextprotocol/typescript-sdk/issues)**
  Issue tracker for the TypeScript SDK used in this workshop.

- **[VS Code Copilot Issue Tracker](https://github.com/microsoft/vscode-copilot-release/issues)**
  For issues with the GitHub Copilot extension and MCP host behavior in VS Code.

---

*← [Back to Workshop README](./README.md)*
