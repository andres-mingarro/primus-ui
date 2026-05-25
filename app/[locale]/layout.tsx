import type { Metadata } from 'next'
import { Karla } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import { ThemeProvider } from '@/providers/ThemeProvider'
import { AppHeader } from '@/ui/components/segment/AppHeader/AppHeader'
import { AppSidebar } from '@/ui/components/segment/AppSidebar/AppSidebar'
import { AppMain } from '@/ui/components/segment/AppMain/AppMain'
import '../styles/globals.css'

const karla = Karla({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--app-font-karla',
})

export const metadata: Metadata = {
  title: 'Primus UI',
  description: 'Copy-paste components for Next.js, Next.js Tailwind, and Drupal.',
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

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      data-scroll-behavior="smooth"
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: `(function(){var s=localStorage.getItem('theme'),p=window.matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light';if((s||p)==='dark')document.documentElement.classList.add('dark')})()` }} />
      </head>
      <body className={`${karla.variable} ${karla.className}`}>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider>
            <AppHeader />
            <div className="AppLayout">
              <AppSidebar />
              <AppMain>{children}</AppMain>
            </div>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
