import type { ThemeMode } from '../hooks/useTheme'

interface ThemeToggleProps {
  mode: ThemeMode
  onCycle: () => void
}

const MODE_LABEL: Record<ThemeMode, string> = {
  auto: '随昼夜',
  light: '昼',
  dark: '夜',
}

export default function ThemeToggle({ mode, onCycle }: ThemeToggleProps) {
  return (
    <button type="button" className="theme-toggle" onClick={onCycle} title="切换主题">
      <span className="theme-icon" aria-hidden>
        {mode === 'auto' ? '☯' : mode === 'light' ? '☀' : '☾'}
      </span>
      {MODE_LABEL[mode]}
    </button>
  )
}
