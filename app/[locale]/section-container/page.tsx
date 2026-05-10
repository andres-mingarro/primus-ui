import { useTranslations } from 'next-intl'
import { SectionContainer } from '@primus/SectionContainer/SectionContainer.tailwind'
import { ShowcaseFrame } from '@/ui/ShowcaseFrame'
import { CodeTabs } from '@/ui/CodeTabs'
import { ComponentMeta } from '@primus/SectionContainer/meta'

const TAILWIND_CODE = `
import { SectionContainer } from './SectionContainer.tailwind'

// Large container (default), with gap
<SectionContainer>
  <p>Full-width content constrained to 1280px</p>
</SectionContainer>

// Small container
<SectionContainer container="small">
  <p>Article-width content constrained to 768px</p>
</SectionContainer>

// Full width, no gap
<SectionContainer container="full" gap={false}>
  <p>Edge-to-edge, no horizontal padding</p>
</SectionContainer>

// Large gap on mobile
<SectionContainer mobileGap="large">
  <p>More breathing room on small screens</p>
</SectionContainer>

// Rendered as <main>
<SectionContainer tag="main">
  <p>Semantic main landmark</p>
</SectionContainer>
`

const SCSS_CODE = `
// 1. Copy SectionContainer.tsx + section-container.scss into your project
// 2. Import section-container.scss once in your app entry

import { SectionContainer } from './SectionContainer'

<SectionContainer container="large" gap mobileGap="small">
  <p>Content here</p>
</SectionContainer>

<SectionContainer container="small" gap={false}>
  <p>No horizontal padding</p>
</SectionContainer>

// Override tokens in your CSS:
// :root {
//   --pu-sc-width-large: 1440px;
//   --pu-sc-gap: 2rem;
// }
`

const DRUPAL_CODE = `
{# Replace THEME-NAME with your Drupal theme or module machine name #}
{# Copy drupal/ folder to [your-theme]/components/section-container/ then clear cache #}

{% embed 'THEME-NAME:section-container' %}
  {% block content %}
    <p>Content here</p>
  {% endblock %}
{% endembed %}

{% embed 'THEME-NAME:section-container' with {
  container: 'small',
  gap: false,
  mobile_gap: 'large',
  tag: 'main',
} %}
  {% block content %}
    <p>Custom configuration</p>
  {% endblock %}
{% endembed %}
`

function DemoContent({ label, wide = false }: { label: string; wide?: boolean }) {
  return (
    <div className={`rounded border border-brand-200 bg-brand-50 p-4 dark:border-brand-800 dark:bg-brand-900 ${wide ? 'w-full' : ''}`}>
      <p className="text-sm font-medium text-brand-700 dark:text-brand-200">{label}</p>
      <p className="mt-1 text-xs text-brand-500 dark:text-brand-500">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </p>
    </div>
  )
}

export default function SectionContainerPage() {
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

        <ShowcaseFrame label="container=large (default, 1280px max-width)">
          <div className="w-full">
            <SectionContainer container="large">
              <DemoContent label="Large container — constrained to 1280px, gap on" wide />
            </SectionContainer>
          </div>
        </ShowcaseFrame>

        <ShowcaseFrame label="container=small (768px max-width)">
          <div className="w-full">
            <SectionContainer container="small">
              <DemoContent label="Small container — constrained to 768px, ideal for article text" wide />
            </SectionContainer>
          </div>
        </ShowcaseFrame>

        <ShowcaseFrame label="container=full (no max-width)">
          <div className="w-full">
            <SectionContainer container="full">
              <DemoContent label="Full container — no max-width, spans the entire parent width" wide />
            </SectionContainer>
          </div>
        </ShowcaseFrame>

        <ShowcaseFrame label="gap=false (no horizontal padding)">
          <div className="w-full">
            <SectionContainer container="large" gap={false}>
              <DemoContent label="No gap — inner element has no horizontal padding, content touches the container edge" wide />
            </SectionContainer>
          </div>
        </ShowcaseFrame>

        <ShowcaseFrame label="mobileGap=large (more padding on mobile)">
          <div className="w-full">
            <SectionContainer container="large" mobileGap="large">
              <DemoContent label="mobileGap=large — increases horizontal padding to 1.5rem at ≤ 768px" wide />
            </SectionContainer>
          </div>
        </ShowcaseFrame>

        <ShowcaseFrame label="mobileGap=none (no padding on mobile)">
          <div className="w-full">
            <SectionContainer container="large" mobileGap="none">
              <DemoContent label="mobileGap=none — removes horizontal padding entirely on small screens" wide />
            </SectionContainer>
          </div>
        </ShowcaseFrame>

        <ShowcaseFrame label="tag=main (semantic landmark)">
          <div className="w-full">
            <SectionContainer tag="main" container="small">
              <DemoContent label="Rendered as <main> — correct landmark for the primary page content" wide />
            </SectionContainer>
          </div>
        </ShowcaseFrame>

        <ShowcaseFrame label="Nested containers (inner margin collapses)">
          <div className="w-full">
            <SectionContainer container="full" gap={false}>
              <DemoContent label="Outer: full, no gap" wide />
              <SectionContainer container="small">
                <DemoContent label="Inner: small — margin-bottom collapses to 0 when nested" wide />
              </SectionContainer>
            </SectionContainer>
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
