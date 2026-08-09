import { useEffect, useState } from 'react'

/**
 * 每秒 tick 一次，返回当前时间。
 * 实时模式与预览模式都会持续走时，用于倒计时与恢复实时。
 */
export function useCurrentShichen(): Date {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000)
    return () => window.clearInterval(timer)
  }, [])

  return now
}
