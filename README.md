# Hanxuan Zhou · 学术个人主页

站点：**https://hanxuan0726.github.io/** · 仓库：**https://github.com/hanxuan0726/hanxuan0726.github.io**

已配置公开姓名、邮箱和 GitHub 用户名；头像、简历、项目链接与教育日期仍可后续补齐。

基于 Astro + TypeScript + Tailwind CSS 的静态单页学术主页。适用于 **`USERNAME.github.io` 用户名仓库**，默认从网站根路径 `/` 部署。无后端、数据库、登录或第三方追踪，无运行时远程字体依赖。

## 本地启动

需要 **Node.js 22.12+，推荐 Node.js 24 LTS**，以及 npm。

```bash
npm ci
npm run dev
```

打开终端显示的本地地址（默认 `http://localhost:4321/`）。生产验证：

```bash
npm run build
npm run preview
```

`build` 依次执行 Astro/TypeScript 检查、静态构建和生成资源检查。输出为 `dist/`。`npm run check` 可单独执行类型检查。

## 修改资料：只需先编辑一个文件

统一内容入口为 **`src/data/site.ts`**。

| 配置 | 用途 |
| --- | --- |
| `name` / `chineseName` | 英文及中文姓名 |
| `role` / `university` / `school` | 身份、学校、学院；学院暂用中文，请确认正式英文名称再替换 |
| `email` | 当前公开邮箱：`51295902169@stu.ecnu.edu.cn` |
| `githubUsername` | 已配置为 `hanxuan0726`，不包含 `@` |
| `portrait` / `portraitAlt` / `portraitIsPlaceholder` | 头像路径、替代文本、是否占位图 |
| `cv` | 添加真实 PDF 后填写 `/files/hanxuan-zhou-cv.pdf` |
| `projects` | 项目标题、介绍、状态、图片、技术标签、GitHub/Demo 链接 |
| `education` | 教育经历；日期为 `YYYY-MM`，结束日期也可写 `Present` |
| `publications` | 真实论文数组；默认空，整个板块及导航自动隐藏 |
| `lastUpdated` | 内容更新日期，使用 `YYYY-MM-DD`；不会把每次构建冒充内容更新 |

示例：

```ts
email: 'your-public-address@your-domain.edu', // 替换为真实公开邮箱
cv: '/files/hanxuan-zhou-cv.pdf',             // 文件必须真实存在
// education 数组中的字段：
start: 'YYYY-MM', // 填写真实年月，例如按学校记录填写
end: 'Present',
```

### 图片与链接

`public/` 内文件会按原路径复制到站点根目录：

```text
public/
  images/
    portrait-placeholder.svg
    so101-placeholder.svg
    remote-control-placeholder.svg
    og.png                 # 本地生成的社交分享封面
    og.svg                 # 可编辑封面源文件
  files/                   # 放真实简历 PDF
  favicon.svg
```

更换图片后，更新对应 `imageAlt`，并把 `imageIsPlaceholder` / `portraitIsPlaceholder` 改为 `false`。当前项目图是**明确标注的示意占位图**，不是实验照片。没有提供或虚构个人头像、简历和项目截图。

项目链接的 `url: null` 和简历的 `cv: null` 会呈现 `GitHub [to add]`、`Demo [to add]`、`CV [to add]` 等文本，不产生指向虚假地址或 404 的按钮。填写真实的 HTTPS 链接即可自动变为可点击链接。`placeholder` 字段记录待补链接类型。

### 论文组件

新增真实论文时向 `publications` 添加以下结构；没有数据时不要填写示例论文：

```ts
{
  title: '真实论文标题',
  authors: ['Hanxuan Zhou', '实际作者姓名'],
  venue: '实际会议或期刊',
  year: 2026, // 实际年份
  links: [
    { label: 'PDF', url: 'https://your-real-paper-url' },
    { label: 'Code', url: 'https://your-real-code-url' },
    { label: 'Project', url: 'https://your-real-project-url' },
  ],
}
```

组件为 `src/components/PublicationList.astro`，自动强调本人姓名，支持多作者及 PDF / Code / Project 资源。

## GitHub Pages 部署

