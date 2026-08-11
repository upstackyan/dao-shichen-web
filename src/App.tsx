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
    <div
      className="app group flex h-dvh flex-col overflow-hidden bg-bg px-[clamp(16px,4vw,44px)] pt-[clamp(12px,2vh,26px)] pb-[clamp(8px,1.4vh,18px)] font-ui text-ink antialiased transition-colors duration-[600ms] max-[900px]:h-auto max-[900px]:min-h-dvh max-[900px]:overflow-visible"
      data-theme={resolved}
      style={themeVars}
    >
      <header className="mb-[clamp(8px,1.6vh,20px)] flex shrink-0 items-end justify-between gap-4">
        <div>
          <h1 className="font-glyph text-[clamp(22px,3.6vh,38px)] font-bold tracking-[0.3em] text-accent-deep transition-colors duration-[600ms] group-data-[theme=dark]:text-accent-light">
            子午流注
          </h1>
          <p className="mt-1 text-[clamp(11px,1.6vh,14px)] tracking-[0.3em] text-ink-soft">
            十二时辰 · 经络养生 · 应时而动
          </p>
        </div>
        <ThemeToggle mode={mode} onCycle={cycleMode} />
      </header>

      <main className="flex min-h-0 flex-1 items-stretch gap-[clamp(14px,2vw,28px)] max-[900px]:flex-col">
        <ShichenPanel
          data={active}
          isLive={isLive}
          clock={offsetToClock(offset)}
          countdownText={formatCountdown(secondsToNextShichen(now))}
          now={now}
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

      <footer className="mt-[clamp(6px,1vh,14px)] shrink-0 text-center text-[clamp(10px,1.5vh,12px)] tracking-[0.05em] text-ink-soft">
        经络循行为科普级简化示意，非医学精确循行图 · 内容仅供传统文化参考，不构成医疗建议
      </footer>
    </div>
  )
}
