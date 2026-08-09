import { SHICHEN_LIST } from '../data/meridians'

interface BodyMeridianProps {
  activeIndex: number
  /** 点击经络跳转到对应时辰（进入预览模式） */
  onSelect: (index: number) => void
}

interface MeridianPathData {
  /** 简化循行路径（科普示意） */
  d: string
  /** 起点 / 终点腧穴坐标 */
  dots: [number, number][]
  /** 经络名标注位置 */
  label: [number, number]
}

/** 十二经络简化循行路径，与 SHICHEN_LIST 索引一一对应（贴合重绘后的人体轮廓） */
const MERIDIAN_PATHS: MeridianPathData[] = [
  {
    // 足少阳胆经：头侧 → 体侧 → 下肢外侧 → 第四趾
    d: 'M164,28 C176,36 181,50 176,64 C172,78 177,94 185,110 C193,130 195,166 194,202 C193,236 189,260 185,280 C183,298 181,314 179,328 C181,380 184,450 186,518 C187,550 185,580 182,606',
    dots: [[164, 28], [182, 606]],
    label: [222, 114],
  },
  {
    // 足厥阴肝经：大趾 → 下肢内侧 → 阴部 → 胁肋
    d: 'M143,606 C144,560 146,500 148,442 C149,402 149,372 147,342 C145,322 143,310 143,298 C141,276 138,250 139,228 C140,212 141,202 143,192',
    dots: [[143, 606], [143, 192]],
    label: [44, 432],
  },
  {
    // 手太阴肺经：胸前 → 上臂内侧 → 拇指
    d: 'M136,168 C126,176 114,182 106,192 C100,220 96,256 92,292 C90,314 88,334 86,352',
    dots: [[136, 168], [86, 352]],
    label: [14, 244],
  },
  {
    // 手阳明大肠经：食指 → 上肢外侧 → 肩 → 头面
    d: 'M221,356 C224,334 226,302 224,272 C222,238 218,202 214,172 C211,146 206,126 198,112 C188,94 174,78 162,64 C158,58 156,52 154,46',
    dots: [[221, 356], [154, 46]],
    label: [230, 244],
  },
  {
    // 足阳明胃经：头面 → 胸腹正面 → 下肢前侧 → 第二趾
    d: 'M145,34 C144,54 145,72 146,90 C145,120 144,156 144,192 C144,232 145,262 146,292 C148,318 152,340 156,364 C159,410 160,470 159,530 C159,556 158,580 157,600',
    dots: [[145, 34], [157, 600]],
    label: [30, 174],
  },
  {
    // 足太阴脾经：大趾 → 下肢内侧 → 腹部 → 胸
    d: 'M136,608 C138,560 140,500 142,442 C143,402 143,372 141,342 C139,318 136,300 135,286 C134,258 133,224 135,192 C136,176 138,164 141,154',
    dots: [[136, 608], [141, 154]],
    label: [28, 474],
  },
  {
    // 手少阴心经：心 → 上臂内侧 → 小指
    d: 'M158,186 C168,192 178,198 186,206 C194,234 201,266 208,296 C211,314 214,336 216,354',
    dots: [[158, 186], [216, 354]],
    label: [232, 224],
  },
  {
    // 手太阳小肠经：小指 → 上肢外侧 → 肩胛 → 头面
    d: 'M78,356 C75,334 74,302 76,272 C78,238 82,202 86,172 C89,146 94,126 102,112 C112,94 126,78 138,64 C142,58 144,52 146,44',
    dots: [[78, 356], [146, 44]],
    label: [4, 254],
  },
  {
    // 足太阳膀胱经：头顶 → 项背脊柱两侧 → 下肢后侧 → 足小趾
    d: 'M138,26 C148,14 162,16 166,28 C169,58 168,94 166,130 C164,180 163,232 162,276 C161,300 161,318 162,332 C164,386 166,456 167,524 C168,556 168,582 168,604',
    dots: [[138, 26], [168, 604]],
    label: [208, 434],
  },
  {
    // 足少阴肾经：足心 → 下肢内侧后缘 → 胸
    d: 'M156,608 C155,560 153,500 152,442 C151,402 151,372 152,342 C152,318 152,296 152,280 C151,248 150,214 150,186 C150,172 150,162 150,154',
    dots: [[156, 608], [150, 154]],
    label: [196, 304],
  },
  {
    // 手厥阴心包经：胸中 → 上臂内侧中线 → 中指
    d: 'M150,196 C140,204 128,210 120,216 C112,244 104,272 98,300 C95,320 92,340 89,356',
    dots: [[150, 196], [89, 356]],
    label: [2, 324],
  },
  {
    // 手少阳三焦经：无名指 → 上肢外侧中线 → 肩 → 耳
    d: 'M219,352 C220,330 221,300 219,270 C217,238 213,202 209,172 C206,146 201,126 193,110 C184,90 173,72 166,58 C164,50 163,42 163,32',
    dots: [[219, 352], [163, 32]],
    label: [232, 284],
  },
]

