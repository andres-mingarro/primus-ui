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
      <section className="space-y-3 border-b border-neutral-200 pb-10 dark:border-neutral-800">
        <h1 className="text-3xl font-semibold tracking-tight">Primus UI</h1>
        <p className="max-w-xl text-neutral-500 dark:text-neutral-400">
          Copy-paste components for <strong className="text-neutral-800 dark:text-neutral-200">Next.js</strong> and{' '}
          <strong className="text-neutral-800 dark:text-neutral-200">Drupal SDC</strong>.
          Each component ships with a Tailwind version, a plain SCSS version, and a Drupal Twig template.
        </p>
      </section>

      <section>
        <h2 className="mb-6 text-sm font-semibold tracking-widest text-neutral-400 uppercase dark:text-neutral-500">
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
      className="group flex flex-col gap-3 rounded-lg border border-neutral-200 bg-neutral-50 p-5 transition-colors hover:border-neutral-300 hover:bg-white dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-neutral-700 dark:hover:bg-neutral-800"
    >
      <div className="flex items-start justify-between gap-2">
        <span className="font-medium text-neutral-900 group-hover:text-blue-600 dark:text-neutral-100 dark:group-hover:text-blue-400">
          {name}
        </span>
        <span className="shrink-0 text-xs text-neutral-400 dark:text-neutral-500">v{version}</span>
      </div>
      <p className="text-sm text-neutral-500 dark:text-neutral-400">{description}</p>
      <div className="flex flex-wrap gap-1">
        {tags.map((tag) => (
          <span
            key={tag}
            className="rounded bg-neutral-200 px-1.5 py-0.5 text-xs text-neutral-600 dark:bg-neutral-700 dark:text-neutral-300"
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
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-neutral-300 py-20 text-center dark:border-neutral-700">
      <p className="text-sm text-neutral-400 dark:text-neutral-500">No components yet.</p>
      <p className="mt-1 text-xs text-neutral-300 dark:text-neutral-600">
        Add the first one to <code className="font-mono">components/</code>
      </p>
    </div>
  )
}
