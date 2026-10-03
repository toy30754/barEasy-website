# Bar Easy Taichung：第一階段 SEO 實作

內容整理日期：2026-10-04（Asia/Taipei）。正式網址：https://bareasytaichung.shop/。

本次以 `main` 的 `f31bb49026f3d391020d7d7ec9a869241179c097` 為基礎，在 `seo-content-v1` 修改，透過 Pull Request 供審閱；不直接更新 main。既有網站為純 HTML / CSS / JavaScript，沿用 `/blog/<slug>/index.html`，不新增 CMS 或另一套文章系統。

## 1. 30 個第一階段追蹤關鍵字

以下是搜尋意圖與頁面的規劃，不是經過工具查得的搜尋量、排名或競爭度預測。同義詞共用實用頁面，不為每個字詞建立相似頁面。

| 編號 | 分類 | 關鍵字 | 主要承接頁面 |
|---|---|---|---|
| 1 | 品牌 | Bar Easy Taichung | `/` |
| 2 | 品牌 | Bar Easy | `/` |
| 3 | 品牌 | Bar Easy 台中 | `/about/` |
| 4 | 品牌 | Bar Easy 西屯 | `/location/` |
| 5 | 品牌 | bareasytaichung | `/` |
| 6 | 在地 | 台中酒吧 | `/`、`/blog/xitun-bar-guide/` |
| 7 | 在地 | 西屯酒吧 | `/blog/xitun-bar-guide/` |
| 8 | 在地 | 台中西屯酒吧 | `/` |
| 9 | 在地 | 永福路酒吧 | `/location/` |
| 10 | 在地 | 統聯轉運站附近酒吧 | `/blog/ubus-night-guide/` |
| 11 | 飲品 | 台中調酒 | `/menu/`、`/blog/cocktail-guide/` |
| 12 | 飲品 | 西屯調酒 | `/menu/` |
| 13 | 飲品 | 台中雞尾酒 | `/blog/classic-cocktails/` |
| 14 | 飲品 | 西屯雞尾酒 | `/menu/#classics` |
| 15 | 飲品 | 台中威士忌酒吧 | `/blog/whisky-beginner/` |
| 16 | 飲品 | 台中特色酒吧 | `/about/` |
| 17 | 情境 | 台中約會酒吧 | `/blog/taichung-date-bar/` |
| 18 | 情境 | 西屯約會酒吧 | `/blog/taichung-date-bar/` |
| 19 | 情境 | 台中朋友聚會酒吧 | `/blog/taichung-friends-bar/` |
| 20 | 情境 | 台中聚會酒吧 | `/blog/taichung-friends-bar/` |
| 21 | 情境 | 台中聊天酒吧 | `/blog/taichung-friends-bar/` |
| 22 | 情境 | 台中深夜酒吧 | `/blog/taichung-late-night-bar/` |
| 23 | 情境 | 西屯深夜酒吧 | `/blog/taichung-late-night-bar/` |
| 24 | 資訊 | 第一次去酒吧怎麼點酒 | `/blog/first-time-bar/` |
| 25 | 資訊 | 調酒怎麼選 | `/blog/cocktail-guide/` |
| 26 | 資訊 | 調酒新手推薦 | `/blog/cocktail-guide/` |
| 27 | 資訊 | Highball 是什麼 | `/blog/highball-guide/` |
| 28 | 資訊 | 威士忌新手怎麼喝 | `/blog/whisky-beginner/` |
| 29 | 資訊 | 經典調酒介紹 | `/blog/classic-cocktails/` |
| 30 | 資訊 | 酒吧禮儀 | `/blog/first-time-bar/` |

需求清單共列出 31 個字詞。額外的「台中安靜酒吧」已在西屯選店及約會文章中以音量、活動、座位的詢問方法承接；不把「安靜」寫成 Bar Easy 的固定承諾，也不建立無法證實的安靜酒吧落地頁。上述 30 個是第一階段主追蹤項目。

## 2. 每個核心頁面的主題與搜尋意圖

| 路徑 | 主要關鍵字／主題 | 使用者要完成的事 |
|---|---|---|
| `/` | Bar Easy Taichung、台中西屯調酒酒吧 | 確認官方網站並前往酒單、交通、訂位 |
| `/menu/` | Bar Easy 酒單、台中調酒 | 看文字品項、既有價格和翻書圖片 |
| `/about/` | Bar Easy 台中、酒吧空間 | 認識品牌與空間，判斷聚會是否合適 |
| `/location/` | Bar Easy 西屯、永福路酒吧 | 找完整地址、營業時間與導航 |
| `/reservation/` | Bar Easy 訂位 | 電話／IG 聯絡、確認人數與需求 |
| `/faq/` | Bar Easy 常見問題 | 查消費、飲食、活動與訂位問題 |
| `/blog/` | 酒吧指南、調酒入門 | 依發布日期探索 10 篇文章 |
| `/privacy/` | Bar Easy 隱私權政策 | 查閱既有網站資料處理說明 |
| `/terms/` | Bar Easy 使用條款 | 查閱既有網站與消費說明 |
| `/404.html` | 無搜尋排名目標 | 指引迷路訪客返回核心頁；維持 noindex，不列入 sitemap |

