import Link from 'next/link'
import './ComponentCard.scss'

type ComponentCardProps = {
  description: string
  href: string
  name: string
  version: string
}

export function ComponentCard({
  description,
  href,
  name,
  version,
}: ComponentCardProps) {
  return (
    <Link className="app-component-card" href={href}>
      <span className="app-component-card__header">
        <span className="app-component-card__name">{name}</span>
      </span>
      <span className="app-component-card__description">{description}</span>
      <span className="app-component-card__footer">
        <span className="app-component-card__meta">v{version}</span>
        <span className="app-component-card__arrow" aria-hidden="true" />
      </span>
    </Link>
  )
}
