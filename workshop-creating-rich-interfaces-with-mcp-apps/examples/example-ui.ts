// ui.ts — front-end logic for the Bulb Controller form
//
// This file is compiled and inlined into index.html by Vite during build.
// It runs in the browser context inside the AI chat window.
//
// The MCP host injects a global `mcpHost` object that provides:
//   - mcpHost.callTool(name, args) — calls a named tool on the MCP server
//   - mcpHost.sessionId            — the session ID shared with the server

// Extend the global Window type so TypeScript knows about the injected object.
declare global {
  interface Window {
    mcpHost: {
      callTool: (
        name: string,
        args: Record<string, unknown>
      ) => Promise<unknown>;
      sessionId: string;
    };
  }
}

// ---------------------------------------------------------------------------
// DOM references
// ---------------------------------------------------------------------------

const form = document.getElementById("bulb-form") as HTMLFormElement;
const statusEl = document.getElementById("status") as HTMLParagraphElement;
const brightnessInput = document.getElementById(
  "brightness"
) as HTMLInputElement;
const brightnessValue = document.getElementById(
  "brightness-value"
) as HTMLSpanElement;

// ---------------------------------------------------------------------------
// Live brightness label update
// ---------------------------------------------------------------------------

brightnessInput.addEventListener("input", () => {
  brightnessValue.textContent = brightnessInput.value;
});

// ---------------------------------------------------------------------------
// Form submission — calls the submit_form tool on the MCP server
// ---------------------------------------------------------------------------

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const bulb = (document.getElementById("bulb") as HTMLSelectElement).value;
  const color = (document.getElementById("color") as HTMLInputElement).value;
  const brightness = brightnessInput.value;

  // Validate before sending
  if (!bulb) {
    statusEl.textContent = "Please select a bulb before submitting.";
    return;
  }

  statusEl.textContent = "Submitting…";

  try {
    // Call the submit_form tool on the MCP server.
    // The server's show_ui handler is waiting for this call to resolve
    // the stored Promise, which unblocks the chat.
    await window.mcpHost.callTool("submit_form", {
      session_id: window.mcpHost.sessionId,
      bulb,
      color,
      brightness: Number(brightness),
    });

    // Disable the form so the user cannot submit again
    form.setAttribute("inert", "");
    statusEl.textContent = `Submitted! Bulb: ${bulb} · Color: ${color} · Brightness: ${brightness}%`;
  } catch (err) {
    statusEl.textContent = `Error: ${err instanceof Error ? err.message : String(err)}`;
  }
});
