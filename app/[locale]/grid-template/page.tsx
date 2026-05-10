import { useTranslations } from 'next-intl'
import { GridTemplate } from '@primus/GridTemplate/GridTemplate.tailwind'
import { ShowcaseFrame } from '@/ui/ShowcaseFrame'
import { CodeTabs } from '@/ui/CodeTabs'
import { ComponentMeta } from '@primus/GridTemplate/meta'
import { ComponentPageHeader, SectionLabel, PropsTable, CssVarsTable } from '@/ui/ComponentPage'

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
{# Replace THEME-NAME with your Drupal theme or module machine name #}
{# Copy drupal/ folder to [your-theme]/components/grid-template/ then clear cache #}

{% embed 'THEME-NAME:grid-template' with { cols: 3, cols_medium: 2, cols_small: 1 } %}
  {% block items %}
    <div>Item 1</div>
    <div>Item 2</div>
    <div>Item 3</div>
  {% endblock %}
{% endembed %}

{# No gap #}
{% embed 'THEME-NAME:grid-template' with { gap: false } %}
  {% block items %}<div>A</div><div>B</div>{% endblock %}
{% endembed %}
`

function DemoCard({ label }: { label: string }) {
  return (
    <div
      className="flex h-16 items-center justify-center rounded-sm font-mono text-[13px]"
      style={{
        border: '1px solid var(--color-border)',
        backgroundColor: 'var(--color-card)',
        color: 'var(--color-muted-foreground)',
      }}
    >
      {label}
    </div>
  )
}

export default function GridTemplatePage() {
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
        <SectionLabel label={t('props')} />
        <PropsTable rows={ComponentMeta.props.map((p) => ({
          name: p.name,
          type: p.type,
          default: String(p.default ?? '—'),
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

