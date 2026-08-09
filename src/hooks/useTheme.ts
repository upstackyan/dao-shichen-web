import { useCallback, useState } from 'react'

export type ThemeMode = 'auto' | 'light' | 'dark'
export type ResolvedTheme = 'light' | 'dark'

/** 卯时(3)至申时(8) 为昼，其余为夜 */
const DAY_SHICHEN = new Set([3, 4, 5, 6, 7, 8])

/**
 * 主题三态：auto 随当前时辰昼夜自动切换，light/dark 手动锁定。
 */
export function useTheme(currentShichenIndex: number) {
  const [mode, setModeState] = useState<ThemeMode>('auto')

  const resolved: ResolvedTheme =
    mode === 'auto'
      ? DAY_SHICHEN.has(currentShichenIndex)
        ? 'light'
        : 'dark'
      : mode

  const cycleMode = useCallback(() => {
    setModeState((prev) =>
      prev === 'auto' ? 'light' : prev === 'light' ? 'dark' : 'auto',
    )
  }, [])

  return { mode, resolved, setMode: setModeState, cycleMode }
}
