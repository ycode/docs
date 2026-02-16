import type { ReactNode } from 'react'

interface FeatureCardProps {
  title: string
  description: string
  icon?: ReactNode
  href?: string
}

export function FeatureCard({ title, description, icon, href }: FeatureCardProps) {
  const content = (
    <div className="group relative flex flex-col gap-2 rounded-lg border border-gray-200 p-5 transition-colors hover:border-gray-300 hover:bg-gray-50 dark:border-neutral-700 dark:hover:border-neutral-600 dark:hover:bg-neutral-800/50">
      {icon && <div className="text-2xl">{icon}</div>}
      <h3 className="text-base font-semibold text-gray-900 dark:text-white">
        {title}
      </h3>
      <p className="text-sm text-gray-600 dark:text-neutral-400">{description}</p>
    </div>
  )

  if (href) {
    return (
      <a href={href} className="no-underline">
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
  const gridClass =
    cols === 3
      ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-6'
      : 'grid grid-cols-1 md:grid-cols-2 gap-4 my-6'

  return <div className={gridClass}>{children}</div>
}
