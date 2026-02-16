import type { ReactNode } from 'react'
import Link from 'next/link'

interface FeatureCardProps {
  title: string
  children: ReactNode
  href: string
}

export function FeatureCard({ title, children, href }: FeatureCardProps) {
  return (
    <Link
      href={href}
      className="x:group x:focus-visible:nextra-focus nextra-card x:flex x:flex-col x:justify-start x:overflow-hidden x:rounded-lg x:border x:border-gray-200 x:text-current x:no-underline x:dark:shadow-none x:hover:shadow-gray-100 x:dark:hover:shadow-none x:shadow-gray-100 x:active:shadow-sm x:active:shadow-gray-200 x:transition-all x:duration-200 x:hover:border-gray-300 x:bg-gray-100 x:shadow x:dark:border-neutral-700 x:dark:bg-neutral-800 x:dark:text-gray-50 x:hover:shadow-lg x:dark:hover:border-neutral-500 x:dark:hover:bg-neutral-700"
    >
      <span className="x:flex x:font-semibold x:items-center x:gap-2 x:px-4 x:pt-4 x:pb-0 x:text-gray-700 x:hover:text-gray-900 x:dark:text-gray-300 x:dark:hover:text-gray-100">
        <span className="_truncate">{title}</span>
      </span>
      <div className="x:px-4 x:pt-1 x:pb-4 x:text-sm x:text-gray-600 x:dark:text-gray-400">
        {children}
      </div>
    </Link>
  )
}

interface FeatureGridProps {
  children: ReactNode
  cols?: 2 | 3
}

export function FeatureGrid({ children, cols = 3 }: FeatureGridProps) {
  return (
    <div
      className="nextra-cards x:mt-4 x:gap-4 x:grid not-prose"
      style={{ '--rows': cols } as React.CSSProperties}
    >
      {children}
    </div>
  )
}
