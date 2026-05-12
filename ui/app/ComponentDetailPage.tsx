import { useTranslations } from 'next-intl'
import type { ReactNode } from 'react'
import { Card } from '@/components-library/Card/Card'
import { Divider } from '@/components-library/Divider/Divider'
import { GridTemplate } from '@/components-library/GridTemplate/GridTemplate'
import { Heading } from '@/components-library/Heading/Heading'
import { SectionContainer } from '@/components-library/SectionContainer/SectionContainer'
import { Text } from '@/components-library/Text/Text'
import type { ComponentDoc } from '@/lib/component-docs'
import { AppButton } from '@/ui/components/basics/AppButton/AppButton'
import { CodeBlock } from '@/ui/components/basics/CodeBlock/CodeBlock'
import { DataTable } from '@/ui/components/basics/DataTable/DataTable'
import { SectionHeader } from '@/ui/components/basics/SectionHeader/SectionHeader'
import { TabItem, TabPanel, Tabs, TabsContent, TabsItems } from '@/ui/components/basics/Tabs/Tabs'
import { PathCard } from '@/ui/components/feature/PathCard/PathCard'
import './ComponentDetailPage.scss'

export function ComponentDetailPage({
  doc,
  locale,
}: {
  doc: ComponentDoc
  locale: string
}) {
  const t = useTranslations('component')
  const td = useTranslations('componentDescriptions')
  const docs = getFormatDocs(doc)
  const propsRows = getReactPropsRows(doc)
  const cssTokenRows = getCssTokenRows(doc)

  return (
    <article className="ComponentDetailPage">
      <header className="ComponentDetailPage__hero">
        <p className="ComponentDetailPage__eyebrow">{t('eyebrow', { version: doc.version })}</p>
        <h1 className="ComponentDetailPage__title">{doc.name}</h1>
        <p className="ComponentDetailPage__description">{td(doc.slug)}</p>
        <div className="ComponentDetailPage__actions">
          <AppButton href={`/${locale}/components`}>{t('allComponents')}</AppButton>
          <AppButton href="#usage" variant="primary">{t('usagePaths')}</AppButton>
        </div>
      </header>

      <section className="" id="usage">
        <SectionHeader label={t('usagePaths')} />
        <Tabs defaultValue="react-css" label={t('usagePaths')}>
          <TabsItems>
            <TabItem value="react-css">{t('reactCss')}</TabItem>
            <TabItem value="react-tailwind">{t('reactTailwind')}</TabItem>
            <TabItem value="drupal">{t('drupalSdc')}</TabItem>
          </TabsItems>

          <TabsContent>
            <TabPanel value="react-css">
              <FormatPanel
                code={docs.reactCss}
                demo={renderDemo(doc.slug)}
                path={`components-library/${doc.name}/${doc.name}.tsx`}
                propsRows={propsRows}
                summary="Use the SCSS version when the consuming app wants stable pu-* classes and CSS variables that can be overridden from a theme layer."
                title={t('reactCss')}
                tokenTitle={t('scssTokens')}
                tokenRows={cssTokenRows}
              />
            </TabPanel>
            <TabPanel value="react-tailwind">
              <FormatPanel
                code={docs.reactTailwind}
                demo={renderDemo(doc.slug)}
                path={`components-library/${doc.name}/${doc.name}.tailwind.tsx`}
                propsRows={propsRows}
                summary="Use the Tailwind version when the consuming app already owns Tailwind and prefers utility classes over a companion stylesheet."
                title={t('reactTailwind')}
                tokenTitle="Tailwind tokens"
                tokenRows={getTailwindTokenRows(doc.slug)}
              />
            </TabPanel>
            <TabPanel value="drupal">
              <FormatPanel
                code={docs.drupal}
                demo={renderDemo(doc.slug)}
                path={`components-library/${doc.name}/drupal/`}
                propsRows={getDrupalPropsRows(doc)}
                summary="Use the Drupal SDC version when the component needs Twig markup, a component schema, and a standalone SCSS file inside a theme."
                title={t('drupalSdc')}
                tokenTitle={t('scssTokens')}
                tokenRows={cssTokenRows}
              />
            </TabPanel>
          </TabsContent>
        </Tabs>
      </section>
    </article>
  )
}

