import { useTranslations } from 'next-intl'
import { CodeBlock } from '@/ui/components/basics/CodeBlock/CodeBlock'
import { SectionHeader } from '@/ui/components/basics/SectionHeader/SectionHeader'
import { AppTabs } from '@/ui/components/feature/AppTabs/AppTabs'
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

      <section className="DocsPage__section" id="installation">
        <div className="DocsPage__sectionHeader">
          <SectionHeader label={t('installation')} />
        </div>
        <div className="DocsPage__sectionBody">
          <p className="DocsPage__body">
            {t.rich('installationBody', {
              code: (chunks) => <code>{chunks}</code>,
            })}
          </p>
          <AppTabs
            ariaLabel={t('installation')}
            labels={['Next.js', 'Next.js + Tailwind', 'Drupal']}
          >
            <section className="DocsPage__installer">
              <h3 className="DocsPage__installerTitle">Next.js + SCSS</h3>
              <ol className="DocsPage__steps">
                <li>{t('installReactCssStep1')}</li>
                <li>{t('installReactCssStep2')}</li>
                <li>{t('installReactCssStep3')}</li>
              </ol>
              <CodeBlock
                label="Next.js + SCSS"
                code={`components-library/Card/
  Card.tsx
  card.scss
  meta.ts
  README.md`}
              />
            </section>

            <section className="DocsPage__installer">
              <h3 className="DocsPage__installerTitle">Next.js + Tailwind</h3>
              <ol className="DocsPage__steps">
                <li>{t('installTailwindStep1')}</li>
                <li>{t('installTailwindStep2')}</li>
                <li>{t('installTailwindStep3')}</li>
              </ol>
              <CodeBlock
                label="Next.js + Tailwind"
                code={`components-library/Card/
  Card.tailwind.tsx
  meta.ts
  README.md`}
              />
            </section>

            <section className="DocsPage__installer">
              <h3 className="DocsPage__installerTitle">Drupal SDC</h3>
              <ol className="DocsPage__steps">
                <li>{t('installDrupalStep1')}</li>
                <li>{t('installDrupalStep2')}</li>
                <li>{t('installDrupalStep3')}</li>
              </ol>
              <CodeBlock
                label="Drupal SDC"
                code={`components-library/Card/drupal/
  card.component.yml
  card.twig
  card.scss`}
              />
            </section>
          </AppTabs>
        </div>
      </section>

      <section className="DocsPage__section" id="usage">
        <div className="DocsPage__sectionHeader">
          <SectionHeader label={t('usage')} />
        </div>
        <div className="DocsPage__sectionBody">
          <div className="DocsPage__grid">
            <PathCard title="Next.js + SCSS" description={t('usageScss')} />
            <PathCard title="Next.js Tailwind" description={t('usageTailwind')} />
            <PathCard title="Drupal SDC" description={t('usageDrupal')} />
          </div>
        </div>
      </section>

      <section className="DocsPage__section DocsPage__section--featured" id="drupal-sdc">
        <div className="DocsPage__sectionHeader">
          <SectionHeader label={t('drupalSdcTitle')} />
        </div>
        <div className="DocsPage__sectionBody">
          <p className="DocsPage__body DocsPage__lead">{t('drupalSdcBody')}</p>
          <div className="DocsPage__grid DocsPage__grid--two">
            <PathCard title={t('drupalFilesTitle')} description={t('drupalFilesBody')} />
            <PathCard title={t('drupalRenderTitle')} description={t('drupalRenderBody')} />
          </div>
          <CodeBlock
            label={t('drupalStructureLabel')}
            code={`[your-theme]/
  components/
    grid-template/
      grid-template.component.yml
      grid-template.twig
      grid-template.scss`}
          />
          <CodeBlock
            label={t('drupalIncludeLabel')}
            code={`{{ include('THEME-NAME:grid-template', {
  cols: 3,
  cols_medium: 2,
  cols_small: 1,
  items: '<article>Item 1</article><article>Item 2</article><article>Item 3</article>'
}, false) }}`}
          />
          <p className="DocsPage__body DocsPage__references">
            {t.rich('drupalDocsBody', {
              sdc: (chunks) => (
                <a href="https://www.drupal.org/docs/develop/theming-drupal/using-single-directory-components" rel="noreferrer" target="_blank">
                  {chunks}
                </a>
              ),
              create: (chunks) => (
                <a href="https://www.drupal.org/docs/develop/theming-drupal/using-single-directory-components/creating-a-single-directory-component" rel="noreferrer" target="_blank">
                  {chunks}
                </a>
              ),
              api: (chunks) => (
                <a href="https://www.drupal.org/docs/develop/theming-drupal/using-single-directory-components/api-for-single-directory-components" rel="noreferrer" target="_blank">
                  {chunks}
                </a>
              ),
            })}
          </p>
        </div>
      </section>

      <section className="DocsPage__section" id="tokens">
        <div className="DocsPage__sectionHeader">
          <SectionHeader label={t('tokens')} />
        </div>
        <div className="DocsPage__sectionBody">
          <p className="DocsPage__body">{t('tokensBody')}</p>
          <CodeBlock
            label={t('css')}
            code={`:root {
  --pu-card-background: var(--app-color-paper);
  --pu-card-border-color: var(--app-color-line);
  --pu-card-padding: var(--app-space-5);
}`}
          />
        </div>
      </section>

      <section className="DocsPage__section" id="outputs">
        <div className="DocsPage__sectionHeader">
          <SectionHeader label={t('outputs')} />
        </div>
        <div className="DocsPage__sectionBody">
          <div className="DocsPage__grid">
            <PathCard title="Next.js" description={t('outputNext')} />
            <PathCard title="Next.js Tailwind" description={t('outputTailwind')} />
            <PathCard title="Drupal" description={t('outputDrupal')} />
          </div>
        </div>
      </section>
    </article>
  )
}
