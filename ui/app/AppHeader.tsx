'use client'

import Link from 'next/link'
import { useLocale } from 'next-intl'
import { usePathname, useRouter } from 'next/navigation'
import { routing } from '@/i18n/routing'
import { useTheme } from '@/providers/ThemeProvider'
import './AppHeader.scss'

export function AppHeader() {
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()
  const { theme, toggle } = useTheme()

  function switchLocale(nextLocale: string) {
    const segments = pathname.split('/')
    segments[1] = nextLocale
    router.push(segments.join('/'))
  }

  return (
    <header className="AppHeader">
      <Link className="AppHeader__brand" href={`/${locale}`} aria-label="Primus UI home">
        <span className="AppHeader__mark" aria-hidden="true" />
        <span className="AppHeader__wordmark">Primus UI</span>
      </Link>

      <nav className="AppHeader__nav" aria-label="Global navigation">
        <Link className="AppHeader__link" href={`/${locale}/docs`}>
          Docs
        </Link>
        <Link className="AppHeader__link" href={`/${locale}/components`}>
          Components
        </Link>
        <a className="AppHeader__link" href="https://github.com" target="_blank" rel="noreferrer">
          GitHub
        </a>

        <div className="AppHeader__localeGroup" aria-label="Language">
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
          {theme === 'dark' ? 'Light' : 'Dark'}
        </button>
      </nav>
    </header>
  )
}
