# Primus UI — Component Library

A copy-paste component library for **Next.js** and **Drupal SDC** (Single Directory Components). Each component ships in three flavors: Tailwind CSS, SCSS/CSS, and Drupal Twig. Components are designed to be simple, concrete, and obvious.

## Repository Structure

Next.js runs from the repo root so that `components-library/` is within the project boundary (Turbopack requirement).

```text
primus-ui/
├── app/
│   ├── styles/
│   │   ├── globals.css              # Tailwind import, dark variant, utility classes
│   │   └── tokens.css               # CSS variables (--brand) + @theme for Tailwind
│   ├── layout.tsx                   # Root pass-through (required by Next.js)
│   └── [locale]/                    # ALL pages live here (i18n routing)
│       ├── layout.tsx               # NextIntlClientProvider + Header + Sidebar
│       ├── page.tsx                 # Introduction / component gallery
│       └── [component-slug]/
│           └── page.tsx             # Per-component docs page
├── ui/                              # Landing-only UI (not library)
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Sidebar.tsx
│   │   ├── SidebarNav.tsx           # Client component — active link detection
│   │   └── LanguageSwitcher.tsx     # EN | ES toggle
│   ├── ShowcaseFrame.tsx
│   ├── ThemeToggle.tsx
│   └── CodeTabs.tsx
├── lib/
│   ├── utils.ts                     # cn() helper
│   └── components-registry.ts       # Single source of truth for component list
├── providers/ThemeProvider.tsx
├── messages/
│   ├── en.json                      # English strings
│   └── es.json                      # Spanish strings
├── i18n/
│   ├── routing.ts                   # Locale config (locales, defaultLocale)
│   └── request.ts                   # next-intl per-request config
├── proxy.ts                         # Locale detection + redirect (Next.js 16+)
├── components-library/              # The actual library (copy-paste)
│   └── [ComponentName]/
│       ├── [ComponentName].tailwind.tsx
│       ├── [ComponentName].tsx
│       ├── [component-name].scss
│       ├── meta.ts
│       ├── README.md
│       └── drupal/
│           ├── [component-name].component.yml
│           ├── [component-name].twig
│           └── [component-name].scss
├── next.config.ts
├── package.json
└── tsconfig.json                    # @/* = ./, @primus/* = ./components-library/*
```

## Agents

For any non-trivial repo task, start with `.claude/agents/leader.md`. The leader classifies the request, loads the relevant specialist instructions, and coordinates ownership across Next.js, Drupal SDC, and APP design work.

If the environment supports subagents and the user has authorized delegation for the session, the leader may spawn the matching specialists. If delegation is unavailable or disallowed, load and follow the matching specialist files as mandatory project instructions in the main workflow.

| Agent       | File                            | Trigger                                                                         |
| ----------- | ------------------------------- | ------------------------------------------------------------------------------- |
| Leader      | `.claude/agents/leader.md`      | First stop for non-trivial repo tasks and cross-agent coordination              |
| Next.js     | `.claude/agents/nextjs.md`      | React components, landing page, Tailwind                                        |
| Drupal SDC  | `.claude/agents/drupal.md`      | Drupal SDC files (.twig, .component.yml, .scss)                                 |
| ui-designer | `.claude/agents/ui-designer.md` | APP layout, styles, UX, navigation, documentation pages, responsive             |
| inspector   | `.claude/agents/inspector.md`   | Pre/post audit for APP UI tasks: duplicate prevention, quality check, inventory |

## Existing Components

| Component          | Slug                | Description                                         |
| ------------------ | ------------------- | --------------------------------------------------- |
| Divider            | `divider`           | Horizontal or vertical separator line               |
| GridTemplate       | `grid-template`     | Responsive CSS grid wrapper with breakpoint columns |
| Text               | `text`              | Polymorphic text element (span/label/p/div)         |
| Heading            | `heading`           | Polymorphic heading (h1–h6) with weight variants    |
| SectionContainer   | `section-container` | Max-width wrapper with configurable gap             |

