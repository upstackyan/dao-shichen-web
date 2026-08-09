import { useEffect, useState } from 'react'
import { SHICHEN_LIST, type ShichenData } from '../data/meridians'

interface ShichenPanelProps {
  data: ShichenData
  isLive: boolean
  /** 实时时钟文本 */
  clock: string
  /** 距下一时辰倒计时文本 */
  countdownText: string
}

export default function ShichenPanel({
  data,
  isLive,
  clock,
  countdownText,
}: ShichenPanelProps) {
  const [quoteIndex, setQuoteIndex] = useState(0)

  useEffect(() => {
    setQuoteIndex(0)
    if (data.quotes.length <= 1) return
    const timer = window.setInterval(() => {
      setQuoteIndex((i) => (i + 1) % data.quotes.length)
    }, 8000)
    return () => window.clearInterval(timer)
  }, [data])

  // 取模兜底：时辰切换后 effect 重置索引前，渲染阶段也不会越界
  const quote = data.quotes[quoteIndex % data.quotes.length]
  const next = SHICHEN_LIST[(data.index + 1) % 12]

  return (
    <section
      className="flex min-h-0 flex-1 basis-0 flex-col gap-[clamp(8px,1.4vh,18px)] overflow-y-auto rounded-2xl px-[clamp(16px,2vw,32px)] py-[clamp(14px,2vh,30px)] text-[#f7f3e8] shadow-[0_12px_32px_var(--shadow)] transition-[background] duration-[600ms] max-[900px]:flex-none max-[900px]:basis-auto max-[900px]:overflow-y-visible"
      style={{
        background: `linear-gradient(150deg, ${data.colorDeep} 0%, ${data.color} 100%)`,
      }}
    >
      <div className="flex items-center gap-[clamp(12px,1.8vw,20px)]">
        <div
          className="font-display text-[clamp(44px,9vh,92px)] leading-none font-bold text-white/90 drop-shadow-[0_4px_18px_rgba(0,0,0,0.25)]"
          aria-hidden
        >
          {data.name}
        </div>
        <div className="flex flex-col gap-[clamp(2px,0.6vh,6px)]">
          <div className="text-[clamp(12px,1.7vh,15px)] tracking-[0.2em] opacity-85">
            {data.alias}时 · {data.start} – {data.end}
          </div>
          <div className="text-[clamp(22px,4vh,38px)] font-bold tracking-wide tabular-nums">
            {clock}
          </div>
          {isLive ? (
            <div className="text-xs tracking-[0.06em] opacity-80">
              距{next.name}时{' '}
              <span className="text-[15px] font-bold tabular-nums">
                {countdownText}
              </span>
            </div>
          ) : (
            <div className="w-fit rounded-full bg-white/15 px-3 py-0.5 text-xs tracking-[0.06em] opacity-90">
              预览中 · 点击「回到现在」恢复实时
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2.5">
        <span className="text-[clamp(17px,2.6vh,22px)] font-bold tracking-[0.15em]">
          {data.meridian}
        </span>
        <span
          className="rounded-full px-3 py-1 text-[13px] font-bold tracking-[0.1em]"
          style={{ background: data.colorLight, color: data.colorDeep }}
        >
          {data.organ} · {data.element}
        </span>
        <span className="ml-auto text-[13px] tracking-[0.2em] opacity-75">
          {data.colorName}
        </span>
      </div>

      <p className="border-l-[3px] border-white/50 pl-3.5 text-[clamp(13px,1.8vh,15px)] leading-relaxed opacity-95">
        {data.advice}
      </p>

      <div className="grid grid-cols-2 gap-[clamp(8px,1.4vh,14px)] max-[560px]:grid-cols-1">
        <div className="rounded-xl bg-white/10 px-[clamp(12px,1.6vw,16px)] py-[clamp(8px,1.3vh,12px)]">
          <h3 className="mb-[clamp(4px,0.8vh,8px)] text-[clamp(12px,1.7vh,14px)] tracking-[0.4em] opacity-90">
            ✓ 宜
          </h3>
          <ul className="flex flex-col gap-[clamp(2px,0.5vh,5px)]">
            {data.should.map((item) => (
              <li
                key={item}
                className="text-[clamp(12px,1.7vh,13.5px)] leading-normal opacity-90"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl bg-white/10 px-[clamp(12px,1.6vw,16px)] py-[clamp(8px,1.3vh,12px)]">
          <h3 className="mb-[clamp(4px,0.8vh,8px)] text-[clamp(12px,1.7vh,14px)] tracking-[0.4em] opacity-90">
            ✕ 忌
          </h3>
          <ul className="flex flex-col gap-[clamp(2px,0.5vh,5px)]">
            {data.avoid.map((item) => (
              <li
                key={item}
                className="text-[clamp(12px,1.7vh,13.5px)] leading-normal opacity-90"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <blockquote
        className="mt-auto animate-quote-in border-t border-dashed border-white/35 pt-[clamp(8px,1.6vh,16px)]"
        key={`${data.index}-${quoteIndex}`}
      >
        <p className="font-display text-[clamp(15px,2.3vh,21px)] font-semibold leading-relaxed tracking-[0.06em]">
          「{quote.text}」
        </p>
        <cite className="mt-1 block text-right text-xs tracking-[0.1em] opacity-75 not-italic">
          {quote.source}
        </cite>
        <p className="mt-2 text-xs leading-relaxed opacity-70 [@media(max-height:640px)]:hidden">
          {quote.gloss}
        </p>
      </blockquote>
    </section>
  )
}
