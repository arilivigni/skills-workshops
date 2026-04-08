# Activity 2: Integrating the UI — HTML, TypeScript, and Vite

> **Time:** 15 minutes
> **Where:** Your `my-mcp-app` project folder from Activity 1
> **Goal:** Create an HTML form with a TypeScript companion file, bundle both with Vite into a single resource, and register the UI in the MCP server

This activity takes the working MCP server from Activity 1 and gives it a face. By the end, the server will be able to return an interactive HTML form directly inside the AI chat window.

---

## What You're Building

By the end of this activity you will have:
1. An `index.html` file with an interactive form styled with Pico CSS
2. A `ui.ts` TypeScript file that handles front-end form logic
3. A `vite.config.ts` that bundles both files into a single output
4. A new `show_ui` tool registered in `server.ts` that returns the bundled UI resource

---

## Part A - Create the HTML Form

> **Suggested time:** 5 minutes

### Step A1 - Create the UI source folder

```bash
mkdir ui
touch ui/index.html
touch ui/ui.ts
```

> 💬 **Copilot Prompt — generate the HTML form** (paste into Copilot Chat)
> ```
> Create an HTML file for a smart bulb controller form using Pico CSS (loaded from CDN: https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css).
> The form should have:
> - A <select id="bulb"> with options: Living Room, Bedroom, Kitchen (values: living-room, bedroom, kitchen)
> - An <input type="color" id="color"> with default value #ffd27f
> - A submit button labeled "Set Bulb"
> - A <p id="status" aria-live="polite"> paragraph for status messages
> - A <script type="module" src="./ui.ts"> tag at the bottom of the body
> Use lang="en" and data-theme="light" on the html element.
> Save as ui/index.html.
> ```

### Step A2 - Write the HTML form

Add the following to `ui/index.html`:

```html
<!DOCTYPE html>
<html lang="en" data-theme="light">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Bulb Controller</title>
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css"
    />
  </head>
  <body>
    <main class="container">
      <h2>Bulb Controller</h2>
      <form id="bulb-form">
        <label for="bulb">Select bulb</label>
        <select id="bulb" name="bulb" required>
          <option value="">Choose a bulb...</option>
          <option value="living-room">Living Room</option>
          <option value="bedroom">Bedroom</option>
          <option value="kitchen">Kitchen</option>
        </select>

        <label for="color">Choose color</label>
        <input type="color" id="color" name="color" value="#ffd27f" />

        <button type="submit">Set Bulb</button>
      </form>
      <p id="status" aria-live="polite"></p>
    </main>
    <script type="module" src="./ui.ts"></script>
  </body>
</html>
```

### Step A3 - Explain the structure

Point out the key parts:
- **Pico CSS** — a classless CSS framework loaded from a CDN. No build configuration needed for styling.
- **`<form id="bulb-form">`** — the form the user will fill in. The `id` is used by `ui.ts` to attach the submit listener.
- **`<p id="status">`** — a status paragraph updated by `ui.ts` after the form is submitted.
- **`<script type="module" src="./ui.ts">`** — Vite processes this reference and inlines the compiled TypeScript into the bundle.

---

## Part B - Write the TypeScript Logic

> **Suggested time:** 4 minutes

> 💬 **Copilot Prompt — generate the form handler stub** (open `ui/ui.ts`, then use Inline Chat `⌘I` / `Ctrl+I`)
> ```
> Write TypeScript front-end logic for the bulb controller form in this file.
> It should:
> - Get the form element by id "bulb-form" (HTMLFormElement)
> - Get the status paragraph by id "status" (HTMLParagraphElement)
> - Add a submit event listener that prevents default, reads the bulb select and color input values, and logs them to console.log
> - Set statusEl.textContent to show the selected bulb and color
> This is a stub — the console.log will be replaced with an MCP tool call in Activity 3.
> ```

### Step B1 - Add the form handler stub

Add the following to `ui/ui.ts`:

```typescript
// ui.ts — front-end logic for the Bulb Controller form

const form = document.getElementById("bulb-form") as HTMLFormElement;
const statusEl = document.getElementById("status") as HTMLParagraphElement;

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const bulb = (document.getElementById("bulb") as HTMLSelectElement).value;
  const color = (document.getElementById("color") as HTMLInputElement).value;

  statusEl.textContent = "Submitting…";

  // This will be wired to the MCP submit tool in Activity 3.
  // For now, just log the values to verify the form works.
  console.log("Form submitted:", { bulb, color });
  statusEl.textContent = `Selected: ${bulb} · ${color}`;
});
```

### Step B2 - Explain what this does

- `form.addEventListener("submit", ...)` — intercepts the native browser form submission so we can control what happens.
- `event.preventDefault()` — stops the browser from navigating away on submit, which is the default behavior.
- The two `getElementById` calls read the current values of the select and color inputs.
- In Activity 3, the `console.log` will be replaced with an actual MCP tool call to `submit_form`.

---

## Part C - Configure Vite

> **Suggested time:** 3 minutes

### Step C1 - Install Vite

```bash
npm install --save-dev vite
```

