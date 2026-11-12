# Hanxuan Zhou · 个人主页

[主页](https://hanxuan0726.github.io/) · [GitHub 仓库](https://github.com/hanxuan0726/hanxuan0726.github.io)

基于 Astro、TypeScript 和 Tailwind CSS 的静态个人主页，展示具身智能与机器人学习研究兴趣、项目、教育背景、旅行足迹及音乐与游戏爱好。新版采用青柠绿、奶油白与深森林绿，搭配薄荷、淡紫与冰蓝点缀、超大字体、M5 MacBook Air 桌面开场、三维项目轨道和玻璃材质。主站为静态页面，无后端或账号登录；字体、图片和地图从本站加载。Apple Music 播放器在用户主动打开后才从 Apple 加载。

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

公开邮箱为 `51295902169@stu.ecnu.edu.cn`，GitHub 用户名为 `hanxuan0726`。姓名和联系邮箱均为构建生成的 HTML 文本。修改身份时，也检查 `src/pages/index.astro` 内用于视觉排版的姓名、中文名、城市和首屏文案。

未填写的 CV 和教育日期不在主页显示；将真实简历放入 `public/files/` 后再配置 `cv`。项目完整描述、技术标签和资源链接保留在 `site.projects` 数据中，当前 WORK 区只展示章节卡片和项目状态，不渲染展开详情或资源入口。没有提供头像时，首屏使用生成式线框视觉；保留的 `portrait*` 字段目前不参与首页渲染。

项目现用图是明确标注的概念插画，并非实验照片。更换真实图片时，同步修改 `image`、`imageAlt`、`imageIsPlaceholder`，并检查首页图注。论文组件 `src/components/PublicationList.astro` 支持标题、作者、会议/期刊、年份及 PDF/Code/Project 资源，自动强调本人姓名。

## 桌面开场

`src/components/MacbookIntro.astro` 用 CSS 三维结构绘制桌面、屏幕与薄机身，键盘和触控板使用 Apple 官方原始透明俯视图，通过 CSS 投射到机身平面。原生滚动推进镜头并转正屏幕；屏幕中放置的是唯一真实主页 DOM。脚本暂时将 `.site-frame` 移入设备屏幕，并在原位置保留等高占位；镜头达到按实际屏幕矩形计算的 1:1 尺寸时，将同一个节点放回正文位置。屏幕内页面在投影阶段设为 `inert`，完成后恢复操作；没有克隆页面、截图替身或 iframe。

`SKIP INTRO` 直接进入正文，`ENTER WITHOUT MOTION` 进入静态版。初次带有非 `#home` 锚点的访问跳过长开场；静态版、减少动态效果或没有 JavaScript 时显示简短入口和正常正文。镜头、DOM 移动与占位逻辑在 `src/scripts/macbook-intro.ts`，设备与桌面样式在 `src/styles/macbook-intro.css`。调整布局后，应检查屏幕与正文在交接前后的坐标、正反滚动、键盘跳过，以及开场中途和正文内切换静态版时的目标章节。

## 项目轨道

`src/components/WorkOrbit.astro` 将两个真实项目展开为六个工作流程章节：SO-101 系统、示范采集、ACT，以及远程控制系统、观测传输、身份认证。六张卡片是同一组项目的不同侧面，不代表六个独立项目。

正常动态模式下，原生页面滚动驱动三维卡片轨道和 WORK 字体空间；上一章/下一章按钮定位到对应滚动位置。此区域仅保留环绕卡片，没有可展开详情或卡片跳转。选择静态版后重新进入当前章节，同一组六张卡片以普通网格展示。减少动态效果、短视口或禁用 JavaScript 时也使用静态网格。

章节编排位于该组件的 `chapters`，项目事实仍来自 `site.projects`。增减或调整项目顺序时，同步修改章节对应关系和数量文案。旧详情锚点保留为 WORK 区的位置标记。轨道行为在 `src/scripts/work-orbit.ts`，视觉样式在 `src/styles/work-orbit.css`。

## 玻璃与景深

`src/styles/depth-glass.css` 为项目卡片提供带透光边缘的玻璃外壳、分层投影和高光，内容面保持不透明；游戏徽章保留玻璃层次，设备以实物图与独立虚影悬浮展示。`src/scripts/depth-glass.ts` 在桌面精细指针上加入限幅相机倾斜和光源跟随，不覆盖滚动轨道本身的卡片变换。移动端降低模糊成本，静态版与减少动态效果不启用相机跟随。

## 旅行地图

`src/components/TravelMap.astro` 中的 `worldPlaces` 和 `chinaPlaces` 管理地点、经纬度、中文名及 `roots` 标记。当前展示四个海外国家和二十二个国内目的地，合计二十六个到访目的地。上海单独作为家（HOME）和每次出发的原点，不计入这二十六个目的地；南昌保留为老家（roots）。

国家或省级目的地使用区域代表点，不据此推断访问过的具体城市；曲线表示上海与已到访地点的示意关联，不是实际航班轨迹。更新地点时同步检查区域高亮和数量标签。

世界/中国切换可用按钮操作；桌面鼠标悬停中国可进入中国地图，`Esc` 返回世界视图。HOME / SHANGHAI 按钮可清除目的地选择并突出上海。地图下方的地点按钮提供键盘及触屏操作入口。几何路径存于 `public/data/map-geography.json`，构建时生成 SVG，不请求在线地图服务。

## 音乐与游戏

`src/components/OffHours.astro` 包含两个独立全宽滚动章节：`#haerin` 为照片与贴纸专属舞台，`#off-hours` 将 MusicPlayer 与 GamingRig 融合。`src/components/GamingRig.astro` 的 `ranks` 数组展示 APEX「大师 / MASTER」、CS:GO「完美黄金 S」、VALORANT「神话」；更新时保留本人使用的称呼，不自动换算其他服务器或赛季的段位。

`src/components/MusicPlayer.astro` 提供八张精选唱片：Super Shy、If The Sun Burns Out Tonight、Lucky Girl Syndrome、Flash Forward、GODS、Ditto、Joah 和 Sports car。封面、公开目录链接和官方试听地址维护在 `src/data/music-featured.json`，逐项来源见 `public/images/music/SOURCES.md`。选择唱片会更换展示并移除旧播放器；只有点击 Listen here 才加载当前曲目的 Apple Music 官方 iframe，选曲本身不自动播放。没有 JavaScript 时仍可使用公开音乐链接。

收藏列表来自本人「音乐」App 的「喜爱的歌曲」完整复制快照，共 **333 条记录**，可展开并按歌曲、艺人或专辑搜索。`src/data/music-favorites.json` 保留复制时的收藏顺序和公开歌曲元数据；这是静态导入，不连接私人账号、不自动同步、不包含本地文件路径或播放记录。原列表中的重复记录和不同专辑版本保持原样。八首精选有已核实目录链接，其余 FIND 入口在 Apple Music 搜索；导入范围和 XML 差额核对见 `src/data/music-favorites.README.md`。

APEX 使用通用 Master 游戏徽章；VALORANT 使用历史通用 Immortal 图标，不指定 I/II/III 小段位。完美黄金 S 使用完美电竞官方 CDN 的经典金色图标 `perfect-world-gold-s.png`，不据此推断赛季。MY GEAR 展示本人提供的 Razer Viper V4 Pro 和 IQUNIX EV63 型号，使用品牌官方实物产品图 `viper-v4-pro-official.png`、`iqunix-ev63-official.jpg`；图片中的配色不推断本人设备的真实配色。素材及逐项来源分别位于 `public/images/ranks/`、`public/images/gear/` 的 `sources.json`。

Haerin 区采用四张不同造型的照片堆叠：原有首尔时装周肖像，加上 Dior 红裙、OLENS 近景和 MMA 舞台造型。文件位于 `public/images/haerin-seoul-fashion-week.jpg` 与 `public/images/haerin-photos/`，页面保留作者及许可署名。逐图出处、CC BY 3.0 / CC BY-SA 4.0 许可与原图记录见 [HAERIN-PHOTOS.md](public/HAERIN-PHOTOS.md)。细指针悬停或键盘聚焦会将对应照片置顶；静态版或减少动态效果时仅提升层级。调整拼贴比例时保持各图脸部可见，并同步维护图片替代文本和署名。

`src/components/HaerinBurst.astro` 配置官方 NewJeans × The Powerpuff Girls 贴纸的位置和 [NewJeans《Super Shy》官方 MV](https://www.youtube.com/watch?v=ArmDp-zijuc) 链接。十四个装饰实例使用十张 LINE 官方透明 PNG，保持原始图片字节；逐图来源与核对记录见 [OFFICIAL-STICKERS.md](public/OFFICIAL-STICKERS.md)。贴纸在首次进入视口时散开，可手动重播；静态版或减少动态效果时静态展示。MV 在 YouTube 新标签页打开，不自动播放或在本站分发音乐。

## 联络场景

`src/components/ContactScene.astro` 将 `#contact` 作为独立收尾章节。原生滚动扩大圆形入口，逐步展示 LET’S CONNECT 分层文字和网格形变；邮件链接与复制邮箱按钮使用 `site.email`。Canvas 在一层画布上绘制动态网格，静态 SVG 用于无 JavaScript 或无法取得 Canvas 上下文时的回退，不逐帧改写 SVG 路径。

行为与样式分别位于 `src/scripts/contact-scene.ts`、`src/styles/contact-scene.css`。静态版完整显示联络内容，不创建长滚动轨道；减少动态效果、短视口或无 JavaScript 同样使用静态章节。Canvas 像素密度上限为 2，页面隐藏时停止更新。更改该场景后需检查动态版/静态版导航、短屏切换与上方滚动场景的衔接；实际浏览器验证范围以 `VERIFICATION.md` 为准。

## 视觉与交互

- 顶部按钮切换青柠绿/深森林绿对比方案，选择保存在本机。主色变量位于 `src/styles/global.css`；项目轨道、开场和分享封面也有独立配色，调整时同步检查。
- 首屏 Canvas 响应指针，离开视口或页面隐藏时暂停。标题采用一次性遮罩进入动画，研究方向与游戏徽章依次显现；首屏轻微视差、按钮指针响应和顶部阅读进度保留原生滚动。
- 顶部与首屏按钮提供 `View still version` / `View animated version`。切换通过导航到 `?motion=still#当前章节` 或移除 `motion` 参数完成，保留章节而非精确滚动像素；不在当前页面原地拆除多个滚动场景。`Layout.astro` 的 head 脚本在组件初始化前设置动态模式，系统 `prefers-reduced-motion` 优先。静态版和无 JavaScript 时正文默认可见，触屏不启用指针倾斜效果。
- 研究方向使用原生折叠面板，项目通过 WORK 环绕卡片展示；联系区支持邮件链接及复制邮箱。
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
src/data/music-favorites.json   333 条收藏的公开元数据快照
src/data/music-favorites.README.md 收藏导入来源与字段边界
src/data/music-featured.json    八首精选的官方目录与封面地址
src/pages/index.astro           首页布局与组件组合
src/layouts/Layout.astro        HTML、SEO 与对比方案初始化
src/components/MacbookIntro.astro M5 MacBook Air 桌面开场与正文入口
src/components/TravelMap.astro  旅行地点与静态地图
src/components/OffHours.astro   独立 Haerin 章节与音乐游戏章节
src/components/MusicPlayer.astro 精选唱片、主动试听与完整收藏搜索
src/components/ContactScene.astro 收尾入口、Canvas 网格与邮箱
src/components/WorkOrbit.astro  两个项目、六张轨道章节卡片
src/components/GamingRig.astro  游戏徽章与个人设备
src/components/HaerinBurst.astro 官方 LINE 贴纸与官方 MV 入口
src/scripts/portfolio.ts        对比方案、复制邮箱、导航、Canvas
src/scripts/macbook-intro.ts    原生滚动镜头、真实 DOM 投影与开场回退
src/scripts/depth-glass.ts      桌面相机倾斜与玻璃光源响应
src/scripts/travel-map.ts       地图切换与地点选择
src/scripts/motion.ts           进入动画、视差、指针响应与阅读进度
src/scripts/work-orbit.ts       原生滚动驱动的三维项目轨道
src/scripts/contact-scene.ts    圆形入口、Canvas 网格与静态模式
src/scripts/haerin-burst.ts      贴纸进入、重播与减少动态效果
src/styles/global.css          整站排版、色彩与响应式样式
src/styles/macbook-intro.css    三维设备、桌面、屏幕衔接与回退
src/styles/depth-glass.css      玻璃外壳、景深投影与移动端降级
src/styles/travel-map.css       地图样式与动画
src/styles/off-hours.css        个人爱好区样式
src/styles/music-player.css     唱片、播放器与收藏列表
src/styles/contact-scene.css    联络章节、分层文字与静态回退
src/styles/motion.css           动效、静态模式与减少动态效果样式
src/styles/work-orbit.css       三维轨道与静态回退样式
src/styles/gaming-rig.css        游戏徽章、设备和悬停效果
src/styles/haerin-burst.css      官方贴纸布局与动画样式
public/fonts/                  本地字体及 OFL 许可证
public/data/                   地理路径、来源与许可证
public/images/                 插画、照片、徽章、设备、贴纸及来源记录
public/OFFICIAL-STICKERS.md      官方 NewJeans 贴图的逐项来源
scripts/                       内容与构建检查
.github/workflows/deploy.yml    GitHub Pages 工作流
```

### 连续色彩

`src/styles/color-flow.css` 定义章节共享的色彩端点：青柠 → 奶油白 → 森林绿 → 青柠 WORK → 森林绿地图 → 薄荷 Haerin → 森林绿 Music + Games → 青柠联络。渐变桥不承载正文，保持文字对比度与滚动场景的完整性。