function FormatPanel({
  code,
  demo,
  path,
  propsRows,
  summary,
  title,
  tokenTitle,
  tokenRows,
}: {
  code: string
  demo: ReactNode
  path: string
  propsRows: string[][]
  summary: string
  title: string
  tokenTitle: string
  tokenRows: string[][]
}) {
  const t = useTranslations('component')

  return (
    <div className="ComponentDetailPage__format-panel">
      <PathCard title={title} description={summary} code={path} />

      <section className="ComponentDetailPage__format-section">
        <h3 className="ComponentDetailPage__section-title">{t('examples')}</h3>
        <CodeBlock code={code} label={title} />
      </section>

      <section className="ComponentDetailPage__format-section">
        <h3 className="ComponentDetailPage__section-title">Demo</h3>
        <div className="ComponentDetailPage__demo">
          {demo}
        </div>
      </section>

      <section className="ComponentDetailPage__format-section">
        <h3 className="ComponentDetailPage__section-title">{t('props')}</h3>
        <DataTable columns={[t('prop'), t('type'), t('default'), t('description')]} rows={propsRows} />
      </section>

      <section className="ComponentDetailPage__format-section">
        <h3 className="ComponentDetailPage__section-title">{tokenTitle}</h3>
        <DataTable columns={[t('variable'), t('default'), t('description')]} rows={tokenRows} />
      </section>
    </div>
  )
}

function renderDemo(slug: string) {
  if (slug === 'divider') {
    return (
      <div className="ComponentDetailPage__demo-stack">
        <span>Content before</span>
        <Divider />
        <span>Content after</span>
      </div>
    )
  }

  if (slug === 'text') {
    return (
      <div className="ComponentDetailPage__demo-stack">
        <Text tag="label" size="sm" weight="medium" text="Email address" />
        <Text tag="p" size="lg" weight="regular" text="Helper text below the field." />
      </div>
    )
  }

  if (slug === 'heading') {
    return (
      <div className="ComponentDetailPage__demo-stack">
        <Heading variant="h2" weight="thin">Section Title</Heading>
        <Heading variant="h3" weight="bold">Card Heading</Heading>
      </div>
    )
  }

  if (slug === 'section-container') {
    return (
      <SectionContainer container="small" tag="div">
        <div className="ComponentDetailPage__demo-band">Content here</div>
      </SectionContainer>
    )
  }

  if (slug === 'card') {
    return (
      <Card
        title="Card with Actions"
        buttonPrimary="Read more"
        buttonPrimaryUrl="#"
        buttonSecondary="Save"
      >
        Card body text.
      </Card>
    )
  }

  return (
    <GridTemplate cols={3} colsMedium={2} colsSmall={1}>
      {articleDemoItems.map((item) => (
        <div className="ComponentDetailPage__demo-cell" key={item}>
          {item}
        </div>
      ))}
    </GridTemplate>
  )
}

function getReactPropsRows(doc: ComponentDoc) {
  return doc.props.map((prop) => [
    prop.name,
    prop.type,
    formatDefault(prop.default),
    prop.description,
  ])
}

function getCssTokenRows(doc: ComponentDoc) {
  return doc.cssVars.map((token) => [
    token.name,
    token.default,
    token.description,
  ])
}

function getDrupalPropsRows(doc: ComponentDoc) {
  const rows = drupalPropRowsBySlug[doc.slug]

  if (rows) return rows

  return getReactPropsRows(doc)
}

function getTailwindTokenRows(slug: string) {
  return tailwindTokenRowsBySlug[slug] ?? [
    ['className', 'Tailwind utilities', 'Styling lives directly in the Tailwind component class strings'],
    ['addClassName', 'undefined', 'Extra Tailwind utilities appended to the root element'],
  ]
}

function formatDefault(value: unknown) {
  if (value === undefined) return 'undefined'
  if (value === null) return 'null'
  return String(value)
}

function getFormatDocs(doc: ComponentDoc) {
  return formatDocsBySlug[doc.slug] ?? {
    reactCss: `import { ${doc.name} } from './${doc.name}'\n\n<${doc.name} />`,
    reactTailwind: `import { ${doc.name} } from './${doc.name}.tailwind'\n\n<${doc.name} />`,
    drupal: `{{ include('THEME-NAME:${doc.slug}', {}, false) }}`,
  }
}

