#!/usr/bin/env bash

set -euo pipefail

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

Quick tools check:
  node --version    (expect v20.x)
  npm --version
  tsc --version
  python3 --version (expect 3.12.x)
EOF
