import { useRef } from 'react'
import type { PointerEvent as ReactPointerEvent } from 'react'
import { SHICHEN_LIST } from '../data/meridians'
import { getShichenIndex, offsetToClock } from '../utils/time'

const DAY_MINUTES = 1440

interface TimelineProps {
  /** 当前展示的偏移分钟（以 23:00 子时为起点） */
  offsetMinutes: number
  isLive: boolean
  /** 拖拽 / 点击定位（进入预览模式） */
  onScrub: (minutes: number) => void
  /** 恢复实时跟随 */
  onBackToLive: () => void
}

export default function Timeline({
  offsetMinutes,
  isLive,
  onScrub,
  onBackToLive,
}: TimelineProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const draggingRef = useRef(false)

  const posToMinutes = (clientX: number) => {
    const el = trackRef.current
    if (!el) return offsetMinutes
    const rect = el.getBoundingClientRect()
    if (rect.width <= 0) return offsetMinutes
    const ratio = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width))
    return Math.min(DAY_MINUTES - 1, Math.round(ratio * DAY_MINUTES))
  }

  const handlePointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    draggingRef.current = true
    e.currentTarget.setPointerCapture(e.pointerId)
    onScrub(posToMinutes(e.clientX))
  }

  const handlePointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return
    onScrub(posToMinutes(e.clientX))
  }

  const handlePointerUp = () => {
    draggingRef.current = false
  }

  const currentIndex = getShichenIndex(offsetMinutes)
  const pointerLeft = (offsetMinutes / DAY_MINUTES) * 100

  return (
    <section className="timeline">
      <div className="timeline-head">
        <span className="timeline-title">一日十二时辰</span>
        <span className="timeline-sub">
          自子时（23:00）起 · 拖动或点击以预览经络变化
        </span>
        {!isLive && (
          <button type="button" className="back-live" onClick={onBackToLive}>
            回到现在
          </button>
        )}
      </div>

      <div
        ref={trackRef}
        className="timeline-track"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        {SHICHEN_LIST.map((s) => (
          <div
            key={s.index}
            className={`timeline-seg ${s.index === currentIndex ? 'is-current' : ''}`}
            style={{ background: s.color }}
            title={`${s.name}时 ${s.start}–${s.end} · ${s.meridian}`}
          />
        ))}
        <div className="timeline-pointer" style={{ left: `${pointerLeft}%` }}>
          <div className="pointer-bubble">
            <span className="bubble-clock">{offsetToClock(offsetMinutes)}</span>
            <span className="bubble-name">{SHICHEN_LIST[currentIndex].name}时</span>
          </div>
          <div className="pointer-knob" />
        </div>
      </div>

      <div className="timeline-labels">
        {SHICHEN_LIST.map((s) => (
          <span key={s.index} className="timeline-label">
            {s.name}
          </span>
        ))}
      </div>
    </section>
  )
}
