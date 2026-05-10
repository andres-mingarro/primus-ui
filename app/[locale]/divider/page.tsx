import { useTranslations } from 'next-intl'
import { Divider } from '@primus/Divider/Divider.tailwind'
import { ShowcaseFrame } from '@/ui/ShowcaseFrame'
import { CodeTabs } from '@/ui/CodeTabs'
import { ComponentMeta } from '@primus/Divider/meta'
import { ComponentPageHeader, SectionLabel, PropsTable, CssVarsTable } from '@/ui/ComponentPage'

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
{# Replace THEME-NAME with your Drupal theme or module machine name #}
{# Copy drupal/ folder to [your-theme]/components/divider/ then clear cache #}

{% include 'THEME-NAME:divider' %}

{% include 'THEME-NAME:divider' with {
  orientation: 'vertical',
} %}

{% include 'THEME-NAME:divider' with {
  assistive_hidden: true,
} %}
`

export default function DividerPage() {
  const t = useTranslations('component')

  return (
    <div className="space-y-12">

      <ComponentPageHeader
        label="Component"
        name={ComponentMeta.name}
        version={ComponentMeta.version}
        description={ComponentMeta.description}
      />

      <section className="space-y-4">
        <SectionLabel label={t('examples')} />
        <ShowcaseFrame label="Horizontal">
          <div className="w-full max-w-sm"><Divider /></div>
        </ShowcaseFrame>
        <ShowcaseFrame label="Vertical">
          <div className="flex h-16 items-center gap-4">
            <span className="text-sm" style={{ color: 'var(--color-muted-foreground)' }}>Left</span>
            <Divider orientation="vertical" />
            <span className="text-sm" style={{ color: 'var(--color-muted-foreground)' }}>Right</span>
          </div>
        </ShowcaseFrame>
        <ShowcaseFrame label="Decorative (assistiveHidden)">
          <div className="w-full max-w-sm space-y-3">
            <p className="text-sm" style={{ color: 'var(--color-muted-foreground)' }}>Item A</p>
            <Divider assistiveHidden />
            <p className="text-sm" style={{ color: 'var(--color-muted-foreground)' }}>Item B</p>
          </div>
        </ShowcaseFrame>
      </section>

      <section className="space-y-4">
        <SectionLabel label={t('props')} />
        <PropsTable rows={ComponentMeta.props.map((p) => ({
          name: p.name,
          type: p.type,
          default: String(p.default),
          description: p.description,
        }))} headers={[t('prop'), t('type'), t('default'), t('description')]} />
      </section>

      <section className="space-y-4">
        <SectionLabel label={t('cssVars')} />
        <CssVarsTable rows={ComponentMeta.cssVars} headers={[t('variable'), t('default'), t('description')]} />
      </section>

      <section className="space-y-4">
        <SectionLabel label={t('code')} />
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

