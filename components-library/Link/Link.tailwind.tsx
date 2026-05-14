import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

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
      className={cn(
        'text-blue-600 no-underline transition-colors duration-150',
        'hover:text-blue-700 hover:underline',
        'visited:text-purple-600',
        'focus-visible:text-blue-700 focus-visible:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700',
        'active:text-blue-800',
        addClassName,
      )}
    >
      {children ?? text}
      {resolvedSupplementalText && (
        <span className="sr-only">{resolvedSupplementalText}</span>
      )}
    </a>
  )
}
