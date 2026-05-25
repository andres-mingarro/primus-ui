# Button

Version 1.0.0. Polymorphic button component with variant, size, icon slots, and ripple interaction. Renders as `<button>` or `<a>` depending on the `as` prop.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | ReactNode | — | Button content |
| variant | `'primary' \| 'secondary' \| 'ghost' \| 'outline' \| 'link'` | `'primary'` | Visual variant |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | Button size |
| as | `'button' \| 'a'` | `'button'` | Root HTML element |
| href | string | — | URL — used when `as="a"` |
| icon | ReactNode | — | Left icon slot |
| iconRight | ReactNode | — | Right icon slot |
| disabled | boolean | `false` | Disables interaction |
| addClassName | string | — | Extra classes appended to the root element |

Additional HTML attributes for `<button>` or `<a>` are forwarded to the root element.

## CSS Variables (SCSS version)

| Variable | Default | Description |
|----------|---------|-------------|
| `--pu-button-radius` | `0.375rem` | Border radius |
| `--pu-button-font-size` | `0.875rem` | Base font size |
| `--pu-button-font-weight` | `600` | Font weight |
| `--pu-button-height-sm` | `2rem` | Height at size sm |
| `--pu-button-height-md` | `2.75rem` | Height at size md |
| `--pu-button-height-lg` | `3.25rem` | Height at size lg |
| `--pu-button-padding-sm` | `0 0.75rem` | Padding at size sm |
| `--pu-button-padding-md` | `0 1.25rem` | Padding at size md |
| `--pu-button-padding-lg` | `0 1.75rem` | Padding at size lg |
| `--pu-button-gap` | `0.5rem` | Gap between icon and label |
| `--pu-button-bg` | `#ea580c` | Background color (primary) |
| `--pu-button-bg-hover` | `#c2410c` | Hover background color |
| `--pu-button-color` | `#ffffff` | Text color |
| `--pu-button-color-hover` | `#ffffff` | Hover text color |
| `--pu-button-border` | `transparent` | Border color |
| `--pu-button-border-hover` | `transparent` | Hover border color |
| `--pu-button-transition` | `background 150ms ease, ...` | CSS transition shorthand |

Override any variable without editing the component:

```css
.my-section .pu-button {
  --pu-button-radius: 0;
  --pu-button-bg: #1d4ed8;
  --pu-button-bg-hover: #1e40af;
}
```

## Usage

### Tailwind

```tsx
import { Button } from './Button.tailwind'

<Button>Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button size="sm">Small</Button>
<Button as="a" href="/about">Link button</Button>
```

### SCSS/CSS

```tsx
import { Button } from './Button'
// import './button.scss' in your app entry

<Button>Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button size="sm">Small</Button>
<Button as="a" href="/about">Link button</Button>
```

### Drupal

```twig
{{ include('THEME-NAME:button', {
  label: 'Primary button'
}, false) }}

{{ include('THEME-NAME:button', {
  label: 'Secondary',
  variant: 'secondary'
}, false) }}

{{ include('THEME-NAME:button', {
  label: 'Link button',
  href: '/about'
}, false) }}
```

See `drupal/README` or `CLAUDE.md` for Drupal SDC setup instructions.
