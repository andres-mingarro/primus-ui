## 2026-05-25 — Next.js

- Task: Remove the `danger` variant from the Button component.
- Files: `components-library/Button/Button.tsx`, `components-library/Button/Button.tailwind.tsx`, `components-library/Button/button.scss`, `components-library/Button/meta.ts`, `components-library/Button/README.md`.
- Result: `danger` removed from `ButtonVariant` union type in both `.tsx` and `.tailwind.tsx`; `danger` entry deleted from `variantClasses` in the Tailwind file (resolving TS2353); `.pu-button[data-variant="danger"]` block deleted from `button.scss`; `variant` prop type updated in `meta.ts`; props table and both usage examples updated in `README.md`.
- Verification: TS error TS2353 resolved; no TypeScript errors remain in modified files.
- Notes: none.
