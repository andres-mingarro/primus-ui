---
globs: ["app/**", "ui/**"]
---

# Documentation APP Rules

Working inside the documentation APP (`app/` or `ui/`). These rules are mandatory.

- Tailwind is prohibited. Use SCSS only.
- Every user-visible string must come from `next-intl` via `t('key')` — never hardcode text.
- Only two breakpoints exist: use `@include media.small-only` and `@include media.large` from `app/styles/_media.scss`. Never hardcode `@media (min-width: ...)`.
- Use design tokens from `app/styles/tokens.css` for colors, spacing, and type. No raw hex values when a token exists.
- Each APP component needs a `.tsx` file and a matching `.scss` file in one of:
  - `ui/components/basics/ComponentName/`
  - `ui/components/feature/ComponentName/`
  - `ui/components/segment/ComponentName/`
- Class naming: `app-` prefix for shared reusable pieces, BEM (`.ComponentName__part--state`) for component-scoped structure.
- All pages live under `app/[locale]/` — never `app/[slug]/`.
- Do not touch `components-library/` from here.
