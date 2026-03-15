#!/usr/bin/env bash
# Sync upstream aerc scdoc sources and convert to markdown.
#
# Usage:
#   ./scripts/sync-upstream.sh [output-dir]
#
# Clones or pulls the upstream aerc repo, then runs the scdoc-to-md converter.

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
UPSTREAM_DIR="${PROJECT_ROOT}/upstream/aerc"
OUTPUT_DIR="${1:-${PROJECT_ROOT}/src/content/docs/reference}"

echo "=== aerc upstream sync ==="

# Clone or pull upstream
if [ -d "$UPSTREAM_DIR/.git" ]; then
  echo "Pulling latest changes..."
  git -C "$UPSTREAM_DIR" pull --ff-only
else
  echo "Cloning upstream aerc..."
  mkdir -p "$(dirname "$UPSTREAM_DIR")"
  git clone --depth 1 https://git.sr.ht/~rjarry/aerc "$UPSTREAM_DIR"
fi

# Get version info
cd "$UPSTREAM_DIR"
UPSTREAM_VERSION=$(git describe --tags --abbrev=0 2>/dev/null || echo "dev")
echo "Upstream version: $UPSTREAM_VERSION"

# Run converter
echo "Converting scdoc files..."
cd "$PROJECT_ROOT"
npx tsx scripts/scdoc-to-md/index.ts --all "$UPSTREAM_DIR/doc" "$OUTPUT_DIR"

echo ""
echo "=== Sync complete (aerc $UPSTREAM_VERSION) ==="
