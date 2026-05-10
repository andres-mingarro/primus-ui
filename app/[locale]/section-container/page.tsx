import { useTranslations } from 'next-intl'
import { SectionContainer } from '@primus/SectionContainer/SectionContainer.tailwind'
import { ShowcaseFrame } from '@/ui/ShowcaseFrame'
import { CodeTabs } from '@/ui/CodeTabs'
import { ComponentMeta } from '@primus/SectionContainer/meta'
import { ComponentPageHeader, SectionLabel, PropsTable, CssVarsTable } from '@/ui/ComponentPage'

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

function Swatch() {
  return (
    <div
      className="h-8 rounded-sm"
      style={{ backgroundColor: 'var(--color-card)' }}
    />
  )
}

export default function SectionContainerPage() {
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

        <ShowcaseFrame label="container — size comparison (proportional to 1400px reference)">
          <div className="w-full space-y-3 py-1">
            {([
              { value: 'full',  label: 'full',            px: 'no max-width', pct: 100 },
              { value: 'large', label: 'large (default)', px: '1280px',       pct: 91  },
              { value: 'small', label: 'small',           px: '768px',        pct: 55  },
            ] as const).map(({ value, label, px, pct }) => (
              <div key={value} className="flex items-center gap-3">
                <span className="w-28 shrink-0 text-right font-mono text-[11px]" style={{ color: 'var(--color-muted-foreground)' }}>
                  {label}
                </span>
                <div className="relative h-7 flex-1 overflow-hidden rounded-sm" style={{ backgroundColor: 'var(--color-muted)' }}>
                  <div
                    className="absolute inset-y-0 left-0 flex items-center justify-end rounded-sm px-2"
                    style={{ width: `${pct}%`, backgroundColor: 'var(--color-border)' }}
                  >
                    <span className="font-mono text-[11px]" style={{ color: 'var(--color-foreground)' }}>{px}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ShowcaseFrame>

        <ShowcaseFrame label="gap — horizontal padding between container edge and content">
          <div className="grid w-full grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <span className="font-mono text-[11px]" style={{ color: 'var(--color-muted-foreground)' }}>gap=true (default)</span>
              <div className="rounded-sm" style={{ backgroundColor: 'var(--color-muted)' }}>
                <SectionContainer container="full" gap>
                  <Swatch />
                </SectionContainer>
              </div>
              <p className="text-[11px]" style={{ color: 'var(--color-muted-foreground)', opacity: 0.7 }}>Strips = 1rem padding each side</p>
            </div>
            <div className="space-y-1.5">
              <span className="font-mono text-[11px]" style={{ color: 'var(--color-muted-foreground)' }}>gap=false</span>
              <div className="overflow-hidden rounded-sm" style={{ backgroundColor: 'var(--color-muted)' }}>
                <SectionContainer container="full" gap={false}>
                  <Swatch />
                </SectionContainer>
              </div>
              <p className="text-[11px]" style={{ color: 'var(--color-muted-foreground)', opacity: 0.7 }}>Content touches edges — no padding</p>
            </div>
          </div>
        </ShowcaseFrame>

        <ShowcaseFrame label="mobileGap — padding at ≤ 768px viewport (simulated at ~200px)">
          <div className="flex w-full justify-around">
            {([
              { value: 'small', label: 'small (default)', px: 16 },
              { value: 'large', label: 'large',           px: 24 },
              { value: 'none',  label: 'none',            px: 0  },
            ] as const).map(({ value, label, px }) => (
              <div key={value} className="flex flex-col items-center gap-2">
                <span className="font-mono text-[11px]" style={{ color: 'var(--color-muted-foreground)' }}>{value}</span>
                <div className="w-36 overflow-hidden rounded-sm" style={{ backgroundColor: 'var(--color-muted)' }}>
                  <div style={{ padding: `8px ${px}px` }}>
                    <div className="h-10 rounded-sm" style={{ backgroundColor: 'var(--color-card)' }} />
                  </div>
                </div>
                <span className="text-[11px]" style={{ color: 'var(--color-muted-foreground)', opacity: 0.7 }}>{px}px / side</span>
              </div>
            ))}
          </div>
          <p className="mt-3 text-center text-[11px]" style={{ color: 'var(--color-muted-foreground)', opacity: 0.7 }}>
            Mobile gap is a separate axis from <code className="font-mono">gap</code> — both can be set independently.
          </p>
        </ShowcaseFrame>

        <ShowcaseFrame label="tag — semantic HTML element">
          <div className="w-full space-y-2">
            {(['section', 'main', 'article', 'div'] as const).map((tag) => (
              <div key={tag} className="flex items-center gap-3">
                <code
                  className="w-20 shrink-0 rounded-sm px-2 py-1 text-right font-mono text-[11px]"
                  style={{ backgroundColor: 'var(--color-primary-subtle)', color: 'var(--color-primary)' }}
                >
                  &lt;{tag}&gt;
                </code>
                <div
                  className="flex h-7 flex-1 items-center rounded-sm border border-dashed px-3"
                  style={{ borderColor: 'var(--color-border)' }}
                >
                  <span className="text-[11px]" style={{ color: 'var(--color-muted-foreground)' }}>content rendered inside &lt;{tag}&gt;</span>
                </div>
              </div>
            ))}
          </div>
        </ShowcaseFrame>

        <ShowcaseFrame label="addClassName — extra classes on root element">
          <div className="w-full rounded-sm" style={{ backgroundColor: 'var(--color-muted)' }}>
            <SectionContainer container="full">
              <div
                className="flex h-10 items-center justify-center rounded-sm"
                style={{ backgroundColor: 'var(--color-card)' }}
              >
                <span className="font-mono text-[11px]" style={{ color: 'var(--color-muted-foreground)' }}>addClassName=&quot;...&quot;</span>
              </div>
            </SectionContainer>
          </div>
        </ShowcaseFrame>

        <ShowcaseFrame label="Nested containers — inner margin collapses to 0">
          <div className="w-full space-y-1">
            <div className="overflow-hidden rounded-sm" style={{ backgroundColor: 'var(--color-muted)' }}>
              <SectionContainer container="full" gap={false}>
                <div className="rounded-sm px-3 py-2" style={{ backgroundColor: 'var(--color-border)' }}>
                  <span className="font-mono text-[11px]" style={{ color: 'var(--color-foreground)' }}>outer — full, no gap</span>
                </div>
                <SectionContainer container="small">
                  <div className="rounded-sm px-3 py-2" style={{ backgroundColor: 'var(--color-card)', opacity: 0.9 }}>
                    <span className="font-mono text-[11px]" style={{ color: 'var(--color-muted-foreground)' }}>inner — small, gap — margin-bottom collapses</span>
                  </div>
                </SectionContainer>
              </SectionContainer>
            </div>
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

