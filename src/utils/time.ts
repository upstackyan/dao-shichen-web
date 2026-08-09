/** 每个时辰的分钟数 */
export const MINUTES_PER_SHICHEN = 120
const DAY_MINUTES = 24 * 60
/** 子时起算点：23:00 */
const ZI_START_MINUTES = 23 * 60

/**
 * 计算当前时刻距 23:00（子时起点）的偏移分钟数，范围 [0, 1440)
 */
export function getOffsetMinutes(date: Date): number {
  const m = date.getHours() * 60 + date.getMinutes()
  return (m - ZI_START_MINUTES + DAY_MINUTES) % DAY_MINUTES
}

/**
 * 由偏移分钟数计算时辰索引（0 = 子时，11 = 亥时）
 */
export function getShichenIndex(offsetMinutes: number): number {
  return Math.floor(((offsetMinutes % DAY_MINUTES) + DAY_MINUTES) % DAY_MINUTES / MINUTES_PER_SHICHEN) % 12
}

/**
 * 由偏移分钟数反推 24 小时制时钟文本，如 "23:45"
 */
export function offsetToClock(offsetMinutes: number): string {
  const m = (offsetMinutes + ZI_START_MINUTES) % DAY_MINUTES
  const h = Math.floor(m / 60)
  const mm = Math.floor(m % 60)
  return `${String(h).padStart(2, '0')}:${String(mm).padStart(2, '0')}`
}

/**
 * 距下一个时辰交界的剩余秒数
 */
export function secondsToNextShichen(date: Date): number {
  const totalSeconds =
    date.getHours() * 3600 + date.getMinutes() * 60 + date.getSeconds()
  const offset = (totalSeconds - 23 * 3600 + 86400) % 86400
  return 7200 - (offset % 7200)
}

/**
 * 倒计时秒数格式化为 HH:MM:SS
 */
export function formatCountdown(seconds: number): string {
  const s = Math.max(0, seconds)
  const h = Math.floor(s / 3600)
  const m = Math.floor((s % 3600) / 60)
  const sec = s % 60
  return [h, m, sec].map((v) => String(v).padStart(2, '0')).join(':')
}
