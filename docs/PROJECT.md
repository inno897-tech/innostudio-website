# INNO DESIGN STUDIO 网站改版 — 项目进度

更新时间：2026-11-26

## 已上线（2026-11-23）

- **正式网站：https://innostudio.net**（Cloudflare Pages 项目 `innostudio-site`）
- GitHub 仓库：`inno897-tech/innostudio-website`（main 分支，推送后自动发布；Claude 和 Cloudflare Pages 的 GitHub 应用都已开通此仓库权限）
- 域名：仍在 Wix 注册，名称服务器已改为 Cloudflare（elinore / graham.ns.cloudflare.com），DNS 由 Cloudflare 管理；Wix 上指向旧网站的 A / CNAME 记录已删除
- 旧的直接上传项目 `innostudio` 已删除
- **以后改网站**：Claude 改完推送到 GitHub，1–2 分钟自动更新
- 本进度文件也保存在仓库里：`docs/PROJECT.md`

## 联系表单与邮箱（11-23）

- **START A PROJECT 表单**（导航按钮、作品详情页 Start a similar project、套餐 Contact us、底部邮箱按钮都打开同一个表单）：点 Send 后经 Cloudflare Pages Function `functions/api/contact.js` → **Brevo API** 发到 info@innostudio.net（再转到 Gmail）；客户邮箱设为 Reply-To，直接点回复即可
  - 防垃圾：隐藏字段 + 表单打开不足 3 秒不发送
  - 发件地址暂借 info@ruskanordic.com（已在 Brevo 验证），显示名 "INNO Design Studio website"；以后若在 Brevo 验证 innostudio.net，可改成 info@innostudio.net
  - Cloudflare 项目 innostudio-site 里设置了 Secret `BREVO_API_KEY`（Brevo 受限密钥，只开 Transactional email = All，No expiration）
  - Brevo 密钥 90 天不用会失效：`functions/api/keepalive.js` + GitHub Actions `.github/workflows/keepalive.yml` 每月 1 号自动调用一次（不发邮件）
- **底部邮箱按钮**：显示小写 info@innostudio.net，点击打开表单（不再复制地址）
- **用 info@ 回信**：Gmail「以其他地址发送邮件」，SMTP smtp.gmail.com:587 + Google 应用专用密码（不经过 Brevo）；回复时从收件地址回复
- SPF 记录被 Email Routing 锁定，没有加 Google；目前没有 DMARC（暂不加）

## 当前主版本

**INNO Design Studio — Website**（瑞士–北欧海报风，正式内容版）
链接：https://claude.ai/artifact/Y2dYoJJuru4E8MtbhnZDS1

- 本地工作文件：`/home/claude/site/index.html` + `img/` 文件夹（34 个文件，含首屏工作室照片 studio.webp）
- 单页网站，Tailwind CDN + **Switzer**（Fontshare），全站只用这一种字体
- 语言：英文 + 芬兰语（EN / FI 切换，按浏览器语言自动选择，记住访客选择）；中文版已去掉

## 其他产出

| 产出 | 链接 | 状态 |
|---|---|---|
| 网站内容策划（文档） | https://claude.ai/artifact/GGyNPqZRf4ZSuoHTw2jRrt | 已更新到最新决定（创立年份 2015、价格等） |
| 设计画布（5 个早期首页方案） | https://claude.ai/artifact/HvKs7csdZdscQwxxzfKcWp | 参考用；仍写着 2005 |
| 第一版海报网站（按用户代码生成） | https://claude.ai/artifact/BVnGSD5qEAxo54oXe6AwiJ | 参考用；仍写着 2005 |

## 已确定的决定

### 公司信息
- 名称：INNO Design Studio · Business ID 2765454-9
- **创立年份：2015**（全站统一）
- 地址：只写 Katajatie 16, 36200 Kangasala, Finland（不再列大连、香港）
- 坐标：61°27′48″N 24°04′22″E
- 邮箱：info@innostudio.net（11-23 已设置 Cloudflare Email Routing 转发到个人邮箱，测试收信成功；旧 Google MX 和 SPF 记录已删除）
- 电话：+358 46 539 3901
- 回复时间：两个工作日内
- 主营：品牌设计、UI/UX 设计；本地化为支持服务
- RUSKA NORDIC 是旗下品牌（App 开发 + 瓷器贸易），网站只做外链
- 团队名字和职务：网站上不显示
- 客户 Tampere City Hall、Tallink & Silja Line：不公开展示

