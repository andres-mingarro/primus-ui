import './text.scss'
import type { ReactNode } from 'react'

const ALLOWED_TAGS = ['span', 'label', 'p', 'div'] as const
type AllowedTag = typeof ALLOWED_TAGS[number]

const ALLOWED_SIZES = ['sm', 'md', 'lg', 'xl'] as const
type TextSize = typeof ALLOWED_SIZES[number]

const ALLOWED_WEIGHTS = ['light', 'regular', 'medium', 'bold'] as const
type TextWeight = typeof ALLOWED_WEIGHTS[number]

export interface TextProps {
  tag?: AllowedTag
  children?: ReactNode
  text?: string
  addClassName?: string
  size?: TextSize
  mobileSize?: TextSize
  weight?: TextWeight
}

export function Text({ tag = 'span', children, text, addClassName, size, mobileSize, weight }: TextProps) {
  const Tag = ALLOWED_TAGS.includes(tag) ? tag : 'span'
  return (
    <Tag className={[
      'pu-text',
      size ? `pu-text--size-${size}` : '',
      mobileSize ? `pu-text--mobile-${mobileSize}` : '',
      weight ? `pu-text--weight-${weight}` : '',
      addClassName,
    ].filter(Boolean).join(' ')}>
      {children ?? text}
    </Tag>
  )
}
