# 官方 NewJeans × The Powerpuff Girls 贴图来源

当前 `src/components/HaerinBurst.astro` 使用 [LINE STORE 官方系列 THE POWERPUFF GIRLS X NEWJEANS](https://store.line.me/stickershop/product/29385/en) 的透明 PNG，在页面中组成十四个装饰实例。十个不同文件约 136 KiB，保存在 `public/images/official-stickers/`。

这是对旧版原创仿作贴纸引用的替换。当前组件不再引用 `public/images/stickers/` 中的旧 SVG。未生成、描摹、重绘、去背景或改色，文件保持 LINE 官方 CDN 原样；网页只进行 CSS 缩放、旋转和进入动画。

## 素材索引

| 文件 | LINE 贴图 ID | 内容 |
| --- | --- | --- |
| `newjeans-circle.png` | 616659319 | 五位成员环绕星形 |
| `haerin-friend-rainbow.png` | 616659320 | Haerin 与成员、彩虹 |
| `haerin-friend-bunnies.png` | 616659322 | Haerin 与成员、兔子气球 |
| `haerin-hearts.png` | 616659330 | Haerin 与爱心 |
| `haerin-ta-da.png` | 616659331 | Haerin / TA DA |
| `haerin-bubbles.png` | 616659332 | Haerin 与泡泡 |
| `haerin-party.png` | 616659333 | Haerin、礼物与音符 |
| `haerin-thank-you.png` | 616659334 | Haerin / Thank you |
| `haerin-disco.png` | 616659335 | Haerin、音符与镜球 |
| `haerin-surprise.png` | 616659336 | Haerin 与粉色爆发图案 |

原图地址格式为 `https://stickershop.line-scdn.net/stickershop/v1/sticker/{ID}/android/sticker.png`。逐项完整 URL、原始尺寸、文件大小与 SHA256 见 `images/official-stickers/sources.json`；系列与尺寸交叉核对使用 [LINE 官方系列元数据](https://stickershop.line-scdn.net/stickershop/v1/product/29385/android/productInfo.meta)。获取日期：2026-11-11。

## 角色核对

Haerin 的绿色眼睛、绿色服装及橙色猫耳发型，交叉核对于 Weverse Shop 标明成员姓名的 [THE POWERPUFF GIRLS x NJ iPhone CASE (HAERIN)](https://shop.weverse.io/en/shop/USD/artists/82/sales/17347) 官方商品图。该商品图只用于核对，没有打包进本网站。

本记录仅说明具体图像出处与页面使用方式。主题、位置、大小和重复实例由 `HaerinBurst.astro` 配置；进入、重播、暂停及减少动态效果继续使用现有 `haerin-burst.ts`。
