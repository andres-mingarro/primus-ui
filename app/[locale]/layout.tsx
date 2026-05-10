import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { cookies } from 'next/headers'
import { routing } from '@/i18n/routing'
import { ThemeProvider } from '@/providers/ThemeProvider'
import { Header } from '@/ui/layout/Header'
import { Sidebar } from '@/ui/layout/Sidebar'
import '../styles/globals.css'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Primus UI — Copy-paste components',
  description: 'Reusable components for Next.js and Drupal SDC. Tailwind and SCSS versions.',
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!routing.locales.includes(locale as 'en' | 'es')) {
    notFound()
  }

  const messages = await getMessages()
  const cookieStore = await cookies()
  const isDark = cookieStore.get('theme')?.value === 'dark'

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased${isDark ? ' dark' : ''}`}
    >
      <body
        className="min-h-full"
        style={{
          backgroundColor: 'var(--color-background)',
          color: 'var(--color-foreground)',
        }}
      >
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider>
            <Header />
            <div className="mx-auto flex max-w-6xl">
              <Sidebar />
              <main
                id="main-content"
                className="min-w-0 flex-1 overflow-hidden px-6 py-12 lg:px-10"
                tabIndex={-1}
              >
                {children}
              </main>
            </div>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