const formatDocsBySlug: Record<string, { reactCss: string; reactTailwind: string; drupal: string }> = {
  divider: {
    reactCss: `import { Divider } from './Divider'
import './divider.scss'

<Divider />
<Divider orientation="vertical" />
<Divider assistiveHidden />`,
    reactTailwind: `import { Divider } from './Divider.tailwind'

<Divider />
<Divider orientation="vertical" />
<Divider assistiveHidden />`,
    drupal: `{{ include('THEME-NAME:divider', {}, false) }}
{{ include('THEME-NAME:divider', { orientation: 'vertical' }, false) }}
{{ include('THEME-NAME:divider', { assistive_hidden: true }, false) }}`,
  },
  'grid-template': {
    reactCss: `import { GridTemplate } from './GridTemplate'
import './grid-template.scss'

<GridTemplate cols={3} colsMedium={2} colsSmall={1}>
  <article>Item 1</article>
  <article>Item 2</article>
  <article>Item 3</article>
</GridTemplate>`,
    reactTailwind: `import { GridTemplate } from './GridTemplate.tailwind'

<GridTemplate cols={3} colsMedium={2} colsSmall={1} gap>
  <article>Item 1</article>
  <article>Item 2</article>
  <article>Item 3</article>
</GridTemplate>`,
    drupal: `{{ include('THEME-NAME:grid-template', {
  cols: 3,
  cols_medium: 2,
  cols_small: 1,
  items: '<article>Item 1</article><article>Item 2</article><article>Item 3</article>'
}, false) }}`,
  },
  text: {
    reactCss: `import { Text } from './Text'
import './text.scss'

<Text tag="label" size="sm" weight="medium" text="Email address" />
<Text tag="p" size="lg">Helper text below the field.</Text>`,
    reactTailwind: `import { Text } from './Text.tailwind'

<Text tag="label" size="sm" weight="medium" text="Email address" />
<Text tag="p" size="lg">Helper text below the field.</Text>`,
    drupal: `{{ include('THEME-NAME:text', {
  tag: 'label',
  text: 'Email address',
  size: 'sm',
  weight: 'medium'
}, false) }}

{{ include('THEME-NAME:text', {
  tag: 'p',
  items: 'Helper text below the field.',
  size: 'lg'
}, false) }}`,
  },
  heading: {
    reactCss: `import { Heading } from './Heading'
import './heading.scss'

<Heading variant="h2" weight="thin">Section Title</Heading>
<Heading variant="h3" weight="bold">Card Heading</Heading>`,
    reactTailwind: `import { Heading } from './Heading.tailwind'

<Heading variant="h2" weight="thin">Section Title</Heading>
<Heading variant="h3" weight="bold">Card Heading</Heading>`,
    drupal: `{{ include('THEME-NAME:heading', {
  variant: 'h2',
  weight: 'thin',
  text: 'Section Title'
}, false) }}

{{ include('THEME-NAME:heading', {
  variant: 'h3',
  weight: 'bold',
  content: 'Card Heading'
}, false) }}`,
  },
  'section-container': {
    reactCss: `import { SectionContainer } from './SectionContainer'
import './section-container.scss'

<SectionContainer container="small" tag="div">
  <p>Content here</p>
</SectionContainer>`,
    reactTailwind: `import { SectionContainer } from './SectionContainer.tailwind'

<SectionContainer container="small" tag="div">
  <p>Content here</p>
</SectionContainer>`,
    drupal: `{{ include('THEME-NAME:section-container', {
  container: 'small',
  tag: 'div',
  content: '<p>Content here</p>'
}, false) }}`,
  },
  card: {
    reactCss: `import { Card } from './Card'
import './card.scss'

<Card
  title="Card with Actions"
  buttonPrimary="Read more"
  buttonPrimaryUrl="/article"
  buttonSecondary="Save"
>
  Card body text.
</Card>`,
    reactTailwind: `import { Card } from './Card.tailwind'

<Card
  title="Card with Actions"
  buttonPrimary="Read more"
  buttonPrimaryUrl="/article"
  buttonSecondary="Save"
>
  Card body text.
</Card>`,
    drupal: `{{ include('THEME-NAME:card', {
  title: 'Card with Actions',
  button_primary: 'Read more',
  button_primary_url: '/article',
  button_secondary: 'Save',
  body: 'Card body text.'
}, false) }}`,
  },
}

