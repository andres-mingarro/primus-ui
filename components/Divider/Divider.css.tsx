import './divider.scss'

export interface DividerProps {
  orientation?: 'horizontal' | 'vertical'
  assistiveHidden?: boolean
}

export function Divider({ orientation = 'horizontal', assistiveHidden = false }: DividerProps) {
  return (
    <hr
      aria-hidden={assistiveHidden || undefined}
      className={[
        'pu-divider',
        orientation === 'vertical' ? 'pu-divider--vertical' : 'pu-divider--horizontal',
      ].join(' ')}
    />
  )
}
