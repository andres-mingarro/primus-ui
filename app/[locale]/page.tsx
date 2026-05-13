import { DocsPage } from '@/ui/app/DocsPage'

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  return <DocsPage locale={locale} />
}
