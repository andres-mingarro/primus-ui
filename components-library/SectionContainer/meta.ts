export const ComponentMeta = {
  name: 'SectionContainer',
  slug: 'section-container',
  version: '1.0.0',
  description: 'A section wrapper with configurable max-width and horizontal padding. Nesting is safe — the inner margin collapses automatically.',
  props: [
    { name: 'children',    type: 'ReactNode',                       required: true,  default: undefined, description: 'Content to wrap' },
    { name: 'container',   type: "'small' | 'large' | 'full'",      required: false, default: 'large',   description: 'Max-width preset: small (768px), large (1280px), or full (no limit)' },
    { name: 'gap',         type: 'boolean',                         required: false, default: true,       description: 'Apply horizontal padding to the inner element' },
    { name: 'mobileGap',   type: "'small' | 'large' | 'none'",      required: false, default: 'small',   description: 'Horizontal padding at ≤ 768px: small keeps default, large increases it, none removes it' },
    { name: 'tag',         type: "'section' | 'div' | 'article' | 'main'", required: false, default: 'section', description: 'HTML element rendered as the outer wrapper' },
    { name: 'addClassName', type: 'string',                         required: false, default: undefined, description: 'Extra classes appended to the root element' },
  ],
  cssVars: [
    { name: '--pu-sc-width-large',      default: '1280px',  description: 'Max-width for the large container variant' },
    { name: '--pu-sc-width-small',      default: '768px',   description: 'Max-width for the small container variant' },
    { name: '--pu-sc-gap',              default: '1rem',    description: 'Horizontal padding applied by the inner element when gap is on' },
    { name: '--pu-sc-gap-mobile',       default: '1rem',    description: 'Horizontal padding on mobile when mobileGap is small (default)' },
    { name: '--pu-sc-gap-mobile-large', default: '1.5rem',  description: 'Horizontal padding on mobile when mobileGap is large' },
    { name: '--pu-sc-margin-bottom',    default: '2rem',    description: 'Bottom margin of each container (collapses to 0 when nested)' },
  ],
}
