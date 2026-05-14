'use client'

import type { AnchorHTMLAttributes, ButtonHTMLAttributes, MouseEvent, ReactNode } from 'react'
import './button.scss'

function spawnRipple(e: MouseEvent<HTMLElement>) {
  const el = e.currentTarget
  const rect = el.getBoundingClientRect()
  const size = Math.max(rect.width, rect.height)
  const x = e.clientX - rect.left - size / 2
  const y = e.clientY - rect.top - size / 2
  const span = document.createElement('span')
  span.className = 'pu-button__ripple'
  span.style.cssText = `width:${size}px;height:${size}px;left:${x}px;top:${y}px`
  el.appendChild(span)
  span.addEventListener('animationend', () => span.remove(), { once: true })
}

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

  const className = ['pu-button', addClassName].filter(Boolean).join(' ')

  const content = (
    <>
      {icon && <span className="pu-button__icon">{icon}</span>}
      {children}
      {iconRight && <span className="pu-button__icon pu-button__icon--right">{iconRight}</span>}
    </>
  )

  if (as === 'a') {
    const { href, onClick, ...anchorRest } = rest as Omit<ButtonAsAnchor, keyof ButtonBaseProps | 'as'>
    return (
      <a
        href={href}
        className={className}
        data-variant={variant}
        data-size={size}
        onClick={(e) => {
          spawnRipple(e)
          onClick?.(e)
        }}
        {...anchorRest}
      >
        {content}
      </a>
    )
  }

  const { disabled, onClick, ...buttonRest } = rest as Omit<ButtonAsButton, keyof ButtonBaseProps | 'as'>
  return (
    <button
      disabled={disabled}
      className={className}
      data-variant={variant}
      data-size={size}
      onClick={(e) => {
        if (disabled) return
        spawnRipple(e)
        onClick?.(e)
      }}
      {...buttonRest}
    >
      {content}
    </button>
  )
}
