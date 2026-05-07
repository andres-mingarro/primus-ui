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
        <p className="text-xs font-medium tracking-wide text-neutral-400 uppercase dark:text-neutral-500">
          {label}
        </p>
      )}
      <div
        className={cn(
          'relative flex min-h-32 items-center justify-center overflow-hidden rounded-lg border border-neutral-200 bg-neutral-50 p-8 dark:border-neutral-700 dark:bg-neutral-900',
          className,
        )}
        style={{
          backgroundImage: 'radial-gradient(circle, #d1d5db 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
      >
        {children}
      </div>
    </div>
  )
}
