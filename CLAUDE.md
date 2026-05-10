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

| Agent      | File                          | Trigger                                                 |
| ---------- | ----------------------------- | ------------------------------------------------------- |
| Next.js    | `.claude/agents/nextjs.md`    | React components, landing page, Tailwind                |
| Drupal SDC | `.claude/agents/drupal.md`    | Drupal SDC files (.twig, .component.yml, .scss)         |

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

Rules: short English title per case, code snippet, no prose explanations, no props tables. Include `embed` cases when the component has slots. Show Drupal field connection examples when relevant.

---

## Landing Page Conventions

- Framework: **Next.js App Router** with i18n via `next-intl`
- All pages live under `app/[locale]/` — never create pages at `app/[slug]/`
- Styling: **Tailwind CSS** — dark/light mode via `dark:` classes
- Component demos: rendered inside `<ShowcaseFrame>` (gray border, dot-grid background)
- Theme toggle: system default + manual toggle stored in `localStorage`
- Each component page: props table + CSS vars table + code tabs (Tailwind / SCSS / Drupal)
- Section headers use `useTranslations('component')` — never hardcode English strings

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
