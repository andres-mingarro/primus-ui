import Link from 'next/link'
import './AppButton.scss'

type AppButtonProps = {
  children: React.ReactNode
  href: string
  variant?: 'primary' | 'secondary'
}

export function AppButton({
  children,
  href,
  variant = 'secondary',
}: AppButtonProps) {
  return (
    <Link className={`app-button app-button--${variant}`} href={href}>
      {children}
    </Link>
  )
}
