import './DocsPage.scss'

export function DocsPage() {
  return (
    <article className="DocsPage">
      <header className="DocsPage__hero">
        <p className="DocsPage__eyebrow">Documentation</p>
        <h1 className="DocsPage__title">Build with Primus UI</h1>
        <p className="DocsPage__description">
          Primus UI is documented as a source-first component system for Next.js,
          Next.js Tailwind, and Drupal SDC. Pick the output that matches your
          project, copy the folder, then own the code.
        </p>
      </header>

      <section className="DocsPage__section" id="installation">
        <SectionTitle label="Installation" />
        <p className="DocsPage__body">
          There is no runtime package to install for the library workflow. Each
          component is a self-contained folder under <code>components-library/</code>.
        </p>
        <CodeBlock
          label="folder"
          code={`components-library/
  Card/
  Divider/
  GridTemplate/
  Heading/
  SectionContainer/
  Text/`}
        />
      </section>

      <section className="DocsPage__section" id="usage">
        <SectionTitle label="Usage" />
        <div className="DocsPage__grid">
          <PathCard title="Next.js + SCSS" description="Copy the TSX and SCSS pair, then import the SCSS once where the component is used." />
          <PathCard title="Next.js Tailwind" description="Copy the Tailwind TSX version when the consuming product already owns Tailwind." />
          <PathCard title="Drupal SDC" description="Copy the Drupal directory for Twig, component schema, and SCSS token overrides." />
        </div>
      </section>

      <section className="DocsPage__section" id="tokens">
        <SectionTitle label="Theming / Tokens" />
        <p className="DocsPage__body">
          SCSS outputs expose CSS variables so consuming apps can theme without
          editing component internals.
        </p>
        <CodeBlock
          label="css"
          code={`:root {
  --pu-card-background: var(--app-color-paper);
  --pu-card-border-color: var(--app-color-line);
  --pu-card-padding: var(--app-space-5);
}`}
        />
      </section>

      <section className="DocsPage__section" id="outputs">
        <SectionTitle label="Supported outputs" />
        <div className="DocsPage__grid">
          <PathCard title="Next.js" description="Source components with explicit styling and local ownership." />
          <PathCard title="Next.js Tailwind" description="Utility-class components for Tailwind-native products." />
          <PathCard title="Drupal" description="Single Directory Components for Drupal theme integration." />
        </div>
      </section>
    </article>
  )
}

function SectionTitle({ label }: { label: string }) {
  return (
    <header className="DocsPage__sectionHeader">
      <span className="DocsPage__sectionRule" aria-hidden="true" />
      <h2 className="DocsPage__sectionTitle">{label}</h2>
    </header>
  )
}

function PathCard({ title, description }: { title: string; description: string }) {
  return (
    <article className="DocsPage__pathCard">
      <h3 className="DocsPage__pathTitle">{title}</h3>
      <p className="DocsPage__pathDescription">{description}</p>
    </article>
  )
}

function CodeBlock({ label, code }: { label: string; code: string }) {
  return (
    <div className="DocsPage__codeBlock">
      <div className="DocsPage__codeLabel">{label}</div>
      <pre className="DocsPage__pre">
        <code>{code}</code>
      </pre>
    </div>
  )
}
