import Link from 'next/link'
import { ThemeToggle } from '@/ui/ThemeToggle'
import { LanguageSwitcher } from './LanguageSwitcher'

export function Header() {
  return (
    <header
      className="sticky top-0 z-50 backdrop-blur-md"
      style={{
        backgroundColor: 'color-mix(in srgb, var(--color-primary) 94%, black)',
        borderBottom: '1px solid color-mix(in srgb, var(--color-primary-hover) 70%, black)',
      }}
    >
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6">
        {/* Brand wordmark */}
        <Link
          href="/"
          className="group flex items-center gap-2.5 transition-opacity duration-200 hover:opacity-85"
          aria-label="Primus UI home"
        >
          {/* Block accent — warm gold */}
          <span
            className="inline-flex h-8 w-2 shrink-0 transition-transform duration-200 group-hover:scale-110"
            style={{ background: 'var(--color-accent)' }}
            aria-hidden
          />
          <span
            className="font-sans text-xl font-black tracking-tight"
            style={{ color: 'var(--color-on-primary)' }}
          >
            primus
            <span
              className="ml-0.5"
              style={{ color: 'var(--color-accent)' }}
            >
              /ui
            </span>
          </span>
        </Link>

        <nav className="flex items-center gap-1" aria-label="Site navigation">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="header-nav-link flex h-9 items-center rounded-none px-4 text-[0.9375rem] font-semibold transition-all duration-200"
          >
            GitHub
          </a>
          <LanguageSwitcher />
          <ThemeToggle />
        </nav>
      </div>

      <style>{`
        .header-nav-link {
          color: color-mix(in srgb, #ffffff 75%, transparent);
        }
        .header-nav-link:hover {
          color: #ffffff;
          background-color: color-mix(in srgb, #ffffff 12%, transparent);
        }
        .header-nav-link:focus-visible {
          outline: 2px solid #ffffff;
          outline-offset: 2px;
        }
      `}</style>
    </header>
  )
}