To add a component to the gallery, add an entry to `lib/components-registry.ts`.

---

## Component Standards — Rules

### 1. Full independence

Each component is a self-contained unit. No component may import from another component, no shared SCSS partials, no shared utility classes between components. A user must be able to copy a single component folder and have it work with zero other dependencies from this repo.

### 2. Files per component

```text
components-library/
  [ComponentName]/
    [ComponentName].tailwind.tsx   # React — Tailwind classes only, no SCSS
    [ComponentName].tsx            # React — only uses pu- classes from the SCSS file (default)
    [component-name].scss          # SCSS — all styles, CSS vars with defaults
    meta.ts                        # Props, CSS vars, version, description
    README.md                      # Per-component documentation
    drupal/
      [component-name].component.yml
      [component-name].twig
      [component-name].scss
```

### 3. `addClassName` prop — required on every component

Every component (React and Drupal) must accept an `addClassName` prop that appends extra classes to the root element.

```tsx
export interface ButtonProps {
  addClassName?: string
  // ...
}

export function Button({ addClassName }: ButtonProps) {
  return (
    <button className={['pu-button', addClassName].filter(Boolean).join(' ')}>
      ...
    </button>
  )
}
```

Rules:

- Always optional (`addClassName?: string`), never required, no default
- Always appended **after** the component's own classes
- Must appear in `meta.ts` props array

### 4. SCSS with overridable CSS variables

Every SCSS file must define CSS variables **with default values scoped to the component root class**. Users override them at any scope without touching the source file.

```scss
.pu-button {
  // --- Overridable tokens ---
  --pu-button-bg:        #2563eb;
  --pu-button-bg-hover:  #1d4ed8;
  --pu-button-color:     #ffffff;
  --pu-button-radius:    0.375rem;
  --pu-button-padding:   0.5rem 1rem;
  --pu-button-font-size: 0.875rem;

  // --- Implementation ---
  background-color: var(--pu-button-bg);
  color: var(--pu-button-color);
  // ...
}
```

### 5. Accessibility — mandatory, non-negotiable

Every component and every page in this repo must meet WCAG 2.1 AA.

- Every interactive element must have a visible `:focus-visible` style.
- Normal text: minimum 4.5:1 contrast ratio. Large text: minimum 3:1.
- Use correct semantic HTML. Never use `<div>` or `<span>` for interactive elements.
- Heading hierarchy must be sequential.
- All interactive elements must be at least 44×44px touch target.
- Drupal: use `{{ attributes }}` to pass through ARIA. Never hard-code `aria-*` unless always static.

### 6. Tailwind version is completely separate

`[ComponentName].tailwind.tsx` must **not** import the SCSS file. It is 100% self-contained with Tailwind utility classes. No `@apply`, no CSS variable references.

### 7. README per component

Every component folder must have a `README.md` with:

- Component name, version, brief description
- **Props table** — name | type | default | description
- **CSS variables table** — variable | default | description (SCSS version)
- Usage snippet for each version: Tailwind, SCSS/CSS, Drupal

### 8. Component meta shape

```ts
export const ComponentMeta = {
  name: 'Button',
  slug: 'button',
  version: '1.0.0',
  description: 'A basic button with variants.',
  props: [
    { name: 'label',      type: 'string',  required: true,  default: undefined, description: 'Button text' },
    { name: 'variant',    type: 'string',  required: false, default: 'primary', description: 'primary | secondary | ghost' },
    { name: 'addClassName', type: 'string', required: false, default: undefined, description: 'Extra classes appended to the root element' },
  ],
  cssVars: [
    { name: '--pu-button-bg',     default: '#2563eb',   description: 'Background color' },
    { name: '--pu-button-color',  default: '#ffffff',   description: 'Text color' },
    { name: '--pu-button-radius', default: '0.375rem',  description: 'Border radius' },
  ],
}
```

---

## Drupal SDC Standards

