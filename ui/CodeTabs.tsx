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
    <div className="overflow-hidden rounded-lg border border-neutral-200 dark:border-neutral-700">
      <div className="flex border-b border-neutral-200 bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-900">
        {tabs.map((tab, i) => (
          <button
            key={tab.label}
            onClick={() => setActive(i)}
            className={cn(
              'px-4 py-2 text-sm font-medium transition-colors',
              i === active
                ? 'border-b-2 border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400'
                : 'text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100',
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <pre className="overflow-x-auto bg-neutral-950 p-5 text-sm leading-relaxed text-neutral-200">
        <code>{tabs[active].code.trim()}</code>
      </pre>
    </div>
  )
}