> 💬 **Copilot Prompt — generate the Vite config** (paste into Copilot Chat)
> ```
> Create a vite.config.ts in the project root that:
> - Sets root to "ui" so Vite treats ui/index.html as the entry point
> - Sets outDir to "../dist/ui" (relative to root) with emptyOutDir: true
> - Uses rollupOptions with inlineDynamicImports: true so all JavaScript is inlined into the HTML output (no separate .js asset files)
> The goal is a single self-contained dist/ui/index.html with no external asset files.
> ```

### Step C2 - Create the Vite configuration

Create `vite.config.ts` in the project root:

```typescript
import { defineConfig } from "vite";

export default defineConfig({
  root: "ui",
  build: {
    outDir: "../dist/ui",
    emptyOutDir: true,
    rollupOptions: {
      input: "ui/index.html",
      output: {
        // Produce a single inline script so the HTML file is fully self-contained
        inlineDynamicImports: true,
      },
    },
  },
});
```

### Step C3 - Add a UI build script to `package.json`

```json
"scripts": {
  "build": "tsc && vite build",
  "build:ui": "vite build",
  "start": "node dist/server.js",
  "dev": "tsc && vite build && node dist/server.js"
}
```

### Step C4 - Run the UI build

```bash
npm run build:ui
```

Check that `dist/ui/index.html` exists and contains inlined JavaScript — no separate `.js` file needed.

### Step C5 - Explain why a single file matters

The MCP server will return the UI as a resource. The resource needs to be self-contained in a single file because the AI host has no way to fetch additional asset files from the server's filesystem. Vite's inline mode solves this by compiling the TypeScript and embedding it directly in the HTML output.

### Success Criteria for Part C
- [ ] `vite.config.ts` exists in the project root
- [ ] `npm run build:ui` completes without errors
- [ ] `dist/ui/index.html` exists and contains inlined script content
- [ ] There is no separate `.js` file alongside `dist/ui/index.html`

---

## Part D - Register the UI Resource in the Server

> **Suggested time:** 3 minutes

### Step D1 - Install the `ext-apps` package

```bash
npm install @github/mcp-ext-apps
```

> **Note:** Check the MCP documentation for the current package name and version for your target host. The `ext-apps` package is the standard way to register app-style UI resources in MCP servers targeting GitHub Copilot and compatible hosts.

> 💬 **Copilot Prompt — add resource registration** (open `src/server.ts`, then use Inline Chat `⌘I` / `Ctrl+I`)
> ```
> Add ListResourcesRequestSchema and ReadResourceRequestSchema handlers to this MCP server:
> - ListResources should return one resource with uri "app://bulb-controller", name "Bulb Controller", description "Interactive UI for selecting a bulb and color.", mimeType "text/html"
> - ReadResource should read dist/ui/index.html using readFileSync and return it as text/html content for the "app://bulb-controller" URI
> - Use dirname(fileURLToPath(import.meta.url)) for __dirname compatible path resolution
> - Also update the Server constructor to add resources: {} to capabilities
> Import the new schema types from @modelcontextprotocol/sdk/types.js and fs/path/url modules.
> ```

### Step D2 - Import the UI schema helper

Open `src/server.ts` and add the following import at the top:

```typescript
import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
```

### Step D3 - Register a UI resource

In `server.ts`, add a `ListResourcesRequestSchema` handler after the existing `ListToolsRequestSchema` handler:

```typescript
import { ListResourcesRequestSchema, ReadResourceRequestSchema } from "@modelcontextprotocol/sdk/types.js";

// Register the bundled UI as a resource
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

// Serve the bundled HTML when the resource is requested
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
```

### Step D4 - Add `resources` to the server capabilities

Update the `Server` constructor call to include `resources`:

```typescript
const server = new Server(
  {
    name: "my-mcp-app",
    version: "0.1.0",
  },
  {
    capabilities: {
      tools: {},
      resources: {},
    },
  }
);
```

### Step D5 - Build and verify

```bash
npm run dev
```

The server should start cleanly. In Activity 3, you will add the `show_ui` and `submit_form` tools that use this resource.

---

## Commit Your Work

```bash
git add ui/ vite.config.ts src/server.ts package.json
git commit -m "feat: add HTML form, Vite bundle, and UI resource registration"
```

---

## Troubleshooting

| Problem | What to Check |
|---|---|
| Vite build fails with a path error | Confirm `root: "ui"` in `vite.config.ts` and that `ui/index.html` exists |
| `dist/ui/index.html` has no inlined script | Add `inlineDynamicImports: true` to the Rollup output options |
| `@github/mcp-ext-apps` not found | Check the current package name in the MCP documentation; the package name may differ by host |
| `readFileSync` fails at runtime | Confirm the build ran before starting the server so `dist/ui/index.html` exists |
| TypeScript errors on `__dirname` | Add the `dirname`, `fileURLToPath` imports and the `__dirname` assignment shown above |

---

*← [Activity 1](./activity-1.md) · [Back to Workshop README](../README.md) · [Next: Activity 3 →](./activity-3.md)*