### `$schema` — required

Every `.component.yml` must declare the schema for strict validation:

```yaml
$schema: 'https://git.drupalcode.org/project/drupal/-/raw/HEAD/core/assets/schemas/v1/metadata.schema.json'
```

### Props structure — JSON Schema

Props use the full JSON Schema format:

```yaml
props:
  type: object
  properties:
    label:
      type: string
      title: Label
    variant:
      type: string
      enum: [primary, secondary, ghost]
      default: primary
  required:
    - label
```

Use `enum` whenever a prop has a fixed set of valid values.

### `translate_enabled` — required when the component has text props

Any component that renders a **string prop** as visible text (e.g. `label`, `text`, `title`, `placeholder`) must declare `translate_enabled`:

```yaml
translate_enabled:
  type: boolean
  title: Enable translation
  description: "Apply Drupal t() to text props. Set false when text already comes translated from the CMS."
  default: true
```

In Twig, resolve each text prop at the top using `is same as(false)` to safely handle `null`:

```twig
{% set _label = translate_enabled is same as(false) ? label : label|t %}
```

Does **not** apply to: slots, CSS values, technical enums (orientation, variant, etc.).

### `THEME-NAME` placeholder

All Twig docblocks and code snippets use `THEME-NAME:` as the namespace placeholder. Users replace it with their Drupal theme or module machine name (e.g. `my_theme:button`).

### Twig docblock — required format

Every `.twig` file must begin with a docblock. Exact format — no variations:

```twig
{#
  THEME-NAME:[component-name] — [version]
  Replace THEME-NAME with your Drupal theme or module machine name.

  [case title]
  [code snippet]

  [case title]
  [code snippet]
#}
```

Rules: short English title per case, code snippet, no prose explanations, no props tables. Always use `{{ include('THEME-NAME:[component-name]', { ... }, false) }}` in docblocks, README snippets, and app code examples. Never document `{% embed %}` or `{% include ... with ... %}`. For slot content, pass the slot key (`items`, `content`, `body`, etc.) inside the include object. Show Drupal field connection examples when relevant.

---

## Documentation App — Design & Architecture

The `ui/` tree and `app/` pages form the **documentation application** — the site that introduces Primus UI and documents each component. This is separate from the component library in `components-library/`.

Route APP layout, style, UX, navigation, or page work through **leader**, which should assign **ui-designer** ownership for that surface.

### Scope

**Can touch:** `app/`, `ui/`, `providers/` (only when required for APP presentation), `messages/` (only for APP navigation or documentation labels).

**Cannot touch unless explicitly requested:** `components-library/`, component public APIs, component `meta.ts`, component `README.md`, Drupal component files, package/config files unrelated to APP styling. If an APP change seems to require touching `components-library/`, stop and ask.

### Technical Rules — Non-Negotiable

- **Tailwind is prohibited in the APP.** Use SCSS only.
- Every APP component must have its own `.tsx` file and a matching `.scss` file.
- Every APP component lives in one of:
  - `ui/components/basics/ComponentName/` — small reusable primitives (buttons, badges, callouts, tables, code blocks, section headers)
  - `ui/components/feature/ComponentName/` — reusable product/documentation components (component cards, grids, previews, token swatches, docs navigation, search)
  - `ui/components/segment/ComponentName/` — larger page sections and layout pieces (app shell, header, sidebar, main, footer, hero sections)
- Each component folder contains the `.tsx` and matching `.scss`; add an `index.ts` only when it improves imports.
- Framework: **Next.js App Router** with i18n via `next-intl`. All pages under `app/[locale]/` — never `app/[slug]/`.

### Class Naming

Use global `app-` kebab-case classes for reusable UI pieces:

```css
.app-button          .app-button--primary    .app-code-block
.app-component-card  .app-data-table         .app-flavor-card
.app-path-card       .app-section            .app-section-header
.app-stack-badge     .app-tabs               .app-tabs__header
```

