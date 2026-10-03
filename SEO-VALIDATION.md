# SEO content v1：驗證紀錄

檢查日期：2026-10-04（Asia/Taipei）。基準：`f31bb49026f3d391020d7d7ec9a869241179c097`。

## 檢查範圍與結果

| 檢查 | 結果 |
|---|---|
| 20 個 HTML 頁面 | 本地 HTTP 預覽皆可載入，包含 19 個可索引頁與 404 內容頁 |
| 1,695 個內部參照 | 檔案、圖片、CSS、JS、乾淨網址及錨點皆有目標 |
| Canonical／OG | 19 個可索引頁各自指向 HTTPS non-www 的對應路徑；沒有重複 canonical |
| Title／description | 可索引頁各自獨立；OG 與頁面資料一致 |
| HTML 標題 | 每頁一個 H1，無 H1→H3 等跳級、重複 ID |
| Sitemap | 19 個網址與可索引 canonical 集合相同；包括 10 篇文章，排除 404 |
| Robots | 原檔已允許抓取，並指向 HTTPS sitemap；本次保留合格設定 |
| JSON-LD | 所有區塊可解析；檢查 BarOrPub 欄位、BlogPosting 唯一 ID、可見日期與分類、ItemList 順序 |
| 文章列表 | 10 張卡片，按發布日新到舊；舊 5 篇發布日不變，另顯示更新日 |
| 圖片 | 31 個 assets 檔案內容完全保留；原始點陣圖可解碼、JPG／WebP 配對可用；瀏覽器沒有失敗圖片 |
| 圖片尺寸／alt | 所有 HTML 圖片具有 width／height／alt；裝飾性 Footer Logo 保留空 alt 並由連結提供名稱 |
| CSS／JavaScript | 瀏覽器資源載入成功，20 頁未發生 JavaScript pageerror；`node --check script.js` 通過 |
| 手機／桌機 | 390px、1440px 各檢查全部 20 頁；320px 另檢查首頁、Menu、文章 |
| 其他 RWD 斷點 | 320、375、768、1024px 各檢查首頁、Menu、Blog 列表、Highball 文章，沒有頁面橫向溢出 |
| 基本無障礙 | 維持 skip link、具名稱的按鈕／導覽、鍵盤焦點；表格 th 有 scope，補翻頁狀態 role=status／aria-live |
| CLS | 本地 Chromium 初始載入觀測最大值為 0；不是正式主機或真實使用者 Core Web Vitals 結論 |
| Git 格式 | `git diff --check` 通過 |

靜態驗證腳本：`scripts/check_seo.py`。它只讀取檔案，採 Python 3 標準函式庫，不會產生檔案或修改網站。它不是 Google Rich Results Test 或完整 HTML／無障礙規範認證的替代品。

## 互動與視覺檢查

使用本地 HTTP server 與 Chromium 153.0.8010.0，搭配本地繁中字型顯示原 CSS 字體設定；測試工具及字型不放入網站，也不新增對外字型請求。

- 手機翻書：封面 → `PAGE 1 / 9` → `PAGE 2 / 9` → 回到第一頁，通過。
- 桌機翻書：封面 → `PAGE 1 / 9` → `PAGE 2 — 3` → 回到第一頁，通過。
- 手機選單開啟與 Escape 關閉，通過。
- FAQ 開合，通過。
- 訂位訊息複製：測試環境允許剪貼簿權限後，確認實際複製的文字含 Bar Easy，手機／桌機均通過；原有無權限選取文字的 fallback 程式保留。
- 關閉 JavaScript 後，文章 Header Logo 仍能返回首頁，Menu 仍可讀取原有 110 個文字品項。
- 比較基準首頁與 Menu 的畫面、檢視手機／桌機首頁、Blog、文章與開啟菜單的截圖；保留原配色、版型與互動風格。
- 首頁、Menu、About、Location、Reservation 的核心 H1、Header 文字與 Footer 文字與基準相同。Header／Footer 的相對路徑與 Logo 圖片尺寸做必要修正。
- 原 CSS 全文保留作為新檔前綴，只附加文章卡片、閱讀及 320px 修正規則；JS 只新增動態菜單圖片 width／height，未重寫翻書邏輯。
- 原酒單 110 個文字品項及價格保持相同，Menu Schema 未更換價格。所有既有 assets 逐檔比較相同。

