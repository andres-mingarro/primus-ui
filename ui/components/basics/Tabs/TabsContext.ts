'use client'

import { createContext, useContext } from 'react'

export type TabsContextValue = {
  activeValue: string
  baseId: string
  label: string
  setActiveValue: (value: string) => void
}

export const TabsContext = createContext<TabsContextValue | null>(null)

export function useTabsContext() {
  const context = useContext(TabsContext)

  if (!context) {
    throw new Error('Tabs compound components must be rendered inside Tabs.')
  }

  return context
}
