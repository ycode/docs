import type { ReactNode } from 'react'

interface CalloutProps {
  type?: 'info' | 'warning'
  title?: string
  children: ReactNode
}

const icons = {
  info: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </svg>
  ),
  warning: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" />
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
    </svg>
  )
}

const styles = {
  info: {
    wrapper: 'bg-[#5eabff1a] text-[#007DFF] dark:bg-[rgba(94,171,255,0.12)] dark:text-[#5eabff]',
    icon: 'text-[#007DFF] dark:text-[#5eabff]'
  },
  warning: {
    wrapper: 'bg-amber-50 text-amber-700 dark:bg-amber-900/15 dark:text-amber-400',
    icon: 'text-amber-600 dark:text-amber-400'
  }
}

export function Callout({ type = 'info', title, children }: CalloutProps) {
  const variant = styles[type]

  return (
    <div
      className={`flex gap-3 rounded-xl px-4 py-3 my-5 text-sm leading-tight ${variant.wrapper}`}
    >
      <div className={`mt-0.5 shrink-0 ${variant.icon}`}>
        {icons[type]}
      </div>
      <div className="min-w-0">
        {title && (
          <p className="font-semibold mb-1">{title}</p>
        )}
        <div>{children}</div>
      </div>
    </div>
  )
}
