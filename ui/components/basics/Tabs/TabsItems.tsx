'use client'

import type { ReactNode } from 'react'
import { useTabsContext } from './TabsContext'

type TabsItemsProps = {
  children: ReactNode
}

type TabItemProps = {
  children: ReactNode
  value: string
}

export function TabsItems({ children }: TabsItemsProps) {
  const context = useTabsContext()

  return (
    <div className="app-tabs__header" role="tablist" aria-label={context.label}>
      {children}
    </div>
  )
}

export function TabItem({ children, value }: TabItemProps) {
  const context = useTabsContext()
  const selected = context.activeValue === value
  const tabId = `${context.baseId}-${value}-tab`
  const panelId = `${context.baseId}-${value}-panel`

  return (
    <button
      aria-controls={panelId}
      aria-selected={selected}
      className={[
        'app-tabs__tab',
        selected ? 'app-tabs__tab--active' : '',
      ].filter(Boolean).join(' ')}
      id={tabId}
      onClick={() => context.setActiveValue(value)}
      role="tab"
      type="button"
    >
      {children}
    </button>
  )
}
