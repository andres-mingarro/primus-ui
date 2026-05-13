'use client'

import { Children, useId, useState, type KeyboardEvent, type ReactNode } from 'react'
import './AppTabs.scss'

type AppTabsProps = {
  ariaLabel: string
  children: ReactNode
  labels: string[]
}

export function AppTabs({ ariaLabel, children, labels }: AppTabsProps) {
  const generatedId = useId()
  const panels = Children.toArray(children)
  const [activeIndex, setActiveIndex] = useState(0)
  const activateRelativeTab = (event: KeyboardEvent<HTMLButtonElement>, direction: number) => {
    event.preventDefault()
    setActiveIndex((currentIndex) => (currentIndex + direction + labels.length) % labels.length)
  }

  return (
    <div className="app-tabs">
      <div className="app-tabs__header" aria-label={ariaLabel} role="tablist">
        {labels.map((label, index) => {
          const isActive = index === activeIndex
          const tabId = `${generatedId}-${index}-tab`
          const panelId = `${generatedId}-${index}-panel`

          return (
            <button
              aria-controls={panelId}
              aria-selected={isActive}
              className="app-tabs__button"
              id={tabId}
              key={label}
              onKeyDown={(event) => {
                if (event.key === 'ArrowRight') {
                  activateRelativeTab(event, 1)
                }

                if (event.key === 'ArrowLeft') {
                  activateRelativeTab(event, -1)
                }
              }}
              onClick={() => setActiveIndex(index)}
              role="tab"
              tabIndex={isActive ? 0 : -1}
              type="button"
            >
              {label}
            </button>
          )
        })}
      </div>

      {panels.map((panel, index) => {
        const isActive = index === activeIndex
        const tabId = `${generatedId}-${index}-tab`
        const panelId = `${generatedId}-${index}-panel`

        return (
          <section
            aria-labelledby={tabId}
            className="app-tabs__panel"
            hidden={!isActive}
            id={panelId}
            key={tabId}
            role="tabpanel"
          >
            {panel}
          </section>
        )
      })}
    </div>
  )
}
