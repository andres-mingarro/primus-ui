import './card.scss'
import type { ReactNode } from 'react'

export interface CardProps {
  title: string
  url?: string
  style?: 'light' | 'high-contrast' | 'dark'
  direction?: 'vertical' | 'horizontal' | 'horizontal-reverse'
  image?: { src: string; alt: string }
  buttonPrimary?: string
  buttonPrimaryUrl?: string
  buttonSecondary?: string
  buttonSecondaryUrl?: string
  children?: ReactNode
  addClassName?: string
}

export function Card({
  title,
  url,
  style = 'light',
  direction = 'vertical',
  image,
  buttonPrimary,
  buttonPrimaryUrl,
  buttonSecondary,
  buttonSecondaryUrl,
  children,
  addClassName,
}: CardProps) {
  const classes = [
    'pu-card',
    `pu-card--${style}`,
    `pu-card--${direction}`,
    addClassName,
  ].filter(Boolean).join(' ')

  const hasFooter = buttonPrimary || buttonSecondary

  return (
    <article className={classes}>
      <div className="pu-card__layout">
        {image && (
          <div className="pu-card__header">
            <img className="pu-card__image" src={image.src} alt={image.alt} />
          </div>
        )}
        <div className="pu-card__content">
          <div className="pu-card__body-area">
            <h2 className="pu-card__title">
              {url ? (
                <a className="pu-card__title-link" href={url}>{title}</a>
              ) : (
                title
              )}
            </h2>
            {children && (
              <div className="pu-card__body">{children}</div>
            )}
          </div>
          {hasFooter && (
            <div className="pu-card__footer">
              {buttonPrimary && (
                <a
                  className="pu-card__btn pu-card__btn--primary"
                  href={buttonPrimaryUrl ?? '#'}
                >
                  {buttonPrimary}
                </a>
              )}
              {buttonSecondary && (
                <a
                  className="pu-card__btn pu-card__btn--secondary"
                  href={buttonSecondaryUrl ?? '#'}
                >
                  {buttonSecondary}
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </article>
  )
}
