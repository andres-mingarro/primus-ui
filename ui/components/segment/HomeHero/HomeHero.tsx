import { AppButton } from '@/ui/components/basics/AppButton/AppButton'
import { StackBadge } from '@/ui/components/basics/StackBadge/StackBadge'
import './HomeHero.scss'

type HomeHeroProps = {
  componentsLabel: string
  componentsHref: string
  docsHref: string
  eyebrow: string
  outputsLabel: string
  primaryLabel: string
  tagline: string
  title: string
  version: string
}

export function HomeHero({
  componentsLabel,
  componentsHref,
  docsHref,
  eyebrow,
  outputsLabel,
  primaryLabel,
  tagline,
  title,
  version,
}: HomeHeroProps) {
  return (
    <section className="HomeHero">
      <div className="HomeHero__copy">
        <p className="HomeHero__eyebrow">
          {eyebrow} {version}
        </p>
        <h1 className="HomeHero__title">{title}</h1>
        <p className="HomeHero__tagline">{tagline}</p>
        <div className="HomeHero__actions">
          <AppButton href={docsHref} variant="primary">
            {primaryLabel}
          </AppButton>
          <AppButton href={componentsHref}>
            {componentsLabel}
          </AppButton>
        </div>
      </div>

      <div className="HomeHero__panel" aria-label={outputsLabel}>
        <span className="HomeHero__panelLabel">{outputsLabel}</span>
        <StackBadge>Next.js</StackBadge>
        <StackBadge>Next.js Tailwind</StackBadge>
        <StackBadge>Drupal SDC</StackBadge>
      </div>
    </section>
  )
}
