#!/usr/bin/env bash
# Fires before Write or Edit. Guards components-library/ from unauthorized writes.
INPUT=$(cat)
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty')

if echo "$FILE_PATH" | grep -q 'components-library/'; then
  printf '{"hookSpecificOutput":{"hookEventName":"PreToolUse","permissionDecision":"ask","permissionDecisionReason":"Write to components-library/ — approve only if this is a Next.js or Drupal agent write (see CLAUDE.md § Development Workflow)"}}'
fi
