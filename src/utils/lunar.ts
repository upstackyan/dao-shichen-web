import { Solar } from 'lunar-typescript'

export interface CalendarInfo {
  /** 公历日期，如「2026年8月9日 · 星期日」 */
  solarDate: string
  /** 公历时间，如「14:32」 */
  solarTime: string
  /** 农历纪年+月日，如「丙午马年 六月廿六」 */
  lunar: string
}

const WEEK_CHARS = '日一二三四五六'

/** 由当前时间计算公历与农历（干支生肖纪年 + 农历月日）展示文本 */
export function getCalendarInfo(date: Date): CalendarInfo {
  const lunar = Solar.fromDate(date).getLunar()

  const solarDate = `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日 · 星期${WEEK_CHARS[date.getDay()]}`

  const hh = String(date.getHours()).padStart(2, '0')
  const mm = String(date.getMinutes()).padStart(2, '0')
  const solarTime = `${hh}:${mm}`

  const year = `${lunar.getYearInGanZhi()}${lunar.getYearShengXiao()}年`
  // getMonth() 返回负数表示闰月
  const month = `${lunar.getMonth() < 0 ? '闰' : ''}${lunar.getMonthInChinese()}月`
  const day = lunar.getDayInChinese()

  return { solarDate, solarTime, lunar: `${year} ${month}${day}` }
}
