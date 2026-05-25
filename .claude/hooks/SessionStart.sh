#!/usr/bin/env bash
# Fires on session start. Prints project context summary.
BRANCH=$(git branch --show-current 2>/dev/null || echo "unknown")
COMPONENTS=$(ls -d components-library/*/ 2>/dev/null | wc -l | tr -d ' ')
LAST=$(git log -1 --format="%h %s" 2>/dev/null || echo "no commits")

echo "=== Primus UI Component Library ==="
echo "Branch     : $BRANCH"
echo "Components : $COMPONENTS in components-library/"
echo "Last commit: $LAST"
echo "Agents     : leader → nextjs | drupal | ui-designer | inspector"
echo "Context    : .claude/APP_CONTEXT.md"
