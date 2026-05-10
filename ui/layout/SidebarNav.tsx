'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTranslations, useLocale } from 'next-intl'
import type { ComponentEntry } from '@/lib/components-registry'

interface SidebarNavProps {
  components: ComponentEntry[]
}

function SidebarLink({
  href,
  label,
  badge,
  active,
}: {
  href: string
  label: string
  badge?: string
  active: boolean
}) {
  return (
    <Link
      href={href}
      className={[
        'group relative flex items-center justify-between rounded-none px-4 py-2.5 text-[0.9375rem] font-medium transition-all duration-200',
        active ? 'sidebar-link--active' : 'sidebar-link--idle',
      ].join(' ')}
      aria-current={active ? 'page' : undefined}
    >
      <span className={active ? 'font-bold' : ''}>{label}</span>
      {badge && (
        <span className="shrink-0 font-mono text-[10px] sidebar-link__badge">
          {badge}
        </span>
      )}
    </Link>
  )
}

export function SidebarNav({ components }: SidebarNavProps) {
  const t = useTranslations('nav')
  const locale = useLocale()
  const pathname = usePathname()

  const base = `/${locale}`

  return (
    <>
      {/* Scoped sidebar link styles — single declaration, palette-driven */}
      <style>{`
        .sidebar-link--active {
          background-color: var(--color-primary);
          color: var(--color-on-primary);
        }
        .sidebar-link--idle {
          color: var(--color-foreground);
        }
        .sidebar-link--idle:hover {
          background-color: var(--color-border);
          color: var(--color-foreground);
          transition: background-color 200ms, color 200ms;
        }
        .sidebar-link--active .sidebar-link__badge {
          color: color-mix(in srgb, var(--color-on-primary) 60%, transparent);
        }
        .sidebar-link--idle .sidebar-link__badge {
          color: var(--color-muted-foreground);
        }
        .sidebar-link--active:focus-visible {
          outline: 2px solid var(--color-on-primary);
          outline-offset: 2px;
        }
        .sidebar-link--idle:focus-visible {
          outline: 2px solid var(--color-primary);
          outline-offset: 2px;
        }
      `}</style>

      <div className="space-y-8">
        {/* Docs section */}
        <div>
          <p
            className="mb-3 px-4 font-mono text-[10px] font-black uppercase tracking-[0.2em]"
            style={{ color: 'var(--color-accent)' }}
          >
            {t('docs')}
          </p>
          <ul className="space-y-0.5">
            <li>
              <SidebarLink
                href={base}
                label={t('intro')}
                active={pathname === base || pathname === `${base}/`}
              />
            </li>
          </ul>
        </div>

        {/* Divider */}
        <div
          className="h-px w-full"
          style={{ backgroundColor: 'var(--color-border)' }}
          aria-hidden
        />

        {/* Components section */}
        <div>
          <p
            className="mb-3 px-4 font-mono text-[10px] font-black uppercase tracking-[0.2em]"
            style={{ color: 'var(--color-accent)' }}
          >
            {t('components')}
          </p>
          <ul className="space-y-0.5">
            {components.map((c) => (
              <li key={c.slug}>
                <SidebarLink
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
    </>
  )
}
