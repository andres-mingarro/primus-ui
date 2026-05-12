import './FlavorCard.scss'

type FlavorCardProps = {
  children: React.ReactNode
  file: string
  title: string
}

export function FlavorCard({ children, file, title }: FlavorCardProps) {
  return (
    <article className="app-flavor-card">
      <h3 className="app-flavor-card__title">{title}</h3>
      <p className="app-flavor-card__file">{file}</p>
      <p className="app-flavor-card__body">{children}</p>
    </article>
  )
}
