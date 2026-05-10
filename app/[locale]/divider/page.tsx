import { useTranslations } from 'next-intl'
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
// 1. Copy Divider.tsx + divider.scss into your project
// 2. Import divider.scss once in your app entry

import { Divider } from './Divider'

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
  const t = useTranslations('component')

  return (
    <div className="space-y-12">

      <div className="space-y-2 border-b border-brand-100 pb-8 dark:border-brand-900">
        <div className="flex items-baseline gap-3">
          <h1 className="text-2xl font-semibold tracking-tight">{ComponentMeta.name}</h1>
          <span className="text-sm text-brand-700 dark:text-brand-500">v{ComponentMeta.version}</span>
        </div>
        <p className="text-brand-700 dark:text-brand-200">{ComponentMeta.description}</p>
      </div>

      <section className="space-y-4">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-brand-700 dark:text-brand-500">
          {t('examples')}
        </h2>
        <ShowcaseFrame label="Horizontal">
          <div className="w-full max-w-sm"><Divider /></div>
        </ShowcaseFrame>
        <ShowcaseFrame label="Vertical">
          <div className="flex h-16 items-center gap-4">
            <span className="text-sm text-brand-700 dark:text-brand-200">Left</span>
            <Divider orientation="vertical" />
            <span className="text-sm text-brand-700 dark:text-brand-200">Right</span>
          </div>
        </ShowcaseFrame>
        <ShowcaseFrame label="Decorative (assistiveHidden)">
          <div className="w-full max-w-sm space-y-3">
            <p className="text-sm text-brand-700 dark:text-brand-200">Item A</p>
            <Divider assistiveHidden />
            <p className="text-sm text-brand-700 dark:text-brand-200">Item B</p>
          </div>
        </ShowcaseFrame>
      </section>

      <section className="space-y-4">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-brand-700 dark:text-brand-500">
          {t('props')}
        </h2>
        <div className="overflow-hidden rounded-lg border border-brand-100 dark:border-brand-900">
          <table className="w-full text-sm">
            <thead className="bg-brand-50 dark:bg-brand-950">
              <tr>
                {[t('prop'), t('type'), t('default'), t('description')].map((h) => (
                  <th key={h} scope="col" className="px-4 py-3 text-left font-medium text-brand-700 dark:text-brand-200">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-50 dark:divide-brand-900">
              {ComponentMeta.props.map((p) => (
                <tr key={p.name}>
                  <td className="px-4 py-3 font-mono text-brand-900 dark:text-brand-50">{p.name}</td>
                  <td className="px-4 py-3 font-mono text-brand-700 dark:text-brand-500">{p.type}</td>
                  <td className="px-4 py-3 font-mono text-brand-700 dark:text-brand-500">{String(p.default)}</td>
                  <td className="px-4 py-3 text-brand-700 dark:text-brand-200">{p.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-brand-700 dark:text-brand-500">
          {t('cssVars')}
        </h2>
        <div className="overflow-hidden rounded-lg border border-brand-100 dark:border-brand-900">
          <table className="w-full text-sm">
            <thead className="bg-brand-50 dark:bg-brand-950">
              <tr>
                {[t('variable'), t('default'), t('description')].map((h) => (
                  <th key={h} scope="col" className="px-4 py-3 text-left font-medium text-brand-700 dark:text-brand-200">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-50 dark:divide-brand-900">
              {ComponentMeta.cssVars.map((v) => (
                <tr key={v.name}>
                  <td className="px-4 py-3 font-mono text-brand-900 dark:text-brand-50">{v.name}</td>
                  <td className="px-4 py-3 font-mono text-brand-700 dark:text-brand-500">{v.default}</td>
                  <td className="px-4 py-3 text-brand-700 dark:text-brand-200">{v.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-brand-700 dark:text-brand-500">
          {t('code')}
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
