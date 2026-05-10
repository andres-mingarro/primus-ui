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
    <div
      className="overflow-hidden"
      style={{ border: '2px solid var(--color-border)' }}
    >
      {/* Tab bar */}
      <div
        role="tablist"
        aria-label="Code examples"
        className="flex"
        style={{
          borderBottom: '2px solid var(--color-border)',
          backgroundColor: 'var(--color-muted)',
        }}
      >
        {tabs.map((tab, i) => {
          const isActive = i === active
          return (
            <button
              key={tab.label}
              ref={(el) => { tabRefs.current[i] = el }}
              role="tab"
              id={`${id}-tab-${i}`}
              aria-selected={isActive}
              aria-controls={`${id}-panel-${i}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              className={cn(
                'code-tab relative px-5 py-3 font-mono text-[12px] font-bold uppercase tracking-[0.08em] transition-all duration-200',
              )}
              style={
                isActive
                  ? {
                      backgroundColor: 'var(--color-primary)',
                      color: 'var(--color-on-primary)',
                    }
                  : {
                      color: 'var(--color-muted-foreground)',
                    }
              }
            >
              {tab.label}
            </button>
          )
        })}
      </div>

      {/* Code panel */}
      <pre
        id={`${id}-panel-${active}`}
        role="tabpanel"
        aria-labelledby={`${id}-tab-${active}`}
        tabIndex={0}
        className="overflow-x-auto p-6 font-mono text-[13px] leading-relaxed"
        style={{
          backgroundColor: '#1A0505',
          color: '#FECACA',
        }}
      >
        <code>{tabs[active].code.trim()}</code>
      </pre>

      <style>{`
        .code-tab:not([aria-selected="true"]):hover {
          background-color: var(--color-border);
          color: var(--color-foreground);
        }
        .code-tab:focus-visible {
          outline: 2px solid var(--color-primary);
          outline-offset: -2px;
        }
        .code-tab[aria-selected="true"]:focus-visible {
          outline: 2px solid var(--color-on-primary);
          outline-offset: -2px;
        }
      `}</style>
    </div>
  )
}
