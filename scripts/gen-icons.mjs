/**
 * 生成扩展图标源文件 public/icons/icon.svg（十二传统色时辰轮盘）。
 * PNG 四档（16/32/48/128）用 sharp 渲染（像素精确，qlmanage 会加安全边距）：
 *   npm i --no-save sharp
 *   node -e "require('sharp')('public/icons/icon.svg').resize(s,s).png().toFile('public/icons/icon-'+s+'.png)'"
 * 色值与 src/data/meridians.ts 的 SHICHEN_LIST 顺序（子→亥）保持一致。
 */
import fs from 'node:fs'
import path from 'node:path'

const COLORS = [
  '#4c5f8f', // 子 · 玄青
  '#4d7c6b', // 丑
  '#715c94', // 寅
  '#c9973f', // 卯
  '#b0a13c', // 辰 · 缃叶
  '#b0763a', // 巳
  '#c93756', // 午 · 朱红
  '#d1603d', // 未
  '#42638c', // 申
  '#8c5580', // 酉
  '#b96a3e', // 戌
  '#3f5877', // 亥
]

const BG = '#10141c'
const CX = 64
const CY = 64
const R = 58

const pt = (deg, r) => {
  const rad = (deg * Math.PI) / 180
  return `${(CX + r * Math.cos(rad)).toFixed(2)},${(CY + r * Math.sin(rad)).toFixed(2)}`
}

// 子时居正上，顺时针排布
const sectors = COLORS.map((color, i) => {
  const a0 = -90 + i * 30
  const a1 = a0 + 30
  return `<path d="M${CX},${CY} L${pt(a0, R)} A${R},${R} 0 0 1 ${pt(a1, R)} Z" fill="${color}" stroke="${BG}" stroke-width="2"/>`
}).join('\n  ')

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="128" height="128">
  <rect width="128" height="128" fill="${BG}"/>
  ${sectors}
  <circle cx="${CX}" cy="${CY}" r="17" fill="#f5f0e6"/>
  <circle cx="${CX}" cy="${CY}" r="6.5" fill="#c93756"/>
</svg>
`

const out = path.resolve('public/icons/icon.svg')
fs.mkdirSync(path.dirname(out), { recursive: true })
fs.writeFileSync(out, svg)
console.log('✅', out)
