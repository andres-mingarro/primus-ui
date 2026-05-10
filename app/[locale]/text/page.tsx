import { useTranslations } from 'next-intl'
import { Text } from '@primus/Text/Text.tailwind'
import { ShowcaseFrame } from '@/ui/ShowcaseFrame'
import { CodeTabs } from '@/ui/CodeTabs'
import { ComponentMeta } from '@primus/Text/meta'

const TAILWIND_CODE = `
import { Text } from './Text.tailwind'

// Default — renders a <span>
<Text>Hello world</Text>

// Paragraph
<Text tag="p" addClassName="text-base leading-relaxed">
  A full paragraph of text.
</Text>

// text prop — shorthand for string-only content
<Text tag="label" text="Email address" />
<Text tag="p" size="sm" text="Helper text below the field" />

// Size prop
<Text size="sm">Small (14px)</Text>
<Text size="md">Medium (16px)</Text>
<Text size="lg">Large (18px)</Text>
<Text size="xl">Extra large (20px)</Text>

// mobileSize — xl on desktop, sm on mobile
<Text size="xl" mobileSize="sm">Responsive text</Text>

// Weight prop
<Text weight="light">Light (300)</Text>
<Text weight="regular">Regular (400)</Text>
<Text weight="medium">Medium (500)</Text>
<Text weight="bold">Bold (700)</Text>
`

const SCSS_CODE = `
// 1. Copy Text.tsx + text.scss into your project
// 2. Import text.scss once in your app entry

import { Text } from './Text'

<Text>Hello world</Text>
<Text tag="p">A paragraph</Text>

// text prop — shorthand for string-only content
<Text tag="label" text="Email address" />
<Text tag="p" size="sm" text="Helper text below the field" />

// Size prop
<Text size="sm">Small (14px)</Text>
<Text size="md">Medium (16px)</Text>
<Text size="lg">Large (18px)</Text>
<Text size="xl">Extra large (20px)</Text>

// mobileSize — xl on desktop, sm on mobile
<Text size="xl" mobileSize="sm">Responsive text</Text>

// Weight prop
<Text weight="light">Light (300)</Text>
<Text weight="regular">Regular (400)</Text>
<Text weight="medium">Medium (500)</Text>
<Text weight="bold">Bold (700)</Text>

// Override tokens in your CSS:
// .my-section {
//   --pu-text-font-size:   1.125rem;
//   --pu-text-color:       #1d4ed8;
//   --pu-text-font-weight: 600;
// }
`

const DRUPAL_CODE = `
{# Copy drupal/ folder to [your-theme]/components/text/ then clear cache #}

{% include 'THEME-NAME:text' with {
  content: 'Hello world',
} %}

{% include 'THEME-NAME:text' with {
  as: 'p',
  content: 'A paragraph of text.',
} %}

{% include 'THEME-NAME:text' with {
  as: 'label',
  content: 'Form label',
} %}
`

export default function TextPage() {
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
        <ShowcaseFrame label="span (default)">
          <Text>Hello world — rendered as a span</Text>
        </ShowcaseFrame>
        <ShowcaseFrame label="p">
          <Text tag="p" addClassName="text-base leading-relaxed">
            A full paragraph of text rendered as a &lt;p&gt; element.
          </Text>
        </ShowcaseFrame>
        <ShowcaseFrame label="label">
          <Text tag="label" addClassName="text-sm font-medium">
            Form label rendered as a &lt;label&gt; element
          </Text>
        </ShowcaseFrame>
        <ShowcaseFrame label="div">
          <Text tag="div" addClassName="text-xl font-bold">
            Section heading rendered as a &lt;div&gt;
          </Text>
        </ShowcaseFrame>
        <ShowcaseFrame label="text prop — string shorthand">
          <div className="flex flex-col gap-2">
            <Text tag="label" text="Email address" addClassName="text-sm font-medium" />
            <Text tag="p" size="sm" text="Helper text below the field" />
          </div>
        </ShowcaseFrame>
        <ShowcaseFrame label="size — all 4 values">
          <div className="flex flex-col gap-2">
            <Text size="sm">sm — 14px</Text>
            <Text size="md">md — 16px</Text>
            <Text size="lg">lg — 18px</Text>
            <Text size="xl">xl — 20px</Text>
          </div>
        </ShowcaseFrame>
        <ShowcaseFrame label="mobileSize — xl on desktop, sm on mobile (resize to see)">
          <Text size="xl" mobileSize="sm">Responsive: xl above 768px, sm below</Text>
        </ShowcaseFrame>
        <ShowcaseFrame label="weight — all 4 values">
          <div className="flex flex-col gap-2">
            <Text weight="light">light — 300</Text>
            <Text weight="regular">regular — 400</Text>
            <Text weight="medium">medium — 500</Text>
            <Text weight="bold">bold — 700</Text>
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
