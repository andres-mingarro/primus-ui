import type { ReactNode } from 'react'
import './FlavorCard.scss'

type FlavorCardProps = {
  children: ReactNode
  file: string
  marker: string
  title: string
}

export function FlavorCard({ children, file, marker, title }: FlavorCardProps) {
  return (
    <article className="app-flavor-card">
      <span className="app-flavor-card__marker" aria-hidden="true">
        {marker}
      </span>
      <div className="app-flavor-card__content">
        <h3 className="app-flavor-card__title">{title}</h3>
        <p className="app-flavor-card__body">{children}</p>
      </div>
      <p className="app-flavor-card__file">{file}</p>
    </article>
  )
}