Use page/component-scoped BEM only for structure unique to that component:

```css
.HomePage  .HomePage__copyGrid  .AppSidebar__group  .ComponentName--state
```

If two visual blocks share the same surface, border, padding, or behavior, give them a shared `app-` class instead of duplicating page-scoped names.

Do not use anonymous utility class soup. Do not use raw hex values when a token exists.

### Breakpoints

The APP has only two breakpoints. Use the shared SCSS mixins from `app/styles/_media.scss`:

- `@include media.small-only` — base/mobile-first
- `@include media.large` — desktop/documentation layout
- `@include media.reduced-motion`

Never hardcode `@media (min-width: ...)` inside component SCSS. Never introduce medium/tablet/xl breakpoints unless explicitly approved.

On `small`: navigation can become a top nav, drawer, or compact index.  
On `large`: persistent documentation sidebar and main reading area.

### Visual System

Design direction: **editorial block-based documentation** inspired by a warm restaurant demo — not a restaurant, but using the same rhythm, palette, and typography confidence.

| Element    | Rule                                                                    |
| ---------- | ----------------------------------------------------------------------- |
| Background | Warm cream or ivory                                                     |
| Text       | Warm near-black / dark brown                                            |
| Accent     | Vivid orange for primary actions and active states                      |
| Cards      | Rectangular, light surface, visible border, hard offset shadow          |
| Buttons    | Rectangular, strong border, orange fill for primary, hard shadow        |
| Radius     | 0px–8px maximum. Keep it low.                                           |
| Header     | Bordered, editorial, not sticky. Content in `.AppHeader__inner`.        |
| Footer     | Dark brown editorial band                                               |

Dark mode:

- Use a dedicated warm low-light palette, not an inverted/high-contrast copy of light mode.
- Do not use pure white (`#fff` / `#ffffff`) in `.dark` tokens.
- Use espresso/charcoal brown backgrounds, muted parchment/tan text, softened brown/copper borders, and controlled orange/gold accents.
- The body grid color comes from `--app-grid-line`; do not hardcode separate rgba grid colors in `globals.css`.

Typography:

- Display/headings: `Playfair Display SC` via `--app-font-display`
- Body/UI: `Karla, sans-serif` via `--app-font-body`
- Code/technical labels: monospace
- Font sizes: use tokens from `app/styles/tokens.css` (`--app-font-size-xs` through `--app-font-size-6xl`). Do not hardcode `1.05rem`, `0.78rem`, or raw `clamp()` when a token exists.
- Do not add per-component font smoothing; it comes from `app/styles/globals.css`.

Motion: 150–300ms transitions for hover, focus, active, drawer, and section reveals. Disable decorative motion under `prefers-reduced-motion`. Prefer CSS transitions/keyframes over JS animation libraries.

### Information Architecture

Primary shell — three segment components assembled by the layout route:

- `AppHeader` — top brand/navigation area, full width, bottom border only, not sticky
- `AppSidebar` — documentation and component navigation, stretches full height on `large`
- `AppMain` — main content wrapper, reading width, spacing, and page content slot

Layout rule: the route/layout file composes the three components; it does not contain their markup inline.

Sidebar structure:

- One parent item `Introduction` → animated subitems: `Installation`, `Usage`, `Theming / Tokens`, `Next.js`, `Next.js Tailwind`, `Drupal`
- One parent item `components-library` → animated subitems per component
- Subitems are indented, connected by a line, animated in with `prefers-reduced-motion` support

### Component Detail Pages

- Framework: Next.js App Router with i18n via `next-intl`
- Component demos: rendered inside `<ShowcaseFrame>` (gray border, dot-grid background)
- Theme toggle: system default + manual toggle stored in `localStorage`
- Implementation outputs as three tabs: `React + CSS`, `React + Tailwind`, and `Drupal`
- Tabs composed from `Tabs`, `TabsItems`, `TabItem`, `TabsContent`, `TabPanel` in `ui/components/basics/Tabs/`. Do not animate tab panel content on tab changes.
- `SectionHeader` renders a non-semantic `div.app-section-header` + `h2` — never `<header>`
- Section headers use `useTranslations('component')` — never hardcode English strings
- Drupal snippets use `{{ include('THEME-NAME:[component-name]', { ... }, false) }}` — never `{% embed %}` or `{% include ... with ... %}`

