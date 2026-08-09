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
      className="shichen-panel"
      style={{
        background: `linear-gradient(150deg, ${data.colorDeep} 0%, ${data.color} 100%)`,
      }}
    >
      <div className="panel-top">
        <div className="panel-glyph" aria-hidden>
          {data.name}
        </div>
        <div className="panel-meta">
          <div className="panel-alias">
            {data.alias}时 · {data.start} – {data.end}
          </div>
          <div className="panel-clock">{clock}</div>
          {isLive ? (
            <div className="panel-countdown">
              距{next.name}时 <span className="countdown-num">{countdownText}</span>
            </div>
          ) : (
            <div className="panel-badge">预览中 · 点击「回到现在」恢复实时</div>
          )}
        </div>
      </div>

      <div className="panel-meridian">
        <span className="meridian-name">{data.meridian}</span>
        <span
          className="meridian-organ"
          style={{ background: data.colorLight, color: data.colorDeep }}
        >
          {data.organ} · {data.element}
        </span>
        <span className="meridian-color-name">{data.colorName}</span>
      </div>

      <p className="panel-advice">{data.advice}</p>

      <div className="panel-duties">
        <div className="duty duty-should">
          <h3>宜</h3>
          <ul>
            {data.should.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="duty duty-avoid">
          <h3>忌</h3>
          <ul>
            {data.avoid.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      <blockquote className="panel-quote" key={`${data.index}-${quoteIndex}`}>
        <p className="quote-text">「{quote.text}」</p>
        <cite className="quote-source">{quote.source}</cite>
        <p className="quote-gloss">{quote.gloss}</p>
      </blockquote>
    </section>
  )
}
