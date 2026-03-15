#!/usr/bin/env bash
# Check for new aerc releases by comparing git tags.
#
# Usage:
#   ./scripts/check-releases.sh
#
# Compares the latest upstream tag against .upstream-version.
# Exits 0 if a new release is found, 1 otherwise.

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
VERSION_FILE="${PROJECT_ROOT}/.upstream-version"

# Get latest tag from upstream
LATEST_TAG=$(git ls-remote --tags --sort=-v:refname https://git.sr.ht/~rjarry/aerc \
  | head -1 \
  | sed 's/.*refs\/tags\///' \
  | sed 's/\^{}//')

echo "Latest upstream tag: $LATEST_TAG"

# Compare with stored version
if [ -f "$VERSION_FILE" ]; then
  CURRENT_VERSION=$(cat "$VERSION_FILE")
  echo "Current tracked version: $CURRENT_VERSION"

  if [ "$LATEST_TAG" = "$CURRENT_VERSION" ]; then
    echo "No new release."
    exit 1
  fi
else
  echo "No tracked version found."
fi

echo "New release detected: $LATEST_TAG"
exit 0
