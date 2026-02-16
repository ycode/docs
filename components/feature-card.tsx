import type { ReactNode } from 'react'

interface FeatureCardProps {
  title: string
  description: string
  icon?: ReactNode
  href?: string
}

export function FeatureCard({ title, description, icon, href }: FeatureCardProps) {
  const content = (
    <div className="feature-card">
      {icon && <div className="feature-card-icon">{icon}</div>}
      <h3 className="feature-card-title">{title}</h3>
      <p className="feature-card-description">{description}</p>
    </div>
  )

  if (href) {
    return (
      <a href={href} className="feature-card-link">
        {content}
      </a>
    )
  }

  return content
}

interface FeatureGridProps {
  children: ReactNode
  cols?: 2 | 3
}

export function FeatureGrid({ children, cols = 2 }: FeatureGridProps) {
  return (
    <div className={`feature-grid feature-grid--cols-${cols}`}>
      {children}
    </div>
  )
}
