# Link

Version 1.0.0. Accessible link with optional new tab behavior and supplemental screen reader text.

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `href` | `string` | required | URL of the link |
| `children` | `ReactNode` | `undefined` | Link content. Takes priority over `text` prop. |
| `text` | `string` | `undefined` | Plain text alternative to `children` |
| `addClassName` | `string` | `undefined` | Extra classes appended to the root element |
| `assistiveHidden` | `boolean` | `false` | Adds `aria-hidden="true"` and `tabindex="-1"` to hide from the accessibility tree |
| `openInNewTab` | `boolean` | `false` | Adds `target="_blank"` and `rel="noreferrer"` |
| `supplementalText` | `string` | `undefined` | Visually hidden text for screen readers. Defaults to `"Opens in new tab"` when `openInNewTab` is `true`. |

## CSS Variables (SCSS version)

| Variable | Default | Description |
|---|---|---|
| `--pu-link-color` | `#2563eb` | Default link color |
| `--pu-link-color-hover` | `#1d4ed8` | Link color on hover and focus-visible |
| `--pu-link-color-visited` | `#7c3aed` | Link color in visited state |
| `--pu-link-color-active` | `#1e40af` | Link color in active state |
| `--pu-link-text-decoration` | `none` | Text decoration in default state |
| `--pu-link-text-decoration-hover` | `underline` | Text decoration on hover and focus-visible |
| `--pu-link-transition` | `color 150ms ease, text-decoration-color 150ms ease` | CSS transition applied to the link |

## Usage

### Tailwind

```tsx
import { Link } from './Link.tailwind'

<Link href="/about" text="About us" />
<Link href="https://example.com" openInNewTab text="External link" />
<Link href="/contact">Contact <span>us</span></Link>
<Link href="#" assistiveHidden text="Hidden from a11y tree" />
<Link href="#" supplementalText="(external resource)">Link with supplemental text</Link>
```

### SCSS/CSS

```tsx
import { Link } from './Link'
// import './link.scss' in your app entry

<Link href="/about" text="About us" />
<Link href="https://example.com" openInNewTab text="External link" />
<Link href="/contact">Contact <span>us</span></Link>
<Link href="#" assistiveHidden text="Hidden from a11y tree" />
<Link href="#" supplementalText="(external resource)">Link with supplemental text</Link>
```

### Drupal

```twig
{{ include('THEME-NAME:link', {
  href: '/about',
  text: 'About us'
}, false) }}

{{ include('THEME-NAME:link', {
  href: 'https://example.com',
  open_in_new_tab: true,
  text: 'External link'
}, false) }}
```
