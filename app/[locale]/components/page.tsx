import { ComponentsPage } from '@/ui/app/ComponentsPage'

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  return <ComponentsPage locale={locale} />
}
