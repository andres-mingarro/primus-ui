'use client'

import { useLocale } from 'next-intl'
import { usePathname, useRouter } from 'next/navigation'
import { routing } from '@/i18n/routing'

export function LanguageSwitcher() {
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()

  function switchLocale(next: string) {
    const segments = pathname.split('/')
    segments[1] = next
    router.push(segments.join('/'))
  }

  return (
    <div
      className="flex items-center overflow-hidden rounded-sm text-[11px]"
      style={{ border: '1px solid color-mix(in srgb, var(--color-on-primary) 30%, transparent)' }}
    >
      {routing.locales.map((l, i) => {
        const isActive = locale === l
        return (
          <button
            key={l}
            onClick={() => switchLocale(l)}
            aria-label={`Switch to ${l === 'en' ? 'English' : 'Español'}`}
            aria-pressed={isActive}
            className="lang-btn min-h-[36px] min-w-[36px] px-2.5 font-mono font-bold uppercase tracking-widest transition-all duration-200"
            style={{
              borderLeft: i > 0
                ? '1px solid color-mix(in srgb, var(--color-on-primary) 30%, transparent)'
                : undefined,
              backgroundColor: isActive
                ? 'color-mix(in srgb, var(--color-on-primary) 20%, transparent)'
                : 'transparent',
              color: isActive
                ? 'var(--color-on-primary)'
                : 'color-mix(in srgb, var(--color-on-primary) 65%, transparent)',
            }}
          >
            {l}
          </button>
        )
      })}
      <style>{`
        .lang-btn:hover {
          background-color: color-mix(in srgb, var(--color-on-primary) 15%, transparent) !important;
          color: var(--color-on-primary) !important;
        }
        .lang-btn:focus-visible {
          outline: 2px solid var(--color-on-primary);
          outline-offset: 2px;
        }
      `}</style>
    </div>
  )
}
