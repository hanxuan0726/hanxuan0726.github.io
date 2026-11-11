# 本地素材与来源

`public/` 中的素材按原路径复制到网站根目录，适用于 `USERNAME.github.io` 根路径部署。字体、插画和地图均从本站加载。

## 字体

- `fonts/anton-latin.ttf`：Anton，标题使用；版权信息和 SIL Open Font License 1.1 全文见 `fonts/Anton-OFL.txt`。
- `fonts/dm-sans.ttf`：DM Sans，正文使用；版权信息和 SIL Open Font License 1.1 全文见 `fonts/DM-Sans-OFL.txt`。
- 衬线与等宽辅助字体使用系统回退。替换或分发字体时保留相应许可证。

## 插画、封面与简历

- `images/manipulation-study.svg`：机器人手臂与离心管架的概念插画。
- `images/remote-study.svg`：机器人和远程推理间观测/动作链路的概念插画。
- 上述插画是设计示意，不是实验照片或录像截图。首页提供对应图注和替代文本。
- `images/og.svg`、`images/og.png`：可编辑的社交分享封面源文件及 PNG；修改封面时同步更新。
- `favicon.svg`：站点图标。
- `files/`：可放入真实 CV PDF，再设置 `src/data/site.ts` 的 `cv`。未配置的 CV 入口隐藏。
- `images/portrait-placeholder.svg`、`images/so101-placeholder.svg`、`images/remote-control-placeholder.svg` 是保留的旧占位素材，当前首页不使用。

替换项目图片时同步更新 `src/data/site.ts` 的 `image`、`imageAlt`、`imageIsPlaceholder`，以及 `src/pages/index.astro` 的图注。未提供真实头像或简历时，不生成冒充本人或研究证据的素材。

## Haerin 粉丝角照片

- `images/haerin-seoul-fashion-week.jpg`：姜海粼（Haerin）出席 2024 年首尔时装周的照片，摄影者为 티비텐（TV10）。
- 来源：[Wikimedia Commons — Haerin Seoul Fashion Week 3.jpg](https://commons.wikimedia.org/wiki/File:Haerin_Seoul_Fashion_Week_3.jpg)，许可证为 [Creative Commons Attribution 3.0 Unported](https://creativecommons.org/licenses/by/3.0/)。
- JPEG 原文件未修改；页面仅在装饰相框内缩放显示。完整来源、原始视频和许可证记录见 `images/haerin-photo-credit.json`。
- `src/components/OffHours.astro` 保留可见的摄影者、来源和许可证链接。替换或再分发时同步保留署名信息。

## 地图数据

- `data/map-geography.json`：由原始地理数据简化、投影得到的本地 SVG 路径。轮廓经过 Ramer–Douglas–Peucker 简化，属于展示用几何数据。
- 世界轮廓来自 [Natural Earth 1:110m admin-0 countries](https://github.com/nvkelso/natural-earth-vector/blob/master/geojson/ne_110m_admin_0_countries.geojson)，为公共领域数据，见 [使用条款](https://www.naturalearthdata.com/about/terms-of-use/)。
- 中国轮廓来自 [Apache ECharts 的 China GeoJSON](https://github.com/apache/echarts/blob/master/test/data/map/js/china.js)，使用 Apache-2.0 许可证。
- `data/map-sources.json` 保留来源链接、修改说明、Apache 许可证全文与 NOTICE；再分发地图数据时保留该文件和署名。

旅行地点定义在 `src/components/TravelMap.astro`。上海标为 HOME，南昌标为 roots / 老家。连线表示上海与已到访地点的示意关联，不是记录的飞行路径；国家和省份使用区域代表点，不推断具体到访城市。地图在构建时生成，无第三方地图 API、密钥或在线瓦片依赖。