export default function BodyMeridian({ activeIndex, onSelect }: BodyMeridianProps) {
  const active = SHICHEN_LIST[activeIndex]
  const activePath = MERIDIAN_PATHS[activeIndex]

  return (
    <section className="flex min-h-0 shrink-0 basis-[clamp(300px,32vw,430px)] flex-col rounded-2xl border border-line bg-card px-[clamp(12px,1.6vw,20px)] py-[clamp(10px,1.6vh,18px)] shadow-[0_12px_32px_var(--shadow)] transition-colors duration-[600ms] max-[900px]:basis-auto max-[640px]:hidden">
      <div className="mb-0.5 flex shrink-0 items-baseline justify-between">
        <h2 className="text-[clamp(14px,2.2vh,18px)] font-semibold tracking-[0.3em]">
          经络流注
        </h2>
        <span className="text-[clamp(10px,1.5vh,12px)] tracking-[0.08em] text-ink-soft [@media(max-height:640px)]:hidden">
          点击经络可跳转对应时辰
        </span>
      </div>
      <svg
        className="h-full min-h-0 w-full flex-1 max-[900px]:max-h-[520px]"
        viewBox="0 0 300 640"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label={`人体经络图，当前 ${active.meridian} 当令`}
      >
        <defs>
          <linearGradient id="body-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" className="body-grad-top" />
            <stop offset="100%" className="body-grad-bottom" />
          </linearGradient>
          <filter id="ink-blur" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="16" />
          </filter>
        </defs>

        {/* 水墨晕染氛围 */}
        <ellipse
          className="body-aura"
          cx="150"
          cy="330"
          rx="104"
          ry="286"
          filter="url(#ink-blur)"
        />

        {/* 人体轮廓（重绘写实比例立像，渐变填充 + 柔和描边） */}
        <g className="silhouette" fill="url(#body-grad)">
          {/* 头部与颈 */}
          <ellipse cx="150" cy="45" rx="26" ry="32" />
          <path d="M140,70 C140,82 139,90 135,97 L165,97 C161,90 160,82 160,70 Z" />
          {/* 躯干：肩 → 胸 → 腰 → 髋 */}
          <path d="M150,94 C168,94 194,98 204,110 C209,117 209,126 206,134 C199,152 196,178 195,205 C194,232 192,254 189,270 C187,281 187,290 189,299 C192,312 187,322 174,326 C158,331 142,331 126,326 C113,322 108,312 111,299 C113,290 113,281 111,270 C108,254 106,232 105,205 C104,178 101,152 94,134 C91,126 91,117 96,110 C106,98 132,94 150,94 Z" />
          {/* 左臂（含收分）与左手 */}
          <path d="M99,106 C90,140 84,176 80,214 C77,248 74,282 72,316 C71,332 72,345 76,356 L90,352 C87,341 86,329 87,314 C89,282 92,250 95,218 C98,184 104,150 113,120 Z" />
          <ellipse cx="83" cy="364" rx="8" ry="13" />
          {/* 右臂与右手 */}
          <path d="M201,106 C210,140 216,176 220,214 C223,248 226,282 228,316 C229,332 228,345 224,356 L210,352 C213,341 214,329 213,314 C211,282 208,250 205,218 C202,184 196,150 187,120 Z" />
          <ellipse cx="217" cy="364" rx="8" ry="13" />
          {/* 左腿（大腿 → 膝 → 小腿收分） */}
          <path d="M120,324 C122,358 126,402 129,442 C131,478 132,514 131,548 C130,570 128,588 126,602 L145,602 C146,582 147,558 147,532 C148,498 149,462 149,426 C150,392 150,358 150,326 Z" />
          {/* 右腿 */}
          <path d="M180,324 C178,358 174,402 171,442 C169,478 168,514 169,548 C170,570 172,588 174,602 L155,602 C154,582 153,558 153,532 C152,498 151,462 151,426 C150,392 150,358 150,326 Z" />
          {/* 双足 */}
          <ellipse cx="132" cy="610" rx="19" ry="8" />
          <ellipse cx="168" cy="610" rx="19" ry="8" />
        </g>

        {/* 全部经络：低透明底图，可点击跳转 */}
        {MERIDIAN_PATHS.map((p, i) => (
          <g
            key={i}
            className={`meridian-hit ${i === activeIndex ? 'is-active' : ''}`}
            onClick={() => onSelect(i)}
          >
            <title>
              {SHICHEN_LIST[i].name}时 · {SHICHEN_LIST[i].meridian}
            </title>
            <path d={p.d} className="hit-area" />
            <path d={p.d} className="meridian-line" />
          </g>
        ))}

        {/* 当前经络：主题色流注动画 */}
        <g className="meridian-active">
          <path d={activePath.d} stroke={active.color} className="active-underlay" />
          <path d={activePath.d} stroke={active.color} className="active-flow" />
          {activePath.dots.map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="4.5" fill={active.color} className="active-dot" />
          ))}
          <text
            x={activePath.label[0]}
            y={activePath.label[1]}
            fill={active.color}
            className="active-label"
          >
            {active.meridian}
          </text>
        </g>
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