### 价格
- 网站上**不显示价格**，统一写 "Contact us" / "Fixed quote after a short intro call"
- 内部参考价（不上网站）：Brand Starter €500 · Brand Identity €1,000 · Website（单页）€300 · App Design €1,000，均约 3 周
- 网站显示周期：about 3 weeks

### 字体与样式
- **主字体 Switzer**（Fontshare 免费商用，ITF Free Font License）：标题和原加粗处用 Semibold 600，正文 Regular 400
  - 只能用 Fontshare 官方 CDN 加载（`api.fontshare.com/v2/css?f[]=switzer@400,600`），**不能自己托管字体文件**
  - Claude 预览页会挡住 Fontshare，预览里显示的是备用字体 Arial（已去掉 Helvetica Neue，避免粗细显示错乱）；真正效果看 innostudio.net
  - 加载字重：400 / 500 / 600 / 700
  - 曾试过 Space Grotesk（OFL 开源，Google Fonts），已换掉
  - **11-23：Space Mono 也已去掉**，原来等宽字体的地方（导航、小标签、Read the case、详情页按钮、联系信息）全部改成 Switzer；原粗体改成 Semibold 600
- **字间距**：全站不用负字距，全部为 0；只有大写小标签保留 0.04em / 0.08em
- Switzer 大写 Semibold 14px 的按钮：右上角 START A PROJECT、首屏 SEE OUR WORK、底部邮箱
- 其他按钮字号统一 14px（作品详情页的 APP PAGE / Google Play / START A SIMILAR PROJECT / NEXT PROJECT）
- 文字颜色：浅色底上的文字全部纯黑（灰字已取消）；只有深色底上的反白字保留白/浅灰；表单输入框提示文字仍为浅灰
- **箭头**：全站换成细线尖角箭头（参考 Polestar）：斜线从左下直通右上角，顶部横线 + 右侧竖线在右上角合成尖角；→ ← 同样风格。用 JS 自动把 ↗ → ← 字符换成线条图形，颜色跟随文字
- 页面横线：全部与作品框线一样粗细的实线（border-ink）
- 背景网格：默认打开（[GRID: ON]），格子 6.25% × 90px
- 颜色：海报灰底 #E5E5E5、黑 #111111、强调色**明黄 #FFD400**（原朱红 #E64800 已全部替换）
  - 明黄上一律用黑字；浅灰底上不用黄色文字，改成黄色标签底 + 黑字（各段小标题、Today、状态、错误提示）
- Logo：**newlogo-2.svg**（横排 "INNO® DESIGN STUDIO"，NN 连笔字形），用于导航和页脚

## 页面结构与细节（当前版本）

1. **导航**：整条黑底白字；logo · Work / Services / About / Process / Contact · EN/FI · [GRID: ON] · 明黄 START A PROJECT ↗（大写 Switzer）
2. **首屏海报**
   - 左：20 · nordic design studio · 黑条 · SMALL BY DESIGN · Brand & UI/UX design
   - 右：since twenty fifteen · 坐标 · FINLAND · 15
   - 对齐：20 和 15 在同一水平线；上面两行小字比大数字顶部略低；下面两组小字的最后一行落在大数字底线上（JS 按实际字形测量，换字体也会自动对齐；样式或字体晚加载时会重新对齐）
   - 左下：标题 "Brands and interfaces, designed in Finland." + 说明 + 一个按钮 SEE OUR WORK（START A PROJECT 已删）
   - 右侧：工作室照片（img/studio.webp，用户提供，16:10）+ 左下压半透明明黄横条（伸出照片左边缘）+ 图注 "FIG. 01 / THE STUDIO, FINLAND"（芬兰语 "Studio, Suomi"）——已确认保留
   - 照片下方四组信息：BRAND DESIGN / UI/UX DESIGN（右对齐）/ LANGUAGES / REPLY（右对齐）
   - 中间设备画面已去掉
3. **服务**：标题 "Brand, interface, language."；三张黑底白字卡片（Brand design / UI & UX design / Localization）；套餐四项（标题已去掉"Packages"字样，名称加大，Contact us 变小并底部对齐）
4. **作品**（8 个，每排 3 个；11-26 新增 Routa 放在第一个）：标题 "Designed, built and used."
   - 卡片（11-23 调换）：黑色细线外框；**第一行：作品名称（大写 Bold 700，24px）+ 简介，右边 2026**；正方形展示区；**底部黑条：WORK-APP / CONCEPT + UI/UX 标签（Medium 500，11px）+ Read the case ↗**
   - 首页卡片只显示一张截图；点击后在详情页才出现左右翻页；名称不变色，Read the case 鼠标移上去出现黄色底块
   - 详情页：左右箭头在画面中间，无页码；网页截图四周留白
   - 案例详情：挑战 / 做法 / 结果（三个小标题加黄色底块 + 黑字）+ 链接按钮（Google Play、App 页、网站）

