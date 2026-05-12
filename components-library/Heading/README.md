# Heading

Version 1.0.0. A polymorphic heading element (h1–h6) with weight variants and optional HTML rendering. Renders the correct semantic HTML tag based on the `variant` prop.

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `'h1' \| 'h2' \| 'h3' \| 'h4' \| 'h5' \| 'h6'` | — (required) | HTML heading tag to render |
| `children` | `ReactNode` | `undefined` | Content to render inside the heading |
| `weight` | `'normal' \| 'thin' \| 'bold'` | `'normal'` | Font weight of the heading |
| `html` | `boolean` | `false` | When true, renders children as HTML via `dangerouslySetInnerHTML`, stripping `<p>` tags first |
| `addClassName` | `string` | `undefined` | Extra classes appended to the root element |

## CSS Variables (SCSS version)

| Variable | Default | Description |
|---|---|---|
| `--pu-heading-color` | `inherit` | Text color |
| `--pu-heading-font-family` | `inherit` | Font family |
| `--pu-heading-line-height` | `inherit` | Line height |
| `--pu-heading-weight-normal` | `400` | Font weight for the normal variant |
| `--pu-heading-weight-thin` | `300` | Font weight for the thin variant |
| `--pu-heading-weight-bold` | `700` | Font weight for the bold variant |
| `--pu-heading-h1-size` | `2.25rem` | Font size for h1 |
| `--pu-heading-h2-size` | `1.875rem` | Font size for h2 |
| `--pu-heading-h3-size` | `1.5rem` | Font size for h3 |
| `--pu-heading-h4-size` | `1.25rem` | Font size for h4 |
| `--pu-heading-h5-size` | `1.125rem` | Font size for h5 |
| `--pu-heading-h6-size` | `1rem` | Font size for h6 |

## Usage

### Tailwind

```tsx
import { Heading } from './Heading.tailwind'

<Heading variant="h1">Page Title</Heading>
<Heading variant="h2" weight="thin">Section Title</Heading>
<Heading variant="h3" weight="bold">Card Heading</Heading>

// HTML content — strips <p> tags before rendering
<Heading variant="h2" html>{'<p>Rich text <strong>heading</strong></p>'}</Heading>
```

### SCSS/CSS

```tsx
// Copy Heading.tsx + heading.scss into your project
// Import heading.scss once in your app entry

import { Heading } from './Heading'

<Heading variant="h1">Page Title</Heading>
<Heading variant="h2" weight="thin">Section Title</Heading>
<Heading variant="h3" weight="bold">Card Heading</Heading>

// Override tokens in your CSS:
// .my-section {
//   --pu-heading-color: #1d4ed8;
//   --pu-heading-h2-size: 2rem;
// }
```

### Drupal

Copy the `drupal/` folder into `[your-theme]/components/heading/` and clear cache.

```twig
{{ include('primus-ui:heading', {
  variant: 'h1',
  text: 'Page Title'
}, false) }}

{{ include('primus-ui:heading', {
  variant: 'h2',
  weight: 'thin',
  text: 'Section Title'
}, false) }}

{{ include('primus-ui:heading', {
  variant: 'h3',
  weight: 'bold',
  content: 'Card <strong>Heading</strong>'
}, false) }}

{{ include('primus-ui:heading', {
  variant: 'h1',
  text: node.title.value,
  translate_enabled: false
}, false) }}
```

## Notes

- `html` only strips `<p>` and `</p>` tags — other tags pass through as-is. Sanitize untrusted input before passing it to this prop.
- When `html` is true and `children` is not a string, the prop is ignored and children render normally.
