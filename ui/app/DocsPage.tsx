import { useTranslations } from 'next-intl'
import { CodeBlock } from '@/ui/components/basics/CodeBlock/CodeBlock'
import { SectionHeader } from '@/ui/components/basics/SectionHeader/SectionHeader'
import { PathCard } from '@/ui/components/feature/PathCard/PathCard'
import './DocsPage.scss'

export function DocsPage() {
  const t = useTranslations('docsPage')

  return (
    <article className="DocsPage">
      <header className="DocsPage__hero">
        <p className="DocsPage__eyebrow">{t('eyebrow')}</p>
        <h1 className="DocsPage__title">{t('title')}</h1>
        <p className="DocsPage__description">{t('description')}</p>
      </header>

      <section className="app-section app-section--paper" id="installation">
        <SectionHeader label={t('installation')} />
        <p className="DocsPage__body">
          {t.rich('installationBody', {
            code: (chunks) => <code>{chunks}</code>,
          })}
        </p>
        <CodeBlock
          label={t('folder')}
          code={`components-library/
  Card/
  Divider/
  GridTemplate/
  Heading/
  SectionContainer/
  Text/`}
        />
      </section>

      <section className="app-section app-section--paper" id="usage">
        <SectionHeader label={t('usage')} />
        <div className="DocsPage__grid">
          <PathCard title="Next.js + SCSS" description={t('usageScss')} />
          <PathCard title="Next.js Tailwind" description={t('usageTailwind')} />
          <PathCard title="Drupal SDC" description={t('usageDrupal')} />
        </div>
      </section>

      <section className="app-section app-section--paper" id="tokens">
        <SectionHeader label={t('tokens')} />
        <p className="DocsPage__body">{t('tokensBody')}</p>
        <CodeBlock
          label={t('css')}
          code={`:root {
  --pu-card-background: var(--app-color-paper);
  --pu-card-border-color: var(--app-color-line);
  --pu-card-padding: var(--app-space-5);
}`}
        />
      </section>

      <section className="app-section app-section--paper" id="outputs">
        <SectionHeader label={t('outputs')} />
        <div className="DocsPage__grid">
          <PathCard title="Next.js" description={t('outputNext')} />
          <PathCard title="Next.js Tailwind" description={t('outputTailwind')} />
          <PathCard title="Drupal" description={t('outputDrupal')} />
        </div>
      </section>
    </article>
  )
}
