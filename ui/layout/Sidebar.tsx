import { components } from '@/lib/components-registry'
import { SidebarNav } from './SidebarNav'

export function Sidebar() {
  return (
    <aside className="sticky top-14 hidden h-[calc(100vh-3.5rem)] w-56 shrink-0 overflow-y-auto border-r border-brand-100 dark:border-brand-900 lg:block">
      <div className="space-y-6 px-3 py-6">
        <SidebarNav components={components} />
      </div>
    </aside>
  )
}