const drupalPropRowsBySlug: Record<string, string[][]> = {
  divider: [
    ['orientation', 'string', 'horizontal', 'horizontal or vertical'],
    ['assistive_hidden', 'boolean', 'false', 'Adds aria-hidden for decorative dividers'],
  ],
  'grid-template': [
    ['items', 'slot', 'required', 'Grid items content rendered inside the wrapper'],
    ['cols', 'integer', '3', 'Column count at large screens (>= 769px)'],
    ['cols_medium', 'integer', '2', 'Column count at medium screens (481px-768px)'],
    ['cols_small', 'integer', '1', 'Column count at small screens (<= 480px)'],
    ['gap', 'boolean', 'true', 'Enable gap between cells'],
    ['addClassName', 'string', 'undefined', 'Extra classes appended to the root element'],
  ],
  text: [
    ['items', 'slot', 'undefined', 'Content to render inside the element'],
    ['tag', 'string', 'span', 'HTML element to render'],
    ['text', 'string', 'undefined', 'Plain text content'],
    ['size', 'string', 'undefined', 'Typography size'],
    ['mobile_size', 'string', 'undefined', 'Mobile typography size'],
    ['weight', 'string', 'undefined', 'Font weight'],
    ['translate_enabled', 'boolean', 'true', 'Wrap text prop with Drupal t()'],
    ['addClassName', 'string', 'undefined', 'Extra classes appended to the root element'],
  ],
  heading: [
    ['content', 'slot', 'undefined', 'Content to render inside the heading'],
    ['variant', 'string', 'required', 'HTML heading level to render'],
    ['text', 'string', 'undefined', 'Plain text content'],
    ['weight', 'string', 'normal', 'Font weight'],
    ['translate_enabled', 'boolean', 'true', 'Wrap text prop with Drupal t()'],
    ['addClassName', 'string', 'undefined', 'Extra classes appended to the root element'],
  ],
  'section-container': [
    ['content', 'slot', 'required', 'Elements rendered inside the section'],
    ['container', 'string', 'large', 'Width constraint: small, large, or full'],
    ['gap', 'boolean', 'true', 'Adds horizontal padding to the inner container'],
    ['mobile_gap', 'string', 'small', 'Horizontal padding on mobile'],
    ['tag', 'string', 'section', 'HTML element to render'],
    ['addClassName', 'string', 'undefined', 'Extra classes appended to the root element'],
  ],
  card: [
    ['body', 'slot', 'undefined', 'Main card content'],
    ['title', 'string', 'required', 'Card heading text'],
    ['url', 'string', 'undefined', 'Wraps the title in a link'],
    ['style', 'string', 'light', 'Visual style variant'],
    ['direction', 'string', 'vertical', 'Layout direction'],
    ['image_src', 'string', 'undefined', 'Image URL'],
    ['image_alt', 'string', '', 'Image alt text'],
    ['button_primary', 'string', 'undefined', 'Primary button label'],
    ['button_primary_url', 'string', '#', 'Primary button href'],
    ['button_secondary', 'string', 'undefined', 'Secondary button label'],
    ['button_secondary_url', 'string', '#', 'Secondary button href'],
    ['translate_enabled', 'boolean', 'true', 'Wrap text props with Drupal t()'],
    ['add_class_name', 'string', 'undefined', 'Extra classes appended to the root element'],
  ],
}

const tailwindTokenRowsBySlug: Record<string, string[][]> = {
  divider: [
    ['bg-neutral-600', 'line color', 'Tailwind utility that controls divider color'],
    ['h-px / w-px', '1px thickness', 'Tailwind utilities for horizontal or vertical thickness'],
    ['w-full / h-full', '100% length', 'Tailwind utilities for divider length'],
  ],
  'grid-template': [
    ['--pu-grid-template-cols', '3', 'Inline style value used by the arbitrary grid-template utility'],
    ['--pu-grid-template-cols-md', '2', 'Inline style value used by the 768px responsive utility'],
    ['--pu-grid-template-cols-sm', '1', 'Inline style value used by the 480px responsive utility'],
    ['gap-6 / gap-0', 'gap-6', 'Tailwind spacing class selected by the gap prop'],
  ],
  text: [
    ['text-sm / text-base / text-lg / text-xl', 'undefined', 'Tailwind font-size utilities selected by size'],
    ['max-[768px]:text-*', 'undefined', 'Responsive Tailwind utilities selected by mobileSize'],
    ['font-light / font-normal / font-medium / font-bold', 'undefined', 'Tailwind font-weight utilities selected by weight'],
  ],
  heading: [
    ['text-4xl ... text-base', 'variant map', 'Tailwind font-size utilities selected by heading variant'],
    ['font-thin / font-normal / font-bold', 'font-normal', 'Tailwind font-weight utilities selected by weight'],
  ],
  'section-container': [
    ['max-w-3xl / max-w-7xl / max-w-none', 'max-w-7xl', 'Tailwind width utilities selected by container'],
    ['px-4 / px-0', 'px-4', 'Tailwind padding utilities selected by gap'],
    ['max-[768px]:px-6 / max-[768px]:px-0', 'px-4', 'Responsive utilities selected by mobileGap'],
  ],
  card: [
    ['bg-* text-* border-*', 'light style', 'Tailwind surface utilities selected by style'],
    ['flex-row / flex-col', 'flex-col', 'Tailwind layout utilities selected by direction'],
    ['rounded-lg', 'rounded-lg', 'Tailwind corner radius utility'],
    ['p-5 gap-3', 'p-5 gap-3', 'Tailwind spacing utilities for content layout'],
  ],
}

const articleDemoItems = [
  '<article>Item 1</article>',
  '<article>Item 2</article>',
  '<article>Item 3</article>',
]
