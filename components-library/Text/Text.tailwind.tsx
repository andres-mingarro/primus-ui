import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

const ALLOWED_TAGS = ['span', 'label', 'p', 'div'] as const
type AllowedTag = typeof ALLOWED_TAGS[number]

const ALLOWED_SIZES = ['sm', 'md', 'lg', 'xl'] as const
type TextSize = typeof ALLOWED_SIZES[number]

const SIZE_CLASSES: Record<TextSize, string> = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
}

const MOBILE_SIZE_CLASSES: Record<TextSize, string> = {
  sm: 'max-[768px]:text-sm',
  md: 'max-[768px]:text-base',
  lg: 'max-[768px]:text-lg',
  xl: 'max-[768px]:text-xl',
}

const ALLOWED_WEIGHTS = ['light', 'regular', 'medium', 'bold'] as const
type TextWeight = typeof ALLOWED_WEIGHTS[number]

const WEIGHT_CLASSES: Record<TextWeight, string> = {
  light:   'font-light',
  regular: 'font-normal',
  medium:  'font-medium',
  bold:    'font-bold',
}

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
    <Tag className={cn(
      size ? SIZE_CLASSES[size] : '',
      mobileSize ? MOBILE_SIZE_CLASSES[mobileSize] : '',
      weight ? WEIGHT_CLASSES[weight] : '',
      addClassName,
    ) || undefined}>
      {children ?? text}
    </Tag>
  )
}
