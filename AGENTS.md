# AGENTS.md

本文件为 AI 编码代理（及新贡献者）在本仓库工作的指引。

## 项目概述

「子午流注 · 十二时辰经络图」：中医时辰经络主题的纯前端单页应用。实时展示当前时辰的经络当令、养生宜忌与《黄帝内经》金句，右侧 SVG 人体模型演示经络流注，底部时间轴可拖动预览全天变化。

## 常用命令

```bash
npm install
npm run dev        # 开发服务器（默认 http://localhost:5173，支持 HMR）
npm run build      # 必须先通过 tsc --noEmit（strict），再 vite build 输出 dist/
npm run preview    # 预览构建产物
```

无单测框架；修改后至少执行 `npm run build`，并在浏览器验证交互（见「验收清单」）。

## 技术约束（重要）

- Vite 5 + React 18 + TypeScript strict；**不引入 UI 组件库、动画库**
- 样式使用 **Tailwind CSS v4**（`@tailwindcss/vite` 插件）：布局/排版/主题一律用工具类写在 JSX；**不要新增组件级 CSS 文件**（App.css 已删除）
- 主题体系：运行时变量定义在 `index.css` 的 `.app[data-theme='light'|'dark']`；通过 `@theme inline` 映射为 Tailwind 令牌（`bg-bg` / `bg-card` / `text-ink` / `text-ink-soft` / `border-line` / `bg-accent` / `text-accent-deep` 等）与时辰强调色（内联 `--accent / --accent-deep / --accent-light`）；深色下的差异用 `group` + `group-data-[theme=dark]:` 变体，不要新增 CSS 规则
- 例外：人体 SVG 内部（轮廓/经络描边/流注动画/渐变 stop）保留 `index.css` 中的场景样式类（`.silhouette`、`.meridian-*`、`.active-*`、`.body-aura` 等），因其依赖运行时 CSS 变量与 SVG 特性
- 响应式尺寸用任意值 `clamp()`（如 `text-[clamp(22px,4vh,38px)]`）；桌面正常视窗下**整页单屏无滚动**（根容器 `h-dvh` + `overflow-hidden`），请勿改回 `min-h-*` 布局；窄屏用 `max-[900px]:` 变体恢复堆叠与滚动；宽度 ≤640px 时人体经络图隐藏（`max-[640px]:hidden`），仅保留时辰面板与时间轴
- SVG 经络动画用 `stroke-dashoffset` keyframes（虚线周期 18px，位移需为其整数倍以保证无缝循环）
- 修改 Tailwind 配置 / 插件后需重启 dev server（旧进程不会自动加载新插件，曾导致零工具类输出）
- 字体三层角色：`--font-ui`（无衬线正文）/ `--font-display`（人文衬线，金句等）/ `--font-glyph`（书法子集体「Ziwu Glyph」，仅页眉标题、大地支字、时间轴地支标签）；子集文件 `src/assets/fonts/mashanzheng-subset.woff2`（马善政楷、OFL，仅 14 字）。扩充字形需用 `subset-font` 重新生成子集，勿直接引入全量字体
- 可访问性底线：交互元素（时间轴段、经络命中区、按钮）必须键盘可达并有可见 `:focus-visible` 轮廓；流注/脉冲/金句动画须在 `prefers-reduced-motion: reduce` 下降级为静止
- 同一构建产物兼任 Chrome MV3 扩展包：`public/manifest.json`（`chrome_url_overrides.newtab` 接管新标签页）与图标经 Vite 拷入 `dist/`。MV3 扩展页 CSP 禁止内联 `<script>` 与远程代码——引入内联脚本、CDN 资源或新权限前必须评估扩展兼容性；`npm run build:ext` 打包至 `release/`（已 gitignore）

## 核心架构约定

### 数据层（唯一数据源）

`src/data/meridians.ts` 的 `SHICHEN_LIST`（12 条）是全部内容的来源：经络、脏腑、五行、传统色（color/colorDeep/colorLight）、宜忌、金句（text/source/gloss）。新增或修改字段时，同步检查 `ShichenPanel`、`Timeline`、`BodyMeridian` 的引用。

### 时间模型

- 以 **23:00（子时起点）** 为偏移零点，`offsetMinutes ∈ [0, 1440)`，时辰索引 = `floor(offset / 120)`
- 所有换算集中在 `src/utils/time.ts`（`getOffsetMinutes` / `getShichenIndex` / `offsetToClock` / `secondsToNextShichen`），不要在组件里重复实现
- 双模式状态在 `App.tsx`：`previewMinutes === null` 为实时模式，否则为预览模式；时钟每秒 tick（`useCurrentShichen`），预览模式下真实时钟继续走时

### 人体经络图（BodyMeridian.tsx）

- viewBox 固定 `0 0 300 640`；人体轮廓、12 条经络路径（`MERIDIAN_PATHS`）、腧穴端点、标注坐标均为手工拟合数据
- 修改人体轮廓后必须重新核对 12 条经络路径与端点是否贴合；经络名标注需留在 viewBox 内（5 字约 66px 宽）
- 交互必须保留：全部经络可 hover 显示名称（`<title>`）、点击跳转对应时辰（进入预览模式）；当前经络保持主题色、流动动画、起止圆点与名称标注；注意 ≤640px 窄屏下该组件整体隐藏，勿在隐藏后仍依赖其交互

### 主题

`useTheme`：三态 auto/light/dark；auto 时卯至申（索引 3–8）为浅色昼，其余为深色夜。新颜色需求优先加 CSS 变量 + `@theme inline` 映射，不要硬编码到组件。

## 内容红线

- 页面与文案定位为**传统文化科普**：不得输出医疗建议或疗效断言；页脚免责声明（"仅供文化参考，不构成医疗建议"）不得移除
- 金句必须标注真实出处（书名 + 篇名），不杜撰引文；经络走线保持"简化示意"表述

## 验收清单

改动后请逐项确认：

1. `npm run build` 无 TS / 构建错误
2. 桌面常见视窗（1280×720、1280×800、1440×900）无页面级滚动条
3. 实时跟随：打开页面自动定位当前时辰，倒计时正常
4. 时间轴：拖拽/点击切换时辰，面板与人体同步，出现「回到现在」并可恢复
5. 点击人体经络可跳转对应时辰
6. 主题三态切换正常，浅色/深色下人体与经络均清晰可见
7. 键盘 Tab 可依次聚焦主题按钮、经络、时间轴段，焦点轮廓可见；Enter 可触发跳转
8. 控制台无 JS 报错（注意金句轮播索引越界类问题：数组访问须取模兜底）

## Git 约定

- 分支：`main`；提交信息用中文，格式 `<动词短语>`（如"新增时辰提示音"），必要时正文说明动机
- 未经用户明确要求不要执行 push / force push