1. 在 GitHub 创建一个 **Public** 仓库，名称必须为 **`USERNAME.github.io`**（使用你的实际用户名）。
2. 把本项目文件放在仓库根目录，包含隐藏的 `.github/`，不要多套一层项目文件夹。
3. 在 `src/data/site.ts` 中填写真实 `githubUsername` 和公开 `email`。确认学院名称、真实日期及其余资料。选填图片和项目链接不会阻止部署。
4. 本地运行：

   ```bash
   npm ci
   npm run check:content
   npm run build
   ```

5. 打开仓库 **Settings → Pages → Build and deployment → Source**，选择 **GitHub Actions**。
6. 将代码推送到 `main` 分支，或在 **Actions** 中手动运行 `Deploy academic homepage to GitHub Pages`。
7. 等待 build / deploy 完成，访问 **`https://USERNAME.github.io/`**。

提供的 `.github/workflows/deploy.yml` 使用 npm 锁文件安装依赖、核对公开身份配置、构建、检查资源路径、上传并部署 `dist/`，仅部署任务获得 Pages 和 OIDC 权限。首次启用 Pages 必须由仓库拥有者完成 GitHub 设置；本项目交付不代表已创建或发布远端仓库。

参考：[Astro 官方 GitHub Pages 指南](https://docs.astro.build/en/guides/deploy/github/)。

### 根路径与域名

- `astro.config.ts` 使用 `base: '/'`，资源为 `/images/...`、`/_astro/...`，匹配用户名仓库。
- 正式 origin 优先使用 `SITE_URL` 环境变量；否则使用配置中的 GitHub 用户名；GitHub Actions 中还可从仓库拥有者获取。
- 本地用户名尚未填写时，使用保留域名 `https://example.invalid` 生成可构建的元数据，不冒用任何真实账号。填写真实资料后会生成正确的 canonical、Open Graph、robots 和 sitemap。
- 未填写身份时自动输出 `noindex, nofollow` 和 `Disallow: /`，部署前的 `check:content` 会明确提示缺失项。填好真实资料后自动允许索引。
- **不要把此配置直接用于 `USERNAME.github.io/REPO/` 项目仓库。** 此交付专用于你要求的根路径网站。
- 使用自定义域名时设置 `SITE_URL=https://你的域名`，并按 GitHub 文档完成 DNS 和 `public/CNAME` 设置。

## 公开身份验证

首页的 Hero 与 Contact 均直接输出 **Hanxuan Zhou** 和邮箱。它们是构建生成的、可复制的 HTML 文本；关闭 JavaScript、无需登录也可查看。真实邮箱同时可作为 mailto 链接，但显示内容不依赖链接或图标。

**`[PUBLIC_EMAIL]` 只是占位符，无法用于真实身份验证。上线前必须替换成你认可公开的真实邮箱。** 不应把私人邮箱或密钥放入此文件。

## 设计与可访问性

- 暖白背景、深灰正文、蓝色强调；衬线大标题与轻量等宽辅助信息。
- 项目采用图文行、研究方向采用无卡片分隔布局。
- 系统 / 浅色 / 深色三档主题；选择保存在本机，系统档始终跟随系统。
- 320px 起响应式、语义化区块、键盘焦点、跳过导航、清晰标签、图片替代文本。
- 锚点导航、滚动板块高亮；禁用 JavaScript 仍可阅读、访问锚点和已配置资源链接。
- `prefers-reduced-motion` 禁止进入动画和平滑滚动。
- 本地 PNG Open Graph、SVG favicon、canonical、description、robots、自动 sitemap。

## 项目结构

```text
.github/workflows/deploy.yml  # GitHub Pages CI/CD
astro.config.ts              # 静态输出、域名、根路径、sitemap、Tailwind
src/data/site.ts             # 统一个人内容与类型
src/layouts/Layout.astro     # SEO、主题初始化、HTML 骨架
src/pages/index.astro        # 主页与渐进增强脚本
src/pages/404.astro          # 根路径返回链接
src/pages/robots.txt.ts      # 静态 robots 输出
src/components/              # 图标、资源链接、论文列表
src/styles/global.css        # 主题、排版、响应式、减少动态效果
scripts/check-content.ts     # 部署前检查真实公开身份
scripts/check-build.mjs      # 检查静态 HTML 与本地资源存在性
public/                      # 可替换静态素材
```

Tailwind 通过官方 Vite 插件编译；自定义学术排版集中在全局样式中。可用 `flex`、`gap-4` 等 Tailwind utilities 扩展组件，不需要浏览器 CDN。
