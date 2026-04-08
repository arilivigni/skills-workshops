import { defineConfig } from "vite";

// vite.config.ts — builds the UI HTML and TypeScript into a single bundled file
//
// Key settings:
//   root       — where Vite looks for index.html inside my-mcp-app
//   outDir     — where the bundled output is written (relative to the my-mcp-app root)
//   emptyOutDir — clear the output folder before each build
//   rollupOptions.input — explicit entry point (required when the Vite root is ui/ rather than the my-mcp-app root)
//   inlineDynamicImports — embed all JavaScript directly in the HTML file so
//                          the MCP server can serve a single self-contained resource

export default defineConfig({
  root: "ui",
  build: {
    outDir: "../dist/ui",
    emptyOutDir: true,
    rollupOptions: {
      input: "ui/index.html",
      output: {
        // Produce a single inline script so the HTML file is fully self-contained.
        // The MCP host cannot fetch additional asset files from the server filesystem,
        // so all JavaScript must be embedded inside the HTML output.
        inlineDynamicImports: true,
      },
    },
  },
});
