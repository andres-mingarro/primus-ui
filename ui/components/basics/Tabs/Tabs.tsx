'use client'

import { useId, useMemo, useState, type ReactNode } from 'react'
import { TabsContext } from './TabsContext'
export { TabItem, TabsItems } from './TabsItems'
export { TabPanel, TabsContent } from './TabsContent'
import './Tabs.scss'

type TabsProps = {
  children: ReactNode
  defaultValue: string
  label: string
}

export function Tabs({ children, defaultValue, label }: TabsProps) {
  const baseId = useId()
  const [activeValue, setActiveValue] = useState(defaultValue)
  const value = useMemo(
    () => ({ activeValue, baseId, label, setActiveValue }),
    [activeValue, baseId, label],
  )

  return (
    <TabsContext.Provider value={value}>
      <div className="app-tabs" aria-label={label}>
        {children}
      </div>
    </TabsContext.Provider>
  )
}
