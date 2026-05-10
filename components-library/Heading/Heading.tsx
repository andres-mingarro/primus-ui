import './heading.scss'
import type { ReactNode } from 'react'

const ALLOWED_VARIANTS = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const
type HeadingVariant = typeof ALLOWED_VARIANTS[number]

const ALLOWED_WEIGHTS = ['normal', 'thin', 'bold'] as const
type HeadingWeight = typeof ALLOWED_WEIGHTS[number]

export interface HeadingProps {
  variant: HeadingVariant
  children?: ReactNode
  weight?: HeadingWeight
  html?: boolean
  addClassName?: string
}

export function Heading({ variant, children, weight, html = false, addClassName }: HeadingProps) {
  const Tag = ALLOWED_VARIANTS.includes(variant) ? variant : 'h2'

  const classes = [
    'pu-heading',
    `pu-heading--${Tag}`,
    weight && weight !== 'normal' ? `pu-heading--${weight}` : '',
    addClassName,
  ].filter(Boolean).join(' ')

  if (html && typeof children === 'string') {
    const htmlContent = children.replace(/<\/?p[^>]*>/g, '')
    return <Tag className={classes} dangerouslySetInnerHTML={{ __html: htmlContent }} />
  }

  return <Tag className={classes}>{children}</Tag>
}
