# GridTemplate

**Version:** 1.0.0

A responsive CSS grid wrapper with configurable column counts per breakpoint. Pass any content as children; columns collapse automatically at 768px and 480px breakpoints.

## Props

| Prop           | Type        | Default     | Description                                  |
| -------------- | ----------- | ----------- | -------------------------------------------- |
| `children`     | `ReactNode` | —           | Grid items                                   |
| `addClassName` | `string`    | `undefined` | Extra classes appended to the root element   |
| `cols`         | `number`    | `3`         | Column count at large screens (≥ 769px)      |
| `colsMedium`   | `number`    | `2`         | Column count at medium screens (481px–768px) |
| `colsSmall`    | `number`    | `1`         | Column count at small screens (≤ 480px)      |
| `gap`          | `boolean`   | `true`      | Enable gap between cells                     |

## CSS Variables (SCSS version)

| Variable                     | Default  | Description                                      |
| ---------------------------- | -------- | ------------------------------------------------ |
| `--pu-grid-template-cols`    | `3`      | Fallback large column count (overridden by prop) |
| `--pu-grid-template-cols-md` | `2`      | Fallback medium column count                     |
| `--pu-grid-template-cols-sm` | `1`      | Fallback small column count                      |
| `--pu-grid-template-gap`     | `1.5rem` | Gap between cells when `gap` is enabled          |

Override example:

```css
.my-grid {
  --pu-grid-template-gap: 2rem;
}
```

> **Note:** Breakpoint values (768px, 480px) are hardcoded in SCSS because CSS custom properties cannot be used inside `@media` queries.

## Usage

### Tailwind

Copy `GridTemplate.tailwind.tsx` into your project. Requires Tailwind v3.2+ for `max-[*]` and arbitrary property syntax.

```tsx
import { GridTemplate } from './GridTemplate.tailwind'

<GridTemplate cols={3} colsMedium={2} colsSmall={1}>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</GridTemplate>

{/* No gap */}
<GridTemplate gap={false}>
  <div>A</div>
  <div>B</div>
</GridTemplate>
```

### SCSS/CSS

Copy `GridTemplate.tsx` + `grid-template.scss` into your project. Import the SCSS once in your app entry.

```tsx
import { GridTemplate } from './GridTemplate'
// In your app entry: import './grid-template.scss'

<GridTemplate cols={4} colsMedium={2} colsSmall={1}>
  <div>Item 1</div>
  <div>Item 2</div>
</GridTemplate>
```

### Drupal

Copy the `drupal/` folder into `[your-theme]/components/grid-template/` and clear cache.

```twig
{% embed 'primus-ui:grid-template' with { cols: 3, cols_medium: 2, cols_small: 1 } %}
  {% block items %}
    <div>Item 1</div>
    <div>Item 2</div>
    <div>Item 3</div>
  {% endblock %}
{% endembed %}

{# No gap #}
{% embed 'primus-ui:grid-template' with { gap: false } %}
  {% block items %}<div>A</div><div>B</div>{% endblock %}
{% endembed %}
```
