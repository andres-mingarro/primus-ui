'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTranslations, useLocale } from 'next-intl'
import type { ComponentEntry } from '@/lib/components-registry'

interface SidebarNavProps {
  components: ComponentEntry[]
}

function NavLink({ href, label, badge, active }: { href: string; label: string; badge?: string; active: boolean }) {
  return (
    <Link
      href={href}
      className={[
        'flex items-center justify-between rounded-md px-2 py-1.5 text-sm transition-colors',
        active
          ? 'bg-brand-100 font-medium text-brand-900 dark:bg-brand-900 dark:text-brand-50'
          : 'text-brand-700 hover:bg-brand-50 hover:text-brand-900 dark:text-brand-200 dark:hover:bg-brand-900 dark:hover:text-brand-50',
      ].join(' ')}
    >
      <span>{label}</span>
      {badge && <span className="text-xs text-brand-500">{badge}</span>}
    </Link>
  )
}

export function SidebarNav({ components }: SidebarNavProps) {
  const t = useTranslations('nav')
  const locale = useLocale()
  const pathname = usePathname()

  const base = `/${locale}`

  return (
    <div className="space-y-6">
      <div>
        <p className="mb-1.5 px-2 text-xs font-semibold uppercase tracking-widest text-brand-500">
          {t('docs')}
        </p>
        <ul className="space-y-0.5">
          <li>
            <NavLink href={base} label={t('intro')} active={pathname === base || pathname === `${base}/`} />
          </li>
        </ul>
      </div>

      <div>
        <p className="mb-1.5 px-2 text-xs font-semibold uppercase tracking-widest text-brand-500">
          {t('components')}
        </p>
        <ul className="space-y-0.5">
          {components.map((c) => (
            <li key={c.slug}>
              <NavLink
                href={`${base}/${c.slug}`}
                label={c.name}
                badge={`v${c.version}`}
                active={pathname === `${base}/${c.slug}`}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
