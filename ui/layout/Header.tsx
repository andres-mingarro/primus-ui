import Link from 'next/link'
import { ThemeToggle } from '@/ui/ThemeToggle'

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white/80 backdrop-blur-sm dark:border-neutral-800 dark:bg-neutral-950/80">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-sm font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
            primus<span className="text-blue-600">/ui</span>
          </span>
        </Link>

        <nav className="flex items-center gap-4">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-neutral-500 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
          >
            GitHub
          </a>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  )
}
