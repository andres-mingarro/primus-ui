import './badge.scss'

export interface BadgeProps {
  label: string
  status?: 'brand' | 'danger' | 'important' | 'informative' | 'severe' | 'success' | 'warning'
  appearance?: 'filled' | 'ghost' | 'outline' | 'tint'
  iconLeft?: React.ReactNode
  iconRight?: React.ReactNode
  addClassName?: string
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
      className={[
        'pu-badge',
        `pu-badge--${status}`,
        `pu-badge--${appearance}`,
        addClassName,
      ].filter(Boolean).join(' ')}
    >
      {iconLeft && <span aria-hidden="true" className="pu-badge__icon pu-badge__icon--left">{iconLeft}</span>}
      {label}
      {iconRight && <span aria-hidden="true" className="pu-badge__icon pu-badge__icon--right">{iconRight}</span>}
    </span>
  )
}