## 3. 10 篇文章與主搜尋意圖

以更新原有 5 篇、新增 5 篇完成本批 10 個主題。既有網址不搬移、不重複建頁。

| 狀態 | 路徑 | 文章標題 | 主搜尋意圖 |
|---|---|---|---|
| 更新 | `/blog/xitun-bar-guide/` | 西屯酒吧怎麼選？台中西屯小酌、調酒與聚會指南 | 按目的、菜單、音量、預算及交通比較西屯酒吧 |
| 更新 | `/blog/taichung-date-bar/` | 台中約會酒吧怎麼選？第一次約會到紀念日的小酌指南 | 規劃兩人聊天、餐點、紀念日需求與返程 |
| 更新 | `/blog/first-time-bar/` | 第一次去酒吧怎麼點酒？調酒新手完整指南 | 學會點酒溝通、消費詢問及基本禮儀 |
| 更新 | `/blog/cocktail-guide/` | 調酒新手怎麼選？從酸甜、清爽到酒感開始 | 用風味、氣泡與酒感描述個人偏好 |
| 更新 | `/blog/whisky-beginner/` | 威士忌新手怎麼喝？純飲、加冰、Highball 怎麼選 | 比較喝法，理解單杯／單瓶與詢問方式 |
| 新增 | `/blog/highball-guide/` | Highball 是什麼？新手也看得懂的 Highball 入門 | 認識組成、喝法及點酒時應確認的資訊 |
| 新增 | `/blog/classic-cocktails/` | 經典調酒有哪些？常見 Cocktail 風味一次看懂 | 依基本組成辨識五款經典，避免誤認店內配方 |
| 新增 | `/blog/taichung-friends-bar/` | 台中朋友聚會酒吧怎麼選？聊天、小酌與多人聚會指南 | 確認同桌、飲食、分帳、晚到及訂位需求 |
| 新增 | `/blog/taichung-late-night-bar/` | 台中深夜想小酌去哪裡？選酒吧前先看這些 | 看懂跨日營業，確認最後點餐與回程 |
| 新增 | `/blog/ubus-night-guide/` | 統聯轉運站附近晚上去哪裡？西屯夜晚小酌交通指南 | 確認實際站名、查到店路線與跨日車票 |

原有 5 篇保留 repository 的發布日 2026-09-26，更新日為 2026-10-04。新增 5 篇以本次內容建立日 2026-10-04 作發布日期；**若合併／發布不在同一天，TODO：上線前將這 5 篇及文章卡片、JSON-LD、OG 的發布日同步改成實際日期。** 列表以原發布日新到舊，同日文章採固定次序；不是把舊文章更新日當成新發布日。

## 4. 內部連結關係

所有頁面沿用 Header、Footer 和手機快捷列。下表記錄正文或文章推薦中的連結，並非只依靠共用導覽。

| 起點 | 相關目的地 |
|---|---|
| 首頁 | Menu、About、Location、Reservation、FAQ、Blog、第一次點酒、西屯選店、約會指南 |
| Menu | 調酒風味、經典調酒、威士忌入門、訂位／消費須知 |
| About | 約會、朋友聚會、Menu、Reservation |
| Location | 統聯交通、Reservation；交通文章再連回 Location |
| Reservation | 朋友聚會、約會、FAQ |
| Blog | 全部 10 篇文章，卡片含分類、標題、摘要、發布日與閱讀連結 |
| 西屯選店 | 調酒風味、第一次點酒、約會、朋友聚會、About、Menu、Location、Reservation |
| 約會 | 調酒風味、西屯選店、第一次點酒、About、Menu、Location、Reservation |
| 第一次點酒 | 調酒風味、經典調酒、Menu、FAQ、Reservation |
| 調酒風味 | Highball、經典調酒、第一次點酒、Menu 特色調酒分類 |
| 威士忌 | Highball、調酒風味、Menu 威士忌分類、Reservation 消費須知 |
| Highball | 威士忌、第一次點酒、經典調酒、Menu、Reservation |
| 經典調酒 | 調酒風味、第一次點酒、Highball、Menu 經典分類 |
| 朋友聚會 | 第一次點酒、西屯選店、約會、About、Menu、Location、Reservation |
| 深夜小酌 | 統聯交通、西屯選店、調酒風味、Location、Reservation |
| 統聯交通 | 深夜小酌、西屯選店、首頁、Menu、Location、Reservation |

