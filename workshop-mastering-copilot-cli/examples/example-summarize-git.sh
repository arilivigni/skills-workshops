#!/usr/bin/env bash
# summarize_git.sh — print the last N commits in a concise format
# Usage: ./summarize_git.sh [N]
# Default N is 20 if not provided.

set -euo pipefail

N="${1:-20}"

if ! git rev-parse --is-inside-work-tree &>/dev/null; then
  echo "Error: not inside a Git repository" >&2
  exit 1
fi

git log --oneline --no-merges -n "$N" --pretty=format:"%h %s (%an, %ar)"
