#!/usr/bin/env bash
# Fires before context compaction. Logs a checkpoint.
TIMESTAMP=$(date '+%Y-%m-%d %H:%M')
BRANCH=$(git branch --show-current 2>/dev/null || echo "unknown")
DIRTY=$(git status --short 2>/dev/null | wc -l | tr -d ' ')

echo "[$TIMESTAMP] PreCompact — branch: $BRANCH, uncommitted files: $DIRTY"
echo "Context compacting. Agents, history, and CLAUDE.md will persist."
