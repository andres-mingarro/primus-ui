import { setRequestLocale } from 'next-intl/server'
import { ComponentsPage } from '@/ui/app/ComponentsPage'

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  return <ComponentsPage locale={locale} />
}
