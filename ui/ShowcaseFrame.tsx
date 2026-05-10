import { cn } from '@/lib/utils'

interface ShowcaseFrameProps {
  children: React.ReactNode
  className?: string
  label?: string
}

export function ShowcaseFrame({ children, className, label }: ShowcaseFrameProps) {
  return (
    <div className="space-y-2">
      {label && (
        <p
          className="font-mono text-[10px] font-bold uppercase tracking-[0.15em]"
          style={{ color: 'var(--color-accent)' }}
        >
          {label}
        </p>
      )}
      <div
        className={cn(
          'showcase-grid showcase-frame relative flex min-h-36 items-center justify-center overflow-hidden p-8 transition-all duration-300',
          className,
        )}
        style={{ border: '2px solid var(--color-border)' }}
      >
        {children}
      </div>
    </div>
  )
}
