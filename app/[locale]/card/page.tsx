import { useTranslations } from 'next-intl'
import { Card } from '@primus/Card/Card.tailwind'
import { ShowcaseFrame } from '@/ui/ShowcaseFrame'
import { CodeTabs } from '@/ui/CodeTabs'
import { ComponentMeta } from '@primus/Card/meta'
import { ComponentPageHeader, SectionLabel, PropsTable, CssVarsTable } from '@/ui/ComponentPage'

const TAILWIND_CODE = `
import { Card } from './Card.tailwind'

// Basic vertical card
<Card title="Card Title">
  Body content goes here.
</Card>

// Style variants
<Card title="Light Card" style="light">Content</Card>
<Card title="Dark Card" style="dark">Content</Card>
<Card title="High Contrast" style="high-contrast">Content</Card>

// Horizontal layout with image
<Card
  title="Horizontal Card"
  direction="horizontal"
  image={{ src: '/img.jpg', alt: 'Description' }}
>
  Content beside the image.
</Card>

// Card with buttons
<Card
  title="Card with Actions"
  buttonPrimary="Read more"
  buttonPrimaryUrl="/article"
  buttonSecondary="Save"
>
  Card body text.
</Card>

// Linked title
<Card title="Linked Title" url="/destination">
  Click the title to navigate.
</Card>

// Extra classes on root
<Card title="Custom" addClassName="max-w-sm shadow-lg">
  Uses addClassName to extend styling.
</Card>
`

const SCSS_CODE = `
// 1. Copy Card.tsx + card.scss into your project
// 2. Import card.scss once in your app entry

import { Card } from './Card'

// Basic card
<Card title="Card Title">Body content.</Card>

// Style variants
<Card title="Dark Card" style="dark">
  Content with dark background.
</Card>
<Card title="High Contrast" style="high-contrast">
  Strongest contrast.
</Card>

// Horizontal layout
<Card
  title="Horizontal"
  direction="horizontal"
  image={{ src: '/img.jpg', alt: 'Alt text' }}
  buttonPrimary="Learn more"
  buttonPrimaryUrl="/page"
>
  Horizontal layout with image and button.
</Card>

// Override tokens in your CSS:
// .my-section .pu-card {
//   --pu-card-border-radius: 1rem;
//   --pu-card-btn-primary-bg: #7c3aed;
//   --pu-card-btn-primary-bg-hover: #6d28d9;
// }
`

const DRUPAL_CODE = `
{# Copy drupal/ folder to [your-theme]/components/card/ then clear cache #}

{% include 'THEME-NAME:card' with {
  title: 'Card Title',
  content: 'Body content goes here.',
} %}

{% include 'THEME-NAME:card' with {
  title: 'Dark card',
  style: 'dark',
  content: 'Content with dark background.',
} %}

{# Connect to a Drupal node #}
{% include 'THEME-NAME:card' with {
  title: node.title.value,
  url: node.path,
  style: 'light',
  direction: 'horizontal',
  image_src: node.field_image.entity.uri.value|image_style('card_thumb'),
  image_alt: node.field_image.alt,
  button_primary: 'Read more',
  button_primary_url: node.path,
  content: node.body.value,
  translate_enabled: false,
} %}
`

export default function CardPage() {
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

        <ShowcaseFrame label="style — light / dark / high-contrast">
          <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-3">
            <Card title="Light card" style="light">
              Default white background with subtle border.
            </Card>
            <Card title="Dark card" style="dark">
              Dark background for inverted UI sections.
            </Card>
            <Card title="High contrast" style="high-contrast">
              Near-black background for maximum contrast.
            </Card>
          </div>
        </ShowcaseFrame>

        <ShowcaseFrame label="direction — horizontal">
          <div className="w-full max-w-2xl">
            <Card
              title="Horizontal card"
              direction="horizontal"
              image={{ src: 'https://picsum.photos/seed/card-h/400/300', alt: 'Sample image' }}
            >
              Image appears on the left, content on the right. Useful for article previews or media cards.
            </Card>
          </div>
        </ShowcaseFrame>

        <ShowcaseFrame label="direction — horizontal-reverse">
          <div className="w-full max-w-2xl">
            <Card
              title="Horizontal reverse"
              direction="horizontal-reverse"
              style="dark"
              image={{ src: 'https://picsum.photos/seed/card-hr/400/300', alt: 'Sample image' }}
            >
              Image appears on the right. Same layout, mirrored.
            </Card>
          </div>
        </ShowcaseFrame>

        <ShowcaseFrame label="image — vertical card with image">
          <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
            <Card
              title="Card with image"
              image={{ src: 'https://picsum.photos/seed/card-v/600/400', alt: 'Landscape photo' }}
            >
              Image fills the card header at a fixed height. Object-fit: cover keeps it well-cropped.
            </Card>
            <Card
              title="Image + buttons"
              style="high-contrast"
              image={{ src: 'https://picsum.photos/seed/card-v2/600/400', alt: 'Mountain photo' }}
              buttonPrimary="Read more"
              buttonPrimaryUrl="#"
              buttonSecondary="Save"
              buttonSecondaryUrl="#"
            >
              Combine image, body text, and action buttons.
            </Card>
          </div>
        </ShowcaseFrame>

        <ShowcaseFrame label="buttons — primary and secondary actions">
          <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-3">
            <Card
              title="Primary only"
              style="light"
              buttonPrimary="Learn more"
              buttonPrimaryUrl="#"
            >
              Single primary action.
            </Card>
            <Card
              title="Both actions"
              style="dark"
              buttonPrimary="Get started"
              buttonPrimaryUrl="#"
              buttonSecondary="View demo"
              buttonSecondaryUrl="#"
            >
              Primary and secondary side by side.
            </Card>
            <Card
              title="Secondary only"
              style="high-contrast"
              buttonSecondary="View details"
              buttonSecondaryUrl="#"
            >
              Secondary-only for lower emphasis.
            </Card>
          </div>
        </ShowcaseFrame>

        <ShowcaseFrame label="url — linked title">
          <div className="w-full max-w-sm">
            <Card
              title="Linked card title"
              url="#"
            >
              When a url is provided, the title becomes a link. Hover to see the underline; focus to see the outline.
            </Card>
          </div>
        </ShowcaseFrame>

        <ShowcaseFrame label="addClassName — extra classes on root element">
          <Card
            title="Custom shadow"
            addClassName="shadow-xl"
          >
            Uses addClassName to append Tailwind shadow utilities to the root article element.
          </Card>
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

