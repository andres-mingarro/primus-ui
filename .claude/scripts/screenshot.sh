#!/usr/bin/env bash
# Usage: bash .claude/scripts/screenshot.sh <url-path> <output-name> [mobile]
#
# Examples:
#   bash .claude/scripts/screenshot.sh /en home
#   bash .claude/scripts/screenshot.sh /en/docs docs
#   bash .claude/scripts/screenshot.sh /en home mobile
#   bash .claude/scripts/screenshot.sh /en/components/divider divider
#
# Output: .claude/screenshots/<output-name>.png (desktop)
#         .claude/screenshots/<output-name>-mobile.png (when mobile arg is passed)

set -euo pipefail

URL_PATH="${1:-/en}"
OUTPUT_NAME="${2:-screenshot}"
MOBILE="${3:-}"
PORT=3000
BASE_URL="http://localhost:$PORT"
OUTPUT_DIR=".claude/screenshots"
CHROME_FLAGS="--headless --disable-gpu --no-sandbox --disable-dev-shm-usage"

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
    if server_ready; then
      echo "Server ready (${i}s)"
      break
    fi
    if [ "$i" -eq 45 ]; then
      echo "ERROR: server did not start in 45s" >&2
      kill "$DEV_PID" 2>/dev/null || true
      exit 1
    fi
    sleep 1
  done
else
  echo "Server already running on :$PORT"
fi

TARGET="$BASE_URL$URL_PATH"

# ── Desktop screenshot ───────────────────────────────────────────
DESKTOP_OUT="$OUTPUT_DIR/${OUTPUT_NAME}.png"
google-chrome $CHROME_FLAGS \
  --window-size=1440,900 \
  --screenshot="$DESKTOP_OUT" \
  "$TARGET" 2>/dev/null
echo "Desktop → $DESKTOP_OUT"

# ── Mobile screenshot (optional) ─────────────────────────────────
if [ -n "$MOBILE" ]; then
  MOBILE_OUT="$OUTPUT_DIR/${OUTPUT_NAME}-mobile.png"
  google-chrome $CHROME_FLAGS \
    --window-size=390,844 \
    --screenshot="$MOBILE_OUT" \
    "$TARGET" 2>/dev/null
  echo "Mobile  → $MOBILE_OUT"
fi
