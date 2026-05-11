import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { components } from '@/lib/components-registry'
import './HomePage.scss'

export function HomePage({ locale }: { locale: string }) {
  const t = useTranslations('home')

  return (
    <div className="HomePage">
      <section className="HomePage__hero">
        <div className="HomePage__heroCopy">
          <p className="HomePage__eyebrow">Primus UI {t('version')}</p>
          <h1 className="HomePage__title">{t('title')}</h1>
          <p className="HomePage__tagline">{t('tagline')}</p>
          <div className="HomePage__actions">
            <Link className="HomePage__button HomePage__button--primary" href={`/${locale}/docs`}>
              {t('howToUse')}
            </Link>
            <Link className="HomePage__button" href={`/${locale}/components`}>
              {t('componentsSection')}
            </Link>
          </div>
        </div>

        <div className="HomePage__heroPanel" aria-label="Primus UI outputs">
          <span className="HomePage__panelLabel">Outputs</span>
          <div className="HomePage__stack">Next.js</div>
          <div className="HomePage__stack">Next.js Tailwind</div>
          <div className="HomePage__stack">Drupal SDC</div>
        </div>
      </section>

      <section className="HomePage__band HomePage__band--dark" id="usage">
        <SectionHeader label={t('howToUse')} tone="dark" />
        <div className="HomePage__copyGrid">
          <p>{t('howToUseP1')}</p>
          <p>{t('howToUseP2')}</p>
        </div>
      </section>

      <section className="HomePage__band" id="install">
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

      <section className="HomePage__band" id="tokens">
        <SectionHeader label="Stacks" />
        <div className="HomePage__flavors">
          <FlavorCard title={t('flavorScssTitle')} file="Component.tsx + component.scss">
            {t('flavorScssDesc')}
          </FlavorCard>
          <FlavorCard title={t('flavorTailwindTitle')} file="Component.tailwind.tsx">
            {t('flavorTailwindDesc')}
          </FlavorCard>
          <FlavorCard title={t('flavorDrupalTitle')} file="drupal/component.twig">
            {t('flavorDrupalDesc')}
          </FlavorCard>
        </div>
      </section>

      <section className="HomePage__band HomePage__band--paper" id="components">
        <SectionHeader label={t('componentsSection')} />
        <div className="HomePage__componentGrid">
          {components.map((component) => (
            <Link className="HomePage__componentCard" href={`/${locale}/components/${component.slug}`} key={component.slug}>
              <span className="HomePage__componentName">{component.name}</span>
              <span className="HomePage__componentDescription">{component.description}</span>
              <span className="HomePage__componentMeta">v{component.version}</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}

function SectionHeader({ label, tone = 'light' }: { label: string; tone?: 'light' | 'dark' }) {
  return (
    <header className={`SectionHeader SectionHeader--${tone}`}>
      <span className="SectionHeader__rule" aria-hidden="true" />
      <h2 className="SectionHeader__title">{label}</h2>
    </header>
  )
}

function FlavorCard({
  title,
  file,
  children,
}: {
  title: string
  file: string
  children: React.ReactNode
}) {
  return (
    <article className="FlavorCard">
      <h3 className="FlavorCard__title">{title}</h3>
      <p className="FlavorCard__file">{file}</p>
      <p className="FlavorCard__body">{children}</p>
    </article>
  )
}
