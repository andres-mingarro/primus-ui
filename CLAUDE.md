# Primus UI — Component Library

A copy-paste component library for **Next.js** and **Drupal SDC** (Single Directory Components). Each component ships in two flavors: Tailwind CSS and SCSS/CSS. Components are designed to be simple, concrete, and obvious.

## Repository Structure

Next.js runs from the repo root so that `components-library/` is within the project boundary (Turbopack requirement).

```text
primus-ui/
├── app/                        # Next.js App Router pages
│   ├── styles/
│   │   ├── globals.css         # Tailwind import, dark variant, utility classes
│   │   └── tokens.css          # CSS variables (--brand) + @theme for Tailwind
│   ├── layout.tsx
│   ├── page.tsx                # Component gallery
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
├── components-library/         # The actual library (copy-paste)
│   └── [ComponentName]/
│       ├── [ComponentName].tailwind.tsx   # Tailwind version
│       ├── [ComponentName].tsx            # SCSS/CSS version (default)
│       ├── [component-name].scss          # SCSS with CSS vars
│       ├── meta.ts                        # Props, CSS vars, version
│       ├── README.md                      # Per-component docs
│       └── drupal/
│           ├── [component-name].component.yml
│           ├── [component-name].twig
│           └── [component-name].scss
├── next.config.ts
├── package.json
└── tsconfig.json               # @/* = ./, @primus/* = ./components-library/*
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

### 4. Accessibility — mandatory, non-negotiable

Every component and every page in this repo must meet WCAG 2.1 AA. These rules apply equally to `components-library/` and `app/`.

#### Focus indicators

- Every interactive element must have a visible `:focus-visible` style. Never use `outline: none` without a replacement.
- The global focus style is defined in `app/styles/globals.css`. Components that need custom focus (e.g., inside a dark code block) must add their own `focus-visible:` Tailwind variant.

#### Color contrast

- Normal text (< 18px regular or < 14px bold): minimum 4.5:1 contrast ratio against its background.
- Large text (≥ 18px regular or ≥ 14px bold): minimum 3:1.
- `text-brand-500` on `bg-white` or `bg-surface` fails AA. Use `text-brand-700` for secondary/muted text in light mode.
- Decorative elements (borders, dividers, icons that are redundant with text) are exempt.

#### Semantic HTML

- Use the correct element for the job: `<button>` for actions, `<a>` for navigation, `<nav>`, `<main>`, `<header>`, `<section>`, `<article>`, landmark elements.
- Never use `<div>` or `<span>` for interactive elements.
- Heading hierarchy must be sequential — no jumping from `<h1>` to `<h3>`.
- Tables must have `<th scope="col">` (or `scope="row"`) on all header cells.

#### ARIA

- Add `aria-label` or `aria-labelledby` to any interactive element whose purpose is not clear from its visible text (icon-only buttons, toggle buttons, compound widgets).
- Tab widgets (`role="tablist"`, `role="tab"`, `role="tabpanel"`) must implement the full ARIA Authoring Practices pattern including arrow-key navigation and `aria-selected`.
- Use `aria-hidden="true"` only on truly decorative elements. Never suppress content that carries meaning.

#### Images and icons

- Meaningful images: `alt` text that describes the content or function.
- Decorative images and icons that duplicate adjacent text: `alt=""` or `aria-hidden="true"`.

#### Touch targets

- All interactive elements must be at least 44×44px. Use padding to expand touch area without affecting visual size if needed.

#### Drupal SDC

- Same rules apply to Twig templates. Use `{{ attributes }}` to pass through ARIA attributes. Never hard-code `aria-*` in Twig unless the value is always static.

### 5. Tailwind version is a completely separate file

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

## Internacionalización (i18n) — MANDATORY

La app está traducida al **español** y al **inglés** usando **next-intl**. Toda string visible al usuario debe venir de los archivos de mensajes — nunca hardcodear texto en los componentes.

### Locales

| Locale | Ruta base | Archivo de mensajes |
| ------ | --------- | ------------------- |
| `en`   | `/en/*`   | `messages/en.json`  |
| `es`   | `/es/*`   | `messages/es.json`  |

El locale por defecto es `en`. El proxy (`proxy.ts`) detecta el idioma del browser y redirige `/` automáticamente.

### Estructura de archivos

```text
messages/
  en.json          # strings en inglés
  es.json          # strings en español
i18n/
  routing.ts       # define locales y defaultLocale
  request.ts       # configura next-intl por request
proxy.ts           # detección de locale y redirect (Next.js 16+)
app/
  [locale]/        # TODAS las páginas viven aquí
    layout.tsx     # inyecta NextIntlClientProvider + lang={locale}
    page.tsx
    [component]/
      page.tsx
```

### Cómo usar traducciones

**Server Components y páginas** — `useTranslations` (importar desde `next-intl`):

```tsx
import { useTranslations } from 'next-intl'

export default function MyPage() {
  const t = useTranslations('component')
  return <h2>{t('examples')}</h2>
}
```

**Client Components** — igual, `useTranslations` funciona en ambos contextos gracias al `NextIntlClientProvider` del layout.

### Namespaces en los JSON

| Namespace    | Uso                                              |
| ------------ | ------------------------------------------------ |
| `nav`        | Labels del sidebar y header                      |
| `home`       | Todo el contenido de la página de introducción   |
| `component`  | Headers de sección en páginas de componentes     |

### Qué se traduce y qué no

| Se traduce ✅                                 | No se traduce ❌                              |
| --------------------------------------------- | --------------------------------------------- |
| Labels de navegación y secciones              | Nombres de componentes (`Divider`, `Button`)  |
| Texto explicativo del homepage                | Nombres de props y variables CSS              |
| Headers de tablas (Props, Type, Description)  | Snippets de código                            |
| Headers de sección (Examples, Code)           | Nombres de archivos                           |

### Agregar una nueva string

1. Añadir la key en `messages/en.json` bajo el namespace correspondiente.
2. Añadir la traducción en `messages/es.json` con la misma key.
3. Usar `t('key')` en el componente.

### Agregar un nuevo locale

1. Añadir el locale al array en `i18n/routing.ts`.
2. Crear `messages/[locale].json` con todas las keys.
3. El proxy y el switcher lo detectan automáticamente.

## Development Workflow — MANDATORY

**NEVER create component files directly in the main conversation.**
Writing to `components-library/` or `app/[slug]/` without going through the agents below is a violation of this workflow.

Always follow this sequence:

1. Agree on component name and props with the user
2. Spawn the **Next.js agent** → creates `.tsx`, `.tailwind.tsx`, `meta.ts`, `app/[slug]/page.tsx`, and registers the component in `app/page.tsx`
3. Spawn the **Drupal agent** → creates `drupal/` files (`.component.yml`, `.twig`, `.scss`) from the React spec produced in step 2

Each agent also updates `README.md` and `meta.ts` for its scope.

## Conventions

- No comments unless the "why" is non-obvious
- No default exports — named exports only
- Props interfaces named `[ComponentName]Props`
- CSS class prefix: `pu-` (primus-ui) for all SCSS/CSS versions
- SCSS variable names: `--pu-[component]-[property]`
- Drupal machine names: lowercase, hyphenated (`primus-ui:[component-name]`)
- Versions follow semver — minor bump for new props, patch for style fixes
