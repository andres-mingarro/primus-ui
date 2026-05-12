'use client'

import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import { usePathname } from 'next/navigation'
import { components } from '@/lib/components-registry'
import './AppSidebar.scss'

const docsChildren = [
  { id: 'installation', href: '/docs#installation' },
  { id: 'usage', href: '/docs#usage' },
  { id: 'tokens', href: '/docs#tokens' },
  { id: 'next', href: '/docs#outputs' },
  { id: 'tailwind', href: '/docs#outputs' },
  { id: 'drupal', href: '/docs#outputs' },
]

export function AppSidebar() {
  const locale = useLocale()
  const pathname = usePathname()
  const t = useTranslations('nav')
  const base = `/${locale}`

  return (
    <aside className="AppSidebar" aria-label={t('docs')}>
      <section className="AppSidebar__section">
        <h2 className="AppSidebar__title">{t('docs')}</h2>
        <nav className="AppSidebar__nav">
          <Link
            className={[
              'AppSidebar__item',
              'AppSidebar__item--parent',
              pathname === `${base}/docs` ? 'AppSidebar__item--active' : '',
            ].filter(Boolean).join(' ')}
            href={`${base}/docs`}
          >
            {t('intro')}
          </Link>
          <div className="AppSidebar__subnav" aria-label={t('intro')}>
            {docsChildren.map((item) => (
              <Link
                className="AppSidebar__subitem"
                href={`${base}${item.href}`}
                key={item.id}
              >
                {t(item.id)}
              </Link>
            ))}
          </div>
        </nav>
      </section>

      <section className="AppSidebar__section">
        <nav className="AppSidebar__nav">
          <Link
            className={[
              'AppSidebar__item',
              'AppSidebar__item--parent',
              pathname === `${base}/components` ? 'AppSidebar__item--active' : '',
            ].filter(Boolean).join(' ')}
            href={`${base}/components`}
          >
            <span>{t('componentList')}</span>
          </Link>
          <div className="AppSidebar__subnav" aria-label={t('componentList')}>
            {components.map((component) => {
              const href = `${base}/components/${component.slug}`
              return (
                <Link
                  className={[
                    'AppSidebar__subitem',
                    pathname === href ? 'AppSidebar__subitem--active' : '',
                  ].filter(Boolean).join(' ')}
                  href={href}
                  key={component.slug}
                >
                  <span>{component.name}</span>
                  <span className="AppSidebar__version">v{component.version}</span>
                </Link>
              )
            })}
          </div>
        </nav>
      </section>
    </aside>
  )
}
