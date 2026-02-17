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
      className="group nextra-card x:focus-visible:nextra-focus flex flex-col justify-start overflow-hidden rounded-lg border border-gray-200 text-current no-underline dark:shadow-none hover:shadow-gray-100 dark:hover:shadow-none shadow-gray-100 active:shadow-sm active:shadow-gray-200 transition-all duration-200 hover:border-gray-300 bg-gray-100 shadow dark:border-neutral-700 dark:bg-neutral-800 dark:text-gray-50 hover:shadow-lg dark:hover:border-neutral-500 dark:hover:bg-neutral-700"
    >
      <span className="flex font-semibold items-center gap-2 px-4 pt-4 pb-0 text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100">
        <span className="_truncate">{title}</span>
      </span>
      <div className="px-4 pt-1 pb-4 text-sm leading-snug text-gray-600 dark:text-gray-400">
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
      className="nextra-cards mt-4 gap-4 grid not-prose"
      style={{ '--rows': cols } as React.CSSProperties}
    >
      {children}
    </div>
  )
}
