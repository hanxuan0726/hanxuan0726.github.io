# 音乐收藏快照

`music-favorites.json` 是 2026-11-11 从本人 macOS「音乐」App 的「喜爱的歌曲」列表完整复制得到的 **333 条收藏记录**。它是静态导入快照，不是网站与 Apple Music 账号的实时连接，不会自动同步收藏变化。原始资料库 XML、复制文本及 RTF 不进入网站或仓库。

## 数据来源与核对

当前以「喜爱的歌曲」界面全选、复制得到的 333 行为权威来源，保留当时的列表顺序、标题、艺人、专辑、类型和显示时长。所有条目均标记 `source: "ui-confirmed"`；列表数量与界面显示的 333 一致，`reconciliationStatus` 为 `ui-complete`。

此前资料库 XML 包含 776 条记录，其中 327 条同时具有 `Loved=true` 和 `Favorited=true`，但没有「喜爱的歌曲」播放列表。完整 UI 列表包含这 327 条，且额外包含以下 6 首；它们在整个 XML 中也没有同名记录：

| 歌曲 | 艺人 |
| --- | --- |
| One Of Your Girls | Troye Sivan |
| 后来的我们 | 五月天 |
| Godzilla (feat. Juice WRLD) | Eminem |
| I'LL SHOW YOU (feat. Annika Wells & League of Legends Music) | K/DA, TWICE & Bekuh Boom |
| Watermelon Sugar | Harry Styles |
| KICK BACK | 米津玄师 |

与 XML 中 327 条收藏记录按标题、艺人、专辑匹配后，补充其可核实的年份。显示时长转换为整数秒；全部 327 条的秒时长与 XML 毫秒时长四舍五入结果一致。新增 6 首没有从 XML 推断年份或目录 ID。

XML 中另有 25 条仅带 `Album Loved=true`，不能据此推断单曲收藏，未用这个旗标补录。UI 本身包含 3 对相同标题、艺人、专辑和时长的记录：Sprinter (Mixed)、Love in My Pocket、Shape of You。它们及不同专辑版本均按实际列表保留，因此 333 指收藏记录数，不表示 333 首互不重复的作品。

## 字段

顶层包含 `source`、`importedAt`（快照日期）、`total`、`sourceDisplayedTotal`、`reconciliationStatus`、`durationUnit`、`order` 和 `tracks`。

每条曲目仅包含：

- `id`：由公开歌曲元数据生成的稳定本地哈希；重复记录追加序号。不是 Apple 的曲目 ID 或资料库私有 ID。
- `title`、`artist`、`album`、`genre`：UI 复制得到的原文。
- `duration`：UI 分秒时长转换成整数秒。
- `year`：可选，仅在 XML 精确匹配记录的年份一致时补充。
- `source: "ui-confirmed"`：表示收藏状态由完整 UI 列表确认。

未导出文件路径、资料库标识、私有曲目标识、播放次数、跳过次数、加入日期、播放日期或账号资料。没有从私有 ID 推造 Apple Music 目录链接。`order: "source-collection"` 仅记录复制时的列表顺序，不声明播放排名或收藏时间。

## 更新与播放

更新时重新导入完整收藏列表，并核对数量及歌曲元数据。网站不会后台读取本机「音乐」App，也不保存账号凭证。

精选歌曲的公开目录链接、封面与官方嵌入地址独立维护在 `music-featured.json`。目录匹配不会改变收藏快照本身；未核实目录条目的歌曲可以提供 Apple Music 搜索入口。网站不保存或分发音频文件，播放由用户主动打开的官方播放器处理。
