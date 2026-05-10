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
]
