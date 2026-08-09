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
    <button
      type="button"
      className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-line bg-card px-[clamp(12px,1.6vw,16px)] py-[clamp(5px,0.9vh,8px)] text-[clamp(12px,1.6vh,14px)] tracking-[0.1em] text-ink transition-colors duration-200 hover:border-accent hover:text-accent"
      onClick={onCycle}
      title="切换主题"
    >
      <span className="text-base" aria-hidden>
        {mode === 'auto' ? '☯' : mode === 'light' ? '☀' : '☾'}
      </span>
      {MODE_LABEL[mode]}
    </button>
  )
}