### Preferred APP Components

```text
AppHeader     AppSidebar    AppFooter     AppMain       HomeHero
AppButton     Tabs          TabsItems     TabItem       TabsContent
TabPanel      SectionHeader ComponentCard CodeBlock     DataTable
TokenSwatch   StackBadge    Callout       FlavorCard    PathCard
SearchBox
```

### Anti-Patterns

Never produce in the APP:

- Generic SaaS blue/purple landing page
- Restaurant copy, food metaphors, menu metaphors
- Tailwind classes in APP components
- shadcn-style generic rounded card grids
- Glassmorphism, gradient orbs, decorative blobs, bokeh backgrounds
- Overly rounded dashboard UI
- Monolithic APP pages without component extraction
- Hidden keyboard focus or hover-only interactions
- Unscoped global CSS hacks
- New breakpoints beyond `small` and `large`

---

## Internacionalización (i18n) — MANDATORY

The app is bilingual (**English** and **Spanish**) using **next-intl**. Every user-visible string must come from the message files — never hardcode text in components.

### Locales

| Locale | Base path | Message file       |
| ------ | --------- | ------------------ |
| `en`   | `/en/*`   | `messages/en.json` |
| `es`   | `/es/*`   | `messages/es.json` |

Default locale is `en`. `proxy.ts` detects the browser language and redirects `/` automatically.

### Namespaces

| Namespace   | Use                                            |
| ----------- | ---------------------------------------------- |
| `nav`       | Sidebar and header labels                      |
| `home`      | All content on the introduction page           |
| `component` | Section headers on component pages             |

### What gets translated / what doesn't

| Translate ✅                              | Don't translate ❌                        |
| ----------------------------------------- | ----------------------------------------- |
| Navigation and section labels             | Component names (`Divider`, `Button`)     |
| Explanatory text on the homepage          | Prop names and CSS variable names         |
| Table headers (Props, Type, Description)  | Code snippets                             |
| Section headers (Examples, Code)          | File names                                |

### Adding a new string

1. Add the key in `messages/en.json` under the correct namespace.
2. Add the translation in `messages/es.json` with the same key.
3. Use `t('key')` in the component.

### Adding a new locale

1. Add the locale to the array in `i18n/routing.ts`.
2. Create `messages/[locale].json` with all keys.
3. The proxy and language switcher detect it automatically.

---

## Development Workflow — MANDATORY

**NEVER create component files directly in the main conversation.**
Writing to `components-library/` or `app/[locale]/[slug]/` without going through the agents below is a violation of this workflow. A `PreToolUse` hook enforces this and will prompt for confirmation on any write to `components-library/`.

Always follow this sequence:

1. Agree on component name and props with the user
2. Spawn the **Next.js agent** and **Drupal agent** in parallel →
   - Next.js agent: creates `.tsx`, `.tailwind.tsx`, `meta.ts`, `README.md`, `app/[locale]/[slug]/page.tsx`, and adds the entry to `lib/components-registry.ts`
   - Drupal agent: creates `drupal/` files (`.component.yml`, `.twig`, `.scss`) from the React spec

The two agents are independent and can run simultaneously.

---

## Conventions

- No comments unless the "why" is non-obvious
- No default exports — named exports only
- Props interfaces named `[ComponentName]Props`
- CSS class prefix: `pu-` (primus-ui) for all SCSS/CSS versions
- SCSS variable names: `--pu-[component]-[property]`
- Drupal namespace placeholder: `THEME-NAME:[component-name]` in docblocks and code snippets
- Versions follow semver — minor bump for new props, patch for style fixes
