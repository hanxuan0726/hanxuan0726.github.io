# 交付验证记录

验证日期：2026-10-31。

- Node.js 24.22.1 / npm 11.16.0；Astro 5.18.2、Tailwind 4.3.3、TypeScript 5.9.3（精确依赖见 package-lock.json）。
- 从锁文件执行干净的 `npm ci` 成功。
- 最终 `npm run build` 成功：Astro/TypeScript 0 errors、0 warnings、0 hints。
- 生成静态首页、404、robots.txt、sitemap-index.xml、sitemap-0.xml、favicon 与 .nojekyll。
- 构建检查验证 6 个不同的根路径资源引用全部存在；本地生产预览 HTTP 200。
- 直接读取生成 HTML（排除脚本/样式文本），确认英文姓名与邮箱占位符出现在公开页面；邮箱出现两次，分别位于 Hero 与 Contact。
- 默认没有 publications 区域，未配置的 GitHub、Demo、CV 均未生成虚假链接。
- 浏览器验证实际 CSS 视口 320px、768px、1200px 均无页面横向溢出；320px 主导航也无需水平滚动。
- 图片均成功加载；浏览器未捕获 error / warn。
- 已验证 Projects / Contact 锚点跳转和当前导航高亮；Dark 选择刷新后保留，完成后恢复 System。
- 已配置 GitHub 用户名 `hanxuan0726` 和用户确认公开邮箱；`npm run check:content` 通过。

目标仓库为 `hanxuan0726/hanxuan0726.github.io`，生产 origin 为 `https://hanxuan0726.github.io/`。远端部署结果以 GitHub Actions 和 Pages 为准；第三方身份验证效果由对应平台确认。
