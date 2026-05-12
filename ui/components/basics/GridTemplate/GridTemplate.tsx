import type { CSSProperties, ReactNode } from 'react'
import './GridTemplate.scss'

type GridTemplateProps = {
  children: ReactNode
  addClassName?: string
  cols?: number
  colsMedium?: number
  colsSmall?: number
  gap?: boolean
}

export function GridTemplate({
  children,
  addClassName,
  cols = 3,
  colsMedium = 2,
  colsSmall = 1,
  gap = true,
}: GridTemplateProps) {
  return (
    <div
      className={[
        'app-grid-template',
        gap ? 'app-grid-template--gap' : 'app-grid-template--no-gap',
        addClassName,
      ].filter(Boolean).join(' ')}
      style={{
        '--app-grid-template-cols': cols,
        '--app-grid-template-cols-md': colsMedium,
        '--app-grid-template-cols-sm': colsSmall,
      } as CSSProperties}
    >
      {children}
    </div>
  )
}
