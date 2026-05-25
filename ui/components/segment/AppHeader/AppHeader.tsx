'use client'

import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import { usePathname, useRouter } from 'next/navigation'
import { routing } from '@/i18n/routing'
import { useTheme } from '@/providers/ThemeProvider'
import './AppHeader.scss'

export function AppHeader() {
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()
  const t = useTranslations('nav')
  const { theme, toggle } = useTheme()

  function switchLocale(nextLocale: string) {
    const segments = pathname.split('/')
    segments[1] = nextLocale
    router.push(segments.join('/'))
  }

  return (
    <header className="AppHeader">
      <div className="AppHeader__inner">
        <Link className="AppHeader__brand" href={`/${locale}`} aria-label={t('homeLabel')}>
          <span className="AppHeader__mark" aria-hidden="true" />
          <span className="AppHeader__wordmark">Primus UI</span>
        </Link>

        <nav className="AppHeader__nav" aria-label={t('globalNavigation')}>
          <a className="AppHeader__link" href="https://github.com/andres-mingarro/primus-ui" target="_blank" rel="noreferrer">
            {t('github')}
          </a>

          <div className="AppHeader__localeGroup" aria-label={t('language')}>
            {routing.locales.map((item) => (
              <button
                className={[
                  'AppHeader__locale',
                  item === locale ? 'AppHeader__locale--active' : '',
                ].filter(Boolean).join(' ')}
                type="button"
                aria-pressed={item === locale}
                onClick={() => switchLocale(item)}
                key={item}
              >
                {item}
              </button>
            ))}
          </div>

          <button className="AppHeader__theme" type="button" onClick={toggle}>
            {theme === 'dark' ? t('light') : t('dark')}
          </button>
        </nav>
      </div>
    </header>
  )
}
