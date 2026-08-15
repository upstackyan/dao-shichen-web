/**
 * 生成 Edge Add-ons 商店视觉资产至 store/ 目录：
 * - logo-300.png            扩展徽标（必需，1:1，建议 300×300）
 * - tile-small-440x280.png  小型促销磁贴（可选但推荐）
 * - tile-large-1400x560.png 大型促销磁贴（可选）
 * 依赖 sharp（npm i --no-save sharp），图标几何与 scripts/gen-icons.mjs 一致。
 */
import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

const COLORS = [
  '#4c5f8f', '#4d7c6b', '#715c94', '#c9973f', '#b0a13c', '#b0763a',
  '#c93756', '#d1603d', '#42638c', '#8c5580', '#b96a3e', '#3f5877',
]
const BG = '#10141c'

/** 生成时辰轮盘 SVG 片段（中心 cx,cy，半径 r） */
function wheel(cx, cy, r) {
  const pt = (deg, radius) => {
    const rad = (deg * Math.PI) / 180
    return `${(cx + radius * Math.cos(rad)).toFixed(2)},${(cy + radius * Math.sin(rad)).toFixed(2)}`
  }
  const sectors = COLORS.map((color, i) => {
    const a0 = -90 + i * 30
    const a1 = a0 + 30
    return `<path d="M${cx},${cy} L${pt(a0, r)} A${r},${r} 0 0 1 ${pt(a1, r)} Z" fill="${color}" stroke="${BG}" stroke-width="${(r * 0.035).toFixed(1)}"/>`
  }).join('')
  return `${sectors}<circle cx="${cx}" cy="${cy}" r="${(r * 0.3).toFixed(1)}" fill="#f5f0e6"/><circle cx="${cx}" cy="${cy}" r="${(r * 0.115).toFixed(1)}" fill="#c93756"/>`
}

const FONT = `'PingFang SC','HarmonyOS Sans SC','Microsoft YaHei',sans-serif`

function tile(w, h, o) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <rect width="${w}" height="${h}" fill="${BG}"/>
  ${wheel(o.cx, h / 2, o.r)}
  <text x="${o.tx}" y="${h / 2 - o.sub * 0.4}" font-family="${FONT}" font-size="${o.title}" font-weight="700" letter-spacing="${o.tls}" fill="#f5f0e6">子午流注</text>
  <text x="${o.tx + 2}" y="${h / 2 + o.title * 0.9}" font-family="${FONT}" font-size="${o.sub}" letter-spacing="${o.sls}" fill="#99917f">十二时辰 · 经络养生</text>
</svg>`
}

fs.mkdirSync('store', { recursive: true })

const jobs = [
  // 徽标：直接由图标 SVG 渲染 300×300
  sharp('public/icons/icon.svg').resize(300, 300).png().toFile('store/logo-300.png'),
  sharp(Buffer.from(tile(440, 280, { cx: 100, r: 80, tx: 200, title: 44, tls: 6, sub: 15, sls: 3 }))).png().toFile('store/tile-small-440x280.png'),
  sharp(Buffer.from(tile(1400, 560, { cx: 320, r: 200, tx: 620, title: 120, tls: 16, sub: 42, sls: 8 }))).png().toFile('store/tile-large-1400x560.png'),
]

await Promise.all(jobs)
for (const f of ['logo-300.png', 'tile-small-440x280.png', 'tile-large-1400x560.png']) {
  console.log('✅ store/' + f, fs.statSync(path.resolve('store', f)).size + 'B')
}
