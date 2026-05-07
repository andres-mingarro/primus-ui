# Primus UI — Component Library

A copy-paste component library for **Next.js** and **Drupal SDC** (Single Directory Components). Each component ships in two flavors: Tailwind CSS and SCSS/CSS. Components are designed to be simple, concrete, and obvious.

## Repository Structure

Next.js runs from the repo root so that `components/` is within the project boundary (Turbopack requirement).

```text
primus-ui/
├── app/                        # Next.js App Router pages
│   ├── layout.tsx
│   ├── page.tsx                # Component gallery
│   ├── globals.css
│   └── [component]/
│       └── page.tsx            # Per-component docs page
├── ui/                         # Landing-only UI (not library)
│   ├── layout/Header.tsx
│   ├── ShowcaseFrame.tsx
│   ├── ThemeToggle.tsx
│   └── CodeTabs.tsx
├── lib/utils.ts                # cn() helper
├── providers/ThemeProvider.tsx
├── public/
├── components/                 # The actual library (copy-paste)
│   └── [ComponentName]/
│       ├── [ComponentName].tailwind.tsx   # Tailwind version
│       ├── [ComponentName].css.tsx        # SCSS/CSS version
│       ├── [component-name].scss          # SCSS with CSS vars
│       ├── meta.ts                        # Props, CSS vars, version
│       ├── README.md                      # Per-component docs
│       └── drupal/
│           ├── [component-name].component.yml
│           ├── [component-name].twig
│           └── [component-name].scss
├── next.config.ts
├── package.json
└── tsconfig.json               # @/* = ./, @primus/* = ./components/*
```

## Agents

| Agent      | File                          | Trigger                                                 |
| ---------- | ----------------------------- | ------------------------------------------------------- |
| Next.js    | `.claude/agents/nextjs.md`    | React components, landing page, Tailwind                |
| Drupal SDC | `.claude/agents/drupal.md`    | Drupal SDC files (.twig, .component.yml, .scss)         |

Use `claude --agent nextjs` or `claude --agent drupal` to enter the specialized context.

## Component Standards — Rules

### 1. Full independence

Each component is a self-contained unit. No component may import from another component, no shared SCSS partials, no shared utility classes between components. A user must be able to copy a single component folder and have it work with zero other dependencies from this repo.

### 2. Files per component

```text
components/
  [ComponentName]/
    [ComponentName].tailwind.tsx   # React — Tailwind classes only, no SCSS
    [ComponentName].css.tsx        # React — only uses pu- classes from the SCSS file
    [component-name].scss          # SCSS — all styles, CSS vars with defaults
    meta.ts                        # Props, CSS vars, version, description
    README.md                      # Per-component documentation
    drupal/
      [component-name].component.yml
      [component-name].twig
      [component-name].scss
```

### 3. SCSS with overridable CSS variables

Every SCSS file must define CSS variables **with default values scoped to the component root class**. Users override them at any scope without touching the source file.

```scss
// button.scss
.pu-button {
  // --- Overridable tokens ---
  --pu-button-bg:        #2563eb;
  --pu-button-bg-hover:  #1d4ed8;
  --pu-button-color:     #ffffff;
  --pu-button-radius:    0.375rem;
  --pu-button-padding:   0.5rem 1rem;
  --pu-button-font-size: 0.875rem;

  // --- Implementation ---
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--pu-button-padding);
  border-radius: var(--pu-button-radius);
  background-color: var(--pu-button-bg);
  color: var(--pu-button-color);
  font-size: var(--pu-button-font-size);
  cursor: pointer;
  border: none;
  transition: background-color 150ms ease;

  &:hover {
    background-color: var(--pu-button-bg-hover);
  }
}
```

User override — no source edit needed:

```css
:root       { --pu-button-bg: #7c3aed; --pu-button-bg-hover: #6d28d9; }
.my-section { --pu-button-radius: 9999px; }
```

### 4. Tailwind version is a completely separate file

`[ComponentName].tailwind.tsx` must **not** import the SCSS file. It is 100% self-contained with Tailwind utility classes. No `@apply`, no CSS variable references.

### 5. README per component

Every component folder must have a `README.md` with:

- Component name, version, brief description
- **Props table** — name | type | default | description
- **CSS variables table** — variable | default | description (SCSS version)
- Usage snippet for each version: Tailwind, SCSS/CSS, Drupal
- Any known limitations or browser notes

### Component meta shape

```ts
export const ComponentMeta = {
  name: 'Button',
  version: '1.0.0',
  description: 'A basic button with variants.',
  props: [
    { name: 'label',   type: 'string',  required: true,  description: 'Button text' },
    { name: 'variant', type: 'string',  required: false, default: 'primary', description: 'primary | secondary | ghost' },
    { name: 'disabled', type: 'boolean', required: false, default: false, description: '' },
  ],
  cssVars: [
    { name: '--pu-button-bg',     default: '#2563eb',   description: 'Background color' },
    { name: '--pu-button-color',  default: '#ffffff',   description: 'Text color' },
    { name: '--pu-button-radius', default: '0.375rem',  description: 'Border radius' },
  ],
}
```

## Landing Page Conventions

- Framework: **Next.js App Router**
- Styling: **Tailwind CSS** — modern, clean, dark/light mode via `dark:` classes
- Component demos: rendered inside a **wireframe-style frame** (gray border, dot-grid background)
- Theme toggle: system default + manual toggle stored in `localStorage`
- Each component page: props table + CSS vars table + code tabs (Tailwind / SCSS / Drupal)

## Development Workflow

1. Agree on component name and props
2. Next.js agent → creates React versions + landing page entry
3. Drupal agent → creates SDC version from the React spec
4. Both agents update `meta.ts` and the landing route

## Conventions

- No comments unless the "why" is non-obvious
- No default exports — named exports only
- Props interfaces named `[ComponentName]Props`
- CSS class prefix: `pu-` (primus-ui) for all SCSS/CSS versions
- SCSS variable names: `--pu-[component]-[property]`
- Drupal machine names: lowercase, hyphenated (`primus-ui:[component-name]`)
- Versions follow semver — minor bump for new props, patch for style fixes
