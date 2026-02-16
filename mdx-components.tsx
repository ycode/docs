import { useMDXComponents as getThemeComponents } from 'nextra-theme-docs'
import { Screenshot } from '@/components/screenshot'
import { Video } from '@/components/video'
import { KeyboardShortcut } from '@/components/keyboard-shortcut'
import { FeatureCard, FeatureGrid } from '@/components/feature-card'

const themeComponents = getThemeComponents()

export function useMDXComponents(components?: Record<string, React.ComponentType>) {
  return {
    ...themeComponents,
    Screenshot,
    Video,
    KeyboardShortcut,
    FeatureCard,
    FeatureGrid,
    ...components
  }
}
