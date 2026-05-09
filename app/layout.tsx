import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { ThemeProvider } from '@/providers/ThemeProvider'
import { Header } from '@/ui/layout/Header'
import './styles/globals.css'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Primus UI — Copy-paste components',
  description: 'Reusable components for Next.js and Drupal SDC. Tailwind and SCSS versions.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-white text-brand-900 dark:bg-brand-950 dark:text-brand-50">
        <ThemeProvider>
          <Header />
          <main className="mx-auto max-w-6xl px-6 py-10">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  )
}