Anchor 採明確目的文字，不使用整頁重複的關鍵字清單。圖片 alt 按照片實際內容撰寫，不將吧台照片說成不存在的 Highball 成品照片。所有新增內容為 HTML 直接可讀，不需要 JS 才載入文章。

## 5. 已完成

- 先讀取 15 個既有 HTML、全份 CSS／JS、5 篇文章、目錄及全部 31 個 assets 檔案；檢查圖片格式、尺寸並查看圖片內容。
- 保留深綠／金色設計、字體設定、核心 H1、Header／Footer／Logo、手機導覽、FAQ、訂位複製與翻書機制。所有 31 個既有 assets 檔案位元組不變，沒有替換圖片或增加外部字型請求。
- 首頁 H1 已符合 `Bar Easy Taichung｜台中西屯調酒酒吧`，保留原有分行設計。微調 title、description、OG／Twitter 與品牌介紹；首頁原 3 張文章卡更新為主要入門指南，未重建版面。
- 核心頁獨立 title／description；全部可索引頁維持唯一 canonical、OG URL，統一 HTTPS／non-www。
- 10 篇文章具單一 H1、回答問題的開頭、H2／H3、相關內鏈、適當表格／FAQ，商業資訊集中在一個短段落。沿用原文章閱讀模板及目錄。
- Blog 卡片補發布日與更新日，按原發布日期降冪排列，卡片標題改為 H2，樣式維持原卡片尺寸與字體規則。
- 完善既有 `BarOrPub`（LocalBusiness 子類型）：加入真實 Logo 的 `ImageObject`，統一電話格式；保留現有地址、時間、image、sameAs、hasMap、menu、訂位及低消。沒有新增評分、座標、獲獎或活動價格。
- 10 篇 `BlogPosting` 與可見標題、分類、日期、圖片一致；文章作者為 Bar Easy Taichung 品牌組織，未杜撰個人作者或專業經歷。
- 沿用及更新 `BreadcrumbList`；Blog 加 `CollectionPage`、`ItemList`，與可見十篇列表一致。保留既有 `WebSite`、Menu 及 FAQPage。
- `sitemap.xml` 從 14 個網址擴充至 19 個，排除 404；沿用沒有 `lastmod` 的方式，避免不精確的更新日期。
- `robots.txt` 已正確允許抓取並指向 HTTPS sitemap，內容原本合格，因此保留原檔。`_headers` 的 404 noindex 與原始規則圖片 noindex 保持原樣。
- 保留既有 JPG／WebP fallback、lazy／eager loading 與本地圖片。補翻書圖片原始尺寸、Logo 尺寸、翻頁狀態的輔助工具提示。
- 修正原本 `#original-menu` 沒有目標的錨點；修正內頁 Header 首頁及 Footer Logo 的本機相對路徑。HTTPS 預覽繼續用原來 JS 的乾淨網址行為。
- 修正 320px 窄手機 Header 溢出；只微調小尺寸 Logo、文字與間距，保留所有按鈕。
- 新增 `scripts/check_seo.py`：可重複執行的唯讀靜態驗證，使用 Python 3 標準函式庫，不增加網站執行依賴。檢查結果與限制見 `SEO-VALIDATION.md`。

## 6. 商業資料來源與人工確認 TODO

店名、地址、電話、開店時間、固定活動方向、低消及菜單都沿用基準 repository；本次未向店家詢問或將舊資料假裝成當日已覆核。

| 資料 | 本次依據 | 待確認／限制 |
|---|---|---|
| 名稱／地址／電話／時間 | `index.html`、`location/index.html`、現有 Footer 與 JSON-LD | TODO：上線前店家覆核有無異動、特殊假日公告 |
| 價格、品項、消費規則 | 原 `menu/index.html`、`reservation/index.html`、`assets/menu/*.jpg`、`assets/originals/*.png` | 沒有修改品項價格；TODO：店家覆核現行版本、單杯容量、最後點餐 |
| 活動 | 現有網站與官方 IG 連結 | 沿用活動名稱；TODO：資格、優惠、演出時間及當週是否舉行 |
| Highball | 一般知識有官方來源；原店家酒單未列固定 Highball | TODO：是否供應、可用基酒、價格；文章明確請先詢問，不加入 Menu Offer |
| Whiskey Sour | IBA 一般配方 | 未列為店內固定供應，不由其他酸酒名稱推定供應 |
| 交通 | 統聯官方中港站資料：臺灣大道四段637號 | TODO：實際常用下車站、步行路線／時間、路口情況、班次 |
| 停車／接駁 | 沒有可驗證的專屬資訊 | TODO：停車場名稱、收費、開放時間／合作方案；不宣稱免費或保證車位 |
| 多人、安靜、慶生 | 原 About／Reservation；以詢問清單表達需求 | TODO：座位容量、包場條件、音量及可協助事項；不從照片推算 |

