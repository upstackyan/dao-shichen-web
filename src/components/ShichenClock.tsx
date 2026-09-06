import { SHICHEN_LIST } from '../data/meridians'

interface ShichenClockProps {
  /** 当前（或预览）偏移分钟，0 = 23:00 子时起点，位于表盘正上方 */
  offsetMinutes: number
  /** 实时秒数，仅实时模式驱动分针平滑推进与秒针走动 */
  seconds: number
  isLive: boolean
  activeIndex: number
  /** 点击扇区跳转到对应时辰（进入预览模式） */
  onSelect: (index: number) => void
}

const CX = 200
const CY = 200
/** 地支扇区环的内 / 外半径 */
const R_INNER = 112
const R_OUTER = 164

/** 极坐标 → SVG 坐标：0° 指向正上方（子时起点），顺时针增长 */
function polar(deg: number, r: number): [number, number] {
  const rad = ((deg - 90) * Math.PI) / 180
  return [CX + r * Math.cos(rad), CY + r * Math.sin(rad)]
}

/** 扇区环形路径，相邻扇区间留 1.2° 缝隙 */
function sectorPath(index: number): string {
  const a0 = index * 30 + 0.6
  const a1 = index * 30 + 30 - 0.6
  const [x0, y0] = polar(a0, R_OUTER)
  const [x1, y1] = polar(a1, R_OUTER)
  const [x2, y2] = polar(a1, R_INNER)
  const [x3, y3] = polar(a0, R_INNER)
  return [
    `M${x0.toFixed(2)},${y0.toFixed(2)}`,
    `A${R_OUTER},${R_OUTER} 0 0 1 ${x1.toFixed(2)},${y1.toFixed(2)}`,
    `L${x2.toFixed(2)},${y2.toFixed(2)}`,
    `A${R_INNER},${R_INNER} 0 0 0 ${x3.toFixed(2)},${y3.toFixed(2)}`,
    'Z',
  ].join(' ')
}

/** 当前时辰扇区外缘的强调弧线 */
function activeArcPath(index: number): string {
  const [x0, y0] = polar(index * 30 + 1.5, R_OUTER + 6)
  const [x1, y1] = polar(index * 30 + 28.5, R_OUTER + 6)
  return `M${x0.toFixed(2)},${y0.toFixed(2)} A${R_OUTER + 6},${R_OUTER + 6} 0 0 1 ${x1.toFixed(2)},${y1.toFixed(2)}`
}

