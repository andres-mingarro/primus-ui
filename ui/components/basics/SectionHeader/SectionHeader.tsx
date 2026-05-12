import './SectionHeader.scss'

type SectionHeaderProps = {
  label: string
  tone?: 'light' | 'dark'
}

export function SectionHeader({ label, tone = 'light' }: SectionHeaderProps) {
  return (
    <div className={`app-section-header app-section-header--${tone}`}>
      <span className="app-section-header__rule" aria-hidden="true" />
      <h2 className="app-section-header__title">{label}</h2>
    </div>
  )
}
