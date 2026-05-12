import { HomePage } from '@/ui/app/HomePage'

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  return <HomePage locale={locale} />
}
