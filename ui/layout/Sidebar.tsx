import { components } from '@/lib/components-registry'
import { SidebarNav } from './SidebarNav'

export function Sidebar() {
  return (
    <aside
      className="sticky top-20 hidden h-[calc(100vh-5rem)] w-64 shrink-0 overflow-y-auto lg:block"
      style={{
        backgroundColor: 'var(--color-muted)',
        borderRight: '2px solid var(--color-border)',
      }}
    >
      <div className="px-3 py-8">
        <SidebarNav components={components} />
      </div>
    </aside>
  )
}
