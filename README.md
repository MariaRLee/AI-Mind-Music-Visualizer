# AI-Mind Music Visualizer

本機隱私版腦波音樂視覺化網頁。

## 主要功能

- 從使用者裝置選擇 MP3、WAV、M4A、AAC 或 OGG
- 音樂只在瀏覽器記憶體內播放與分析
- 不上傳、不儲存、不使用 Cookie、不使用分析追蹤
- 三種視覺模式：星光流動、療癒波浪、綻放光影
- 13 級情緒配色（-6 至 +6）
- 中英文介面
- 手機與電腦響應式版面
- 全螢幕模式
- 適合部署於 GitHub Pages

## 檔案

- `index.html`
- `style.css`
- `visualizer.js`

## 本機測試

最簡單方式是直接雙擊 `index.html`。  
若瀏覽器限制本機媒體功能，可在資料夾內啟動簡易伺服器：

```bash
python -m http.server 8000
```

然後開啟：

```text
http://localhost:8000
```

## GitHub Pages 部署

1. 建立新的 Public repository，例如 `AI-Mind-Music-Visualizer`
2. 上傳 `index.html`、`style.css`、`visualizer.js`
3. 進入 **Settings → Pages**
4. Source 選擇 **Deploy from a branch**
5. Branch 選擇 `main`，資料夾選擇 `/ (root)`
6. 儲存後等待 GitHub Pages 網址出現

## 隱私設計

- 不含後端程式與資料庫
- 不含 Google Analytics、GoatCounter 或其他追蹤服務
- CSP 設為 `connect-src 'none'`，阻止網頁程式向外建立資料連線
- 使用者選取的音樂建立為暫時 `blob:` URL
- 切換檔案或離開頁面時呼叫 `URL.revokeObjectURL()`
- 不使用 `localStorage`、`sessionStorage` 或 `IndexedDB`
- 不應將私人、客戶或未公開的正式腦波音樂放入 Public repository

## 重要說明

此版本屬於「腦波音樂驅動的視覺化」，畫面依音樂音量、頻率與波形變化。  
若未來加入 Attention、Relaxation、Emotion、Total Energy 等數值，才屬於「腦波數據驅動視覺化」。

© AI-Mind Care / Hylove Business Inc.
