import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

const ALLOWED_VARIANTS = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const
type HeadingVariant = typeof ALLOWED_VARIANTS[number]

const SIZE_CLASSES: Record<HeadingVariant, string> = {
  h1: 'text-4xl',
  h2: 'text-3xl',
  h3: 'text-2xl',
  h4: 'text-xl',
  h5: 'text-lg',
  h6: 'text-base',
}

const WEIGHT_CLASSES: Record<string, string> = {
  thin:   'font-thin',
  normal: 'font-normal',
  bold:   'font-bold',
}

export interface HeadingProps {
  variant: HeadingVariant
  children?: ReactNode
  weight?: 'normal' | 'thin' | 'bold'
  html?: boolean
  addClassName?: string
}

export function Heading({ variant, children, weight = 'normal', html = false, addClassName }: HeadingProps) {
  const Tag = ALLOWED_VARIANTS.includes(variant) ? variant : 'h2'

  const classes = cn(
    SIZE_CLASSES[Tag],
    WEIGHT_CLASSES[weight],
    addClassName,
  )

  if (html && typeof children === 'string') {
    const htmlContent = children.replace(/<\/?p[^>]*>/g, '')
    return <Tag className={classes} dangerouslySetInnerHTML={{ __html: htmlContent }} />
  }

  return <Tag className={classes}>{children}</Tag>
}
