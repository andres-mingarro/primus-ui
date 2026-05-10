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
    <div className="flex items-center rounded-md border border-brand-200 text-xs dark:border-brand-800">
      {routing.locales.map((l, i) => (
        <button
          key={l}
          onClick={() => switchLocale(l)}
          aria-label={`Switch to ${l === 'en' ? 'English' : 'Español'}`}
          className={[
            'px-2 py-1 font-medium uppercase transition-colors',
            i === 0 ? 'rounded-l-md' : 'rounded-r-md',
            locale === l
              ? 'bg-brand-900 text-brand-50 dark:bg-brand-50 dark:text-brand-900'
              : 'text-brand-700 hover:text-brand-900 dark:text-brand-200 dark:hover:text-brand-50',
          ].join(' ')}
        >
          {l}
        </button>
      ))}
    </div>
  )
}
