# Badge

Version 1.0.0. Status badge with color variants and optional icon slots. Non-interactive inline element rendered as `<span>`.

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `label` | `string` | — | Visible text content of the badge |
| `status` | `'brand' \| 'danger' \| 'important' \| 'informative' \| 'severe' \| 'success' \| 'warning'` | `'informative'` | Color status variant |
| `appearance` | `'filled' \| 'ghost' \| 'outline' \| 'tint'` | `'filled'` | Visual fill style |
| `iconLeft` | `ReactNode` | — | Optional icon rendered before the label |
| `iconRight` | `ReactNode` | — | Optional icon rendered after the label |
| `addClassName` | `string` | — | Extra classes appended to the root element |

## CSS Variables (SCSS version)

| Variable | Default | Description |
|---|---|---|
| `--pu-badge-radius` | `100px` | Border radius (pill shape) |
| `--pu-badge-border-width` | `1.5px` | Border width |
| `--pu-badge-padding` | `0.125rem 0.625rem` | Padding |
| `--pu-badge-font-size` | `0.75rem` | Font size |
| `--pu-badge-font-weight` | `700` | Font weight |
| `--pu-badge-gap` | `0.25rem` | Gap between icon and label |
| `--pu-badge-brand-base` | `#2563eb` | Brand status base color |
| `--pu-badge-brand-tint` | `#eff6ff` | Brand status tint background |
| `--pu-badge-danger-base` | `#dc2626` | Danger status base color |
| `--pu-badge-danger-tint` | `#fef2f2` | Danger status tint background |
| `--pu-badge-important-base` | `#7c3aed` | Important status base color |
| `--pu-badge-important-tint` | `#f5f3ff` | Important status tint background |
| `--pu-badge-informative-base` | `#0891b2` | Informative status base color |
| `--pu-badge-informative-tint` | `#ecfeff` | Informative status tint background |
| `--pu-badge-severe-base` | `#ea580c` | Severe status base color |
| `--pu-badge-severe-tint` | `#fff7ed` | Severe status tint background |
| `--pu-badge-success-base` | `#16a34a` | Success status base color |
| `--pu-badge-success-tint` | `#f0fdf4` | Success status tint background |
| `--pu-badge-warning-base` | `#ca8a04` | Warning status base color |
| `--pu-badge-warning-tint` | `#fefce8` | Warning status tint background |

## Usage

### Tailwind

```tsx
import { Badge } from './Badge.tailwind'

<Badge label="Success" status="success" appearance="filled" />
<Badge label="Warning" status="warning" appearance="tint" />
<Badge label="Error" status="danger" appearance="outline" />
```

### SCSS/CSS

```tsx
import { Badge } from './Badge'
// import './badge.scss' in your app entry
```

```tsx
<Badge label="Success" status="success" appearance="filled" />
<Badge label="Warning" status="warning" appearance="tint" />
<Badge label="Error" status="danger" appearance="outline" />
```

Override a token at any scope:

```css
.my-context .pu-badge {
  --pu-badge-success-base: #059669;
}
```

### Drupal

See `drupal/` folder or the Drupal SDC documentation.

Use `{{ include('THEME-NAME:badge', { label: 'Success', status: 'success', appearance: 'filled' }, false) }}`.
