'use client'

import type { ReactNode } from 'react'
import { useTabsContext } from './TabsContext'

type TabsContentProps = {
  children: ReactNode
}

type TabPanelProps = {
  children: ReactNode
  value: string
}

export function TabsContent({ children }: TabsContentProps) {
  return (
    <div className="app-tabs__content">
      {children}
    </div>
  )
}

export function TabPanel({ children, value }: TabPanelProps) {
  const context = useTabsContext()
  const selected = context.activeValue === value
  const tabId = `${context.baseId}-${value}-tab`
  const panelId = `${context.baseId}-${value}-panel`

  return (
    <div
      aria-labelledby={tabId}
      className={[
        'app-tabs__panel',
        selected ? 'app-tabs__panel--active' : '',
      ].filter(Boolean).join(' ')}
      hidden={!selected}
      id={panelId}
      role="tabpanel"
    >
      {children}
    </div>
  )
}
