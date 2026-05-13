import { useTranslations } from 'next-intl'
import { CodeBlock } from '@/ui/components/basics/CodeBlock/CodeBlock'
import { TabItem, TabPanel, Tabs, TabsContent, TabsItems } from '@/ui/components/basics/Tabs/Tabs'
import { PathCard } from '@/ui/components/feature/PathCard/PathCard'
import { HomeHero } from '@/ui/components/segment/HomeHero/HomeHero'
import './DocsPage.scss'

export function DocsPage({ locale }: { locale: string }) {
  const t = useTranslations('docsPage')
  const th = useTranslations('home')

  return (
    <article className="DocsPage">
      <HomeHero
        componentsHref={`/${locale}/components`}
        componentsLabel={th('componentsSection')}
        docsHref={`/${locale}#installation`}
        eyebrow="Primus UI"
        outputsLabel={th('outputs')}
        primaryLabel={th('howToUse')}
        tagline={th('tagline')}
        title={th('title')}
        version={th('version')}
      />

      <section className="DocsPage__section" id="installation">
        <h2 className="app-section-title">{t('installation')}</h2>
        <div className="DocsPage__sectionBody">
          <p className="DocsPage__body">
            {t.rich('installationBody', {
              code: (chunks) => <code>{chunks}</code>,
            })}
          </p>
          <Tabs defaultValue="next" label={t('installation')}>
            <TabsItems>
              <TabItem value="next">Next.js</TabItem>
              <TabItem value="tailwind">Next.js + Tailwind</TabItem>
              <TabItem value="drupal">Drupal</TabItem>
            </TabsItems>

            <TabsContent>
              <TabPanel value="next">
                <div className="DocsPage__installer">
                  <ol className="DocsPage__steps">
                    <li>{t('installReactCssStep1')}</li>
                    <li>{t('installReactCssStep2')}</li>
                    <li>{t('installReactCssStep3')}</li>
                  </ol>
                  <CodeBlock
                    label="Next.js + SCSS"
                    code={`components-library/Card/\n  Card.tsx\n  card.scss\n  meta.ts\n  README.md`}
                  />
                </div>
              </TabPanel>

              <TabPanel value="tailwind">
                <div className="DocsPage__installer">
                  <ol className="DocsPage__steps">
                    <li>{t('installTailwindStep1')}</li>
                    <li>{t('installTailwindStep2')}</li>
                    <li>{t('installTailwindStep3')}</li>
                  </ol>
                  <CodeBlock
                    label="Next.js + Tailwind"
                    code={`components-library/Card/\n  Card.tailwind.tsx\n  meta.ts\n  README.md`}
                  />
                </div>
              </TabPanel>

              <TabPanel value="drupal">
                <div className="DocsPage__installer">
                  <ol className="DocsPage__steps">
                    <li>{t('installDrupalStep1')}</li>
                    <li>{t('installDrupalStep2')}</li>
                    <li>{t('installDrupalStep3')}</li>
                  </ol>
                  <CodeBlock
                    label="Drupal SDC"
                    code={`components-library/Card/drupal/\n  card.component.yml\n  card.twig\n  card.scss`}
                  />
                  <p className="DocsPage__body">{t('drupalSdcBody')}</p>
                  <div className="DocsPage__grid DocsPage__grid--two">
                    <PathCard title={t('drupalFilesTitle')} description={t('drupalFilesBody')} />
                    <PathCard title={t('drupalRenderTitle')} description={t('drupalRenderBody')} />
                  </div>
                  <CodeBlock
                    label={t('drupalIncludeLabel')}
                    code={`{{ include('THEME-NAME:grid-template', {\n  cols: 3,\n  cols_medium: 2,\n  cols_small: 1,\n  items: '<article>Item 1</article><article>Item 2</article>'\n}, false) }}`}
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
              </TabPanel>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <section className="DocsPage__section" id="tokens">
        <h2 className="app-section-title">{t('tokens')}</h2>
        <div className="DocsPage__sectionBody">
          <p className="DocsPage__body">{t('tokensBody')}</p>
          <CodeBlock
            label={t('css')}
            code={`:root {\n  --pu-card-background: var(--app-color-paper);\n  --pu-card-border-color: var(--app-color-line);\n  --pu-card-padding: var(--app-space-5);\n}`}
          />
        </div>
      </section>
    </article>
  )
}
