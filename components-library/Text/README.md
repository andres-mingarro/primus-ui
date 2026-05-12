# Text

Version 1.3.0. A polymorphic text element that renders a configurable HTML tag (`span`, `label`, `p`, `div`) with overridable typography tokens.

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `tag` | `'span' \| 'label' \| 'p' \| 'div'` | `'span'` | HTML tag to render |
| `children` | `ReactNode` | — | Content to render inside the element. Takes priority over `text`. |
| `text` | `string` | — | Plain text content. Alternative to `children` for simple strings. |
| `addClassName` | `string` | — | Extra classes appended to the root element |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl'` | — | Font size applied at all breakpoints |
| `mobileSize` | `'sm' \| 'md' \| 'lg' \| 'xl'` | — | Font size applied at ≤768px (overrides `size` on mobile) |
| `weight` | `'light' \| 'regular' \| 'medium' \| 'bold'` | — | Font weight applied to the element |

To add a new size: add `&--size-{name}` and `&--mobile-{name}` in `text.scss`, then extend the `TextSize` union type.

To add a new weight: add `&--weight-{name}` in `text.scss`, then extend the `TextWeight` union type.

## CSS Variables (SCSS version)

| Variable | Default | Description |
|---|---|---|
| `--pu-text-font-family` | `inherit` | Font family |
| `--pu-text-font-size` | `inherit` | Font size |
| `--pu-text-color` | `inherit` | Text color |
| `--pu-text-line-height` | `inherit` | Line height |
| `--pu-text-font-weight` | `inherit` | Font weight |

All tokens default to `inherit`, so the component is transparent to its context by default. Override only what you need.

## Usage

### Tailwind

```tsx
import { Text } from './Text.tailwind'

<Text>Default span</Text>
<Text tag="p" addClassName="text-lg font-medium">A paragraph</Text>
<Text tag="label" addClassName="text-sm text-gray-600">A label</Text>
<Text tag="div" addClassName="text-xl font-bold">A div</Text>

{/* text prop — shorthand for string-only content */}
<Text tag="label" text="Email address" />
<Text tag="p" size="sm" text="Helper text below the field" />
```

### SCSS/CSS

```tsx
import { Text } from './Text'
// import './text.scss' in your app entry

<Text>Default span</Text>
<Text tag="p">A paragraph</Text>
<Text tag="label">A label</Text>
<Text tag="div">A div</Text>

{/* text prop — shorthand for string-only content */}
<Text tag="label" text="Email address" />
<Text tag="p" size="sm" text="Helper text below the field" />
```

Override tokens in your CSS:

```css
.my-section {
  --pu-text-font-size:   1.125rem;
  --pu-text-color:       #1d4ed8;
  --pu-text-font-weight: 600;
}
```

### Drupal

Copy the `drupal/` folder into `[your-theme]/components/text/` and clear cache.

```twig
{{ include('primus-ui:text', {
  tag: 'span',
  text: 'Default span'
}, false) }}

{{ include('primus-ui:text', {
  tag: 'p',
  text: 'A paragraph',
  size: 'lg',
  weight: 'medium'
}, false) }}

{{ include('primus-ui:text', {
  tag: 'label',
  text: 'Email address',
  size: 'sm',
  weight: 'medium'
}, false) }}

{{ include('primus-ui:text', {
  tag: 'div',
  items: 'Text with <strong>emphasis</strong> and a <a href="/path">link</a>.'
}, false) }}

{{ include('primus-ui:text', {
  tag: 'p',
  text: node.field_subtitle.value,
  translate_enabled: false
}, false) }}
```
