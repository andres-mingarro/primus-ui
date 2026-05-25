import { cn } from '@/lib/utils'

export interface BadgeProps {
  label: string
  status?: 'brand' | 'danger' | 'important' | 'informative' | 'severe' | 'success' | 'warning'
  appearance?: 'filled' | 'ghost' | 'outline' | 'tint'
  iconLeft?: React.ReactNode
  iconRight?: React.ReactNode
  addClassName?: string
}

const statusFilledClasses: Record<NonNullable<BadgeProps['status']>, string> = {
  brand:       'bg-blue-600 text-white border-blue-600',
  danger:      'bg-red-600 text-white border-red-600',
  important:   'bg-violet-700 text-white border-violet-700',
  informative: 'bg-cyan-600 text-white border-cyan-600',
  severe:      'bg-orange-600 text-white border-orange-600',
  success:     'bg-green-600 text-white border-green-600',
  warning:     'bg-yellow-600 text-white border-yellow-600',
}

const statusGhostClasses: Record<NonNullable<BadgeProps['status']>, string> = {
  brand:       'bg-transparent text-blue-600 border-transparent',
  danger:      'bg-transparent text-red-600 border-transparent',
  important:   'bg-transparent text-violet-700 border-transparent',
  informative: 'bg-transparent text-cyan-600 border-transparent',
  severe:      'bg-transparent text-orange-600 border-transparent',
  success:     'bg-transparent text-green-600 border-transparent',
  warning:     'bg-transparent text-yellow-600 border-transparent',
}

const statusOutlineClasses: Record<NonNullable<BadgeProps['status']>, string> = {
  brand:       'bg-transparent text-blue-600 border-blue-600',
  danger:      'bg-transparent text-red-600 border-red-600',
  important:   'bg-transparent text-violet-700 border-violet-700',
  informative: 'bg-transparent text-cyan-600 border-cyan-600',
  severe:      'bg-transparent text-orange-600 border-orange-600',
  success:     'bg-transparent text-green-600 border-green-600',
  warning:     'bg-transparent text-yellow-600 border-yellow-600',
}

const statusTintClasses: Record<NonNullable<BadgeProps['status']>, string> = {
  brand:       'bg-blue-50 text-blue-600 border-transparent',
  danger:      'bg-red-50 text-red-600 border-transparent',
  important:   'bg-violet-50 text-violet-700 border-transparent',
  informative: 'bg-cyan-50 text-cyan-600 border-transparent',
  severe:      'bg-orange-50 text-orange-600 border-transparent',
  success:     'bg-green-50 text-green-600 border-transparent',
  warning:     'bg-yellow-50 text-yellow-600 border-transparent',
}

function getStatusClasses(
  status: NonNullable<BadgeProps['status']>,
  appearance: NonNullable<BadgeProps['appearance']>,
): string {
  switch (appearance) {
    case 'ghost':   return statusGhostClasses[status]
    case 'outline': return statusOutlineClasses[status]
    case 'tint':    return statusTintClasses[status]
    default:        return statusFilledClasses[status]
  }
}

export function Badge({
  label,
  status = 'informative',
  appearance = 'filled',
  iconLeft,
  iconRight,
  addClassName,
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full border border-[1.5px] px-2.5 py-0.5 text-xs font-bold whitespace-nowrap',
        getStatusClasses(status, appearance),
        addClassName,
      )}
    >
      {iconLeft && <span aria-hidden="true" className="inline-flex shrink-0">{iconLeft}</span>}
      {label}
      {iconRight && <span aria-hidden="true" className="inline-flex shrink-0">{iconRight}</span>}
    </span>
  )
}
