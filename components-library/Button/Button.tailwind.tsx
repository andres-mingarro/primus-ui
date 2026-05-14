import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/utils'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline' | 'danger' | 'link'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonBaseProps {
  children?: ReactNode
  variant?: ButtonVariant
  size?: ButtonSize
  icon?: ReactNode
  iconRight?: ReactNode
  addClassName?: string
}

type ButtonAsButton = ButtonBaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps> & {
    as?: 'button'
    href?: never
  }

type ButtonAsAnchor = ButtonBaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof ButtonBaseProps> & {
    as: 'a'
    href?: string
  }

export type ButtonProps = ButtonAsButton | ButtonAsAnchor

const variantClasses: Record<ButtonVariant, string> = {
  primary:   'bg-orange-600 hover:bg-orange-700 text-white border-transparent',
  secondary: 'bg-white hover:bg-stone-50 text-stone-900 border-stone-300 hover:border-stone-400',
  ghost:     'bg-transparent hover:bg-stone-100 text-stone-900 border-transparent',
  outline:   'bg-transparent hover:bg-orange-600 text-orange-600 hover:text-white border-orange-600',
  danger:    'bg-red-600 hover:bg-red-700 text-white border-transparent',
  link:      'bg-transparent text-orange-600 hover:text-orange-700 underline underline-offset-2 border-transparent p-0 h-auto',
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'h-8 px-3 text-xs',
  md: 'h-11 px-5 text-sm',
  lg: 'h-13 px-7 text-base',
}

export function Button(props: ButtonProps) {
  const {
    children,
    variant = 'primary',
    size = 'md',
    icon,
    iconRight,
    addClassName,
    as,
    ...rest
  } = props

  const isLink = variant === 'link'

  const className = cn(
    'inline-flex items-center justify-center gap-2 rounded-md font-semibold whitespace-nowrap transition-colors cursor-pointer border',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-600 focus-visible:ring-offset-2',
    'disabled:opacity-50 disabled:pointer-events-none',
    variantClasses[variant],
    !isLink && sizeClasses[size],
    addClassName,
  )

  const content = (
    <>
      {icon && <span className="inline-flex shrink-0 items-center justify-center">{icon}</span>}
      {children}
      {iconRight && <span className="inline-flex shrink-0 items-center justify-center">{iconRight}</span>}
    </>
  )

  if (as === 'a') {
    const { href, ...anchorRest } = rest as Omit<ButtonAsAnchor, keyof ButtonBaseProps | 'as'>
    return (
      <a href={href} className={className} {...anchorRest}>
        {content}
      </a>
    )
  }

  const { disabled, ...buttonRest } = rest as Omit<ButtonAsButton, keyof ButtonBaseProps | 'as'>
  return (
    <button disabled={disabled} className={className} {...buttonRest}>
      {content}
    </button>
  )
}
