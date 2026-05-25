# /screenshot

Take screenshots for a route or component.

Usage: /screenshot <url-path> <output-name> [mobile]

Examples:
  /screenshot /en home
  /screenshot /en/components/divider divider
  /screenshot /en home mobile

Run: `bash .claude/scripts/screenshot.sh $ARGUMENTS`

Screenshots are saved to .claude/screenshots/.
Light and dark are always generated. Add "mobile" for mobile variants too.
