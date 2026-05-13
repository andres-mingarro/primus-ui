import { useTranslations } from 'next-intl'
import { components } from '@/lib/components-registry'
import { SectionHeader } from '@/ui/components/basics/SectionHeader/SectionHeader'
import { ComponentCard } from '@/ui/components/feature/ComponentCard/ComponentCard'
import { FlavorCard } from '@/ui/components/feature/FlavorCard/FlavorCard'
import { HomeHero } from '@/ui/components/segment/HomeHero/HomeHero'
import './HomePage.scss'

export function HomePage({ locale }: { locale: string }) {
  const t = useTranslations('home')
  const tc = useTranslations('componentDescriptions')

  return (
    <div className="HomePage">
      <HomeHero
        componentsHref={`/${locale}/components`}
        componentsLabel={t('componentsSection')}
        docsHref={`/${locale}/docs`}
        eyebrow="Primus UI"
        outputsLabel={t('outputs')}
        primaryLabel={t('howToUse')}
        tagline={t('tagline')}
        title={t('title')}
        version={t('version')}
      />

      <section className="app-section app-section--dark" id="usage">
        <SectionHeader label={t('howToUse')} tone="dark" />
        <div className="HomePage__copyGrid">
          <p>{t('howToUseP1')}</p>
          <p>{t('howToUseP2')}</p>
        </div>
      </section>

      <section className="app-section" id="install">
        <SectionHeader label={t('quickStart')} />
        <ol className="HomePage__steps">
          {(['step1', 'step2', 'step3', 'step4'] as const).map((step, index) => (
            <li className="HomePage__step" key={step}>
              <span className="HomePage__stepNumber">{index + 1}</span>
              <span>{t(step)}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="app-section HomePage__stacks" id="tokens">
        <SectionHeader label={t('stacks')} />
        <div className="HomePage__flavors">
          <FlavorCard marker="01" title={t('flavorScssTitle')} file="Component.tsx + component.scss">
            {t('flavorScssDesc')}
          </FlavorCard>
          <FlavorCard marker="02" title={t('flavorTailwindTitle')} file="Component.tailwind.tsx">
            {t('flavorTailwindDesc')}
          </FlavorCard>
          <FlavorCard marker="03" title={t('flavorDrupalTitle')} file="drupal/component.twig">
            {t('flavorDrupalDesc')}
          </FlavorCard>
        </div>
      </section>

      <section className="app-section app-section--paper" id="components">
        <SectionHeader label={t('componentsSection')} />
        <div className="HomePage__componentGrid">
          {components.map((component) => (
            <ComponentCard
              description={tc(component.slug)}
              href={`/${locale}/components/${component.slug}`}
              key={component.slug}
              name={component.name}
              version={component.version}
            />
          ))}
        </div>
      </section>
    </div>
  )
}
