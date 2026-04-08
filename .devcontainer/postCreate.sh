#!/usr/bin/env bash

set -euo pipefail

# ---------------------------------------------------------------------------
# Workshop 1: PDF skill support
# ---------------------------------------------------------------------------

python3 -m pip install --user --upgrade pip
python3 -m pip install --user pypdf

echo "- Python and pypdf are ready for the PDF skill example (Workshop 1)."

# ---------------------------------------------------------------------------
# Workshop 2: MCP App development tools
# ---------------------------------------------------------------------------

# Install TypeScript globally so participants can run `tsc` directly
npm install -g typescript

# Pre-install the Workshop 2 demo project dependencies so that the first
# `npm install` inside the examples directory is instant during the session.
DEMO_DIR="workshop-creating-rich-interfaces-with-mcp-apps/demo"
mkdir -p "$DEMO_DIR"

# Write a minimal package.json if one does not already exist
if [ ! -f "$DEMO_DIR/package.json" ]; then
  cat > "$DEMO_DIR/package.json" <<'PKGJSON'
{
  "name": "mcp-app-demo",
  "version": "0.1.0",
  "type": "module",
  "description": "Workshop 2 — MCP App demo project",
  "scripts": {
    "build": "tsc && vite build",
    "build:ui": "vite build",
    "start": "node dist/server.js",
    "dev": "tsc && vite build && node dist/server.js"
  },
  "dependencies": {
    "@modelcontextprotocol/sdk": "^1.0.0"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "typescript": "^5.0.0",
    "vite": "^5.0.0"
  }
}
PKGJSON
fi

# Write a minimal tsconfig.json if one does not already exist
if [ ! -f "$DEMO_DIR/tsconfig.json" ]; then
  cat > "$DEMO_DIR/tsconfig.json" <<'TSCJSON'
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
TSCJSON
fi

# Create src directory for server code
mkdir -p "$DEMO_DIR/src"
# Create ui directory for front-end code
mkdir -p "$DEMO_DIR/ui"

# Pre-install all dependencies so npm install is fast during the workshop
(cd "$DEMO_DIR" && npm install --prefer-offline 2>&1 | tail -3)

echo "- Node.js $(node --version) and npm $(npm --version) are ready."
echo "- TypeScript $(tsc --version) is installed globally."
echo "- Workshop 2 demo project pre-installed at: $DEMO_DIR"
echo ""
echo "Devcontainer setup complete."
echo "- Open workshop-mastering-vscode-ai-workflows/README.md to run Workshop 1."
echo "- Open workshop-creating-rich-interfaces-with-mcp-apps/README.md to run Workshop 2."
