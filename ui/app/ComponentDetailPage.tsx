import Link from 'next/link'
import type { ComponentDoc } from '@/lib/component-docs'
import './ComponentDetailPage.scss'

export function ComponentDetailPage({
  doc,
  locale,
}: {
  doc: ComponentDoc
  locale: string
}) {
  return (
    <article className="ComponentDetailPage">
      <header className="ComponentDetailPage__hero">
        <p className="ComponentDetailPage__eyebrow">Component / v{doc.version}</p>
        <h1 className="ComponentDetailPage__title">{doc.name}</h1>
        <p className="ComponentDetailPage__description">{doc.description}</p>
        <div className="ComponentDetailPage__actions">
          <Link className="ComponentDetailPage__button" href={`/${locale}/components`}>
            All components
          </Link>
          <a className="ComponentDetailPage__button ComponentDetailPage__button--primary" href="#props">
            Props
          </a>
        </div>
      </header>

      <section className="ComponentDetailPage__section" id="usage">
        <SectionTitle label="Usage paths" />
        <div className="ComponentDetailPage__pathGrid">
          <PathCard title="React + SCSS" path={`components-library/${doc.name}/${doc.name}.tsx`} />
          <PathCard title="React + Tailwind" path={`components-library/${doc.name}/${doc.name}.tailwind.tsx`} />
          <PathCard title="Drupal SDC" path={`components-library/${doc.name}/drupal/`} />
        </div>
      </section>

      <section className="ComponentDetailPage__section" id="props">
        <SectionTitle label="Props" />
        <DataTable
          columns={['Prop', 'Type', 'Default', 'Description']}
          rows={doc.props.map((prop) => [
            prop.name,
            prop.type,
            formatDefault(prop.default),
            prop.description,
          ])}
        />
      </section>

      <section className="ComponentDetailPage__section" id="tokens">
        <SectionTitle label="SCSS tokens" />
        <DataTable
          columns={['Variable', 'Default', 'Description']}
          rows={doc.cssVars.map((token) => [
            token.name,
            token.default,
            token.description,
          ])}
        />
      </section>
    </article>
  )
}

function SectionTitle({ label }: { label: string }) {
  return (
    <header className="ComponentDetailPage__sectionHeader">
      <span className="ComponentDetailPage__sectionRule" aria-hidden="true" />
      <h2 className="ComponentDetailPage__sectionTitle">{label}</h2>
    </header>
  )
}

function PathCard({ title, path }: { title: string; path: string }) {
  return (
    <article className="ComponentDetailPage__pathCard">
      <h3 className="ComponentDetailPage__pathTitle">{title}</h3>
      <code className="ComponentDetailPage__pathCode">{path}</code>
    </article>
  )
}

function DataTable({
  columns,
  rows,
}: {
  columns: string[]
  rows: string[][]
}) {
  return (
    <div className="ComponentDetailPage__tableWrap">
      <table className="ComponentDetailPage__table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.join(':')}>
              {row.map((cell, index) => (
                <td key={`${cell}-${index}`}>
                  {index < 2 ? <code>{cell}</code> : cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function formatDefault(value: unknown) {
  if (value === undefined) return 'undefined'
  if (value === null) return 'null'
  return String(value)
}
