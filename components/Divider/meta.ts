export const ComponentMeta = {
  name: 'Divider',
  slug: 'divider',
  version: '1.0.0',
  description: 'A horizontal or vertical line for separating content sections.',
  props: [
    { name: 'orientation', type: "'horizontal' | 'vertical'", required: false, default: 'horizontal', description: 'Line direction' },
    { name: 'assistiveHidden', type: 'boolean', required: false, default: false, description: 'Set aria-hidden — use for decorative dividers that do not mark a topic shift' },
  ],
  cssVars: [
    { name: '--pu-divider-color',     default: '#e5e7eb', description: 'Line color' },
    { name: '--pu-divider-thickness', default: '1px',     description: 'Line width/height' },
    { name: '--pu-divider-length',    default: '100%',    description: 'Line length (width for horizontal, height for vertical)' },
  ],
}
