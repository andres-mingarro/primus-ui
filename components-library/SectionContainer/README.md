# SectionContainer

Version 1.0.0. A section wrapper with configurable max-width and horizontal padding. Nesting is safe — a `SectionContainer` placed inside another resets its bottom margin to zero automatically.

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | `ReactNode` | — | Content to wrap |
| `container` | `'small' \| 'large' \| 'full'` | `'large'` | Max-width preset: small (768px), large (1280px), or full (no limit) |
| `gap` | `boolean` | `true` | Apply horizontal padding to the inner element |
| `mobileGap` | `'small' \| 'large' \| 'none'` | `'small'` | Horizontal padding at ≤ 768px |
| `tag` | `'section' \| 'div' \| 'article' \| 'main'` | `'section'` | HTML element rendered as the outer wrapper |
| `addClassName` | `string` | — | Extra classes appended to the root element |

## CSS Variables (SCSS version)

| Variable | Default | Description |
|---|---|---|
| `--pu-sc-width-large` | `1280px` | Max-width for the large variant |
| `--pu-sc-width-small` | `768px` | Max-width for the small variant |
| `--pu-sc-gap` | `1rem` | Horizontal padding when gap is on |
| `--pu-sc-gap-mobile` | `1rem` | Horizontal padding on mobile (mobileGap: small) |
| `--pu-sc-gap-mobile-large` | `1.5rem` | Horizontal padding on mobile (mobileGap: large) |
| `--pu-sc-margin-bottom` | `2rem` | Bottom margin (collapses to 0 when nested) |

## Usage

### Tailwind

```tsx
import { SectionContainer } from './SectionContainer.tailwind'

<SectionContainer container="large" gap mobileGap="small">
  <p>Content here</p>
</SectionContainer>
```

### SCSS/CSS

```tsx
// 1. Copy SectionContainer.tsx + section-container.scss into your project
// 2. Import section-container.scss once in your app entry

import { SectionContainer } from './SectionContainer'

<SectionContainer container="small" gap={false}>
  <p>Content here</p>
</SectionContainer>

// Override tokens in your CSS:
// :root { --pu-sc-width-large: 1440px; }
// .my-section { --pu-sc-gap: 2rem; }
```

### Drupal

See `drupal/` folder for the SDC version (`.component.yml`, `.twig`, `.scss`).
