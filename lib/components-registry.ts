export interface ComponentEntry {
  name: string
  slug: string
  description: string
  tags: string[]
  version: string
}

export const components: ComponentEntry[] = [
  {
    name: 'Divider',
    slug: 'divider',
    description: 'A horizontal or vertical line for separating content sections.',
    tags: ['React', 'Drupal', 'Tailwind', 'SCSS'],
    version: '1.0.0',
  },
  {
    name: 'GridTemplate',
    slug: 'grid-template',
    description: 'A responsive CSS grid wrapper with configurable column counts per breakpoint.',
    tags: ['React', 'Drupal', 'Tailwind', 'SCSS'],
    version: '1.0.0',
  },
  {
    name: 'Text',
    slug: 'text',
    description: 'A polymorphic text element that renders a configurable HTML tag with overridable typography tokens.',
    tags: ['React', 'Drupal', 'Tailwind', 'SCSS'],
    version: '1.0.0',
  },
  {
    name: 'Heading',
    slug: 'heading',
    description: 'A polymorphic heading element (h1–h6) with weight variants and optional HTML rendering.',
    tags: ['React', 'Drupal', 'Tailwind', 'SCSS'],
    version: '1.0.0',
  },
  {
    name: 'SectionContainer',
    slug: 'section-container',
    description: 'A section wrapper with configurable max-width and horizontal padding. Safe to nest — inner margin collapses automatically.',
    tags: ['React', 'Drupal', 'Tailwind', 'SCSS'],
    version: '1.0.0',
  },
  {
    name: 'Card',
    slug: 'card',
    description: 'Content card with style variants (light, dark, high-contrast), layout directions, image, and action buttons.',
    tags: ['React', 'Drupal', 'Tailwind', 'SCSS'],
    version: '1.0.0',
  },
]
