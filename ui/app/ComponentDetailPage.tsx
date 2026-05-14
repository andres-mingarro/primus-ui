import { useTranslations } from 'next-intl'
import type { ReactNode } from 'react'
import { Button } from '@/components-library/Button/Button'
import { Card, type CardProps } from '@/components-library/Card/Card'
import { Divider } from '@/components-library/Divider/Divider'
import { GridTemplate } from '@/components-library/GridTemplate/GridTemplate'
import { Heading } from '@/components-library/Heading/Heading'
import { Link } from '@/components-library/Link/Link'
import { SectionContainer } from '@/components-library/SectionContainer/SectionContainer'
import { Text } from '@/components-library/Text/Text'
import type { ComponentDoc } from '@/lib/component-docs'
import { AppButton } from '@/ui/components/basics/AppButton/AppButton'
import { CodeBlock } from '@/ui/components/basics/CodeBlock/CodeBlock'
import { DataTable } from '@/ui/components/basics/DataTable/DataTable'
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
        </div>
      </header>

      <section className="" id="usage">
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
        <h3 className="app-section-title">{t('examples')}</h3>
        <CodeBlock code={code} label={title} />
      </section>

      <section className="ComponentDetailPage__format-section">
        <h3 className="app-section-title">Demo</h3>
        <div className="ComponentDetailPage__demo">
          {demo}
        </div>
      </section>

      <section className="ComponentDetailPage__format-section">
        <h3 className="app-section-title">{t('props')}</h3>
        <DataTable columns={[t('prop'), t('type'), t('default'), t('description')]} rows={propsRows} />
      </section>

      <section className="ComponentDetailPage__format-section">
        <h3 className="app-section-title">{tokenTitle}</h3>
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
      <div className="ComponentDetailPage__text-demo">
        <div className="ComponentDetailPage__text-demo-group">
          <span className="ComponentDetailPage__heading-demo-label">size</span>
          <div className="ComponentDetailPage__heading-demo">
            {textSizeDemoItems.map(({ size }) => (
              <div className="ComponentDetailPage__heading-demo-item" key={size}>
                <span className="ComponentDetailPage__heading-demo-label">{size}</span>
                <Text size={size} text="The quick brown fox" />
              </div>
            ))}
          </div>
        </div>
        <div className="ComponentDetailPage__text-demo-group">
          <span className="ComponentDetailPage__heading-demo-label">weight</span>
          <div className="ComponentDetailPage__heading-demo">
            {textWeightDemoItems.map(({ weight }) => (
              <div className="ComponentDetailPage__heading-demo-item" key={weight}>
                <span className="ComponentDetailPage__heading-demo-label">{weight}</span>
                <Text size="md" weight={weight} text="The quick brown fox" />
              </div>
            ))}
          </div>
        </div>
        <div className="ComponentDetailPage__text-demo-group">
          <span className="ComponentDetailPage__heading-demo-label">tag</span>
          <div className="ComponentDetailPage__heading-demo">
            {textTagDemoItems.map(({ tag, label, text }) => (
              <div className="ComponentDetailPage__heading-demo-item" key={tag}>
                <span className="ComponentDetailPage__heading-demo-label">{label}</span>
                <Text tag={tag} text={text} />
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (slug === 'heading') {
    return (
      <div className="ComponentDetailPage__heading-demo">
        {headingDemoItems.map(({ variant, weight }) => (
          <div className="ComponentDetailPage__heading-demo-item" key={`${variant}-${weight}`}>
            <span className="ComponentDetailPage__heading-demo-label">
              {variant} / {weight}
            </span>
            <Heading variant={variant} weight={weight}>
              {variant.toUpperCase()} heading
            </Heading>
          </div>
        ))}
      </div>
    )
  }

  if (slug === 'section-container') {
    return (
      <div className="ComponentDetailPage__section-container-demo">
        {sectionContainerDemoItems.map((item) => (
          <div className="ComponentDetailPage__section-container-demo-row" key={item.container}>
            <span className="ComponentDetailPage__section-container-demo-label">
              {item.container}
            </span>
            <div className="ComponentDetailPage__section-container-demo-track">
              <SectionContainer
                addClassName="ComponentDetailPage__section-container-demo-container"
                container={item.container}
                tag="div"
              >
                <div className="ComponentDetailPage__section-container-demo-fill">
                  gap
                </div>
              </SectionContainer>
              <SectionContainer
                addClassName="ComponentDetailPage__section-container-demo-container"
                container={item.container}
                gap={false}
                tag="div"
              >
                <div className="ComponentDetailPage__section-container-demo-fill ComponentDetailPage__section-container-demo-fill--no-gap">
                  no-gap
                </div>
              </SectionContainer>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (slug === 'link') {
    return (
      <div className="ComponentDetailPage__demo-stack">
        <Link href="#" text="Default link" />
        <Link href="https://example.com" openInNewTab text="Opens in new tab (auto supplemental text)" />
        <Link href="https://example.com" openInNewTab supplementalText="Abre la documentación oficial">Official docs</Link>
        <Link href="#">Children content — <em>with markup</em></Link>
      </div>
    )
  }

  if (slug === 'button') {
    return (
      <div className="ComponentDetailPage__button-demo">
        <div className="ComponentDetailPage__button-group">
          <span className="ComponentDetailPage__button-group-label">variants</span>
          <div className="ComponentDetailPage__button-variant-grid">
            {buttonVariantItems.map(({ variant, label }) => (
              <div className="ComponentDetailPage__button-cell" key={variant}>
                <Button variant={variant}>{label}</Button>
                <span className="ComponentDetailPage__button-cell-label">{variant}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="ComponentDetailPage__button-group ComponentDetailPage__button-group--dark">
          <span className="ComponentDetailPage__button-group-label ComponentDetailPage__button-group-label--light">ghost on dark</span>
          <div className="ComponentDetailPage__button-ghost-row">
            <div className="ComponentDetailPage__button-cell">
              <Button variant="ghost">Ghost</Button>
              <span className="ComponentDetailPage__button-cell-label ComponentDetailPage__button-cell-label--light">ghost</span>
            </div>
            <div className="ComponentDetailPage__button-cell">
              <Button variant="ghost" disabled>Ghost</Button>
              <span className="ComponentDetailPage__button-cell-label ComponentDetailPage__button-cell-label--light">ghost disabled</span>
            </div>
          </div>
        </div>

        <div className="ComponentDetailPage__button-group">
          <span className="ComponentDetailPage__button-group-label">sizes</span>
          <div className="ComponentDetailPage__button-sizes-row">
            <div className="ComponentDetailPage__button-cell">
              <Button size="sm">Small</Button>
              <span className="ComponentDetailPage__button-cell-label">sm</span>
            </div>
            <div className="ComponentDetailPage__button-cell">
              <Button size="md">Medium</Button>
              <span className="ComponentDetailPage__button-cell-label">md</span>
            </div>
            <div className="ComponentDetailPage__button-cell">
              <Button size="lg">Large</Button>
              <span className="ComponentDetailPage__button-cell-label">lg</span>
            </div>
          </div>
        </div>

        <div className="ComponentDetailPage__button-group">
          <span className="ComponentDetailPage__button-group-label">states</span>
          <div className="ComponentDetailPage__button-sizes-row">
            <div className="ComponentDetailPage__button-cell">
              <Button variant="primary">Enabled</Button>
              <span className="ComponentDetailPage__button-cell-label">enabled</span>
            </div>
            <div className="ComponentDetailPage__button-cell">
              <Button variant="primary" disabled>Disabled</Button>
              <span className="ComponentDetailPage__button-cell-label">disabled</span>
            </div>
            <div className="ComponentDetailPage__button-cell">
              <Button variant="danger" disabled>Danger</Button>
              <span className="ComponentDetailPage__button-cell-label">danger disabled</span>
            </div>
          </div>
        </div>

        <div className="ComponentDetailPage__button-group">
          <span className="ComponentDetailPage__button-group-label">with icons</span>
          <div className="ComponentDetailPage__button-sizes-row">
            <div className="ComponentDetailPage__button-cell">
              <Button
                variant="primary"
                icon={
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M10 8H3m0 0 3-3M3 8l3 3" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M13 3v10" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
                  </svg>
                }
              >
                Back
              </Button>
              <span className="ComponentDetailPage__button-cell-label">icon left</span>
            </div>
            <div className="ComponentDetailPage__button-cell">
              <Button
                variant="secondary"
                iconRight={
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M6 8h7m0 0-3-3m3 3-3 3" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M3 3v10" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
                  </svg>
                }
              >
                Next
              </Button>
              <span className="ComponentDetailPage__button-cell-label">icon right</span>
            </div>
            <div className="ComponentDetailPage__button-cell">
              <Button
                variant="outline"
                icon={
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.75" />
                    <path d="M8 5.5V8l2 2" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                }
              >
                Schedule
              </Button>
              <span className="ComponentDetailPage__button-cell-label">icon + outline</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (slug === 'card') {
    return (
      <div className="ComponentDetailPage__card-demo-grid">
        {cardDemoItems.map((item) => (
          <div className="ComponentDetailPage__card-demo-item" key={item.direction}>
            <span className="ComponentDetailPage__card-demo-label">
              {item.direction}
            </span>
            <Card
              title={item.title}
              direction={item.direction}
              url={item.url}
              image={item.image}
              buttonPrimary={item.buttonPrimary}
              buttonPrimaryUrl={item.buttonPrimaryUrl}
              buttonSecondary={item.buttonSecondary}
              buttonSecondaryUrl={item.buttonSecondaryUrl}
              addClassName={[
                'ComponentDetailPage__card-demo-card',
                item.direction === 'vertical' ? 'ComponentDetailPage__card-demo-card--vertical' : '',
              ].filter(Boolean).join(' ')}
            >
              {item.body}
            </Card>
          </div>
        ))}
      </div>
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
<Heading variant="h3" weight="bold">Card Heading</Heading>

<Heading variant="h1">H1 heading</Heading>
<Heading variant="h2">H2 heading</Heading>
<Heading variant="h3">H3 heading</Heading>
<Heading variant="h4">H4 heading</Heading>
<Heading variant="h5">H5 heading</Heading>
<Heading variant="h6">H6 heading</Heading>

<Heading variant="h3" weight="normal">Normal heading</Heading>
<Heading variant="h3" weight="thin">Thin heading</Heading>
<Heading variant="h3" weight="bold">Bold heading</Heading>`,
    reactTailwind: `import { Heading } from './Heading.tailwind'

<Heading variant="h2" weight="thin">Section Title</Heading>
<Heading variant="h3" weight="bold">Card Heading</Heading>

<Heading variant="h1">H1 heading</Heading>
<Heading variant="h2">H2 heading</Heading>
<Heading variant="h3">H3 heading</Heading>
<Heading variant="h4">H4 heading</Heading>
<Heading variant="h5">H5 heading</Heading>
<Heading variant="h6">H6 heading</Heading>

<Heading variant="h3" weight="normal">Normal heading</Heading>
<Heading variant="h3" weight="thin">Thin heading</Heading>
<Heading variant="h3" weight="bold">Bold heading</Heading>`,
    drupal: `{{ include('THEME-NAME:heading', {
  variant: 'h2',
  weight: 'thin',
  text: 'Section Title'
}, false) }}

{{ include('THEME-NAME:heading', {
  variant: 'h3',
  weight: 'bold',
  content: 'Card Heading'
}, false) }}

{{ include('THEME-NAME:heading', {
  variant: 'h1',
  text: 'H1 heading'
}, false) }}

{{ include('THEME-NAME:heading', {
  variant: 'h2',
  text: 'H2 heading'
}, false) }}

{{ include('THEME-NAME:heading', {
  variant: 'h3',
  text: 'H3 heading'
}, false) }}

{{ include('THEME-NAME:heading', {
  variant: 'h4',
  text: 'H4 heading'
}, false) }}

{{ include('THEME-NAME:heading', {
  variant: 'h5',
  text: 'H5 heading'
}, false) }}

{{ include('THEME-NAME:heading', {
  variant: 'h6',
  text: 'H6 heading'
}, false) }}

{{ include('THEME-NAME:heading', {
  variant: 'h3',
  weight: 'normal',
  text: 'Normal heading'
}, false) }}

{{ include('THEME-NAME:heading', {
  variant: 'h3',
  weight: 'thin',
  text: 'Thin heading'
}, false) }}

{{ include('THEME-NAME:heading', {
  variant: 'h3',
  weight: 'bold',
  text: 'Bold heading'
}, false) }}`,
  },
  'section-container': {
    reactCss: `import { SectionContainer } from './SectionContainer'
import './section-container.scss'

<SectionContainer container="small" tag="div">
  <p>Content here</p>
</SectionContainer>

<SectionContainer container="large" tag="div">
  <p>Content here</p>
</SectionContainer>

<SectionContainer container="full" tag="div">
  <p>Content here</p>
</SectionContainer>

<SectionContainer container="small" gap={false} tag="div">
  <p>No gap content</p>
</SectionContainer>`,
    reactTailwind: `import { SectionContainer } from './SectionContainer.tailwind'

<SectionContainer container="small" tag="div">
  <p>Content here</p>
</SectionContainer>

<SectionContainer container="large" tag="div">
  <p>Content here</p>
</SectionContainer>

<SectionContainer container="full" tag="div">
  <p>Content here</p>
</SectionContainer>

<SectionContainer container="small" gap={false} tag="div">
  <p>No gap content</p>
</SectionContainer>`,
    drupal: `{{ include('THEME-NAME:section-container', {
  container: 'small',
  tag: 'div',
  content: '<p>Content here</p>'
}, false) }}

{{ include('THEME-NAME:section-container', {
  container: 'large',
  tag: 'div',
  content: '<p>Content here</p>'
}, false) }}

{{ include('THEME-NAME:section-container', {
  container: 'full',
  tag: 'div',
  content: '<p>Content here</p>'
}, false) }}

{{ include('THEME-NAME:section-container', {
  container: 'small',
  gap: false,
  tag: 'div',
  content: '<p>No gap content</p>'
}, false) }}`,
  },
  link: {
    reactCss: `import { Link } from './Link'\nimport './link.scss'\n\n<Link href="/about" text="About us" />\n<Link href="https://example.com" openInNewTab text="External link" />\n<Link href="/contact">Contact <span>us</span></Link>`,
    reactTailwind: `import { Link } from './Link.tailwind'\n\n<Link href="/about" text="About us" />\n<Link href="https://example.com" openInNewTab text="External link" />`,
    drupal: `{{ include('THEME-NAME:link', {\n  href: '/about',\n  text: 'About us'\n}, false) }}\n\n{{ include('THEME-NAME:link', {\n  href: 'https://example.com',\n  open_in_new_tab: true,\n  text: 'External link'\n}, false) }}`,
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
</Card>

<Card title="Vertical card" direction="vertical" image={{ src: 'https://www.dummycontent.app/api/image/600x400/ff5b2e/2a130c/IMAGE', alt: 'Orange placeholder' }}>Body text.</Card>
<Card title="Horizontal card" direction="horizontal" image={{ src: 'https://www.dummycontent.app/api/image/600x400/ff5b2e/2a130c/IMAGE', alt: 'Orange placeholder' }}>Body text.</Card>
<Card title="Horizontal reverse card" direction="horizontal-reverse" image={{ src: 'https://www.dummycontent.app/api/image/600x400/ff5b2e/2a130c/IMAGE', alt: 'Orange placeholder' }}>Body text.</Card>`,
    reactTailwind: `import { Card } from './Card.tailwind'

<Card
  title="Card with Actions"
  buttonPrimary="Read more"
  buttonPrimaryUrl="/article"
  buttonSecondary="Save"
>
  Card body text.
</Card>

<Card title="Vertical card" direction="vertical" image={{ src: 'https://www.dummycontent.app/api/image/600x400/ff5b2e/2a130c/IMAGE', alt: 'Orange placeholder' }}>Body text.</Card>
<Card title="Horizontal card" direction="horizontal" image={{ src: 'https://www.dummycontent.app/api/image/600x400/ff5b2e/2a130c/IMAGE', alt: 'Orange placeholder' }}>Body text.</Card>
<Card title="Horizontal reverse card" direction="horizontal-reverse" image={{ src: 'https://www.dummycontent.app/api/image/600x400/ff5b2e/2a130c/IMAGE', alt: 'Orange placeholder' }}>Body text.</Card>`,
    drupal: `{{ include('THEME-NAME:card', {
  title: 'Card with Actions',
  button_primary: 'Read more',
  button_primary_url: '/article',
  button_secondary: 'Save',
  body: 'Card body text.'
}, false) }}

{{ include('THEME-NAME:card', { title: 'Vertical card', direction: 'vertical', image_src: 'https://www.dummycontent.app/api/image/600x400/ff5b2e/2a130c/IMAGE', image_alt: 'Orange placeholder', body: 'Body text.' }, false) }}
{{ include('THEME-NAME:card', { title: 'Horizontal card', direction: 'horizontal', image_src: 'https://www.dummycontent.app/api/image/600x400/ff5b2e/2a130c/IMAGE', image_alt: 'Orange placeholder', body: 'Body text.' }, false) }}
{{ include('THEME-NAME:card', { title: 'Horizontal reverse card', direction: 'horizontal-reverse', image_src: 'https://www.dummycontent.app/api/image/600x400/ff5b2e/2a130c/IMAGE', image_alt: 'Orange placeholder', body: 'Body text.' }, false) }}`,
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
  link: [
    ['content', 'slot', 'undefined', 'Link content (text or markup)'],
    ['href', 'string', 'required', 'Link URL'],
    ['text', 'string', 'undefined', 'Visible link text (alternative to content slot)'],
    ['open_in_new_tab', 'boolean', 'false', 'Adds target="_blank" and rel="noreferrer"'],
    ['assistive_hidden', 'boolean', 'false', 'Adds aria-hidden and tabindex=-1'],
    ['supplemental_text', 'string', 'undefined', 'Visually hidden text appended inside the link'],
    ['translate_enabled', 'boolean', 'true', 'Wrap text prop with Drupal t()'],
    ['class_name', 'string', 'undefined', 'Extra classes appended to the root element'],
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
  link: [
    ['text-blue-600 hover:text-blue-700', 'color', 'Tailwind color utilities for default and hover state'],
    ['visited:text-purple-600', 'visited', 'Tailwind visited state utility'],
    ['underline / no-underline', 'text-decoration', 'Tailwind utilities for decoration state'],
    ['focus-visible:outline-2', 'focus', 'Tailwind focus-visible outline utility'],
  ],
  card: [
    ['bg-* text-* border-*', 'light style', 'Tailwind surface utilities selected by style'],
    ['flex-row / flex-col', 'flex-col', 'Tailwind layout utilities selected by direction'],
    ['rounded-lg', 'rounded-lg', 'Tailwind corner radius utility'],
    ['p-5 gap-3', 'p-5 gap-3', 'Tailwind spacing utilities for content layout'],
  ],
}

const buttonVariantItems = [
  { variant: 'primary',   label: 'Primary' },
  { variant: 'secondary', label: 'Secondary' },
  { variant: 'outline',   label: 'Outline' },
  { variant: 'danger',    label: 'Danger' },
  { variant: 'link',      label: 'Link' },
] as const satisfies readonly { variant: 'primary' | 'secondary' | 'ghost' | 'outline' | 'danger' | 'link'; label: string }[]

const textSizeDemoItems = [
  { size: 'sm' },
  { size: 'md' },
  { size: 'lg' },
  { size: 'xl' },
] as const

const textWeightDemoItems = [
  { weight: 'light' },
  { weight: 'regular' },
  { weight: 'medium' },
  { weight: 'bold' },
] as const

const textTagDemoItems = [
  { tag: 'label', label: 'label', text: 'Form field label' },
  { tag: 'span',  label: 'span',  text: 'Inline text element' },
  { tag: 'p',     label: 'p',     text: 'A short paragraph of descriptive body text.' },
  { tag: 'div',   label: 'div',   text: 'A div wrapper for grouped content.' },
] as const

const articleDemoItems = [
  '<article>Item 1</article>',
  '<article>Item 2</article>',
  '<article>Item 3</article>',
]

const sectionContainerDemoItems = [
  { container: 'small' },
  { container: 'large' },
  { container: 'full' },
] as const

const headingDemoItems = [
  { variant: 'h1', weight: 'normal' },
  { variant: 'h1', weight: 'thin' },
  { variant: 'h1', weight: 'bold' },
  { variant: 'h2', weight: 'normal' },
  { variant: 'h2', weight: 'thin' },
  { variant: 'h2', weight: 'bold' },
  { variant: 'h3', weight: 'normal' },
  { variant: 'h3', weight: 'thin' },
  { variant: 'h3', weight: 'bold' },
  { variant: 'h4', weight: 'normal' },
  { variant: 'h4', weight: 'thin' },
  { variant: 'h4', weight: 'bold' },
  { variant: 'h5', weight: 'normal' },
  { variant: 'h5', weight: 'thin' },
  { variant: 'h5', weight: 'bold' },
  { variant: 'h6', weight: 'normal' },
  { variant: 'h6', weight: 'thin' },
  { variant: 'h6', weight: 'bold' },
] as const

type CardDemoItem = {
  title: string
  direction: NonNullable<CardProps['direction']>
  body: string
  url?: string
  image?: NonNullable<CardProps['image']>
  buttonPrimary?: string
  buttonPrimaryUrl?: string
  buttonSecondary?: string
  buttonSecondaryUrl?: string
}

function getDummySolidImage(bgColor: string, textColor: string, alt: string) {
  return {
    src: `https://www.dummycontent.app/api/image/600x400/${bgColor}/${textColor}/Image`,
    alt,
  }
}

const cardDemoItems = [
  {
    title: 'Vertical card',
    direction: 'vertical',
    body: 'A stacked card with content flowing from top to bottom.',
    image: getDummySolidImage('ff5b2e', '2a130c', 'Orange placeholder'),
    buttonPrimary: 'Read more',
    buttonPrimaryUrl: '#',
    buttonSecondary: 'Save',
    buttonSecondaryUrl: '#',
  },
  {
    title: 'Horizontal card',
    direction: 'horizontal',
    body: 'Image-led content with the media placed before the copy.',
    url: '#',
    image: getDummySolidImage('ff5b2e', '2a130c', 'Orange placeholder'),
    buttonPrimary: 'Open',
    buttonPrimaryUrl: '#',
  },
  {
    title: 'Horizontal reverse card',
    direction: 'horizontal-reverse',
    body: 'The same structure with media placed after the copy.',
    image: getDummySolidImage('ff5b2e', '2a130c', 'Orange placeholder'),
    buttonSecondary: 'Preview',
    buttonSecondaryUrl: '#',
  },
] satisfies readonly CardDemoItem[]