本地 404 頁內容與返回連結可用；正式主機在任意不存在 URL 是否回傳真正 404，另見下段。

## 正式網域觀察與未完成項目

| 要求網址 | 本次環境觀察 | 能夠確認的範圍 |
|---|---|---|
| `https://bareasytaichung.shop/` | 403 | 無法驗證正式首頁 200 或新內容；不能推論所有訪客／Googlebot 都收到相同結果 |
| `http://bareasytaichung.shop/` | 403，未觀察到導向 | HTTP → HTTPS 仍待主機端確認 |
| `https://www.bareasytaichung.shop/` | 301 至 HTTPS non-www，然後 403 | 觀察到 www 合併方向；終點成功狀態未驗證 |
| `http://www.bareasytaichung.shop/` | 301 至 HTTPS non-www，然後 403 | 同上 |
| `https://bareasytaichung.shop/seo-audit-missing-page/` | 403 | 真正的 HTTP 404 仍待正式主機檢查 |

未嘗試繞過正式站的存取限制，亦未更動 Cloudflare 設定。請於合併部署後確認 apex 的 200、HTTP 至 HTTPS 的伺服器導向、www 導向的路徑保留，以及不存在路徑的 404。

### GitHub／Cloudflare 建置檢查

PR 建立後，GitHub 回報 `Workers Builds: bareasy-website2` 已完成但結果為 failure。進一步檢查可確認：

- 基準 main 提交 `f31bb49026f3d391020d7d7ec9a869241179c097` 的同名建置也已失敗（build `53ca0fb2-6e7f-4e81-85c4-0deed04ba80f`）。
- 本次網站程式提交 `961f3a5a86d184300ace0ef9f756c06e416263a0` 亦失敗（build `d9c21034-56a8-4847-8841-ca881fb58c3d`）。
- GitHub check output 沒有錯誤文字，annotations 數量為 0，只提供代管平台連結。因此無法確定失敗原因，也不能把本地測試成功寫成 CI／部署成功。
- 詳細日誌需至 [Cloudflare 本次建置紀錄](https://dash.cloudflare.com/af99e3fa77d6af8ee3d1bdcf6cab270d/workers/services/view/bareasy-website2/production/builds/d9c21034-56a8-4847-8841-ca881fb58c3d) 查看。未取得 Cloudflare 專案設定及日誌前，不猜測入口檔案或修改部署命令。

此文件補充提交只更新驗證報告；上述結果指向已明確列出的程式提交。後續建置狀態以 GitHub PR Checks 與 Cloudflare 實際日誌為準。此問題尚未完成處理。

尚未進行 Google Search Console sitemap 提交／要求索引、Google 商家同步、線上 Rich Results Test、Schema Validator、PageSpeed 或 CrUX 分析。本次 PR 不等同部署完成，也不保證任何搜尋排名。店家資料及發布日期待確認事項詳見 `SEO-PLAN.md`。

## 本次檔案範圍

新增頁面：

- `blog/highball-guide/index.html`
- `blog/classic-cocktails/index.html`
- `blog/taichung-friends-bar/index.html`
- `blog/taichung-late-night-bar/index.html`
- `blog/ubus-night-guide/index.html`

更新原文章及列表：

- `blog/index.html`
- `blog/first-time-bar/index.html`
- `blog/cocktail-guide/index.html`
- `blog/whisky-beginner/index.html`
- `blog/taichung-date-bar/index.html`
- `blog/xitun-bar-guide/index.html`

更新核心 HTML 與共用 SEO：

- `index.html`
- `menu/index.html`
- `about/index.html`
- `location/index.html`
- `reservation/index.html`
- `faq/index.html`
- `privacy/index.html`
- `terms/index.html`
- `404.html`

樣式、腳本、索引與文件：

- `styles.css`
- `script.js`
- `sitemap.xml`
- `scripts/check_seo.py`（新增）
- `SEO-PLAN.md`（新增）
- `SEO-VALIDATION.md`（新增）

`robots.txt`、`_headers`、所有 assets 已檢查，原有合格設定／資源保留，因此不產生這些檔案的 diff。
