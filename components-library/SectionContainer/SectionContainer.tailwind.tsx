import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export interface SectionContainerProps {
  children: ReactNode
  container?: 'small' | 'large' | 'full'
  gap?: boolean
  mobileGap?: 'small' | 'large' | 'none'
  tag?: 'section' | 'div' | 'article' | 'main'
  addClassName?: string
}

const CONTAINER_CLASSES = {
  small: 'max-w-3xl',
  large: 'max-w-7xl',
  full:  'max-w-none',
}

const MOBILE_GAP_CLASSES = {
  small: 'px-4',
  large: 'max-[768px]:px-6',
  none:  'max-[768px]:px-0',
}

export function SectionContainer({
  children,
  container = 'large',
  gap = true,
  mobileGap = 'small',
  tag: Tag = 'section',
  addClassName,
}: SectionContainerProps) {
  return (
    <Tag className={cn('w-full mx-auto mb-8', CONTAINER_CLASSES[container], addClassName)}>
      <div className={cn(gap ? 'px-4' : 'px-0', MOBILE_GAP_CLASSES[mobileGap])}>
        {children}
      </div>
    </Tag>
  )
}