| 作品 | 标签 | 链接 |
|---|---|---|
| Routa | WORK-TYPE / TYPE DESIGN | 暂无（MyFonts 审核通过后加购买链接）；15 张 MyFonts 展示图在 img/routa/，封面为 cover.webp |
| Wico | WORK-APP / CONCEPT + UI/UX | Google Play（fi.wico.app）· App 页 |
| Time Duel | WORK-APP / CONCEPT + UI/UX | Google Play（net.innostudio.timeduel）· App 页 |
| FERMO | WORK-APP / CONCEPT + UI/UX | App 页（开发中） |
| FlyDrop | WORK-APP / CONCEPT + UI/UX | App 页（开发中） |
| RUSKA NORDIC | WORK-WEB / UI/UX | ruskanordic.com |
| Innopublishing | WORK-WEB / UI/UX | innopublishing.com |
| INNO 改版 | WORK-BRAND / BRANDING | innostudio.net（11-26：案例文字改为英文 + 芬兰语双语；封面换成上线网站真实截图 img/inno-home.webp） |

   - 11-26：三个网站作品用用户购买的 **ls.graphics MacBook Air 2022 样机**（PSD）合成：浅灰渐变背景（11-27 调浅：#E2E2E3 → #B0B1B4 → #7C7D82），详情页图片铺满不留边、电脑放在平面上（接触阴影 + 淡倒影）。**每个网站 5 页**，详情页可左右翻：
     - RUSKA NORDIC：首页 / Design Labs / Global Trade / Wico 页 / Contact
     - Innopublishing：首页 / 新书 / 全部书目 / 单本书页 / 出版服务
     - INNO：首页 / 服务 / 作品 / 流程 / 联系
     - 文件：img/mac/{ruska,innopub,inno}-1~5.webp（1600×1024），首页卡片用 -sq.webp 方形版
     - 合成脚本 /home/claude/mockup/render2.py（PSD 不进仓库）；网站更新后需重新截图合成

   - App 截图和图标来自仓库 `inno897-tech/ruska-nordic-website` 的 `public/images/apps/`
   - RUSKA NORDIC、Innopublishing 截图为网站实拍（已裁掉滚动条）
5. **为什么选 INNO + 数字**：三条标题已加大；2015 / 3 / 4（最后一个右对齐）
6. **流程**：标题 "Four steps, about three weeks."；四步标题已加大；"One contact person…" 已删除；FAQ 四问
7. **关于**：标题加大；历程 2015 / 2016 / 2018 / Today；三条价值观；RUSKA NORDIC 外链；无人名
8. **联系（黑底）**：Have a project in mind? · 只有邮箱按钮（START A PROJECT 已删）· 服务列表 · 联系信息（右对齐）· 大 logo · © / Business ID / Privacy

### 对齐
- 全站统一容器 1440px；1440 宽时左边线 56px、右边线 1384px
- 右侧说明文字右对齐

## 待办

- [ ] 芬兰语文案请母语者校对
- [x] 在 Cloudflare 设置 info@innostudio.net 转发（11-23 完成）
- [ ] 可选：Gmail 设置以 info@innostudio.net 发信（Send mail as）
- [x] INNO 改版案例：已换成真实截图（11-26）
- [ ] Innopublishing：Stripe 在线销售上线后改案例文字
- [x] 正式上线（11-23 完成）
- [ ] 可选：Tailwind CDN 换成编译后的 CSS（加载更快）
- [ ] Wix：确认域名续费方式后，取消 Wix 网站套餐
- [x] 旧 Google 邮箱：确认没有扣费，MX/SPF 记录已删除
- [x] 浏览器标签图标（11-27，用户提供的黑底白色 N 字标：favicon.ico + img/favicon-32.png + img/apple-touch-icon.png）
- [x] 新增作品 Routa（11-26），现在 8 个作品
- [ ] Routa：MyFonts 上线后加购买按钮，状态改为已上线

## 下一步要做

- 网站和邮箱都已上线；剩下的见待办（Wix 套餐、芬兰语校对等）

## 下次继续

新对话开头可以说："继续 INNO Design Studio 网站，先读这个进度文件"，并附上本文件。
