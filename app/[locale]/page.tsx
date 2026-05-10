'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'
import React, { useEffect, useRef } from 'react'
import { components, type ComponentEntry } from '@/lib/components-registry'

export default function HomePage() {
  const t = useTranslations('home')

  return (
    <div className="flex flex-col">

      {/* ── Hero — full-bleed red block ── */}
      <section
        className="relative -mx-6 -mt-12 overflow-hidden lg:-mx-10"
        style={{ backgroundColor: 'var(--color-primary)', minHeight: '72vh' }}
      >
        {/* Animated warm diagonal pattern overlay */}
        <div className="hero-pattern pointer-events-none absolute inset-0 opacity-20" aria-hidden />

        <div className="relative flex min-h-[72vh] flex-col justify-center px-8 py-24 lg:px-16">
          <p
            className="hero-label mb-6 font-mono text-[11px] font-bold uppercase tracking-[0.22em]"
            style={{ color: 'color-mix(in srgb, var(--color-on-primary) 65%, transparent)' }}
          >
            Primus UI
          </p>

          <h1
            className="hero-title font-sans font-black leading-[0.95] tracking-[-0.04em]"
            style={{
              fontSize: 'clamp(4rem, 10vw, 7rem)',
              color: 'var(--color-on-primary)',
            }}
          >
            {t('title')}
          </h1>

          <p
            className="hero-tagline mt-8 max-w-xl text-xl leading-relaxed"
            style={{ color: 'color-mix(in srgb, var(--color-on-primary) 80%, transparent)' }}
          >
            {t('tagline')}
          </p>

          <div className="hero-cta mt-10 flex flex-wrap items-center gap-5">
            <Link
              href="#components"
              className="cta-primary inline-flex items-center rounded-none px-10 py-4 font-sans text-base font-bold tracking-tight transition-all duration-200"
              style={{
                backgroundColor: 'var(--color-accent)',
                color: 'var(--color-on-accent)',
              }}
            >
              Browse Components
            </Link>
            <span
              className="hero-meta font-mono text-[11px]"
              style={{ color: 'color-mix(in srgb, var(--color-on-primary) 50%, transparent)' }}
            >
              {t('version')}
            </span>
          </div>
        </div>

        <style>{`
          .cta-primary {
            box-shadow: 4px 4px 0 color-mix(in srgb, var(--color-accent) 50%, black);
          }
          .cta-primary:hover {
            background-color: color-mix(in srgb, var(--color-accent) 85%, black);
            transform: translate(-2px, -2px);
            box-shadow: 6px 6px 0 color-mix(in srgb, var(--color-accent) 50%, black);
          }
          .cta-primary:active {
            transform: translate(2px, 2px);
            box-shadow: 2px 2px 0 color-mix(in srgb, var(--color-accent) 50%, black);
          }
          .cta-primary:focus-visible {
            outline: 3px solid var(--color-on-primary);
            outline-offset: 3px;
          }
        `}</style>
      </section>

      {/* ── How to use — dark block ── */}
      <section
        className="-mx-6 lg:-mx-10"
        style={{ backgroundColor: 'var(--color-foreground)' }}
      >
        <div className="px-8 py-20 lg:px-16 lg:py-28">
          <BlockHeading label={t('howToUse')} light />

          <p
            className="mt-8 max-w-2xl text-lg leading-relaxed"
            style={{ color: 'color-mix(in srgb, var(--color-on-primary) 70%, transparent)' }}
          >
            {t.rich('howToUseP1', {
              code: (chunks) => (
                <code
                  className="rounded-none px-2 py-0.5 font-mono text-base"
                  style={{
                    backgroundColor: 'color-mix(in srgb, var(--color-primary) 30%, transparent)',
                    color: 'var(--color-secondary)',
                  }}
                >
                  {chunks}
                </code>
              ),
            })}
          </p>
          <p
            className="mt-4 max-w-2xl text-base leading-relaxed"
            style={{ color: 'color-mix(in srgb, var(--color-on-primary) 55%, transparent)' }}
          >
            {t('howToUseP2')}
          </p>

          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            <FlavorCard
              title={t('flavorTailwindTitle')}
              file="Button.tailwind.tsx"
              description={t('flavorTailwindDesc')}
              index={0}
            />
            <FlavorCard
              title={t('flavorScssTitle')}
              file="Button.tsx + button.scss"
              description={t('flavorScssDesc')}
              index={1}
            />
            <FlavorCard
              title={t('flavorDrupalTitle')}
              file="drupal/button.twig + .scss"
              description={t('flavorDrupalDesc')}
              index={2}
            />
          </div>

          <p
            className="mt-8 text-[11px]"
            style={{ color: 'color-mix(in srgb, var(--color-on-primary) 40%, transparent)' }}
          >
            {t.rich('drupalThemeNote', {
              code: (chunks) => (
                <code
                  className="rounded-none px-1.5 py-0.5 font-mono text-[12px]"
                  style={{
                    backgroundColor: 'color-mix(in srgb, var(--color-primary) 25%, transparent)',
                    color: 'var(--color-secondary)',
                  }}
                >
                  {chunks}
                </code>
              ),
            })}
          </p>
        </div>
      </section>

      {/* ── Quick Start — cream block ── */}
      <section
        className="-mx-6 lg:-mx-10"
        style={{ backgroundColor: 'var(--color-background)' }}
      >
        <div className="px-8 py-20 lg:px-16 lg:py-24">
          <BlockHeading label={t('quickStart')} />

          <ol className="mt-12 grid gap-6 sm:grid-cols-2">
            {(['step1', 'step2', 'step3', 'step4'] as const).map((key, i) => (
              <li key={key} className="flex gap-5">
                <span
                  className="flex h-12 w-12 shrink-0 items-center justify-center font-mono text-base font-black"
                  style={{
                    backgroundColor: 'var(--color-primary)',
                    color: 'var(--color-on-primary)',
                  }}
                >
                  {i + 1}
                </span>
                <span
                  className="pt-2.5 text-base leading-snug font-medium"
                  style={{ color: 'var(--color-foreground)' }}
                >
                  {t(key)}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Component gallery — white block ── */}
      <section
        id="components"
        className="-mx-6 -mb-12 lg:-mx-10"
        style={{ backgroundColor: 'var(--color-card)' }}
      >
        <div className="px-8 py-20 lg:px-16 lg:py-24">
          <BlockHeading label={t('componentsSection')} />

          <div className="mt-12">
            {components.length === 0 ? (
              <EmptyState empty={t('empty')} hint={t('emptyHint')} />
            ) : (
              <ComponentGrid components={components} />
            )}
          </div>
        </div>
      </section>

    </div>
  )
}

function BlockHeading({ label, light = false }: { label: string; light?: boolean }) {
  return (
    <div className="flex items-end gap-4">
      <span
        className="inline-block w-1.5 self-stretch"
        style={{ backgroundColor: light ? 'var(--color-accent)' : 'var(--color-primary)' }}
        aria-hidden
      />
      <h2
        className="font-sans font-black leading-[1] tracking-[-0.03em]"
        style={{
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          color: light ? 'var(--color-on-primary)' : 'var(--color-foreground)',
        }}
      >
        {label}
      </h2>
    </div>
  )
}

function FlavorCard({
  title,
  file,
  description,
  index,
}: {
  title: string
  file: string
  description: string
  index: number
}) {
  return (
    <div
      className="flavor-card flex flex-col gap-3 p-6 transition-all duration-200"
      style={{
        backgroundColor: 'var(--color-accent)',
        animationDelay: `${index * 80}ms`,
      }}
    >
      <p className="font-sans text-base font-bold" style={{ color: 'var(--color-on-accent)' }}>
        {title}
      </p>
      <p className="font-mono text-[11px]" style={{ color: 'color-mix(in srgb, var(--color-on-accent) 70%, transparent)' }}>
        {file}
      </p>
      <p className="text-sm leading-relaxed" style={{ color: 'color-mix(in srgb, var(--color-on-accent) 80%, transparent)' }}>
        {description}
      </p>
      <style>{`
        .flavor-card {
          box-shadow: 4px 4px 0 color-mix(in srgb, var(--color-accent) 40%, black);
        }
        .flavor-card:hover {
          background-color: color-mix(in srgb, var(--color-accent) 85%, black);
          transform: translate(-3px, -3px);
          box-shadow: 7px 7px 0 color-mix(in srgb, var(--color-accent) 40%, black);
        }
        .flavor-card:active {
          transform: translate(2px, 2px);
          box-shadow: 2px 2px 0 color-mix(in srgb, var(--color-accent) 40%, black);
        }
      `}</style>
    </div>
  )
}

function ComponentGrid({ components }: { components: ComponentEntry[] }) {
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = gridRef.current
    if (!el) return

    const items = el.querySelectorAll<HTMLElement>('.scroll-reveal')
    if (!items.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 },
    )

    items.forEach((item) => observer.observe(item))
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={gridRef} className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-2">
      {components.map((c) => (
        <ComponentCard key={c.slug} {...c} />
      ))}
    </div>
  )
}

