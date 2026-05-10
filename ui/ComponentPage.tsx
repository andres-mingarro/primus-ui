/**
 * Shared primitives for component documentation pages.
 * Uses CSS custom properties from the Restaurant/Food Service palette.
 */

export function ComponentPageHeader({
  label,
  name,
  version,
  description,
}: {
  label: string
  name: string
  version: string
  description: string
}) {
  return (
    <div
      className="space-y-2 pb-8"
      style={{ borderBottom: '1px solid var(--color-border)' }}
    >
      <p
        className="font-mono text-[11px] font-bold uppercase tracking-[0.18em]"
        style={{ color: 'var(--color-primary)' }}
      >
        {label}
      </p>
      <div className="flex items-baseline gap-3">
        <h1
          className="font-sans text-[2rem] font-bold leading-[1.1] tracking-[-0.02em]"
          style={{ color: 'var(--color-foreground)' }}
        >
          {name}
        </h1>
        <span
          className="font-mono text-[11px]"
          style={{ color: 'var(--color-muted-foreground)' }}
        >
          v{version}
        </span>
      </div>
      <p
        className="text-sm leading-relaxed"
        style={{ color: 'var(--color-muted-foreground)' }}
      >
        {description}
      </p>
    </div>
  )
}

export function SectionLabel({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3">
      <span
        className="font-mono text-[10px] font-bold uppercase tracking-[0.18em]"
        style={{ color: 'var(--color-accent)' }}
      >
        {label}
      </span>
      <span
        className="h-px flex-1"
        style={{ backgroundColor: 'var(--color-border)' }}
      />
    </div>
  )
}

export function PropsTable({
  rows,
  headers,
}: {
  rows: { name: string; type: string; default: string; description: string }[]
  headers: string[]
}) {
  return (
    <div
      className="overflow-hidden"
      style={{ border: '1px solid var(--color-border)' }}
    >
      <table className="w-full text-sm">
        <thead style={{ backgroundColor: 'var(--color-muted)' }}>
          <tr>
            {headers.map((h) => (
              <th
                key={h}
                scope="col"
                className="px-4 py-3 text-left font-semibold"
                style={{ color: 'var(--color-foreground)' }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody style={{ borderTop: '1px solid var(--color-border)' }}>
          {rows.map((p, i) => (
            <tr
              key={p.name}
              style={{
                borderTop: i > 0 ? '1px solid var(--color-border)' : undefined,
              }}
              className="props-row"
            >
              <td
                className="px-4 py-3 font-mono text-[13px]"
                style={{ color: 'var(--color-primary)' }}
              >
                {p.name}
              </td>
              <td
                className="px-4 py-3 font-mono text-[13px]"
                style={{ color: 'var(--color-muted-foreground)' }}
              >
                {p.type}
              </td>
              <td
                className="px-4 py-3 font-mono text-[13px]"
                style={{ color: 'var(--color-muted-foreground)' }}
              >
                {p.default}
              </td>
              <td
                className="px-4 py-3 text-[13px] leading-relaxed"
                style={{ color: 'var(--color-muted-foreground)' }}
              >
                {p.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <style>{`
        .props-row:hover {
          background-color: var(--color-primary-faint);
        }
      `}</style>
    </div>
  )
}

export function CssVarsTable({
  rows,
  headers,
}: {
  rows: { name: string; default: string; description: string }[]
  headers: string[]
}) {
  return (
    <div
      className="overflow-hidden"
      style={{ border: '1px solid var(--color-border)' }}
    >
      <table className="w-full text-sm">
        <thead style={{ backgroundColor: 'var(--color-muted)' }}>
          <tr>
            {headers.map((h) => (
              <th
                key={h}
                scope="col"
                className="px-4 py-3 text-left font-semibold"
                style={{ color: 'var(--color-foreground)' }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody style={{ borderTop: '1px solid var(--color-border)' }}>
          {rows.map((v, i) => (
            <tr
              key={v.name}
              style={{
                borderTop: i > 0 ? '1px solid var(--color-border)' : undefined,
              }}
              className="css-var-row"
            >
              <td
                className="px-4 py-3 font-mono text-[13px]"
                style={{ color: 'var(--color-accent)' }}
              >
                {v.name}
              </td>
              <td
                className="px-4 py-3 font-mono text-[13px]"
                style={{ color: 'var(--color-muted-foreground)' }}
              >
                {v.default}
              </td>
              <td
                className="px-4 py-3 text-[13px] leading-relaxed"
                style={{ color: 'var(--color-muted-foreground)' }}
              >
                {v.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <style>{`
        .css-var-row:hover {
          background-color: var(--color-primary-faint);
        }
      `}</style>
    </div>
  )
}
