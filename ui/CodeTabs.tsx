'use client'

import { useState, useRef, useId } from 'react'
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
  const id = useId()
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])

  function handleKeyDown(e: React.KeyboardEvent, i: number) {
    if (e.key === 'ArrowRight') {
      const next = (i + 1) % tabs.length
      setActive(next)
      tabRefs.current[next]?.focus()
    } else if (e.key === 'ArrowLeft') {
      const prev = (i - 1 + tabs.length) % tabs.length
      setActive(prev)
      tabRefs.current[prev]?.focus()
    } else if (e.key === 'Home') {
      setActive(0)
      tabRefs.current[0]?.focus()
    } else if (e.key === 'End') {
      const last = tabs.length - 1
      setActive(last)
      tabRefs.current[last]?.focus()
    }
  }

  return (
    <div className="overflow-hidden rounded-lg border border-brand-200 dark:border-brand-900">
      <div
        role="tablist"
        aria-label="Code examples"
        className="flex border-b border-brand-200 bg-brand-50 dark:border-brand-900 dark:bg-brand-950"
      >
        {tabs.map((tab, i) => (
          <button
            key={tab.label}
            ref={(el) => { tabRefs.current[i] = el }}
            role="tab"
            id={`${id}-tab-${i}`}
            aria-selected={i === active}
            aria-controls={`${id}-panel-${i}`}
            tabIndex={i === active ? 0 : -1}
            onClick={() => setActive(i)}
            onKeyDown={(e) => handleKeyDown(e, i)}
            className={cn(
              'px-4 py-2 text-sm font-medium transition-colors',
              i === active
                ? 'border-b-2 border-brand-700 text-brand-700 dark:border-brand-500 dark:text-brand-500'
                : 'text-brand-700 hover:text-brand-900 dark:text-brand-200 dark:hover:text-brand-50',
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <pre
        id={`${id}-panel-${active}`}
        role="tabpanel"
        aria-labelledby={`${id}-tab-${active}`}
        tabIndex={0}
        className="overflow-x-auto bg-brand-950 p-5 text-sm leading-relaxed text-brand-200"
      >
        <code>{tabs[active].code.trim()}</code>
      </pre>
    </div>
  )
}
