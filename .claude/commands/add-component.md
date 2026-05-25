# /add-component

Add a new component to the Primus UI library following the full agent workflow.

Usage: /add-component <ComponentName>

This command:
1. Confirms the component name and props with the user.
2. Spawns the nextjs agent to create: .tsx, .tailwind.tsx, .scss, meta.ts, README.md, page.tsx, and registry entry.
3. Spawns the drupal agent in parallel to create: .component.yml, .twig, drupal .scss.
4. Runs the inspector agent after both finish for a quality check.
5. Reports the final file list and any issues found.

Do not write any component files directly. Always delegate to the agents.
