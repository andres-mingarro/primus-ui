export const ComponentMeta = {
  name: 'Text',
  slug: 'text',
  version: '1.3.0',
  description: 'A polymorphic text element that renders a configurable HTML tag with overridable typography tokens.',
  props: [
    { name: 'tag', type: "'span' | 'label' | 'p' | 'div'", required: false, default: 'span', description: 'HTML tag to render' },
    { name: 'children', type: 'ReactNode', required: false, default: undefined, description: 'Content to render inside the element. Takes priority over text.' },
    { name: 'text', type: 'string', required: false, default: undefined, description: 'Plain text content. Alternative to children for simple strings.' },
    { name: 'addClassName', type: 'string', required: false, default: undefined, description: 'Extra classes appended to the root element' },
    { name: 'size', type: "'sm' | 'md' | 'lg' | 'xl'", required: false, default: undefined, description: 'Font size applied at all breakpoints' },
    { name: 'mobileSize', type: "'sm' | 'md' | 'lg' | 'xl'", required: false, default: undefined, description: 'Font size applied at ≤768px (overrides size on mobile)' },
    { name: 'weight', type: "'light' | 'regular' | 'medium' | 'bold'", required: false, default: undefined, description: 'Font weight applied to the element' },
  ],
  cssVars: [
    { name: '--pu-text-font-family', default: 'inherit', description: 'Font family' },
    { name: '--pu-text-font-size',   default: 'inherit', description: 'Font size' },
    { name: '--pu-text-color',       default: 'inherit', description: 'Text color' },
    { name: '--pu-text-line-height', default: 'inherit', description: 'Line height' },
    { name: '--pu-text-font-weight', default: 'inherit', description: 'Font weight' },
  ],
}
