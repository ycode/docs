interface KeyboardShortcutProps {
  keys: string
}

const KEY_MAP: Record<string, string> = {
  cmd: '⌘',
  ctrl: '⌃',
  alt: '⌥',
  opt: '⌥',
  shift: '⇧',
  enter: '↵',
  return: '↵',
  tab: '⇥',
  delete: '⌫',
  backspace: '⌫',
  escape: 'Esc',
  esc: 'Esc',
  space: '␣',
  up: '↑',
  down: '↓',
  left: '←',
  right: '→'
}

function formatKey(key: string): string {
  const lower = key.toLowerCase().trim()
  return KEY_MAP[lower] || key.toUpperCase()
}

export function KeyboardShortcut({ keys }: KeyboardShortcutProps) {
  const parts = keys.split('+').map((k) => k.trim())

  return (
    <span className="inline-flex items-center gap-0.5">
      {parts.map((key, i) => (
        <span key={i} className="inline-flex items-center">
          <kbd className="inline-flex items-center justify-center min-w-[1.5em] px-1.5 py-0.5 text-xs font-mono font-medium bg-gray-100 border border-gray-300 rounded shadow-sm dark:bg-neutral-800 dark:border-neutral-600 dark:text-neutral-200">
            {formatKey(key)}
          </kbd>
          {i < parts.length - 1 && (
            <span className="mx-0.5 text-gray-400 text-xs">+</span>
          )}
        </span>
      ))}
    </span>
  )
}
