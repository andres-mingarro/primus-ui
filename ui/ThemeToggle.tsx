'use client'

import { useTheme } from '@/providers/ThemeProvider'

export function ThemeToggle() {
  const { theme, toggle } = useTheme()

  return (
    <button
      onClick={toggle}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      className="theme-toggle-btn flex h-9 w-9 items-center justify-center rounded-sm transition-all duration-200"
      style={{
        color: 'color-mix(in srgb, var(--color-on-primary) 75%, transparent)',
        minWidth: '36px',
        minHeight: '36px',
      }}
    >
      {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
      <style>{`
        .theme-toggle-btn:hover {
          background-color: color-mix(in srgb, var(--color-on-primary) 15%, transparent);
          color: var(--color-on-primary);
        }
        .theme-toggle-btn:focus-visible {
          outline: 2px solid var(--color-on-primary);
          outline-offset: 2px;
        }
      `}</style>
    </button>
  )
}

function SunIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  )
}
