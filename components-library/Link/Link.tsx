import type { ReactNode } from 'react'
import './link.scss'

export interface LinkProps {
  href: string
  children?: ReactNode
  text?: string
  addClassName?: string
  assistiveHidden?: boolean
  openInNewTab?: boolean
  supplementalText?: string
}

export function Link({
  href,
  children,
  text,
  addClassName,
  assistiveHidden = false,
  openInNewTab = false,
  supplementalText,
}: LinkProps) {
  const resolvedSupplementalText =
    openInNewTab && !supplementalText ? 'Opens in new tab' : supplementalText

  return (
    <a
      href={href}
      aria-hidden={assistiveHidden || undefined}
      tabIndex={assistiveHidden ? -1 : undefined}
      target={openInNewTab ? '_blank' : undefined}
      rel={openInNewTab ? 'noreferrer' : undefined}
      className={['pu-link', addClassName].filter(Boolean).join(' ')}
    >
      {children ?? text}
      {resolvedSupplementalText && (
        <span className="pu-visually-hidden">{resolvedSupplementalText}</span>
      )}
    </a>
  )
}
