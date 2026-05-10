import { useTranslations } from 'next-intl'
import { GridTemplate } from '@primus/GridTemplate/GridTemplate.tailwind'
import { ShowcaseFrame } from '@/ui/ShowcaseFrame'
import { CodeTabs } from '@/ui/CodeTabs'
import { ComponentMeta } from '@primus/GridTemplate/meta'

const TAILWIND_CODE = `
import { GridTemplate } from './GridTemplate.tailwind'

// 3 → 2 → 1 columns (default)
<GridTemplate>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</GridTemplate>

// Custom breakpoint columns
<GridTemplate cols={4} colsMedium={2} colsSmall={1}>
  <div>A</div>
  <div>B</div>
  <div>C</div>
  <div>D</div>
</GridTemplate>

// No gap
<GridTemplate gap={false}>
  <div>A</div>
  <div>B</div>
</GridTemplate>
`

const SCSS_CODE = `
// 1. Copy GridTemplate.tsx + grid-template.scss into your project
// 2. Import grid-template.scss once in your app entry

import { GridTemplate } from './GridTemplate'

<GridTemplate cols={3} colsMedium={2} colsSmall={1}>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</GridTemplate>

// Override gap token in your CSS:
// .my-grid { --pu-grid-template-gap: 2rem; }
`

const DRUPAL_CODE = `
{# Copy drupal/ folder to [your-theme]/components/grid-template/ then clear cache #}

{% embed 'primus-ui:grid-template' with { cols: 3, cols_medium: 2, cols_small: 1 } %}
  {% block items %}
    <div>Item 1</div>
    <div>Item 2</div>
    <div>Item 3</div>
  {% endblock %}
{% endembed %}

{# No gap #}
{% embed 'primus-ui:grid-template' with { gap: false } %}
  {% block items %}<div>A</div><div>B</div>{% endblock %}
{% endembed %}
`

function DemoCard({ label }: { label: string }) {
  return (
    <div className="flex h-16 items-center justify-center rounded border border-brand-200 bg-brand-50 text-sm font-medium text-brand-700 dark:border-brand-800 dark:bg-brand-900 dark:text-brand-200">
      {label}
    </div>
  )
}

export default function GridTemplatePage() {
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
        <ShowcaseFrame label="3 → 2 → 1 columns (default)">
          <div className="w-full">
            <GridTemplate>
              {['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6'].map((l) => (
                <DemoCard key={l} label={l} />
              ))}
            </GridTemplate>
          </div>
        </ShowcaseFrame>
        <ShowcaseFrame label="4 → 2 → 1 columns">
          <div className="w-full">
            <GridTemplate cols={4} colsMedium={2} colsSmall={1}>
              {['A', 'B', 'C', 'D'].map((l) => (
                <DemoCard key={l} label={l} />
              ))}
            </GridTemplate>
          </div>
        </ShowcaseFrame>
        <ShowcaseFrame label="No gap">
          <div className="w-full">
            <GridTemplate cols={3} colsMedium={2} colsSmall={1} gap={false}>
              {['X', 'Y', 'Z'].map((l) => (
                <DemoCard key={l} label={l} />
              ))}
            </GridTemplate>
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
                  <td className="px-4 py-3 font-mono text-brand-700 dark:text-brand-500">{String(p.default ?? '—')}</td>
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
