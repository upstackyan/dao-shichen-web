/**
 * 将 dist/ 打包为可上传 Chrome Web Store 的扩展 zip。
 * dist/ 本身即「加载已解压的扩展程序」可用目录（manifest 经 public/ 拷入）。
 */
import { execSync } from 'node:child_process'
import fs from 'node:fs'

const required = [
  'dist/manifest.json',
  'dist/index.html',
  'dist/icons/icon-16.png',
  'dist/icons/icon-32.png',
  'dist/icons/icon-48.png',
  'dist/icons/icon-128.png',
]
for (const f of required) {
  if (!fs.existsSync(f)) {
    console.error(`❌ ${f} 缺失，请先执行 npm run build`)
    process.exit(1)
  }
}

const manifest = JSON.parse(fs.readFileSync('dist/manifest.json', 'utf8'))
fs.mkdirSync('release', { recursive: true })
const out = `release/ziwu-liuzhu-ext-v${manifest.version}.zip`
execSync(`cd dist && zip -qr ../${out} . -x '*.map'`, { stdio: 'inherit' })
console.log(`✅ 已生成 ${out}（manifest v${manifest.version}）`)
console.log('   本地体验：chrome://extensions → 开发者模式 → 加载已解压的扩展程序 → 选择 dist/')
