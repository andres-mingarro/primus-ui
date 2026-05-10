import { ReactNode } from 'react'
import './section-container.scss'

export interface SectionContainerProps {
  children: ReactNode
  container?: 'small' | 'large' | 'full'
  gap?: boolean
  mobileGap?: 'small' | 'large' | 'none'
  tag?: 'section' | 'div' | 'article' | 'main'
  addClassName?: string
}

export function SectionContainer({
  children,
  container = 'large',
  gap = true,
  mobileGap = 'small',
  tag: Tag = 'section',
  addClassName,
}: SectionContainerProps) {
  const innerClasses = [
    'pu-section-container__inner',
    gap ? 'pu-section-container__inner--gap' : 'pu-section-container__inner--no-gap',
    mobileGap === 'large' ? 'pu-section-container__inner--mobile-large' : null,
    mobileGap === 'none' ? 'pu-section-container__inner--mobile-none' : null,
  ].filter(Boolean).join(' ')

  return (
    <Tag
      className={[
        'pu-section-container',
        `pu-section-container--${container}`,
        addClassName,
      ].filter(Boolean).join(' ')}
    >
      <div className={innerClasses}>
        {children}
      </div>
    </Tag>
  )
}
