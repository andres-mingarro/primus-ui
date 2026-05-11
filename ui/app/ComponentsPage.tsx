import Link from 'next/link'
import { components } from '@/lib/components-registry'
import './ComponentsPage.scss'

export function ComponentsPage({ locale }: { locale: string }) {
  return (
    <article className="ComponentsPage">
      <header className="ComponentsPage__hero">
        <p className="ComponentsPage__eyebrow">Component registry</p>
        <h1 className="ComponentsPage__title">Components</h1>
        <p className="ComponentsPage__description">
          Browse the documented Primus UI primitives. Each page explains usage
          paths, props, SCSS variables, and implementation notes.
        </p>
      </header>

      <section className="ComponentsPage__grid" aria-label="Component list">
        {components.map((component) => (
          <Link className="ComponentsPage__card" href={`/${locale}/components/${component.slug}`} key={component.slug}>
            <span className="ComponentsPage__cardTitle">{component.name}</span>
            <span className="ComponentsPage__cardDescription">{component.description}</span>
            <span className="ComponentsPage__cardMeta">v{component.version}</span>
          </Link>
        ))}
      </section>
    </article>
  )
}
