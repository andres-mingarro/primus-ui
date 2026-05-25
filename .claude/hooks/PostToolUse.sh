#!/usr/bin/env bash
# Fires after Write or Edit. Reminds about related files when a component is touched.
INPUT=$(cat)
FILE=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty')

if echo "$FILE" | grep -qE 'components-library/[^/]+/[^/]+\.(tsx|scss|ts)$'; then
  COMPONENT=$(echo "$FILE" | sed 's|.*/components-library/||' | cut -d'/' -f1)
  echo "Component touched: $COMPONENT — verify meta.ts, README.md, and drupal/ are in sync."
fi
