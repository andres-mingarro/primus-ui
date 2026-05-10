import { useTranslations } from 'next-intl'
import { Heading } from '@primus/Heading/Heading.tailwind'
import { ShowcaseFrame } from '@/ui/ShowcaseFrame'
import { CodeTabs } from '@/ui/CodeTabs'
import { ComponentMeta } from '@primus/Heading/meta'
import { ComponentPageHeader, SectionLabel, PropsTable, CssVarsTable } from '@/ui/ComponentPage'

const TAILWIND_CODE = `
import { Heading } from './Heading.tailwind'

// h1–h6 variants
<Heading variant="h1">Page Title</Heading>
<Heading variant="h2">Section Title</Heading>
<Heading variant="h3">Subsection</Heading>
<Heading variant="h4">Card Heading</Heading>
<Heading variant="h5">Small Heading</Heading>
<Heading variant="h6">Smallest Heading</Heading>

// Weight variants
<Heading variant="h2" weight="thin">Thin heading</Heading>
<Heading variant="h2" weight="normal">Normal heading</Heading>
<Heading variant="h2" weight="bold">Bold heading</Heading>

// HTML content — <p> tags are stripped before rendering
<Heading variant="h2" html>
  {'<p>Rich text <strong>heading</strong> from a CMS</p>'}
</Heading>

// Extra classes
<Heading variant="h1" addClassName="text-blue-600">Colored heading</Heading>
`

const SCSS_CODE = `
// 1. Copy Heading.tsx + heading.scss into your project
// 2. Import heading.scss once in your app entry

import { Heading } from './Heading'

// h1–h6 variants
<Heading variant="h1">Page Title</Heading>
<Heading variant="h2">Section Title</Heading>

// Weight variants
<Heading variant="h2" weight="thin">Thin heading</Heading>
<Heading variant="h2" weight="bold">Bold heading</Heading>

// HTML content
<Heading variant="h2" html>
  {'<p>Rich text <strong>heading</strong> from a CMS</p>'}
</Heading>

// Override tokens in your CSS:
// .my-section {
//   --pu-heading-color:   #1d4ed8;
//   --pu-heading-h2-size: 2rem;
//   --pu-heading-weight-bold: 800;
// }
`

const DRUPAL_CODE = `
{# Copy drupal/ folder to [your-theme]/components/heading/ then clear cache #}

{% include 'THEME-NAME:heading' with {
  variant: 'h1',
  content: 'Page Title',
} %}

{% include 'THEME-NAME:heading' with {
  variant: 'h2',
  weight: 'bold',
  content: 'Section Title',
} %}

{% include 'THEME-NAME:heading' with {
  variant: 'h3',
  html: true,
  content: '<p>Rich text <strong>heading</strong></p>',
} %}
`

export default function HeadingPage() {
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

        <ShowcaseFrame label="variant — h1 through h6">
          <div className="flex w-full flex-col gap-3">
            <Heading variant="h1">h1 — Page Title (2.25rem)</Heading>
            <Heading variant="h2">h2 — Section Title (1.875rem)</Heading>
            <Heading variant="h3">h3 — Subsection (1.5rem)</Heading>
            <Heading variant="h4">h4 — Card Heading (1.25rem)</Heading>
            <Heading variant="h5">h5 — Small Heading (1.125rem)</Heading>
            <Heading variant="h6">h6 — Smallest Heading (1rem)</Heading>
          </div>
        </ShowcaseFrame>

        <ShowcaseFrame label="weight — thin / normal / bold">
          <div className="flex w-full flex-col gap-3">
            <Heading variant="h2" weight="thin">Thin — font-weight 100</Heading>
            <Heading variant="h2" weight="normal">Normal — font-weight 400</Heading>
            <Heading variant="h2" weight="bold">Bold — font-weight 700</Heading>
          </div>
        </ShowcaseFrame>

        <ShowcaseFrame label="html — strips <p> tags, renders inner HTML">
          <div className="flex w-full flex-col gap-3">
            <Heading variant="h2" html>
              {'<p>Rich text <em>from a CMS</em> with <strong>inline markup</strong></p>'}
            </Heading>
            <Heading variant="h3" weight="thin" html>
              {'<p>Thin heading with <strong>bold span</strong> inside</p>'}
            </Heading>
          </div>
        </ShowcaseFrame>

        <ShowcaseFrame label="addClassName — extra classes appended to root">
          <Heading variant="h2" addClassName="italic underline decoration-dotted">
            Custom styled via addClassName
          </Heading>
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

