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
        <p className="text-xs font-medium tracking-wide text-brand-700 uppercase dark:text-brand-500">
          {label}
        </p>
      )}
      <div
        className={cn(
          'showcase-grid relative flex min-h-32 items-center justify-center overflow-hidden rounded-lg border border-brand-200 bg-brand-50 p-8 dark:border-brand-700 dark:bg-brand-900',
          className,
        )}
      >
        {children}
      </div>
    </div>
  )
}
