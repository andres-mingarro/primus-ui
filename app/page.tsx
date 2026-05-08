import Link from 'next/link'

interface ComponentEntry {
  name: string
  slug: string
  description: string
  tags: string[]
  version: string
}

const components: ComponentEntry[] = [
  {
    name: 'Divider',
    slug: 'divider',
    description: 'A horizontal or vertical line for separating content sections.',
    tags: ['React', 'Drupal', 'Tailwind', 'SCSS'],
    version: '1.0.0',
  },
]

export default function HomePage() {
  return (
    <div className="space-y-12">
      <section className="space-y-3 border-b border-brand-100 pb-10 dark:border-brand-900">
        <h1 className="text-3xl font-semibold tracking-tight">Primus UI</h1>
        <p className="max-w-xl text-brand-500 dark:text-brand-200">
          Copy-paste components for <strong className="text-brand-900 dark:text-brand-50">Next.js</strong> and{' '}
          <strong className="text-brand-900 dark:text-brand-50">Drupal SDC</strong>.
          Each component ships with a Tailwind version, a plain SCSS version, and a Drupal Twig template.
        </p>
      </section>

      <section>
        <h2 className="mb-6 text-sm font-semibold tracking-widest text-brand-500 uppercase dark:text-brand-500">
          Components
        </h2>

        {components.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {components.map((c) => (
              <ComponentCard key={c.slug} {...c} />
            ))}
          </div>
        )}
      </section>
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
        <span className="shrink-0 text-xs text-brand-500 dark:text-brand-500">v{version}</span>
      </div>
      <p className="text-sm text-brand-500 dark:text-brand-200">{description}</p>
      <div className="flex flex-wrap gap-1">
        {tags.map((tag) => (
          <span
            key={tag}
            className="rounded bg-brand-100 px-1.5 py-0.5 text-xs text-brand-700 dark:bg-brand-900 dark:text-brand-200"
          >
            {tag}
          </span>
        ))}
      </div>
    </Link>
  )
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-brand-200 py-20 text-center dark:border-brand-900">
      <p className="text-sm text-brand-500 dark:text-brand-500">No components yet.</p>
      <p className="mt-1 text-xs text-brand-200 dark:text-brand-700">
        Add the first one to <code className="font-mono">components/</code>
      </p>
    </div>
  )
}
