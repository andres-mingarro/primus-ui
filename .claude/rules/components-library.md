---
globs: ["components-library/**"]
---

# Component Library Rules

Working inside `components-library/`. These rules are mandatory.

- No component may import from another component.
- Every component must accept `addClassName?: string` and append it after its own classes.
- CSS class prefix: `pu-[component]` — e.g. `pu-button`, `pu-divider`.
- CSS variable prefix: `--pu-[component]-[property]` — scoped to the component root class with defaults.
- The SCSS version (`.tsx`) uses only `pu-` classes from its own `.scss` file — no Tailwind.
- The Tailwind version (`.tailwind.tsx`) uses only Tailwind utility classes — no SCSS import, no `@apply`.
- `meta.ts` must reflect every prop including `addClassName`.
- Every component must meet WCAG 2.1 AA: focus-visible styles, 4.5:1 contrast, semantic HTML, 44×44px touch targets.
- Versions follow semver: minor bump for new props, patch for style fixes.

Do not touch `app/`, `ui/`, `messages/`, or `lib/` from here. Those belong to other agents.
