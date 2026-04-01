#!/usr/bin/env bash

set -euo pipefail

python3 -m pip install --user --upgrade pip
python3 -m pip install --user pypdf

echo "Devcontainer setup complete."
echo "- Python and pypdf are ready for the PDF skill example."
echo "- Open workshop-mastering-vscode-ai-workflows/README.md to run the workshop."
