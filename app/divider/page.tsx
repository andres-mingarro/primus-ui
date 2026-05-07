import { Divider } from '@primus/Divider/Divider.tailwind'
import { ShowcaseFrame } from '@/ui/ShowcaseFrame'
import { CodeTabs } from '@/ui/CodeTabs'
import { ComponentMeta } from '@primus/Divider/meta'

const TAILWIND_CODE = `
import { Divider } from './Divider.tailwind'

// Horizontal (default)
<Divider />

// Vertical
<Divider orientation="vertical" />

// Decorative — hidden from screen readers
<Divider assistiveHidden />
`

const SCSS_CODE = `
// 1. Copy Divider.css.tsx + divider.scss into your project
// 2. Import divider.scss once in your app entry

import { Divider } from './Divider.css'

<Divider />
<Divider orientation="vertical" />

// Override tokens in your CSS:
// .my-section {
//   --pu-divider-color: #6366f1;
//   --pu-divider-thickness: 2px;
// }
`

const DRUPAL_CODE = `
{# Copy drupal/ folder to [your-theme]/components/divider/ then clear cache #}

{% include 'primus-ui:divider' %}

{% include 'primus-ui:divider' with {
  orientation: 'vertical',
} %}

{% include 'primus-ui:divider' with {
  assistive_hidden: true,
} %}
`

export default function DividerPage() {
  return (
    <div className="space-y-12">

      {/* Header */}
      <div className="space-y-2 border-b border-neutral-200 pb-8 dark:border-neutral-800">
        <div className="flex items-baseline gap-3">
          <h1 className="text-2xl font-semibold tracking-tight">{ComponentMeta.name}</h1>
          <span className="text-sm text-neutral-400">v{ComponentMeta.version}</span>
        </div>
        <p className="text-neutral-500 dark:text-neutral-400">{ComponentMeta.description}</p>
      </div>

      {/* Demos */}
      <section className="space-y-4">
        <h2 className="text-sm font-semibold tracking-widest text-neutral-400 uppercase dark:text-neutral-500">
          Examples
        </h2>

        <ShowcaseFrame label="Horizontal">
          <div className="w-full max-w-sm">
            <Divider />
          </div>
        </ShowcaseFrame>

        <ShowcaseFrame label="Vertical">
          <div className="flex h-16 items-center gap-4">
            <span className="text-sm text-neutral-400">Left</span>
            <Divider orientation="vertical" />
            <span className="text-sm text-neutral-400">Right</span>
          </div>
        </ShowcaseFrame>

        <ShowcaseFrame label="Decorative (assistiveHidden)">
          <div className="w-full max-w-sm space-y-3">
            <p className="text-sm text-neutral-500">Item A</p>
            <Divider assistiveHidden />
            <p className="text-sm text-neutral-500">Item B</p>
          </div>
        </ShowcaseFrame>
      </section>

      {/* Props */}
      <section className="space-y-4">
        <h2 className="text-sm font-semibold tracking-widest text-neutral-400 uppercase dark:text-neutral-500">
          Props
        </h2>
        <div className="overflow-hidden rounded-lg border border-neutral-200 dark:border-neutral-700">
          <table className="w-full text-sm">
            <thead className="bg-neutral-50 dark:bg-neutral-900">
              <tr>
                {['Prop', 'Type', 'Default', 'Description'].map((h) => (
                  <th key={h} className="px-4 py-3 text-left font-medium text-neutral-500 dark:text-neutral-400">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
              {ComponentMeta.props.map((p) => (
                <tr key={p.name}>
                  <td className="px-4 py-3 font-mono text-neutral-900 dark:text-neutral-100">{p.name}</td>
                  <td className="px-4 py-3 font-mono text-blue-600 dark:text-blue-400">{p.type}</td>
                  <td className="px-4 py-3 font-mono text-neutral-500">{String(p.default)}</td>
                  <td className="px-4 py-3 text-neutral-500 dark:text-neutral-400">{p.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* CSS Variables */}
      <section className="space-y-4">
        <h2 className="text-sm font-semibold tracking-widest text-neutral-400 uppercase dark:text-neutral-500">
          CSS Variables (SCSS version)
        </h2>
        <div className="overflow-hidden rounded-lg border border-neutral-200 dark:border-neutral-700">
          <table className="w-full text-sm">
            <thead className="bg-neutral-50 dark:bg-neutral-900">
              <tr>
                {['Variable', 'Default', 'Description'].map((h) => (
                  <th key={h} className="px-4 py-3 text-left font-medium text-neutral-500 dark:text-neutral-400">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
              {ComponentMeta.cssVars.map((v) => (
                <tr key={v.name}>
                  <td className="px-4 py-3 font-mono text-neutral-900 dark:text-neutral-100">{v.name}</td>
                  <td className="px-4 py-3 font-mono text-neutral-500">{v.default}</td>
                  <td className="px-4 py-3 text-neutral-500 dark:text-neutral-400">{v.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Code */}
      <section className="space-y-4">
        <h2 className="text-sm font-semibold tracking-widest text-neutral-400 uppercase dark:text-neutral-500">
          Code
        </h2>
        <CodeTabs
          tabs={[
            { label: 'Tailwind', code: TAILWIND_CODE },
            { label: 'SCSS / CSS', code: SCSS_CODE },
            { label: 'Drupal Twig', code: DRUPAL_CODE },
          ]}
        />
      </section>

    </div>
  )
}