export default function ShichenClock({
  offsetMinutes,
  seconds,
  isLive,
  activeIndex,
  onSelect,
}: ShichenClockProps) {
  const active = SHICHEN_LIST[activeIndex]
  // 时针一天一圈（24 小时制地支盘），分针一小时一圈；实时模式按秒平滑推进
  const hourAngle = (offsetMinutes / 1440) * 360
  const minuteAngle = (offsetMinutes % 60) * 6 + (isLive ? seconds * 0.1 : 0)
  const secondAngle = seconds * 6

  return (
    <section className="flex min-h-0 shrink-0 basis-[clamp(300px,32vw,430px)] flex-col rounded-2xl border border-line bg-card px-[clamp(12px,1.6vw,20px)] py-[clamp(10px,1.6vh,18px)] shadow-[0_12px_32px_var(--shadow)] transition-colors duration-[600ms] max-[900px]:basis-auto max-[640px]:hidden">
      <div className="mb-0.5 flex shrink-0 items-baseline justify-between">
        <h2 className="text-[clamp(14px,2.2vh,18px)] font-semibold tracking-[0.3em]">
          时辰表盘
        </h2>
        <span className="text-[clamp(10px,1.5vh,12px)] tracking-[0.08em] text-ink-soft [@media(max-height:640px)]:hidden">
          点击扇区可预览对应时辰
        </span>
      </div>
      <svg
        className="h-full min-h-0 w-full flex-1 max-[900px]:max-h-[520px]"
        viewBox="0 0 400 400"
        preserveAspectRatio="xMidYMid meet"
        role="group"
        aria-label={`时辰表盘时钟，指针指向 ${offsetToDialText(offsetMinutes)}，当前 ${active.name}时 ${active.meridian} 当令`}
      >
        {/* 外缘双环与时时刻刻（24 格，时辰交界加粗） */}
        <circle cx={CX} cy={CY} r="188" className="clock-rim" strokeWidth="1" />
        <circle cx={CX} cy={CY} r="184" className="clock-rim" strokeWidth="0.5" opacity="0.6" />
        {Array.from({ length: 24 }, (_, h) => {
          const major = h % 2 === 0
          const [x0, y0] = polar(h * 15, major ? 172 : 175)
          const [x1, y1] = polar(h * 15, major ? 182 : 180)
          return (
            <line
              key={h}
              x1={x0.toFixed(2)}
              y1={y0.toFixed(2)}
              x2={x1.toFixed(2)}
              y2={y1.toFixed(2)}
              className={major ? 'clock-tick-major' : 'clock-tick'}
              strokeWidth={major ? 2 : 1}
              strokeLinecap="round"
            />
          )
        })}

        {/* 十二地支扇区：低透明度色环，当前时辰高亮，可点击预览 */}
        {SHICHEN_LIST.map((s) => {
          const [lx, ly] = polar(s.index * 30 + 15, (R_INNER + R_OUTER) / 2)
          return (
            <g
              key={s.index}
              className={`clock-hit ${s.index === activeIndex ? 'is-active' : ''}`}
              onClick={() => onSelect(s.index)}
              tabIndex={0}
              role="button"
              aria-label={`${s.name}时 ${s.start}–${s.end} · ${s.meridian}，点击预览`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  onSelect(s.index)
                }
              }}
            >
              <title>
                {s.name}时 · {s.meridian}
              </title>
              <path d={sectorPath(s.index)} fill={s.color} className="clock-sector-fill" />
              <text
                x={lx.toFixed(2)}
                y={ly.toFixed(2)}
                textAnchor="middle"
                dominantBaseline="central"
                className="clock-branch"
                fontSize="19"
              >
                {s.name}
              </text>
            </g>
          )
        })}

        {/* 当前时辰外缘强调弧 */}
        <path
          d={activeArcPath(activeIndex)}
          fill="none"
          stroke={active.color}
          strokeWidth="3"
          strokeLinecap="round"
          className="transition-[stroke] duration-[600ms]"
        />

        {/* 指针（基底被盘心圆牌遮盖）：时针日行一圈，分针时行一圈，秒针仅实时模式走动 */}
        <g transform={`rotate(${hourAngle.toFixed(3)} ${CX} ${CY})`}>
          <line x1={CX} y1={CY} x2={CX} y2={CY - 90} className="clock-hand" strokeWidth="5.5" />
        </g>
        <g transform={`rotate(${minuteAngle.toFixed(3)} ${CX} ${CY})`}>
          <line x1={CX} y1={CY} x2={CX} y2={CY - 104} className="clock-hand" strokeWidth="3.5" />
        </g>
        {isLive && (
          <g transform={`rotate(${secondAngle} ${CX} ${CY})`}>
            <line
              x1={CX}
              y1={CY}
              x2={CX}
              y2={CY - 108}
              className="clock-hand-second"
              strokeWidth="1.5"
            />
          </g>
        )}

        {/* 盘心圆牌：当前时辰书法地支字 + 经络名 */}
        <circle cx={CX} cy={CY} r="58" className="clock-medallion" strokeWidth="1" />
        <text
          x={CX}
          y={CY - 12}
          textAnchor="middle"
          dominantBaseline="central"
          className="fill-accent font-glyph transition-colors duration-[600ms] group-data-[theme=dark]:fill-accent-light"
          fontSize="40"
        >
          {active.name}
        </text>
        <text
          x={CX}
          y={CY + 22}
          textAnchor="middle"
          dominantBaseline="central"
          className="fill-ink-soft"
          fontSize="12"
          letterSpacing="1"
        >
          {active.meridian}
        </text>
      </svg>
      <div className="flex shrink-0 items-center gap-2 border-t border-dashed border-line pt-[clamp(6px,1vh,10px)] text-[clamp(11px,1.6vh,13px)] text-ink-soft">
        <span
          className="h-2.5 w-2.5 shrink-0 rounded-full"
          style={{ background: active.color }}
        />
        当前当令：<strong>{active.meridian}</strong>（{active.organ}）·{' '}
        {active.name}时 {active.start}–{active.end}
      </div>
    </section>
  )
}

/** aria 描述用：偏移分钟 → 「X时X分」（表盘 0° 为子时起点 23:00） */
function offsetToDialText(offsetMinutes: number): string {
  const total = (offsetMinutes + 23 * 60) % 1440
  return `${Math.floor(total / 60)}时${total % 60}分`
}
