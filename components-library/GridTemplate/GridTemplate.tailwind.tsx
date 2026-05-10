import { CSSProperties, ReactNode } from 'react'
import { cn } from '@/lib/utils'

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
      className={cn(
        'grid',
        '[grid-template-columns:repeat(var(--pu-grid-template-cols),1fr)]',
        'max-[768px]:[grid-template-columns:repeat(var(--pu-grid-template-cols-md),1fr)]',
        'max-[480px]:[grid-template-columns:repeat(var(--pu-grid-template-cols-sm),1fr)]',
        gap ? 'gap-6' : 'gap-0',
        addClassName,
      )}
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
