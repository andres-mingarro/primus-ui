# Card

Version 1.0.0. Content card with style variants (light, dark, high-contrast), layout directions (vertical, horizontal, horizontal-reverse), optional image, and action buttons.

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `title` | `string` | — | Card heading text |
| `url` | `string` | — | Makes the title a link when provided |
| `style` | `'light' \| 'high-contrast' \| 'dark'` | `'light'` | Visual style variant |
| `direction` | `'vertical' \| 'horizontal' \| 'horizontal-reverse'` | `'vertical'` | Layout direction |
| `image` | `{ src: string; alt: string }` | — | Image displayed in the card header |
| `buttonPrimary` | `string` | — | Primary action button label |
| `buttonPrimaryUrl` | `string` | — | Primary button href |
| `buttonSecondary` | `string` | — | Secondary action button label |
| `buttonSecondaryUrl` | `string` | — | Secondary button href |
| `children` | `ReactNode` | — | Body slot — main card content |
| `addClassName` | `string` | — | Extra classes appended to the root element |

## CSS Variables (SCSS version)

| Variable | Default | Description |
|---|---|---|
| `--pu-card-bg` | `#ffffff` | Card background color |
| `--pu-card-color` | `#111827` | Card text color |
| `--pu-card-border-radius` | `0.5rem` | Card corner radius |
| `--pu-card-border` | `1px solid #e5e7eb` | Card border |
| `--pu-card-padding` | `1.25rem` | Content area padding |
| `--pu-card-gap` | `0.75rem` | Gap between content elements |
| `--pu-card-image-height` | `12rem` | Image height in vertical layout |
| `--pu-card-horizontal-image-width` | `12rem` | Image width in horizontal layouts |
| `--pu-card-title-size` | `1.125rem` | Title font size |
| `--pu-card-title-weight` | `600` | Title font weight |
| `--pu-card-title-color` | `inherit` | Title text color |
| `--pu-card-body-size` | `0.875rem` | Body text font size |
| `--pu-card-body-color` | `#4b5563` | Body text color |
| `--pu-card-btn-radius` | `0.375rem` | Button corner radius |
| `--pu-card-btn-padding` | `0.5rem 1rem` | Button padding |
| `--pu-card-btn-font-size` | `0.875rem` | Button font size |
| `--pu-card-btn-primary-bg` | `#2563eb` | Primary button background |
| `--pu-card-btn-primary-color` | `#ffffff` | Primary button text color |
| `--pu-card-btn-primary-bg-hover` | `#1d4ed8` | Primary button hover background |
| `--pu-card-btn-secondary-bg` | `transparent` | Secondary button background |
| `--pu-card-btn-secondary-color` | `#2563eb` | Secondary button text and border color |
| `--pu-card-btn-secondary-border` | `#2563eb` | Secondary button border color |

## Usage

### Tailwind

```tsx
import { Card } from './Card.tailwind'

// Basic card
<Card title="Card Title">
  Body content goes here.
</Card>

// Style variants
<Card title="Light Card" style="light">Content</Card>
<Card title="Dark Card" style="dark">Content</Card>
<Card title="High Contrast" style="high-contrast">Content</Card>

// Horizontal layout
<Card title="Horizontal Card" direction="horizontal" image={{ src: '/img.jpg', alt: 'Description' }}>
  Content
</Card>

// With buttons
<Card
  title="Card with Actions"
  buttonPrimary="Read more"
  buttonPrimaryUrl="/article"
  buttonSecondary="Save"
>
  Card body text.
</Card>

// Linked title + addClassName
<Card title="Linked Card" url="/destination" addClassName="max-w-sm">
  Body content.
</Card>
```

### SCSS/CSS

```tsx
// 1. Copy Card.tsx + card.scss into your project
// 2. Import card.scss once in your app entry

import { Card } from './Card'

<Card title="Card Title">Body content.</Card>

<Card title="Dark Card" style="dark">
  Content with dark background.
</Card>

<Card
  title="Horizontal"
  direction="horizontal"
  image={{ src: '/img.jpg', alt: 'Alt text' }}
  buttonPrimary="Learn more"
  buttonPrimaryUrl="/page"
>
  Horizontal layout with image and button.
</Card>

// Override tokens in your CSS:
// .my-section .pu-card {
//   --pu-card-border-radius: 1rem;
//   --pu-card-btn-primary-bg: #7c3aed;
//   --pu-card-btn-primary-bg-hover: #6d28d9;
// }
```

### Drupal

```twig
{# Copy drupal/ folder to [your-theme]/components/card/ then clear cache #}

{{ include('THEME-NAME:card', {
  title: 'Card Title',
  body: 'Body content goes here.',
}, false) }}

{{ include('THEME-NAME:card', {
  title: 'Dark card',
  style: 'dark',
  body: 'Content with dark background.',
}, false) }}

{{ include('THEME-NAME:card', {
  title: node.title.value,
  url: node.path,
  style: 'light',
  direction: 'horizontal',
  image_src: node.field_image.entity.uri.value|image_style('card_thumb'),
  image_alt: node.field_image.alt,
  button_primary: 'Read more',
  button_primary_url: node.path,
  body: content.body,
  translate_enabled: false,
}, false) }}
```
