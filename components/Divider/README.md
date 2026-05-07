# Divider

**Version:** 1.0.0

A horizontal or vertical line for separating content sections. Renders as an `<hr>` element. Use `assistiveHidden` for purely decorative dividers that do not mark a paragraph-level topic shift.

## Props

| Prop             | Type                          | Default        | Description                                              |
| ---------------- | ----------------------------- | -------------- | -------------------------------------------------------- |
| `orientation`    | `'horizontal' \| 'vertical'`  | `'horizontal'` | Line direction                                           |
| `assistiveHidden`| `boolean`                     | `false`        | Adds `aria-hidden` — use when the divider is decorative  |

## CSS Variables (SCSS version)

| Variable                   | Default    | Description                                            |
| -------------------------- | ---------- | ------------------------------------------------------ |
| `--pu-divider-color`       | `#e5e7eb`  | Line color                                             |
| `--pu-divider-thickness`   | `1px`      | Line width (horizontal) or height (vertical)           |
| `--pu-divider-length`      | `100%`     | Line length — width for horizontal, height for vertical|

Override example:

```css
.my-section {
  --pu-divider-color: #6366f1;
  --pu-divider-thickness: 2px;
}
```

## Usage

### Tailwind

Copy `Divider.tailwind.tsx` into your project.

```tsx
import { Divider } from './Divider.tailwind'

<Divider />
<Divider orientation="vertical" />
<Divider assistiveHidden />
```

### SCSS/CSS

Copy `Divider.css.tsx` + `divider.scss` into your project. Import the SCSS once in your app entry.

```tsx
import { Divider } from './Divider.css'
// In your app entry: import './divider.scss'

<Divider />
<Divider orientation="vertical" />
```

### Drupal

Copy the `drupal/` folder into `[your-theme]/components/divider/` and clear cache.

```twig
{% include 'primus-ui:divider' %}
{% include 'primus-ui:divider' with { orientation: 'vertical' } %}
{% include 'primus-ui:divider' with { assistive_hidden: true } %}
```
