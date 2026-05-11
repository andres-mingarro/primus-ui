import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import { components } from '@/lib/components-registry'
import { getComponentDoc } from '@/lib/component-docs'
import { ComponentDetailPage } from '@/ui/app/ComponentDetailPage'

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    components.map((component) => ({
      locale,
      slug: component.slug,
    })),
  )
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  const doc = getComponentDoc(slug)

  if (!doc) {
    notFound()
  }

  return <ComponentDetailPage doc={doc} locale={locale} />
}
