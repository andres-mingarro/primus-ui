import { useTranslations } from 'next-intl'
import { components } from '@/lib/components-registry'
import { GridTemplate } from '@/ui/components/basics/GridTemplate/GridTemplate'
import { ComponentCard } from '@/ui/components/feature/ComponentCard/ComponentCard'
import './ComponentsPage.scss'

export function ComponentsPage({ locale }: { locale: string }) {
  const t = useTranslations('componentsPage')
  const tc = useTranslations('componentDescriptions')

  return (
    <article className="ComponentsPage">
      <header className="ComponentsPage__hero">
        <p className="ComponentsPage__eyebrow">{t('eyebrow')}</p>
        <h1 className="ComponentsPage__title">{t('title')}</h1>
        <p className="ComponentsPage__description">{t('description')}</p>
      </header>

      <section aria-label={t('listLabel')}>
        <GridTemplate cols={2} colsMedium={2} colsSmall={1}>
          {components.map((component) => (
            <ComponentCard
              description={tc(component.slug)}
              href={`/${locale}/components/${component.slug}`}
              key={component.slug}
              name={component.name}
              version={component.version}
            />
          ))}
        </GridTemplate>
      </section>
    </article>
  )
}
