import { useState } from 'react'
import type { CSSProperties } from 'react'
import { SHICHEN_LIST } from './data/meridians'
import { useCurrentShichen } from './hooks/useCurrentShichen'
import { useTheme } from './hooks/useTheme'
import {
  formatCountdown,
  getOffsetMinutes,
  getShichenIndex,
  offsetToClock,
  secondsToNextShichen,
} from './utils/time'
import ShichenPanel from './components/ShichenPanel'
import BodyMeridian from './components/BodyMeridian'
import Timeline from './components/Timeline'
import ThemeToggle from './components/ThemeToggle'
import './App.css'

export default function App() {
  const now = useCurrentShichen()
  /** null = 实时模式；数值 = 预览模式下的偏移分钟 */
  const [previewMinutes, setPreviewMinutes] = useState<number | null>(null)

  const liveOffset = getOffsetMinutes(now)
  const isLive = previewMinutes === null
  const offset = previewMinutes ?? liveOffset
  const activeIndex = getShichenIndex(offset)
  const active = SHICHEN_LIST[activeIndex]

  // 昼夜自动切换跟随真实时辰
  const { mode, resolved, cycleMode } = useTheme(getShichenIndex(liveOffset))

  const themeVars = {
    '--accent': active.color,
    '--accent-deep': active.colorDeep,
    '--accent-light': active.colorLight,
  } as CSSProperties

  return (
    <div className="app" data-theme={resolved} style={themeVars}>
      <header className="app-header">
        <div className="brand">
          <h1>子午流注</h1>
          <p>十二时辰 · 经络养生 · 应时而动</p>
        </div>
        <ThemeToggle mode={mode} onCycle={cycleMode} />
      </header>

      <main className="app-main">
        <ShichenPanel
          data={active}
          isLive={isLive}
          clock={offsetToClock(offset)}
          countdownText={formatCountdown(secondsToNextShichen(now))}
        />
        <BodyMeridian
          activeIndex={activeIndex}
          onSelect={(i) => setPreviewMinutes(i * 120 + 60)}
        />
      </main>

      <Timeline
        offsetMinutes={offset}
        isLive={isLive}
        onScrub={setPreviewMinutes}
        onBackToLive={() => setPreviewMinutes(null)}
      />

      <footer className="app-footer">
        经络循行为科普级简化示意，非医学精确循行图 · 内容仅供传统文化参考，不构成医疗建议
      </footer>
    </div>
  )
}
