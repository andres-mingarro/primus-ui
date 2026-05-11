import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import { components } from '@/lib/components-registry'
import { getComponentDoc } from '@/lib/component-docs'
import { ComponentDetailPage } from '@/ui/app/ComponentDetailPage'

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    components.map((component) => ({
      locale,
      component: component.slug,
    })),
  )
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string; component: string }>
}) {
  const { locale, component } = await params
  const doc = getComponentDoc(component)

  if (!doc) {
    notFound()
  }

  return <ComponentDetailPage doc={doc} locale={locale} />
}
