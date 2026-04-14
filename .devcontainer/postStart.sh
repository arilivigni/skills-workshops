#!/usr/bin/env bash

set -euo pipefail

if command -v node >/dev/null 2>&1; then
  NODE_VERSION="$(node --version)"
  if [[ ! "$NODE_VERSION" =~ ^v20\. ]]; then
    echo "Warning: expected Node 20.x in this devcontainer, found $NODE_VERSION" >&2
  fi
else
  echo "Warning: expected Node 20.x in this devcontainer, but 'node' is not available" >&2
fi

cat <<'EOF'
Codespace ready for Skills Workshops.

Recommended starting points:
- README.md
- workshop-mastering-vscode-ai-workflows/README.md
- workshop-mastering-vscode-ai-workflows/activities/
- workshop-mastering-vscode-ai-workflows/examples/
- workshop-creating-rich-interfaces-with-mcp-apps/README.md
- workshop-creating-rich-interfaces-with-mcp-apps/speaker-notes.md
- workshop-creating-rich-interfaces-with-mcp-apps/activities/
- workshop-creating-rich-interfaces-with-mcp-apps/examples/
- workshop-creating-rich-interfaces-with-mcp-apps/demo/   (pre-scaffolded starter project)
- workshop-advanced-agent-orchestration-copilot-cli/README.md
- workshop-advanced-agent-orchestration-copilot-cli/activities/
- workshop-advanced-agent-orchestration-copilot-cli/examples/
- .github/agents/agentic-workflows.agent.md
- .github/skills/write-a-prd/

Quick tools check:
  node --version    (expect v20.x)
  npm --version
  tsc --version
  python3 --version (expect 3.12.x)
EOF

if command -v copilot >/dev/null 2>&1; then
  echo "  copilot --version   # $(copilot --version)"
fi
