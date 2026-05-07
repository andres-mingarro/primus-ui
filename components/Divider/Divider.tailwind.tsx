export interface DividerProps {
  orientation?: 'horizontal' | 'vertical'
  assistiveHidden?: boolean
}

export function Divider({ orientation = 'horizontal', assistiveHidden = false }: DividerProps) {
  return (
    <hr
      aria-hidden={assistiveHidden || undefined}
      className={
        orientation === 'horizontal'
          ? 'h-px w-full border-none bg-neutral-200'
          : 'h-full w-px self-stretch border-none bg-neutral-200'
      }
    />
  )
}
