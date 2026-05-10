import { CSSProperties, ReactNode } from 'react'
import './grid-template.scss'

export interface GridTemplateProps {
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
        'pu-grid-template',
        gap ? 'pu-grid-template--gap' : 'pu-grid-template--no-gap',
        addClassName,
      ].filter(Boolean).join(' ')}
      style={{
        '--pu-grid-template-cols': cols,
        '--pu-grid-template-cols-md': colsMedium,
        '--pu-grid-template-cols-sm': colsSmall,
      } as CSSProperties}
    >
      {children}
    </div>
  )
}
