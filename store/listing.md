# Edge Add-ons 提交指南与商店文案

Microsoft Edge 计划注册与提交**免费**（与 Chrome Web Store 的 $5 不同）。包体与 Chrome 版通用：`release/ziwu-liuzhu-ext-v1.0.0.zip`（MV3，零权限、零网络请求）。

## 提交步骤

1. 用 Microsoft 账户（@outlook.com / @live.com / @hotmail.com 等 MSA）登录 [Partner Center](https://partner.microsoft.com/dashboard)，注册 **Microsoft Edge 计划**（个人账号即可，免费）
2. 「创建新的加载项」→ 预留名称「子午流注 · 十二时辰经络图」
3. 上传包：`release/ziwu-liuzhu-ext-v1.0.0.zip`（清单中的 name/description 会自动带入商店一览，只读）
4. 在「语言 > 详细信息」填写下述文案并上传视觉资产（本目录 `store/`）
5. 隐私实践：勾选不收集数据；隐私政策链接填仓库 PRIVACY.md 的 GitHub 地址
6. 保存草稿 → 提交认证（审核通常 1–7 个工作日）

## 资产清单（store/ 目录）

| 用途 | 文件 | 规格 |
|---|---|---|
| 扩展徽标（必需） | `logo-300.png` | 1:1，300×300 |
| 小型促销磁贴（推荐） | `tile-small-440x280.png` | 440×280 |
| 大型促销磁贴（可选） | `tile-large-1400x560.png` | 1400×560 |
| 屏幕截图 ×2（推荐） | `screenshot-dark-1280x800.png` / `screenshot-light-1280x800.png` | 1280×800 |

资产可用 `node scripts/gen-store-assets.mjs` 重新生成（依赖 sharp；截图需浏览器重截）。

## 商店文案

### 简短说明（取自 manifest description，自动带入）

新标签页展示中医子午流注：当前时辰的经络当令、养生宜忌与《黄帝内经》金句，人体经络流注动画与十二时辰时间轴。纯本地运行，不收集任何数据。

### 说明（必需，≥250 字符，粘贴用）

「子午流注 · 十二时辰经络图」把新标签页变成一幅中医时间养生画卷：

- 实时时辰跟随：自动定位当前时辰（子时 23:00 起算，跨日边界正确处理），显示实时时钟与距下一时辰倒计时，页面配色与高亮经络随时辰流转。
- 时辰养生面板：书法大地支字、时辰别称（夜半/鸡鸣/平旦……）、经络与脏腑五行徽章、传统色主题、宜/忌双栏与养生动作提醒（如子时宜入睡）。
- 人体经络流注图：内置 SVG 人体演示当前经络气血流注方向，点击任意经络可跳转对应时辰。
- 十二时辰时间轴：底部时间轴可拖动/点击预览全天经络变化，「回到现在」一键恢复实时。
- 公历 + 农历双历：右上角同时展示公历日期时间与农历干支生肖纪年、月日。
- 昼夜主题与金句：随昼夜自动切换深浅主题或手动锁定；《黄帝内经》金句轮播并标注出处。

纯本地运行：零权限、零网络请求、不收集任何数据。内容仅供传统文化科普参考，不构成医疗建议。

### Description (English)

"Ziwu Liuzhu · Twelve Shichen Meridian Map" turns your new tab into a living scroll of traditional Chinese timekeeping medicine:

- Real-time shichen (two-hour period) tracking with a live clock and countdown; the palette and highlighted meridian flow with the time.
- A shichen panel with a calligraphic Earthly-Branch glyph, meridian / organ / Five-Element badges, dos & don'ts, and wellness reminders (e.g. "be asleep by the Zi hour").
- An SVG human figure animating the active meridian's qi flow; click any meridian to jump to its shichen.
- A draggable 12-segment timeline to preview the whole day, with one click to return to now.
- Dual calendars: Gregorian date & time plus the Chinese lunar calendar (sexagenary year, zodiac, month, day).
- Auto day/night theming and rotating quotes from the Huangdi Neijing with source citations.

Runs 100% locally: no permissions, no network requests, no data collection. Content is for cultural reference only, not medical advice.

### 搜索词（可选）

子午流注、中医、经络、时辰、养生、农历、黄帝内经、新标签页、meridian、TCM、new tab

### 分类建议

生活 / Lifestyle（或 生产力 / Productivity）

## 隐私政策链接

https://github.com/upstackyan/dao-shichen-web/blob/main/PRIVACY.md
