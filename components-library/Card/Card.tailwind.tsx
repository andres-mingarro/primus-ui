import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

export interface CardProps {
  title: string
  url?: string
  style?: 'light' | 'high-contrast' | 'dark'
  direction?: 'vertical' | 'horizontal' | 'horizontal-reverse'
  image?: { src: string; alt: string }
  buttonPrimary?: string
  buttonPrimaryUrl?: string
  buttonSecondary?: string
  buttonSecondaryUrl?: string
  children?: ReactNode
  addClassName?: string
}

const STYLE_CLASSES: Record<string, string> = {
  light:         'bg-white text-gray-900 border border-gray-200',
  dark:          'bg-gray-900 text-gray-50 border border-gray-700',
  'high-contrast': 'bg-slate-950 text-slate-50 border border-slate-800',
}

const BODY_COLOR_CLASSES: Record<string, string> = {
  light:         'text-gray-600',
  dark:          'text-gray-300',
  'high-contrast': 'text-slate-300',
}

const BTN_SECONDARY_CLASSES: Record<string, string> = {
  light:         'border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white',
  dark:          'border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white',
  'high-contrast': 'border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white',
}

const BTN_PRIMARY_CLASSES: Record<string, string> = {
  light:         'bg-blue-600 text-white hover:bg-blue-700',
  dark:          'bg-blue-600 text-white hover:bg-blue-700',
  'high-contrast': 'bg-slate-50 text-slate-950 hover:bg-slate-200',
}

export function Card({
  title,
  url,
  style = 'light',
  direction = 'vertical',
  image,
  buttonPrimary,
  buttonPrimaryUrl,
  buttonSecondary,
  buttonSecondaryUrl,
  children,
  addClassName,
}: CardProps) {
  const isHorizontal = direction === 'horizontal' || direction === 'horizontal-reverse'
  const isReversed = direction === 'horizontal-reverse'
  const hasFooter = buttonPrimary || buttonSecondary

  return (
    <article
      className={cn(
        'flex flex-col overflow-hidden rounded-lg',
        STYLE_CLASSES[style],
        addClassName,
      )}
    >
      <div
        className={cn(
          'flex flex-1',
          isHorizontal ? (isReversed ? 'flex-row-reverse' : 'flex-row') : 'flex-col',
        )}
      >
        {image && (
          <div
            className={cn(
              'shrink-0',
              isHorizontal ? 'w-48' : '',
            )}
          >
            <img
              src={image.src}
              alt={image.alt}
              className={cn(
                'block w-full object-cover',
                isHorizontal ? 'h-full' : 'h-48',
              )}
            />
          </div>
        )}
        <div className="flex flex-1 flex-col gap-3 p-5">
          <div className="flex flex-1 flex-col gap-3">
            <h2 className="text-lg font-semibold leading-snug">
              {url ? (
                <a
                  href={url}
                  className="hover:underline focus-visible:rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current"
                >
                  {title}
                </a>
              ) : (
                title
              )}
            </h2>
            {children && (
              <div className={cn('text-sm leading-relaxed', BODY_COLOR_CLASSES[style])}>
                {children}
              </div>
            )}
          </div>
          {hasFooter && (
            <div className="mt-auto flex flex-wrap gap-2">
              {buttonPrimary && (
                <a
                  href={buttonPrimaryUrl ?? '#'}
                  className={cn(
                    'inline-flex min-h-[44px] items-center justify-center rounded px-4 py-2 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current',
                    BTN_PRIMARY_CLASSES[style],
                  )}
                >
                  {buttonPrimary}
                </a>
              )}
              {buttonSecondary && (
                <a
                  href={buttonSecondaryUrl ?? '#'}
                  className={cn(
                    'inline-flex min-h-[44px] items-center justify-center rounded border px-4 py-2 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current',
                    BTN_SECONDARY_CLASSES[style],
                  )}
                >
                  {buttonSecondary}
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </article>
  )
}
