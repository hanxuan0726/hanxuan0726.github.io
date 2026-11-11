# Hanxuan Zhou · 个人主页

[主页](https://hanxuan0726.github.io/) · [GitHub 仓库](https://github.com/hanxuan0726/hanxuan0726.github.io)

基于 Astro、TypeScript 和 Tailwind CSS 的静态个人主页，展示具身智能与机器人学习研究兴趣、项目、教育背景、旅行足迹及音乐与游戏爱好。新版采用珊瑚红、暖白与深色大面积色块、超大字体、可交互线框场和本地 SVG 地图。无后端、数据库、登录或第三方追踪；字体、图片和地图均从本站加载。

## 本地开发与检查

需要 Node.js 22.12+ 和 npm，推荐 Node.js 24。

```bash
npm ci
npm run dev
```

打开终端显示的地址，默认是 `http://localhost:4321/`。生产构建与预览：

```bash
npm run check:content
npm run build
npm run preview
```

`check:content` 检查公开身份和项目链接；`build` 依次执行 Astro/TypeScript 检查、静态构建和生成资源检查，输出为 `dist/`。`npm run check` 可单独执行类型检查。具体交付验证记录见 `VERIFICATION.md`。

## 维护个人内容

主要资料在 `src/data/site.ts`；新增资料应使用真实内容。

| 字段 | 用途 |
| --- | --- |
| `name` / `chineseName` | 姓名；目前为 Hanxuan Zhou / 周瀚轩 |
| `role` / `university` / `school` / `location` | 身份、学校、学院和城市；学院目前保留中文名称 |
| `email` / `githubUsername` | 公开邮箱和 GitHub 用户名 |
| `introduction` / `about` / `interests` | 简介、背景与研究兴趣 |
| `projects` | 项目标题、描述、状态、图片、技术标签和资源链接 |
| `education` | 教育经历；日期使用 `YYYY-MM`，当前结束日期可用 `Present` |
| `publications` | 真实论文；数组为空时隐藏整个板块及导航 |
| `cv` | 实际 PDF 的根路径，例如 `/files/hanxuan-zhou-cv.pdf` |
| `lastUpdated` | 实际内容更新日期，格式为 `YYYY-MM-DD` |

公开邮箱为 `51295902169@stu.ecnu.edu.cn`，GitHub 用户名为 `hanxuan0726`。姓名和联系邮箱均为构建生成的 HTML 文本。修改身份时，也检查 `src/pages/index.astro` 内用于视觉排版的姓名、中文名、城市和首屏文案；项目的过程说明同样位于该页面。

未填写的 CV、项目 GitHub/Demo 链接和教育日期不在主页显示。添加真实 HTTPS 链接后资源入口会自动出现；将简历放入 `public/files/` 后再配置 `cv`。没有提供头像时，首屏使用生成式线框视觉；保留的 `portrait*` 字段目前不参与首页渲染。

项目现用图是明确标注的概念插画，并非实验照片。更换真实图片时，同步修改 `image`、`imageAlt`、`imageIsPlaceholder`，并检查首页图注。论文组件 `src/components/PublicationList.astro` 支持标题、作者、会议/期刊、年份及 PDF/Code/Project 资源，自动强调本人姓名。

## 旅行地图

`src/components/TravelMap.astro` 中的 `worldPlaces` 和 `chinaPlaces` 管理地点、经纬度、中文名及 `roots` 标记。当前展示四个海外国家和二十个国内目的地。上海是家（HOME）和每次出发的原点，也是地图的视觉中心；南昌保留为老家（roots）。

国家或省级目的地使用区域代表点，不据此推断访问过的具体城市；曲线表示上海与已到访地点的示意关联，不是实际航班轨迹。更新地点时同步检查区域高亮和数量标签。

世界/中国切换可用按钮操作；桌面鼠标悬停中国可进入中国地图，`Esc` 返回世界视图。HOME / SHANGHAI 按钮可清除目的地选择并突出上海。地图下方的地点按钮提供键盘及触屏操作入口。几何路径存于 `public/data/map-geography.json`，构建时生成 SVG，不请求在线地图服务。

## 音乐与游戏

`src/components/OffHours.astro` 管理个人爱好区：NewJeans 姜海粼（Haerin）粉丝角，以及 `games` 数组中的游戏和段位。当前按本人提供的名称展示 APEX「大师 / MASTER」、CS:GO「完美黄金 S」、VALORANT「神话」；更新时保留本人使用的称呼，不自动换算其他服务器或赛季的段位。

Haerin 照片存于 `public/images/haerin-seoul-fashion-week.jpg`，由 TV10 摄影、以 CC BY 3.0 授权使用，页面保留可见署名。具体来源及许可记录在 `public/images/haerin-photo-credit.json`；替换照片时同步更新图片替代文本、来源和署名。该区块不需要额外 JavaScript。

## 视觉与交互

- 顶部按钮切换珊瑚红/深色对比方案，选择保存在本机。
- 首屏 Canvas 响应指针，离开视口或页面隐藏时暂停。标题和项目图采用一次性遮罩进入动画，研究方向与游戏段位依次显现；首屏轻微视差、按钮指针响应、项目图倾斜和顶部阅读进度保留原生滚动。
- 顶部与首屏的暂停按钮同步控制动态效果；暂停或启用 `prefers-reduced-motion` 时，正在进入或待进入的内容会立即显示。没有 JavaScript 时内容默认可见，触屏不启用指针倾斜效果。
- 研究方向和项目过程使用原生折叠面板；联系区支持邮件链接及复制邮箱。
- 保留语义化区块、跳过导航、键盘焦点、图片替代文本和响应式布局。禁用 JavaScript 后仍可阅读主要资料并使用普通链接；地图切换、复制及动态视觉需要 JavaScript。
- Anton 与 DM Sans 自托管，许可证为 SIL Open Font License 1.1。素材来源及许可证见 `public/ASSETS.md`。

## GitHub Pages 部署

现有 `.github/workflows/deploy.yml` 保留：推送 `main` 或手动运行工作流后，安装锁定依赖、检查公开身份、构建并上传 `dist/`，再由部署任务发布到 GitHub Pages。

1. 使用 `hanxuan0726/hanxuan0726.github.io` 用户名仓库，项目文件位于仓库根目录，包含 `.github/`。
2. 先运行上面的内容检查和构建命令。
3. 在仓库 **Settings → Pages → Build and deployment → Source** 选择 **GitHub Actions**。
4. 推送 `main` 或手动运行 `Deploy academic homepage to GitHub Pages`，以工作流结果确认部署状态。

`astro.config.ts` 使用 `output: 'static'` 和 `base: '/'`，适用于 `USERNAME.github.io`，不直接适用于 `USERNAME.github.io/REPO/`。正式 origin 优先取 `SITE_URL`，否则取配置中的 GitHub 用户名或 GitHub Actions 仓库拥有者。自定义域名需要同时配置 `SITE_URL`、DNS 和 `public/CNAME`。

保留 `.nojekyll`、404、canonical、Open Graph、robots 和 sitemap。身份缺失时使用保留域名或禁用索引，部署前的内容检查会报告缺失项；公开资料中不要填写密钥。参考 [Astro 的 GitHub Pages 部署文档](https://docs.astro.build/en/guides/deploy/github/)。

## 主要文件

```text
src/data/site.ts                个人内容与类型
src/pages/index.astro           首页布局和项目过程说明
src/layouts/Layout.astro        HTML、SEO 与对比方案初始化
src/components/TravelMap.astro  旅行地点与静态地图
src/components/OffHours.astro   音乐爱好与游戏段位
src/scripts/portfolio.ts        对比方案、复制邮箱、导航、Canvas
src/scripts/travel-map.ts       地图切换与地点选择
src/scripts/motion.ts           进入动画、视差、指针响应与阅读进度
src/styles/global.css          整站排版、色彩与响应式样式
src/styles/travel-map.css       地图样式与动画
src/styles/off-hours.css        个人爱好区样式
src/styles/motion.css           动效、暂停与减少动态效果样式
public/fonts/                  本地字体及 OFL 许可证
public/data/                   地理路径、来源与许可证
public/images/                 概念插画、授权照片、署名及分享封面
scripts/                       内容与构建检查
.github/workflows/deploy.yml    GitHub Pages 工作流
```
