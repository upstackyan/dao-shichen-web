# 子午流注 · 十二时辰经络图

一个以中医「子午流注」为主题的交互式 Web 页面：实时展示当前时辰对应的经络当令、养生宜忌与经典金句，并在人体模型上以流动动画演示经络循行，底部时间轴可拖动预览全天十二时辰的经络变化。

> 经络循行为科普级简化示意，非医学精确循行图；内容仅供传统文化参考，不构成医疗建议。

## 功能特性

- **实时时辰跟随**：自动定位当前时辰（子时起算，23:00 跨日边界正确处理），显示时钟与距下一时辰的倒计时，色彩与经络随时辰自动流转
- **时辰信息面板**：大地支字、时辰别称（夜半/鸡鸣/平旦…）、经络与脏腑五行徽章、传统色主题、宜/忌双栏、养生动作提醒（如子时宜入睡）
- **经典金句轮播**：摘自《黄帝内经》（《素问》《灵枢》）等典籍，标注出处并附白话简释，多条金句每 8 秒自动轮播
- **人体经络模型**：内置 SVG 写实比例立像（渐变填充 + 水墨晕染光晕），当前经络以主题色流动虚线动画展示气血流注方向，起止腧穴圆点脉动
- **双向联动**：点击人体上任一经络可跳转至对应时辰；底部时间轴（自子时 23:00 起 12 段）支持拖拽/点击预览，随时辰同步切换面板与人体高亮，「回到现在」一键恢复实时
- **三态主题**：随昼夜自动切换（卯至申浅色昼、余时深色夜）或手动锁定昼/夜，全局 CSS Variables 驱动，切换平滑过渡
- **公历 + 农历双历**：时辰卡片右上角实时展示公历日期时间与农历干支生肖纪年、月日（闰月自动标识，基于 `lunar-typescript`）
- **书法点缀与可访问性**：页眉标题、大地支字与时间轴地支标签使用马善政楷子集字体（OFL，内联 5.6KB）；全部交互支持键盘操作与可见焦点环，动效遵循 `prefers-reduced-motion` 降级

## 技术栈

- Vite 5 + React 18 + TypeScript（strict 模式）
- Tailwind CSS v4（`@tailwindcss/vite` 插件）：布局/排版/主题全部使用工具类；昼夜主题变量通过 `@theme inline` 映射为 `bg-bg`、`text-ink`、`bg-accent` 等设计令牌；人体 SVG 内部的描边/流注动画保留少量场景样式（`index.css`）
- 零 UI / 动画库依赖：经络流注动画基于 SVG `stroke-dashoffset`，时间轴拖拽基于原生 Pointer Events，尺寸随视窗用 `clamp()` 任意值弹性压缩
- `lunar-typescript`：公历 ↔ 农历（干支纪年、生肖、闰月）换算
- 桌面正常视窗下整页单屏显示（`h-dvh`），无页面级滚动

## 快速开始

```bash
npm install
npm run dev        # 开发预览，默认 http://localhost:5173
npm run build      # tsc --noEmit 类型检查 + 产物构建至 dist/
npm run preview    # 本地预览构建产物
```

构建配置 `base: './'`，`dist/` 可直接部署到任意静态托管（GitHub Pages / Vercel / Netlify 等）。

## Chrome 扩展（新标签页）

同一份构建产物同时是一个 Manifest V3 扩展：`public/manifest.json` 经 Vite 拷入 `dist/`，通过 `chrome_url_overrides.newtab` 接管新标签页。零权限、零网络请求。

```bash
npm run build:ext    # 构建 + 打包 release/ziwu-liuzhu-ext-v<version>.zip
```

- 本地体验：`chrome://extensions` → 开发者模式 → 「加载已解压的扩展程序」→ 选择 `dist/`
- 发布：将 `release/*.zip` 上传至 Chrome Web Store Developer Dashboard（需开发者账号）；隐私政策见 [PRIVACY.md](./PRIVACY.md)
- 图标源文件 `public/icons/icon.svg`（十二传统色时辰轮盘），用 `npm run icons` 重新生成 SVG，PNG 四档用 sharp 渲染（见脚本头注释）

### Edge Add-ons

同一份 `release/*.zip` 可直接提交 Microsoft Edge 加载项（注册/提交免费）。商店资产（徽标 300×300、促销磁贴 440×280/1400×560、1280×800 截图）与中英商店文案、提交步骤见 [store/listing.md](./store/listing.md)。

## 目录结构

```
src/
├── data/meridians.ts          # 十二时辰核心数据（唯一数据源）
├── utils/time.ts              # 时辰偏移计算（以 23:00 子时为起点）
├── utils/lunar.ts             # 公历/农历双历展示文本（lunar-typescript）
├── assets/fonts/              # 书法子集字体（马善政楷，OFL）
├── hooks/
│   ├── useCurrentShichen.ts   # 每秒走时
│   └── useTheme.ts            # 主题三态 + 昼夜自动判定
├── components/
│   ├── ShichenPanel.tsx       # 左侧：时辰信息 + 宜忌 + 金句轮播
│   ├── BodyMeridian.tsx       # 右侧：SVG 人体 + 12 条经络路径与流注动画
│   ├── Timeline.tsx           # 底部：24h 时间轴拖拽
│   └── ThemeToggle.tsx        # 主题切换按钮
├── App.tsx                    # 实时/预览双模式状态编排（Tailwind 布局）
├── index.css                  # Tailwind 入口 + 主题变量/令牌映射 + SVG 场景样式
└── main.tsx
public/
├── manifest.json              # Chrome 扩展 MV3 清单（newtab 接管）
└── icons/                     # 扩展图标（SVG 源 + 16/32/48/128 PNG）
scripts/
├── gen-icons.mjs              # 生成图标 SVG
└── pack-ext.mjs               # dist → release zip
```

## 数据说明

十二时辰的经络、脏腑、五行、传统色、宜忌与金句均在 `src/data/meridians.ts` 中人工整理：

- 经络按子午流注顺序：胆 → 肝 → 肺 → 大肠 → 胃 → 脾 → 心 → 小肠 → 膀胱 → 肾 → 心包 → 三焦
- 金句主要出自《素问·灵兰秘典论》《素问·生气通天论》《灵枢·口问》等，每条附出处与白话简释
- 人体经络走线为手绘简化示意，路径数据位于 `BodyMeridian.tsx`（viewBox 300×640）

## 许可

[MIT](./LICENSE)
