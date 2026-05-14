#!/usr/bin/env bash
# Usage: bash .claude/scripts/screenshot.sh <url-path> <output-name> [mobile]
#
# Siempre genera light + dark. Con "mobile" genera los 4 (light, dark, mobile-light, mobile-dark).
#
# Ejemplos:
#   bash .claude/scripts/screenshot.sh /en home
#   bash .claude/scripts/screenshot.sh /en home mobile
#   bash .claude/scripts/screenshot.sh /en/components/divider divider

set -euo pipefail

URL_PATH="${1:-/en}"
OUTPUT_NAME="${2:-screenshot}"
MOBILE="${3:-}"
PORT=3000
BASE_URL="http://localhost:$PORT"
OUTPUT_DIR=".claude/screenshots"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

mkdir -p "$OUTPUT_DIR"

# ── Dev server check ────────────────────────────────────────────
server_ready() {
  curl -sf "$BASE_URL" > /dev/null 2>&1
}

if ! server_ready; then
  echo "Dev server not running on :$PORT — starting bun next dev..."
  bun next dev --port "$PORT" > /dev/null 2>&1 &
  DEV_PID=$!
  echo "PID $DEV_PID — waiting up to 45s..."
  for i in $(seq 1 45); do
    if server_ready; then echo "Server ready (${i}s)"; break; fi
    if [ "$i" -eq 45 ]; then echo "ERROR: server did not start in 45s" >&2; kill "$DEV_PID" 2>/dev/null || true; exit 1; fi
    sleep 1
  done
else
  echo "Server already running on :$PORT"
fi

TARGET="$BASE_URL$URL_PATH"

# ── Desktop light + dark ─────────────────────────────────────────
node "$SCRIPT_DIR/screenshot.mjs" "$TARGET" "$OUTPUT_DIR/${OUTPUT_NAME}.png"
echo "Light   → $OUTPUT_DIR/${OUTPUT_NAME}.png"

node "$SCRIPT_DIR/screenshot.mjs" "$TARGET" "$OUTPUT_DIR/${OUTPUT_NAME}-dark.png" dark
echo "Dark    → $OUTPUT_DIR/${OUTPUT_NAME}-dark.png"

# ── Mobile light + dark (opcional) ───────────────────────────────
if [ -n "$MOBILE" ]; then
  node "$SCRIPT_DIR/screenshot.mjs" "$TARGET" "$OUTPUT_DIR/${OUTPUT_NAME}-mobile.png" mobile
  echo "Mobile light → $OUTPUT_DIR/${OUTPUT_NAME}-mobile.png"

  node "$SCRIPT_DIR/screenshot.mjs" "$TARGET" "$OUTPUT_DIR/${OUTPUT_NAME}-mobile-dark.png" mobile dark
  echo "Mobile dark  → $OUTPUT_DIR/${OUTPUT_NAME}-mobile-dark.png"
fi
