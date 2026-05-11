'use client'

import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import { usePathname } from 'next/navigation'
import { components } from '@/lib/components-registry'
import './AppSidebar.scss'

const docs = [
  { id: 'intro', label: 'Introduction', href: '/docs' },
  { id: 'install', label: 'Installation', href: '/docs#installation' },
  { id: 'usage', label: 'Usage', href: '/docs#usage' },
  { id: 'tokens', label: 'Theming / Tokens', href: '/docs#tokens' },
  { id: 'next', label: 'Next.js', href: '/docs#outputs' },
  { id: 'tailwind', label: 'Next.js Tailwind', href: '/docs#outputs' },
  { id: 'drupal', label: 'Drupal', href: '/docs#outputs' },
]

export function AppSidebar() {
  const locale = useLocale()
  const pathname = usePathname()
  const t = useTranslations('nav')
  const base = `/${locale}`

  return (
    <aside className="AppSidebar" aria-label="Documentation navigation">
      <section className="AppSidebar__section">
        <h2 className="AppSidebar__title">{t('docs')}</h2>
        <nav className="AppSidebar__nav">
          {docs.map((item) => (
            <Link
              className={[
                'AppSidebar__item',
                item.id === 'intro' && pathname === `${base}/docs`
                  ? 'AppSidebar__item--active'
                  : '',
              ].filter(Boolean).join(' ')}
              href={`${base}${item.href}`}
              key={item.id}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </section>

      <section className="AppSidebar__section">
        <h2 className="AppSidebar__title">{t('components')}</h2>
        <nav className="AppSidebar__nav">
          <Link
            className={[
              'AppSidebar__item',
              pathname === `${base}/components` ? 'AppSidebar__item--active' : '',
            ].filter(Boolean).join(' ')}
            href={`${base}/components`}
          >
            <span>Component list</span>
          </Link>
          {components.map((component) => {
            const href = `${base}/components/${component.slug}`
            return (
              <Link
                className={[
                  'AppSidebar__item',
                  pathname === href ? 'AppSidebar__item--active' : '',
                ].filter(Boolean).join(' ')}
                href={href}
                key={component.slug}
              >
                <span>{component.name}</span>
                <span className="AppSidebar__version">v{component.version}</span>
              </Link>
            )
          })}
        </nav>
      </section>
    </aside>
  )
}
