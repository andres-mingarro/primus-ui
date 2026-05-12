import './AppMain.scss'

export function AppMain({ children }: { children: React.ReactNode }) {
  return (
    <main className="AppMain" id="main-content" tabIndex={-1}>
      {children}
    </main>
  )
}
