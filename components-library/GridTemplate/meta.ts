export const ComponentMeta = {
  name: 'GridTemplate',
  slug: 'grid-template',
  version: '1.0.0',
  description: 'A responsive CSS grid wrapper with configurable column counts per breakpoint.',
  props: [
    { name: 'children',      type: 'ReactNode', required: true,  default: undefined,  description: 'Grid items' },
    { name: 'addClassName',  type: 'string',    required: false, default: undefined,  description: 'Extra classes appended to the root element' },
    { name: 'cols',          type: 'number',    required: false, default: 3,          description: 'Column count at large screens (≥ 769px)' },
    { name: 'colsMedium',    type: 'number',    required: false, default: 2,          description: 'Column count at medium screens (481px–768px)' },
    { name: 'colsSmall',     type: 'number',    required: false, default: 1,          description: 'Column count at small screens (≤ 480px)' },
    { name: 'gap',           type: 'boolean',   required: false, default: true,       description: 'Enable gap between cells' },
  ],
  cssVars: [
    { name: '--pu-grid-template-cols',    default: '3',      description: 'Fallback column count for large screens (overridden by the cols prop)' },
    { name: '--pu-grid-template-cols-md', default: '2',      description: 'Fallback column count for medium screens' },
    { name: '--pu-grid-template-cols-sm', default: '1',      description: 'Fallback column count for small screens' },
    { name: '--pu-grid-template-gap',     default: '1.5rem', description: 'Gap between grid cells when gap is enabled' },
  ],
}
