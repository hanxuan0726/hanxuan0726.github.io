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

替换项目图片时同步更新 `src/data/site.ts` 的 `image`、`imageAlt`、`imageIsPlaceholder`，以及 `src/components/WorkOrbit.astro` 的图注。项目轨道中的 ACT 和身份认证图形同样是原创概念示意，不是实验结果。未提供真实头像或简历时，不生成冒充本人或研究证据的素材。

## Haerin 粉丝角照片

- `images/haerin-seoul-fashion-week.jpg`：姜海粼（Haerin）出席 2024 年首尔时装周的照片，摄影者为 티비텐（TV10）。
- 来源：[Wikimedia Commons — Haerin Seoul Fashion Week 3.jpg](https://commons.wikimedia.org/wiki/File:Haerin_Seoul_Fashion_Week_3.jpg)，许可证为 [Creative Commons Attribution 3.0 Unported](https://creativecommons.org/licenses/by/3.0/)。
- JPEG 原文件未修改；页面仅在装饰相框内缩放显示。完整来源、原始视频和许可证记录见 `images/haerin-photo-credit.json`。
- `src/components/OffHours.astro` 保留可见的摄影者、来源和许可证链接。替换或再分发时同步保留署名信息。

## 粉丝贴纸与音乐入口

- `images/stickers/` 中九个 SVG 是为此主页绘制的原创卡通风格粉丝素材，包含 Haerin 角色姿态、兔子、文字、心形与星形；不是官方发行的贴纸。
- `src/components/HaerinBurst.astro` 使用十四个装饰实例。修改素材时保留 SVG 内的可读说明，布局和重播逻辑分别在 `haerin-burst.css`、`haerin-burst.ts`。
- 《Super Shy》入口链接到 [NewJeans 官方 MV](https://www.youtube.com/watch?v=ArmDp-zijuc)。本站不保存音视频、不嵌入自动播放播放器。

## 游戏段位徽章

- `images/ranks/apex-master.png`：APEX Master 通用段位图标，来自 [Apex Legends Status 的公共素材端点](https://api.mozambiquehe.re/assets/ranks/master.png)。游戏美术权利归 Electronic Arts / Respawn Entertainment；不是特定赛季奖励徽章。
- `images/ranks/valorant-immortal.png`：历史通用 Immortal 图标，来自 [VALORANT API 素材端点](https://media.valorant-api.com/competitivetiers/23eb970e-6408-bc0b-3f20-d8fb0e0354ea/21/largeicon.png)。游戏美术权利归 Riot Games。选择通用图标，避免推断用户的 I/II/III 小段位；「神话」对应关系参照 [Riot 官方繁中说明](https://playvalorant.com/zh-tw/news/game-updates/valorant-episode-2-act-i-competitive-changes/)。
- `images/ranks/perfect-world-gold-s.svg`：原创金色 S 示意徽章，配合用户原文「完美黄金 S」；不是完美平台官方图标，也不是 Steam 匹配段位。
- PNG 原文件未修改；完整来源、核对链接和权利归属记录在 `images/ranks/sources.json`。徽章并不表示平台对本主页的认证。

## 个人设备插画

- `images/gear/viper-v4-pro.svg`：Razer Viper V4 Pro 原创轮廓示意，外形参考 [雷蛇官方产品页](https://cn.razerzone.com/gaming-mice/razer-viper-v4-pro)。
- `images/gear/iqunix-ev63.svg`：IQUNIX EV63 原创紧凑键盘示意，外形参考 [IQUNIX 官方产品页](https://iqunix.com/products/iqunix-ev63-hall-effect-keyboard)。
- 两幅图为装饰性线稿，不是用户设备的照片；示意颜色不代表其拥有的实际配色。没有根据型号推断用户设置、性能或使用成绩。来源记录在 `images/gear/sources.json`。

## 地图数据

- `data/map-geography.json`：由原始地理数据简化、投影得到的本地 SVG 路径。轮廓经过 Ramer–Douglas–Peucker 简化，属于展示用几何数据。
- 世界轮廓来自 [Natural Earth 1:110m admin-0 countries](https://github.com/nvkelso/natural-earth-vector/blob/master/geojson/ne_110m_admin_0_countries.geojson)，为公共领域数据，见 [使用条款](https://www.naturalearthdata.com/about/terms-of-use/)。
- 中国轮廓来自 [Apache ECharts 的 China GeoJSON](https://github.com/apache/echarts/blob/master/test/data/map/js/china.js)，使用 Apache-2.0 许可证。
- `data/map-sources.json` 保留来源链接、修改说明、Apache 许可证全文与 NOTICE；再分发地图数据时保留该文件和署名。

旅行地点定义在 `src/components/TravelMap.astro`。上海标为 HOME，南昌标为 roots / 老家。连线表示上海与已到访地点的示意关联，不是记录的飞行路径；国家和省份使用区域代表点，不推断具体到访城市。地图在构建时生成，无第三方地图 API、密钥或在线瓦片依赖。

## 开场与材质

MacBook Air 开场使用本站 CSS/SVG/DOM 绘制，外形参考 [Apple 官方产品展示](https://www.apple.com/macbook-air/)。没有下载或打包 Apple 的产品照片、视频或三维模型；该示意不指定用户设备的年份、芯片或真实配色，也不代表 Apple 的支持或合作关系。屏幕预览由当前主页导航与首屏的样式副本生成，没有外部截图或 iframe。实现位于 `src/components/MacbookIntro.astro`、`src/styles/macbook-intro.css` 和 `src/scripts/macbook-intro.ts`。

玻璃边缘、投影、反光与桌面光源由 CSS 绘制，位于 `src/styles/depth-glass.css`；指针响应在 `src/scripts/depth-glass.ts`。材质参考 [Apple 的 Liquid Glass 设计指导](https://developer.apple.com/documentation/technologyoverviews/adopting-liquid-glass)，属于网页视觉实现，不调用 Apple 原生材质框架。青柠绿、奶油白、森林绿以及薄荷、淡紫、冰蓝辅助色均为本站配色。