function ComponentCard({ name, slug, description, tags, version }: ComponentEntry) {
  return (
    <Link
      href={`/${slug}`}
      className="group scroll-reveal flex min-h-[280px] flex-col justify-between gap-6 p-8
                 border-2 border-[var(--color-border)] bg-[var(--color-card)]
                 shadow-[4px_4px_0_var(--color-border)]
                 transition-all duration-300
                 hover:bg-[var(--color-primary)] hover:border-[var(--color-primary)]
                 hover:shadow-[8px_8px_0_color-mix(in_srgb,var(--color-primary)_50%,black)]
                 hover:-translate-x-1 hover:-translate-y-1
                 active:translate-x-0 active:translate-y-0
                 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2"
    >
      <div>
        <div className="mb-4 flex items-start justify-between gap-3">
          <span className="text-2xl font-black leading-tight tracking-tight
                           text-[var(--color-foreground)] transition-colors duration-300
                           group-hover:text-[var(--color-on-primary)]">
            {name}
          </span>
          <span className="mt-1 shrink-0 font-mono text-[11px]
                           text-[var(--color-muted-foreground)] transition-colors duration-300
                           group-hover:text-[var(--color-on-primary)]">
            v{version}
          </span>
        </div>
        <p className="text-sm leading-relaxed
                      text-[var(--color-muted-foreground)] transition-colors duration-300
                      group-hover:text-[var(--color-on-primary)]">
          {description}
        </p>
      </div>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="rounded-none px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-[0.08em]
                       bg-[var(--color-accent)] text-[var(--color-on-accent)]
                       transition-colors duration-300
                       group-hover:bg-[color-mix(in_srgb,var(--color-on-primary)_20%,transparent)]
                       group-hover:text-[var(--color-on-primary)]"
          >
            {tag}
          </span>
        ))}
      </div>
    </Link>
  )
}

function EmptyState({ empty, hint }: { empty: string; hint: string }) {
  return (
    <div
      className="flex flex-col items-center justify-center py-24 text-center"
      style={{
        border: '2px dashed var(--color-border)',
      }}
    >
      <p className="text-base" style={{ color: 'var(--color-muted-foreground)' }}>
        {empty}
      </p>
      <p className="mt-2 text-[11px] opacity-60" style={{ color: 'var(--color-muted-foreground)' }}>
        {hint}
      </p>
    </div>
  )
}