TODO 同時保留在 Highball、聚會、深夜、交通文章及 Location 的 HTML 註解，供維護者補資料；一般訪客看到的是有用的確認方式，不是開發工作清單。

一般飲品知識來源（文章內附對應連結；僅自行整理基本概念，非照抄配方全文）：

- [Suntory Highball](https://house.suntory.com/cocktails/whisky-highball)
- [Suntory 純飲](https://house.suntory.com/cocktails/serves/whisky-neat)、[加冰](https://house.suntory.com/cocktails/serves/whisky-on-the-rocks)
- IBA：[Old Fashioned](https://iba-world.com/iba-cocktail/old-fashioned/)、[Whiskey Sour](https://iba-world.com/iba-cocktail/whiskey-sour/)、[Paloma](https://iba-world.com/iba-cocktail/paloma/)、[Americano](https://iba-world.com/iba-cocktail/americano/)、[Espresso Martini](https://iba-world.com/iba-cocktail/espresso-martini/)
- [統聯中港轉運站官方資料](https://www.ubus.com.tw/Booking/Station/4071/)、[統聯訂票](https://booking.ubus.com.tw/)

技術規劃參考 Google Search Central 的 [LocalBusiness](https://developers.google.com/search/docs/appearance/structured-data/local-business) 與 [Article](https://developers.google.com/search/docs/appearance/structured-data/article) 文件。Schema 與 sitemap 有助於表達內容及提供網址，不代表保證收錄、富搜尋結果或第一名。

## 7. 尚未完成的上線項目

1. **PR 尚待審閱／合併。** 本次不把修改直接推到 main，也不宣稱正式網站已更新。合併後是否自動部署取決於 GitHub 與代管平台設定。
2. **正式主機可訪問性與 HTTP → HTTPS。** 2026-10-04 檢查環境對 apex HTTP／HTTPS 得到 403；不能據此判定一般訪客或 Googlebot 也被阻擋。需要用 Cloudflare／代管平台回應紀錄與 Search Console URL 檢查確認，不以 JS 轉址代替伺服器轉址。
3. **www 導向。** 本次觀察到 www 的 HTTP 及 HTTPS 均先 301 至 HTTPS non-www，終點仍為上述 403。TODO：正式上線後確認終點 200、路徑及查詢參數保留。
4. **真正的 HTTP 404。** repository 有 404 頁與 noindex，但正式不存在路徑此次回傳 403，尚未確認實際 404 狀態；以正式代管平台測試為準。
5. **GSC 與 Google 商家。** 未登入或修改帳號，尚未提交 sitemap、要求建立索引或同步 Google 商家資訊。
6. **線上 Rich Results Test、Schema Validator、PageSpeed／CrUX。** 本次做本地結構與瀏覽器驗證，尚未完成部署網址的官方工具檢測與真實使用者 Core Web Vitals。
7. **上線日期與現行資料。** 如合併日期不同，先同步新增文章日期，再由店家確認前述商業 TODO。
8. **Cloudflare Workers 建置失敗。** GitHub 的 `Workers Builds: bareasy-website2` 在基準 main 提交 `f31bb49` 與本次網站程式提交 `961f3a5` 都回報 failure，並非首次在本次修改後出現。GitHub 回傳沒有錯誤文字或 annotations，只提供 Cloudflare 日誌連結；原因尚未確認，不臆測或改寫部署設定。TODO：查看 Cloudflare build log，確認建置／部署命令、入口與靜態資源設定。詳見 `SEO-VALIDATION.md`。

## 8. 第二階段建議

- 先確認唯一正式網域、可抓取的 200／301／404 回應，再提交 sitemap；不急著增加第二個網站。
- 將 Google 商家與 IG 的官方網站連結、名稱、地址、電話、時間保持一致，配合店家真實更新。
- 在 Search Console 分開觀察品牌字與非品牌字的曝光、點擊、查詢及收錄；有資料後再調整標題和內容，不按假設搜尋量堆文。
- 由店家覆核酒單與政策；新增可驗證的原創照片、調酒師口味說明、交通實測與活動資料。
- 分析實際使用者最常卡住的資訊，補強對應現有頁面；避免為近義字製作大量類似文章。
- 若導入流量分析、訂位表單或其他追蹤，再依實際行為更新隱私權政策；本階段未增加追蹤或表單。
