# Primus UI APP Context

This file is the persistent context for the Primus UI documentation APP.

## Project Shape

Primus UI has two separate surfaces:

- `components-library/`: the independent component library.
- `app/` and `ui/`: the visible documentation APP.

The APP is the public face of Primus UI. It introduces the library, explains how to use it, lists components, and documents each component.

The APP must not be treated as the component library itself.

## APP Owner

Use the `.claude/agents/ui-designer.md` agent for APP/UI/UX work.

## Design Source

The visual reference is the official UI PRO MAX demo:

`https://ui-ux-pro-max-skill.nextlevelbuilder.io/demo/restaurant-food`

The UI PRO MAX style identified for that demo is:

- Product reasoning: `Hero-Centric + Conversion`
- Main style: `Vibrant & Block-based + Motion-Driven`
- Typography: `Playfair Display SC` headings + `Karla` body
- Color direction: warm cream, orange, red-brown, dark brown, high contrast

For Primus UI, this becomes:

`editorial block-based documentation`

The goal is not to make Primus UI look like a restaurant. The goal is to reuse the demo's visual language: warm editorial layout, strong serif display type, block composition, visible borders, hard offset shadows, rectangular cards, confident CTAs, and clear section rhythm.

## Hard Rules

- Use UI PRO MAX for APP/UI/UX decisions.
- Do not touch `components-library/` unless explicitly requested.
- Tailwind is prohibited in the APP.
- APP UI must be component-based.
- Each APP component must have:
  - a `.tsx` file
  - a matching `.scss` file
  - a root className matching the component name
- Use simple BEM:
  - `.ComponentName`
  - `.ComponentName__part`
  - `.ComponentName--state`
- Use design tokens for colors, spacing, typography, radius, shadows, z-index, and motion.
- Avoid raw hex values inside component SCSS when a token exists.
- Only two breakpoints exist:
  - `small`
  - `large`

## Layout Rule

The route layout must compose the APP from three primary visible components:

- `AppHeader`
- `AppSidebar`
- `AppMain`

Each of those components must be separate and have its own SCSS file.

Responsibilities:

- `AppHeader`: brand, top navigation, global controls.
- `AppSidebar`: documentation navigation and component navigation.
- `AppMain`: main content wrapper, reading width, page spacing, and page content slot.

The layout file should remain explicit and simple: import the three components and compose them.

## Information Architecture

Sidebar sections:

- `Documentation`
  - Introduction
  - Installation
  - Usage
  - Theming / Tokens
  - Next.js
  - Next.js Tailwind
  - Drupal
- `Components`
  - components-library
  - Component detail pages
  - Variants
  - Props/API
  - Examples
  - States
  - Accessibility

Home page should include:

- Editorial Primus UI hero.
- Short explanation of the library.
- Stack blocks for Next.js, Next.js Tailwind, and Drupal.
- Component preview/list.
- Tokens/design system section.
- CTA into documentation and components.

Component detail pages should include:

- Implementation tabs for `React + CSS`, `React + Tailwind`, and `Drupal`.
- Tab composition from `Tabs`, `TabsItems`, `TabItem`, `TabsContent`, and `TabPanel`.
- Route/description first in each implementation tab, followed by example, visual demo, props, and tokens.
- Tab panel content must not animate on tab changes.
- `SectionHeader` uses a `div.app-section-header` wrapper with an `h2`; never render these blocks as `<header>`.
- Drupal examples must use `{{ include('THEME-NAME:[component-name]', { ... }, false) }}`. Do not show `{% embed %}` or `{% include ... with ... %}` in docs.

## Visual Language

- Warm cream/ivory background.
- Dark brown or warm near-black text.
- Vivid orange primary action color.
- Red-brown/tan support colors.
- Dark mode is not an inverted light palette: no pure white in `.dark`, use warm low-light browns, muted parchment text, softened copper/brown borders, and subdued orange/gold accents.
- Rectangular surfaces.
- Low radius: `0px` to `8px`.
- Visible borders.
- Hard offset shadows.
- Bordered editorial header.
- Persistent documentation sidebar on `large`.
- Compact/drawer/top navigation option on `small`.
- Dark brown editorial footer.

## Avoid

- Generic SaaS blue/purple UI.
- Restaurant copy or food metaphors.
- Tailwind classes in APP components.
- shadcn-style rounded card grids.
- Glassmorphism.
- Decorative gradient blobs/orbs.
- Hidden focus states.
- Hover-only interactions.
- Unscoped CSS hacks.
- Additional breakpoints beyond `small` and `large`.
