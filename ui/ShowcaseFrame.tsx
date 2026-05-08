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
          'showcase-grid relative flex min-h-32 items-center justify-center overflow-hidden rounded-lg border border-neutral-300 bg-neutral-100 p-8 dark:border-neutral-700 dark:bg-neutral-900',
          className,
        )}
      >
        {children}
      </div>
    </div>
  )
}
