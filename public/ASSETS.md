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

替换项目图片时同步更新 `src/data/site.ts` 的 `image`、`imageAlt`、`imageIsPlaceholder`，以及 `src/components/WorkOrbit.astro` 中的卡片图片与替代文本。WORK 当前仅保留六张环绕卡片，不再展示下方展开项目详情；无 JavaScript 或减少动效时使用静态卡片回退。两项目原始内容仍保存在 `src/data/site.ts`。项目轨道中的 ACT 和身份认证图形同样是原创概念示意，不是实验结果。未提供真实头像或简历时，不生成冒充本人或研究证据的素材。

## Haerin 粉丝角照片拼贴

- `images/haerin-seoul-fashion-week.jpg`：姜海粼（Haerin）出席 2024 年首尔时装周的照片，摄影者为 티비텐（TV10）。
- 来源：[Wikimedia Commons — Haerin Seoul Fashion Week 3.jpg](https://commons.wikimedia.org/wiki/File:Haerin_Seoul_Fashion_Week_3.jpg)，许可证为 [Creative Commons Attribution 3.0 Unported](https://creativecommons.org/licenses/by/3.0/)。
- JPEG 原文件未修改；页面仅在装饰相框内缩放显示。完整来源、原始视频和许可证记录见 `images/haerin-photo-credit.json`。
- 新增 `images/haerin-photos/haerin-dior-2023.jpg`、`haerin-olens-2023.jpg`、`haerin-mma-2023.jpg`，与首尔时装周主肖像组成四张错层拼贴；文件均保持 Commons 原始 JPEG，网页仅做独立相框、缩放与旋转。
- Dior 图作者 TV10、OLENS 图作者 OLensglobal，许可均为 CC BY 3.0；MMA 图作者 TenAsia，许可为 CC BY-SA 4.0。逐张原页、下载地址、尺寸与许可见 [HAERIN-PHOTOS.md](./HAERIN-PHOTOS.md)，完整文件记录在 `images/haerin-photos/sources.json`。
- `src/components/OffHours.astro` 保留可见的摄影者、来源和各自许可证链接；主肖像最大，侧后景照片与官方贴纸错层排列。替换或再分发时同步保留署名信息及各图适用许可。

## 粉丝贴纸与音乐入口

- 当前爆发贴纸使用 `images/official-stickers/` 中的官方 LINE 透明 PNG，来自 NewJeans 官方合作贴纸页面。逐项素材、版权归属与来源核对见 [OFFICIAL-STICKERS.md](./OFFICIAL-STICKERS.md)；原有原创 SVG 已不作为当前贴纸显示。
- `src/components/HaerinBurst.astro` 使用十四个装饰实例。修改素材时保留官方 PNG 出处与逐图来源记录，布局和重播逻辑分别在 `haerin-burst.css`、`haerin-burst.ts`。
- 《Super Shy》入口链接到 [NewJeans 官方 MV](https://www.youtube.com/watch?v=ArmDp-zijuc)。本站不保存音视频、不嵌入自动播放播放器。

## 游戏段位徽章

- `images/ranks/apex-master.png`：APEX Master 通用段位图标，来自 [Apex Legends Status 的公共素材端点](https://api.mozambiquehe.re/assets/ranks/master.png)。游戏美术权利归 Electronic Arts / Respawn Entertainment；不是特定赛季奖励徽章。
- `images/ranks/valorant-immortal.png`：历史通用 Immortal 图标，来自 [VALORANT API 素材端点](https://media.valorant-api.com/competitivetiers/23eb970e-6408-bc0b-3f20-d8fb0e0354ea/21/largeicon.png)。游戏美术权利归 Riot Games。选择通用图标，避免推断用户的 I/II/III 小段位；「神话」对应关系参照 [Riot 官方繁中说明](https://playvalorant.com/zh-tw/news/game-updates/valorant-episode-2-act-i-competitive-changes/)。
- `images/ranks/perfect-world-gold-s.png`：完美世界竞技平台的经典黄金 S 官方图标，直接来自 [完美电竞官方 CDN](https://static.pwesports.cn/esportsadmin/esports/pwa/rank/icons/s-gold.png)。[平台官网](https://pvp.wanmei.com/) 当前加载的 [官方 JS](https://pvp.wanmei.com/pvp/umi.e624939f.js) 将 `Mr.GOLD` 对应到 `sGoldOld` / `sGold`，其中经典图为 `s-gold.png`，新版为动画 `s-gold-1.png`。本站采用静态经典金色原图（46×59），不推断用户赛季；不是 Steam 匹配段位。旧 `perfect-world-gold-s.svg` 仅保留，不再显示。美术权利归完美世界。
- PNG 原文件未修改；完整来源、核对链接和权利归属记录在 `images/ranks/sources.json`。徽章并不表示平台对本主页的认证。

## 个人设备实物图

- `images/gear/viper-v4-pro-official.png`：雷蛇 Viper V4 Pro 白色产品官方透明图（500×500），在 [Razer 官方产品页](https://www.razer.com/gaming-mice/razer-viper-v4-pro) 核对，直接下载自 [Razer 官方媒体服务器](https://medias-p1.phoenix.razer.com/sys-master-phoenix-images-container/h57/h60/10039373201438/viper-v4-pro-white-2-500x500.png)。权利归 Razer Inc.。
- `images/gear/iqunix-ev63-official.jpg`：IQUNIX EV63 官方产品实拍图（1000×750），来自 [IQUNIX 官方产品页](https://iqunix.com/products/iqunix-ev63-hall-effect-keyboard) 的图库，[原图地址](https://iqunix.com/cdn/shop/files/04_ee0aad70-2530-4881-9fab-5e08f198c0cf.jpg?v=1765951802&width=1000)。权利归 IQUNIX。
- 两张素材保存的字节与品牌服务器交付原图一致，未生成、重绘或替换产品外形。键盘仅在网页 CSS 中裁出产品区域；独立玻璃底板、接触阴影和透视变换构成立体展示。设备图选用官网展示配色，不推断用户实际拥有的颜色，也不代表品牌支持或合作。
- 完整下载地址、核对页和处理说明在 `images/gear/sources.json`。旧 `viper-v4-pro.svg`、`iqunix-ev63.svg` 为保留的示意素材，当前首页不使用。产品图并无开放许可证声明，相关商标与美术权利仍归各品牌。

## 地图数据

- `data/map-geography.json`：由原始地理数据简化、投影得到的本地 SVG 路径。轮廓经过 Ramer–Douglas–Peucker 简化，属于展示用几何数据。
- 世界轮廓来自 [Natural Earth 1:110m admin-0 countries](https://github.com/nvkelso/natural-earth-vector/blob/master/geojson/ne_110m_admin_0_countries.geojson)，为公共领域数据，见 [使用条款](https://www.naturalearthdata.com/about/terms-of-use/)。
- 中国轮廓来自 [Apache ECharts 的 China GeoJSON](https://github.com/apache/echarts/blob/master/test/data/map/js/china.js)，使用 Apache-2.0 许可证。
- `data/map-sources.json` 保留来源链接、修改说明、Apache 许可证全文与 NOTICE；再分发地图数据时保留该文件和署名。

旅行地点定义在 `src/components/TravelMap.astro`。上海标为 HOME，南昌标为 roots / 老家。连线表示上海与已到访地点的示意关联，不是记录的飞行路径；国家和省份使用区域代表点，不推断具体到访城市。地图在构建时生成，无第三方地图 API、密钥或在线瓦片依赖。

## 开场与材质

MacBook Pro（M5 Pro）开场使用本站 CSS/SVG/DOM 绘制，外形参考 [Apple 官方产品展示](https://www.apple.com/macbook-pro/)。没有下载或打包 Apple 的产品照片、视频或三维模型；该示意不代表 Apple 的支持或合作关系。屏幕与进入后的页面共用唯一的真实主页 DOM，通过开场场景中的缩放与接力切换完成进入，不使用外部截图、复制主页或 iframe。实现位于 `src/components/MacbookIntro.astro`、`src/styles/macbook-intro.css` 和 `src/scripts/macbook-intro.ts`。

玻璃边缘、投影、反光与桌面光源由 CSS 绘制，位于 `src/styles/depth-glass.css`；指针响应在 `src/scripts/depth-glass.ts`。材质参考 [Apple 的 Liquid Glass 设计指导](https://developer.apple.com/documentation/technologyoverviews/adopting-liquid-glass)，属于网页视觉实现，不调用 Apple 原生材质框架。青柠绿、奶油白、森林绿以及薄荷、淡紫、冰蓝辅助色均为本站配色。
