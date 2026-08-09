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
    <section className="mt-[clamp(10px,1.8vh,24px)] shrink-0 rounded-2xl border border-line bg-card px-[clamp(14px,2vw,22px)] pt-[clamp(8px,1.4vh,16px)] pb-[clamp(6px,1vh,12px)] shadow-[0_8px_24px_var(--shadow)] transition-colors duration-[600ms]">
      <div className="mb-[clamp(20px,3.4vh,28px)] flex items-center gap-3.5">
        <span className="text-[clamp(12px,1.9vh,15px)] font-semibold tracking-[0.25em]">
          一日十二时辰
        </span>
        <span className="text-[clamp(10px,1.6vh,12px)] tracking-[0.06em] text-ink-soft [@media(max-height:640px)]:hidden">
          自子时（23:00）起 · 拖动或点击以预览经络变化
        </span>
        {!isLive && (
          <button
            type="button"
            className="ml-auto cursor-pointer rounded-full bg-accent px-4 py-1.5 text-[13px] tracking-[0.1em] text-white transition-transform duration-150 hover:-translate-y-px"
            onClick={onBackToLive}
          >
            回到现在
          </button>
        )}
      </div>

      <div
        ref={trackRef}
        className="relative flex h-[clamp(26px,4.4vh,34px)] cursor-pointer touch-none rounded-lg select-none"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        {SHICHEN_LIST.map((s) => (
          <div
            key={s.index}
            className={`flex-1 opacity-45 transition-opacity duration-300 first:rounded-l-lg last:rounded-r-lg ${
              s.index === currentIndex ? 'opacity-100' : ''
            }`}
            style={{ background: s.color }}
            title={`${s.name}时 ${s.start}–${s.end} · ${s.meridian}`}
          />
        ))}
        <div
          className="pointer-events-none absolute -top-6 -bottom-2 -ml-px w-0.5 bg-ink"
          style={{ left: `${pointerLeft}%` }}
        >
          <div className="absolute -top-[30px] left-1/2 flex -translate-x-1/2 items-baseline gap-1.5 rounded-md bg-ink px-2 py-0.5 text-xs whitespace-nowrap text-card">
            <span className="font-bold tabular-nums">
              {offsetToClock(offsetMinutes)}
            </span>
            <span>{SHICHEN_LIST[currentIndex].name}时</span>
          </div>
          <div className="absolute bottom-0 left-1/2 h-3.5 w-3.5 -translate-x-1/2 translate-y-1/2 rounded-full border-2 border-card bg-accent shadow-md" />
        </div>
      </div>

      <div className="mt-2 flex">
        {SHICHEN_LIST.map((s) => (
          <span
            key={s.index}
            className="flex-1 text-center text-[clamp(11px,1.7vh,13px)] tracking-[0.1em] text-ink-soft"
          >
            {s.name}
          </span>
        ))}
      </div>
    </section>
  )
}
