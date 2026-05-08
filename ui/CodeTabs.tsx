'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'

export interface CodeTab {
  label: string
  code: string
}

interface CodeTabsProps {
  tabs: CodeTab[]
}

export function CodeTabs({ tabs }: CodeTabsProps) {
  const [active, setActive] = useState(0)

  return (
    <div className="overflow-hidden rounded-lg border border-brand-200 dark:border-brand-900">
      <div className="flex border-b border-brand-200 bg-brand-50 dark:border-brand-900 dark:bg-brand-950">
        {tabs.map((tab, i) => (
          <button
            key={tab.label}
            onClick={() => setActive(i)}
            className={cn(
              'px-4 py-2 text-sm font-medium transition-colors',
              i === active
                ? 'border-b-2 border-brand-700 text-brand-700 dark:border-brand-500 dark:text-brand-500'
                : 'text-brand-500 hover:text-brand-900 dark:text-brand-200 dark:hover:text-brand-50',
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <pre className="overflow-x-auto bg-brand-950 p-5 text-sm leading-relaxed text-brand-200">
        <code>{tabs[active].code.trim()}</code>
      </pre>
    </div>
  )
}
