import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { components, type ComponentEntry } from '@/lib/components-registry'

export default function HomePage() {
  const t = useTranslations('home')

  return (
    <div className="space-y-14">

      <section className="space-y-3 border-b border-brand-100 pb-10 dark:border-brand-900">
        <div className="flex items-baseline gap-3">
          <h1 className="text-3xl font-semibold tracking-tight">{t('title')}</h1>
          <span className="text-sm text-brand-700 dark:text-brand-500">{t('version')}</span>
        </div>
        <p className="max-w-2xl text-brand-700 dark:text-brand-200">{t('tagline')}</p>
      </section>

      <section className="space-y-6">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-brand-700 dark:text-brand-500">
          {t('howToUse')}
        </h2>
        <div className="space-y-4 text-sm text-brand-700 dark:text-brand-200">
          <p>
            {t.rich('howToUseP1', {
              code: (chunks) => (
                <code className="rounded bg-brand-100 px-1.5 py-0.5 font-mono text-[13px] text-brand-900 dark:bg-brand-900 dark:text-brand-50">
                  {chunks}
                </code>
              ),
            })}
          </p>
          <p>{t('howToUseP2')}</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <FlavorCard title={t('flavorTailwindTitle')} file="Button.tailwind.tsx" description={t('flavorTailwindDesc')} />
          <FlavorCard title={t('flavorScssTitle')} file="Button.tsx + button.scss" description={t('flavorScssDesc')} />
          <FlavorCard title={t('flavorDrupalTitle')} file="drupal/button.twig + .scss" description={t('flavorDrupalDesc')} />
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-brand-700 dark:text-brand-500">
          {t('quickStart')}
        </h2>
        <ol className="space-y-3 text-sm text-brand-700 dark:text-brand-200">
          {(['step1', 'step2', 'step3', 'step4'] as const).map((key, i) => (
            <li key={key} className="flex gap-3">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-100 text-[11px] font-semibold text-brand-900 dark:bg-brand-900 dark:text-brand-50">
                {i + 1}
              </span>
              <span>{t(key)}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="space-y-4">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-brand-700 dark:text-brand-500">
          {t('componentsSection')}
        </h2>
        {components.length === 0 ? (
          <EmptyState empty={t('empty')} hint={t('emptyHint')} />
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {components.map((c) => (
              <ComponentCard key={c.slug} {...c} />
            ))}
          </div>
        )}
      </section>

    </div>
  )
}

function FlavorCard({ title, file, description }: { title: string; file: string; description: string }) {
  return (
    <div className="rounded-lg border border-brand-100 p-4 dark:border-brand-900">
      <p className="font-medium text-brand-900 dark:text-brand-50">{title}</p>
      <p className="mt-1 font-mono text-[11px] text-brand-700 dark:text-brand-500">{file}</p>
      <p className="mt-2 text-xs leading-relaxed text-brand-700 dark:text-brand-200">{description}</p>
    </div>
  )
}

function ComponentCard({ name, slug, description, tags, version }: ComponentEntry) {
  return (
    <Link
      href={`/${slug}`}
      className="group flex flex-col gap-3 rounded-lg border border-brand-100 bg-brand-50/50 p-5 transition-colors hover:border-brand-200 hover:bg-brand-50 dark:border-brand-900 dark:bg-brand-950 dark:hover:border-brand-700 dark:hover:bg-brand-900"
    >
      <div className="flex items-start justify-between gap-2">
        <span className="font-medium text-brand-900 group-hover:text-brand-700 dark:text-brand-50 dark:group-hover:text-brand-500">
          {name}
        </span>
        <span className="shrink-0 text-xs text-brand-700 dark:text-brand-500">v{version}</span>
      </div>
      <p className="text-sm text-brand-700 dark:text-brand-200">{description}</p>
      <div className="flex flex-wrap gap-1">
        {tags.map((tag) => (
          <span key={tag} className="rounded bg-brand-100 px-1.5 py-0.5 text-xs text-brand-700 dark:bg-brand-900 dark:text-brand-200">
            {tag}
          </span>
        ))}
      </div>
    </Link>
  )
}

function EmptyState({ empty, hint }: { empty: string; hint: string }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-brand-200 py-20 text-center dark:border-brand-900">
      <p className="text-sm text-brand-700 dark:text-brand-500">{empty}</p>
      <p className="mt-1 text-xs text-brand-500 dark:text-brand-700">{hint}</p>
    </div>
  )
}
