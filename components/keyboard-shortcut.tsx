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
    <span className="kbd-shortcut">
      {parts.map((key, i) => (
        <span key={i} className="kbd-group">
          <kbd className="kbd-key">{formatKey(key)}</kbd>
          {i < parts.length - 1 && (
            <span className="kbd-separator">+</span>
          )}
        </span>
      ))}
    </span>
  )
}
