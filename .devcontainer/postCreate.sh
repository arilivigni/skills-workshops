#!/usr/bin/env bash

set -euo pipefail

NODE_VERSION="$(node --version)"
if [[ ! "$NODE_VERSION" =~ ^v20\. ]]; then
  echo "Expected Node 20.x in this devcontainer, found $NODE_VERSION" >&2
  exit 1
fi

if command -v copilot >/dev/null 2>&1; then
  COPILOT_VERSION="$(copilot --version 2>/dev/null || true)"
else
  COPILOT_VERSION="not installed"
fi

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
npm install -g typescript@^6


echo "- Node.js $(node --version) and npm $(npm --version) are ready."
echo "- TypeScript $(tsc --version) is installed globally."
if command -v copilot >/dev/null 2>&1; then
  echo "- Copilot CLI ${COPILOT_VERSION} is available."
else
  echo "- Copilot CLI is not installed."
fi
echo ""
echo "Devcontainer setup complete."
echo "- Open workshop-mastering-vscode-ai-workflows/README.md to run Workshop 1."
echo "- Open workshop-creating-rich-interfaces-with-mcp-apps/README.md to run Workshop 2."
echo "- Open workshop-advanced-agent-orchestration-copilot-cli/README.md to run Workshop 3."
