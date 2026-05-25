# /ship

Run the full ship sequence for Primus UI. Stop at the first failure and report the error.

Steps:
1. TypeScript check: `npx tsc --noEmit`
2. Build: `bun run build`

Report pass or fail for each step with the relevant output.
Do not push to remote. Do not commit.
