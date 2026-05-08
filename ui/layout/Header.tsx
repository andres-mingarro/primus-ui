import Link from 'next/link'
import { ThemeToggle } from '@/ui/ThemeToggle'

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-brand-200 bg-white/80 backdrop-blur-sm dark:border-brand-900 dark:bg-brand-950/80">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-sm font-semibold tracking-tight text-brand-900 dark:text-brand-50">
            primus<span className="text-brand-700 dark:text-brand-500">/ui</span>
          </span>
        </Link>

        <nav className="flex items-center gap-4">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-brand-500 transition-colors hover:text-brand-700 dark:text-brand-200 dark:hover:text-brand-50"
          >
            GitHub
          </a>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  )
}
