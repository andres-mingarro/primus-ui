# Primus UI

A copy-paste component library for **Next.js** and **Drupal SDC**.  
Every component ships in three independent flavors — pick the one that fits your stack.

---

## Three flavors, one component

| Flavor | File | Use when |
| --- | --- | --- |
| React + SCSS | `ComponentName.tsx` + `component-name.scss` | Next.js without Tailwind |
| React + Tailwind | `ComponentName.tailwind.tsx` | Next.js with Tailwind CSS |
| Drupal SDC | `drupal/` folder | Drupal 10/11 themes |

Copy the folder. Nothing else from this repo is required.

---

## Components

| Component | Description |
| --- | --- |
| **Badge** | Status badge with seven color variants and four appearance modes |
| **Button** | Polymorphic button — renders as `<button>` or `<a>`, with variants, sizes, icon slots, and ripple |
| **Card** | Content card with layout directions, image slot, and action buttons |
| **Divider** | Horizontal or vertical separator line |
| **GridTemplate** | Responsive CSS grid wrapper with configurable columns per breakpoint |
| **Heading** | Polymorphic heading (h1–h6) with weight variants |
| **Link** | Accessible link with optional new-tab behavior and screen reader supplemental text |
| **SectionContainer** | Max-width wrapper with configurable gap and horizontal padding |
| **Text** | Polymorphic text element with overridable typography tokens |

---

## Usage

### React + SCSS

```tsx
import { Button } from './Button'
import './button.scss'

<Button variant="primary" size="md">Get started</Button>
<Button variant="outline" as="a" href="/docs">Read the docs</Button>
```

Override any token without touching source:

```css
.my-section .pu-button {
  --pu-button-bg: #1d4ed8;
  --pu-button-radius: 0;
}
```

### React + Tailwind

```tsx
import { Button } from './Button.tailwind'

<Button variant="secondary" size="sm">Secondary</Button>
```

### Drupal SDC

```twig
{{ include('THEME-NAME:button', {
  label: 'Get started',
  variant: 'primary',
}, false) }}
```

Replace `THEME-NAME` with your Drupal theme or module machine name.

---

## Design principles

- **Copy-paste first.** Each component folder is a drop-in unit. No shared partials, no peer imports.
- **Overridable tokens.** Every SCSS component exposes CSS variables with sane defaults. Override at any scope.
- **Three outputs, one spec.** React SCSS, React Tailwind, and Drupal SDC always share the same props contract.
- **WCAG 2.1 AA.** Focus indicators, contrast ratios, semantic HTML, and 44×44 px touch targets are non-negotiable.

---

## Development

```bash
bun install
bun dev
```

App runs at `http://localhost:3000`.

---

## Repository structure

```text
primus-ui/
├── components-library/     # The library — copy from here
│   └── ComponentName/
│       ├── ComponentName.tsx           # React + SCSS
│       ├── ComponentName.tailwind.tsx  # React + Tailwind
│       ├── component-name.scss
│       ├── meta.ts
│       ├── README.md
│       └── drupal/
│           ├── component-name.component.yml
│           ├── component-name.twig
│           └── component-name.scss
├── app/                    # Next.js documentation app
├── ui/                     # App UI components (not the library)
└── messages/               # i18n strings (EN / ES)
```

---

## License

MIT
