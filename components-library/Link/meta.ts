export const ComponentMeta = {
  name: 'Link',
  slug: 'link',
  version: '1.0.0',
  description: 'Accessible link with optional new tab behavior and supplemental screen reader text.',
  props: [
    { name: 'href',              type: 'string',    required: true,  default: undefined, description: 'URL of the link' },
    { name: 'children',         type: 'ReactNode', required: false, default: undefined, description: 'Link content. Takes priority over text prop.' },
    { name: 'text',             type: 'string',    required: false, default: undefined, description: 'Plain text alternative to children' },
    { name: 'addClassName',     type: 'string',    required: false, default: undefined, description: 'Extra classes appended to the root element' },
    { name: 'assistiveHidden',  type: 'boolean',   required: false, default: false,     description: 'Adds aria-hidden="true" and tabindex="-1" to hide from the accessibility tree' },
    { name: 'openInNewTab',     type: 'boolean',   required: false, default: false,     description: 'Adds target="_blank" and rel="noreferrer"' },
    { name: 'supplementalText', type: 'string',    required: false, default: undefined, description: 'Visually hidden text for screen readers. Defaults to "Opens in new tab" when openInNewTab is true.' },
  ],
  cssVars: [
    { name: '--pu-link-color',                 default: '#2563eb',                              description: 'Default link color' },
    { name: '--pu-link-color-hover',           default: '#1d4ed8',                              description: 'Link color on hover and focus-visible' },
    { name: '--pu-link-color-visited',         default: '#7c3aed',                              description: 'Link color in visited state' },
    { name: '--pu-link-color-active',          default: '#1e40af',                              description: 'Link color in active state' },
    { name: '--pu-link-text-decoration',       default: 'none',                                 description: 'Text decoration in default state' },
    { name: '--pu-link-text-decoration-hover', default: 'underline',                            description: 'Text decoration on hover and focus-visible' },
    { name: '--pu-link-transition',            default: 'color 150ms ease, text-decoration-color 150ms ease', description: 'CSS transition applied to the link' },
  ],
}
