import './PathCard.scss'

type PathCardProps = {
  code?: string
  description?: string
  title: string
}

export function PathCard({ code, description, title }: PathCardProps) {
  return (
    <article className="app-path-card">
      <h3 className="app-path-card__title">{title}</h3>
      {description ? (
        <p className="app-path-card__description">{description}</p>
      ) : null}
      {code ? <code className="app-path-card__code">{code}</code> : null}
    </article>
  )
}
