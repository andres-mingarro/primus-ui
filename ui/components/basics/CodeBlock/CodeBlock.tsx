import './CodeBlock.scss'

type CodeBlockProps = {
  code: string
  label: string
}

export function CodeBlock({ code, label }: CodeBlockProps) {
  return (
    <div className="app-code-block">
      <div className="app-code-block__label">{label}</div>
      <pre className="app-code-block__pre">
        <code>{code}</code>
      </pre>
    </div>
  )
}
