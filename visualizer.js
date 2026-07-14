"use strict";

const MAX_FILE_SIZE = 100 * 1024 * 1024;

const i18n = {
  zh: {
    title: "腦波音樂視覺化",
    subtitle: "讓腦波音樂化為星光、療癒波浪與綻放光影。",
    privacyTitle: "本機隱私模式",
    privacyText: "音樂只在您的瀏覽器中播放與分析，不會上傳、儲存或提供給第三方。",
    chooseMusic: "選擇本機腦波音樂",
    noFile: "尚未選擇音樂",
    fileHelp: "支援 MP3、WAV、M4A、AAC、OGG；建議小於 100 MB。",
    visualMode: "視覺模式",
    stars: "星光流動",
    waves: "療癒波浪",
    bloom: "綻放光影",
    emotion: "情緒值",
    sensitivity: "動畫靈敏度",
    sensitivityHelp: "音樂較柔和時可提高靈敏度。",
    play: "播放",
    pause: "暫停",
    restart: "重新開始",
    fullscreen: "全螢幕",
    exitFullscreen: "離開全螢幕",
    visualizer: "Music Visualizer",
    stageHint: "選擇音樂後，畫面將隨聲音即時變化",
    footer: "Local processing · No upload · No storage · No tracking",
    statusReady: "請選擇您有權使用的音樂檔案。",
    statusLoaded: "音樂已在本機載入，沒有上傳。",
    statusPlaying: "正在本機播放與分析。",
    statusPaused: "已暫停；音樂仍只保留在本機。",
    statusEnded: "播放完成。",
    errorType: "無法辨識此音訊格式，請改用 MP3、WAV、M4A、AAC 或 OGG。",
    errorSize: "檔案超過 100 MB，請選擇較小的音樂檔案。",
    errorPlayback: "瀏覽器無法播放此音訊。建議改用 MP3 或 WAV。",
    errorAudio: "無法啟動音訊分析，請重新整理頁面後再試。"
  },
  en: {
    title: "Brainwave Music Visualizer",
    subtitle: "Transform brainwave music into starlight, healing waves, and blooming light.",
    privacyTitle: "Local Privacy Mode",
    privacyText: "Your music is played and analyzed only in your browser. It is not uploaded, stored, or shared.",
    chooseMusic: "Choose Local Brainwave Music",
    noFile: "No music selected",
    fileHelp: "Supports MP3, WAV, M4A, AAC, and OGG; under 100 MB recommended.",
    visualMode: "Visual Mode",
    stars: "Star Flow",
    waves: "Healing Waves",
    bloom: "Blooming Light",
    emotion: "Emotion",
    sensitivity: "Visual Sensitivity",
    sensitivityHelp: "Increase sensitivity for softer music.",
    play: "Play",
    pause: "Pause",
    restart: "Restart",
    fullscreen: "Full Screen",
    exitFullscreen: "Exit Full Screen",
    visualizer: "Music Visualizer",
    stageHint: "Choose music and the visuals will respond in real time",
    footer: "Local processing · No upload · No storage · No tracking",
    statusReady: "Choose a music file that you have permission to use.",
    statusLoaded: "Music loaded locally. Nothing was uploaded.",
    statusPlaying: "Playing and analyzing locally.",
    statusPaused: "Paused. The music remains only on this device.",
    statusEnded: "Playback finished.",
    errorType: "This audio format is not recognized. Try MP3, WAV, M4A, AAC, or OGG.",
    errorSize: "This file is larger than 100 MB. Please choose a smaller audio file.",
    errorPlayback: "Your browser cannot play this audio. MP3 or WAV is recommended.",
    errorAudio: "Audio analysis could not start. Refresh the page and try again."
  }
};

const emotions = [
  { level: -6, zh: "極度不喜歡・雪滴花", en: "Extreme Dislike · Snowdrop", colors: ["#1d2432", "#56647c", "#c8d3df"] },
  { level: -5, zh: "非常不喜歡・勿忘我", en: "Strong Dislike · Forget-me-not", colors: ["#25335b", "#6675ad", "#a9c8ff"] },
  { level: -4, zh: "很不喜歡・洋甘菊", en: "Dislike · Chamomile", colors: ["#3a3b6f", "#837ab8", "#d9d0ff"] },
  { level: -3, zh: "不喜歡・薰衣草", en: "Mild Dislike · Lavender", colors: ["#333b72", "#7967b6", "#c9b6ff"] },
  { level: -2, zh: "有點不喜歡・蒲公英", en: "Slight Dislike · Dandelion", colors: ["#2d5874", "#64a2b7", "#c1edf2"] },
  { level: -1, zh: "略有保留・滿天星", en: "Reserved · Baby's Breath", colors: ["#285f59", "#72b6a4", "#d2f0e5"] },
  { level: 0, zh: "平衡・白色桔梗", en: "Balanced · White Lisianthus", colors: ["#36485e", "#8eabc1", "#f5f5ef"] },
  { level: 1, zh: "微微喜歡・小雛菊", en: "Slightly Positive · Daisy", colors: ["#526840", "#a9c770", "#f2f0b6"] },
  { level: 2, zh: "有點喜歡・粉紅康乃馨", en: "Positive · Pink Carnation", colors: ["#7c4b64", "#d482a6", "#ffd0df"] },
  { level: 3, zh: "喜歡・鬱金香", en: "Like · Tulip", colors: ["#755047", "#d78369", "#ffc39f"] },
  { level: 4, zh: "很喜歡・向日葵", en: "Strong Like · Sunflower", colors: ["#795b29", "#d9a62e", "#ffe484"] },
  { level: 5, zh: "非常喜歡・牡丹", en: "Very Strong Like · Peony", colors: ["#7f3e62", "#d35f95", "#ffc1dc"] },
  { level: 6, zh: "極度喜歡・百合", en: "Extreme Like · Lily", colors: ["#705c45", "#dfc392", "#fff7cf"] }
];

const elements = {
  audio: document.getElementById("audioPlayer"),
  canvas: document.getElementById("visualizerCanvas"),
  stage: document.getElementById("visualStage"),
  fileInput: document.getElementById("musicFile"),
  fileName: document.getElementById("fileName"),
  playButton: document.getElementById("playButton"),
  restartButton: document.getElementById("restartButton"),
  fullscreenButton: document.getElementById("fullscreenButton"),
  languageButton: document.getElementById("languageButton"),
  visualMode: document.getElementById("visualMode"),
  emotionRange: document.getElementById("emotionRange"),
  emotionValue: document.getElementById("emotionValue"),
  emotionName: document.getElementById("emotionName"),
  sensitivityRange: document.getElementById("sensitivityRange"),
  sensitivityValue: document.getElementById("sensitivityValue"),
  seekRange: document.getElementById("seekRange"),
  currentTime: document.getElementById("currentTime"),
  duration: document.getElementById("duration"),
  statusMessage: document.getElementById("statusMessage")
};

const ctx = elements.canvas.getContext("2d", { alpha: false });

let language = "zh";
let objectUrl = null;
let audioContext = null;
let analyser = null;
let sourceNode = null;
let frequencyData = null;
let timeData = null;
let animationId = null;
let lastFrameTime = performance.now();
let stars = [];
let motes = [];
let currentPalette = emotions[6].colors;
let hasFile = false;

function text(key) {
  return i18n[language][key] ?? key;
}

function setStatus(key, isError = false) {
  elements.statusMessage.textContent = text(key);
  elements.statusMessage.classList.toggle("error", isError);
}

function translatePage() {
  document.documentElement.lang = language === "zh" ? "zh-Hant" : "en";
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    const key = node.dataset.i18n;
    if (i18n[language][key]) node.textContent = i18n[language][key];
  });
  elements.languageButton.textContent = language === "zh" ? "EN" : "中";
  elements.playButton.querySelector("[data-i18n]").textContent =
    elements.audio.paused ? text("play") : text("pause");
  elements.fullscreenButton.querySelector("[data-i18n]").textContent =
    document.fullscreenElement ? text("exitFullscreen") : text("fullscreen");
  updateEmotion();
  if (!hasFile) {
    elements.fileName.textContent = text("noFile");
    setStatus("statusReady");
  }
}

function updateEmotion() {
  const level = Number(elements.emotionRange.value);
  const emotion = emotions.find((item) => item.level === level) ?? emotions[6];
  currentPalette = emotion.colors;
  elements.emotionValue.value = String(level);
  elements.emotionName.textContent = language === "zh" ? emotion.zh : emotion.en;
  document.documentElement.style.setProperty("--accent", emotion.colors[2]);
  document.documentElement.style.setProperty("--accent-2", emotion.colors[1]);
}

function updateSensitivity() {
  elements.sensitivityValue.value = `${elements.sensitivityRange.value}%`;
}

function isSupportedFile(file) {
  const allowedExtensions = /\.(mp3|wav|m4a|aac|ogg)$/i;
  return Boolean(file.type.startsWith("audio/") || allowedExtensions.test(file.name));
}

function releaseObjectUrl() {
  if (objectUrl) {
    URL.revokeObjectURL(objectUrl);
    objectUrl = null;
  }
}

function resetPlayerUi() {
  elements.seekRange.value = "0";
  elements.currentTime.textContent = "0:00";
  elements.duration.textContent = "0:00";
  elements.playButton.querySelector("[data-i18n]").textContent = text("play");
  elements.stage.classList.remove("is-playing");
}

function handleFile(file) {
  if (!file) return;

  if (!isSupportedFile(file)) {
    setStatus("errorType", true);
    elements.fileInput.value = "";
    return;
  }

  if (file.size > MAX_FILE_SIZE) {
    setStatus("errorSize", true);
    elements.fileInput.value = "";
    return;
  }

  elements.audio.pause();
  releaseObjectUrl();
  objectUrl = URL.createObjectURL(file);
  elements.audio.src = objectUrl;
  elements.audio.load();

  hasFile = true;
  elements.fileName.textContent = file.name;
  elements.playButton.disabled = false;
  elements.restartButton.disabled = false;
  elements.seekRange.disabled = false;
  resetPlayerUi();
  setStatus("statusLoaded");
}

async function ensureAudioGraph() {
  if (audioContext) {
    if (audioContext.state === "suspended") await audioContext.resume();
    return;
  }

  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) throw new Error("AudioContext unsupported");

  audioContext = new AudioContextClass();
  analyser = audioContext.createAnalyser();
  analyser.fftSize = 2048;
  analyser.smoothingTimeConstant = 0.82;

  sourceNode = audioContext.createMediaElementSource(elements.audio);
  sourceNode.connect(analyser);
  analyser.connect(audioContext.destination);

  frequencyData = new Uint8Array(analyser.frequencyBinCount);
  timeData = new Uint8Array(analyser.fftSize);
}

async function togglePlay() {
  if (!hasFile) return;

  try {
    await ensureAudioGraph();

    if (elements.audio.paused) {
      await elements.audio.play();
    } else {
      elements.audio.pause();
    }
  } catch (error) {
    console.error(error);
    setStatus(error.name === "NotSupportedError" ? "errorPlayback" : "errorAudio", true);
  }
}

function restartAudio() {
  if (!hasFile) return;
  elements.audio.currentTime = 0;
  if (!elements.audio.paused) {
    elements.audio.play().catch(() => setStatus("errorPlayback", true));
  }
}

function formatTime(seconds) {
  if (!Number.isFinite(seconds)) return "0:00";
  const minutes = Math.floor(seconds / 60);
  const remaining = Math.floor(seconds % 60);
  return `${minutes}:${remaining.toString().padStart(2, "0")}`;
}

function updateProgress() {
  const duration = elements.audio.duration || 0;
  const current = elements.audio.currentTime || 0;
  elements.currentTime.textContent = formatTime(current);
  elements.duration.textContent = formatTime(duration);
  elements.seekRange.value = duration ? String(Math.round((current / duration) * 1000)) : "0";
}

function seekAudio() {
  if (!elements.audio.duration) return;
  elements.audio.currentTime =
    (Number(elements.seekRange.value) / 1000) * elements.audio.duration;
}

async function toggleFullscreen() {
  try {
    if (!document.fullscreenElement) {
      await elements.stage.requestFullscreen();
    } else {
      await document.exitFullscreen();
    }
  } catch (error) {
    console.warn("Fullscreen unavailable", error);
  }
}

function resizeCanvas() {
  const rect = elements.canvas.getBoundingClientRect();
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const width = Math.max(1, Math.floor(rect.width * dpr));
  const height = Math.max(1, Math.floor(rect.height * dpr));

  if (elements.canvas.width !== width || elements.canvas.height !== height) {
    elements.canvas.width = width;
    elements.canvas.height = height;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    createStars(rect.width, rect.height);
  }
}

function hexToRgba(hex, alpha) {
  const value = hex.replace("#", "");
  const number = Number.parseInt(value, 16);
  const r = (number >> 16) & 255;
  const g = (number >> 8) & 255;
  const b = number & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function getAudioMetrics() {
  const sensitivity = Number(elements.sensitivityRange.value) / 100;

  if (!analyser || !frequencyData || !timeData || elements.audio.paused) {
    const t = performance.now() * 0.001;
    return {
      low: (0.14 + Math.sin(t * 0.9) * 0.025) * sensitivity,
      mid: (0.10 + Math.sin(t * 1.3 + 1) * 0.022) * sensitivity,
      high: (0.07 + Math.sin(t * 1.8 + 2) * 0.018) * sensitivity,
      energy: (0.11 + Math.sin(t * 0.7) * 0.02) * sensitivity,
      waveform: null
    };
  }

  analyser.getByteFrequencyData(frequencyData);
  analyser.getByteTimeDomainData(timeData);

  const nyquist = audioContext.sampleRate / 2;
  const hzPerBin = nyquist / frequencyData.length;

  const averageRange = (startHz, endHz) => {
    const start = Math.max(0, Math.floor(startHz / hzPerBin));
    const end = Math.min(frequencyData.length, Math.ceil(endHz / hzPerBin));
    let sum = 0;
    for (let i = start; i < end; i += 1) sum += frequencyData[i];
    return end > start ? sum / ((end - start) * 255) : 0;
  };

  const low = averageRange(20, 250) * sensitivity;
  const mid = averageRange(250, 2500) * sensitivity;
  const high = averageRange(2500, 12000) * sensitivity;
  const energy = Math.min(1.4, (low * 0.45 + mid * 0.38 + high * 0.17) * 1.4);

  return { low, mid, high, energy, waveform: timeData };
}

function createStars(width, height) {
  const count = Math.max(80, Math.min(220, Math.floor((width * height) / 3200)));
  stars = Array.from({ length: count }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    z: Math.random(),
    size: 0.5 + Math.random() * 2.2,
    speed: 6 + Math.random() * 18,
    twinkle: Math.random() * Math.PI * 2
  }));
}

function clearWithGradient(width, height, energy) {
  const gradient = ctx.createRadialGradient(
    width * 0.5, height * 0.48, 10,
    width * 0.5, height * 0.48, Math.max(width, height) * 0.78
  );
  gradient.addColorStop(0, hexToRgba(currentPalette[1], 0.16 + energy * 0.11));
  gradient.addColorStop(0.48, hexToRgba(currentPalette[0], 0.68));
  gradient.addColorStop(1, "#050b14");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
}

function drawStars(width, height, metrics, dt, time) {
  clearWithGradient(width, height, metrics.energy);

  const centerX = width / 2;
  const centerY = height / 2;

  ctx.save();
  ctx.globalCompositeOperation = "lighter";

  for (const star of stars) {
    const acceleration = 1 + metrics.energy * 5 + metrics.high * 2;
    star.y -= star.speed * acceleration * dt;
    star.x += (star.x - centerX) * 0.012 * acceleration * dt;

    if (star.y < -10 || star.x < -20 || star.x > width + 20) {
      star.x = centerX + (Math.random() - 0.5) * width * 0.36;
      star.y = height + 10;
      star.z = Math.random();
    }

    const pulse = 0.55 + Math.sin(time * 0.002 + star.twinkle) * 0.35;
    const radius = star.size * (0.6 + star.z + metrics.high * 3.4);
    ctx.beginPath();
    ctx.fillStyle = hexToRgba(
      star.z > 0.62 ? currentPalette[2] : currentPalette[1],
      Math.max(0.12, Math.min(0.94, pulse + metrics.energy * 0.42))
    );
    ctx.arc(star.x, star.y, radius, 0, Math.PI * 2);
    ctx.fill();
  }

  const glow = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 160 + metrics.low * 300);
  glow.addColorStop(0, hexToRgba(currentPalette[2], 0.3 + metrics.energy * 0.25));
  glow.addColorStop(0.5, hexToRgba(currentPalette[1], 0.10));
  glow.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = glow;
  ctx.beginPath();
  ctx.arc(centerX, centerY, 160 + metrics.low * 300, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawWaves(width, height, metrics, time) {
  clearWithGradient(width, height, metrics.energy);

  const waveCount = 7;
  ctx.save();
  ctx.globalCompositeOperation = "lighter";
  ctx.lineCap = "round";

  for (let layer = 0; layer < waveCount; layer += 1) {
    const layerRatio = layer / Math.max(1, waveCount - 1);
    const baseY = height * (0.28 + layerRatio * 0.48);
    const amplitude = 12 + metrics.low * 58 + layer * 3;
    const frequency = 0.008 + layer * 0.0017;
    const speed = time * (0.0005 + layer * 0.00006);
    const color = currentPalette[layer % 3];

    ctx.beginPath();
    for (let x = -20; x <= width + 20; x += 8) {
      let sample = 0;
      if (metrics.waveform) {
        const index = Math.floor((x / width) * (metrics.waveform.length - 1));
        sample = (metrics.waveform[Math.max(0, index)] - 128) / 128;
      }
      const y =
        baseY +
        Math.sin(x * frequency + speed * 7 + layer) * amplitude +
        Math.sin(x * frequency * 0.43 - speed * 4) * amplitude * 0.4 +
        sample * (12 + metrics.mid * 44);

      if (x === -20) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }

    ctx.strokeStyle = hexToRgba(color, 0.16 + (1 - layerRatio) * 0.2 + metrics.mid * 0.18);
    ctx.lineWidth = 1.5 + metrics.energy * 3.4 + (waveCount - layer) * 0.15;
    ctx.shadowBlur = 15 + metrics.energy * 28;
    ctx.shadowColor = color;
    ctx.stroke();
  }

  const sheen = ctx.createLinearGradient(0, height * 0.35, 0, height);
  sheen.addColorStop(0, "rgba(255,255,255,0)");
  sheen.addColorStop(0.6, hexToRgba(currentPalette[1], 0.06 + metrics.energy * 0.07));
  sheen.addColorStop(1, hexToRgba(currentPalette[0], 0.22));
  ctx.fillStyle = sheen;
  ctx.fillRect(0, height * 0.3, width, height * 0.7);
  ctx.restore();
}

function spawnMotes(width, height, amount) {
  const count = Math.min(7, Math.floor(amount));
  for (let i = 0; i < count; i += 1) {
    const angle = Math.random() * Math.PI * 2;
    motes.push({
      x: width / 2 + Math.cos(angle) * (30 + Math.random() * 75),
      y: height / 2 + Math.sin(angle) * (30 + Math.random() * 75),
      vx: Math.cos(angle) * (10 + Math.random() * 28),
      vy: Math.sin(angle) * (10 + Math.random() * 28) - 8,
      life: 1,
      size: 1 + Math.random() * 4,
      color: currentPalette[Math.floor(Math.random() * 3)]
    });
  }
  if (motes.length > 220) motes.splice(0, motes.length - 220);
}

function drawBloom(width, height, metrics, dt, time) {
  clearWithGradient(width, height, metrics.energy);

  const cx = width / 2;
  const cy = height / 2;
  const layers = 5;
  const petalCount = 14;
  const pulse = 1 + metrics.low * 0.36 + Math.sin(time * 0.0018) * 0.03;

  ctx.save();
  ctx.translate(cx, cy);
  ctx.globalCompositeOperation = "lighter";

  for (let layer = layers; layer >= 1; layer -= 1) {
    const layerRatio = layer / layers;
    const radius = (38 + layer * 31 + metrics.mid * 55) * pulse;
    const petalLength = 52 + layer * 13 + metrics.high * 52;
    const rotation = time * 0.00006 * (layer % 2 === 0 ? 1 : -1);

    ctx.save();
    ctx.rotate(rotation);
    for (let petal = 0; petal < petalCount; petal += 1) {
      const angle = (Math.PI * 2 * petal) / petalCount;
      ctx.save();
      ctx.rotate(angle);
      const gradient = ctx.createRadialGradient(radius, 0, 0, radius, 0, petalLength);
      gradient.addColorStop(0, hexToRgba(currentPalette[2], 0.34 + metrics.energy * 0.18));
      gradient.addColorStop(0.55, hexToRgba(currentPalette[layer % 3], 0.18));
      gradient.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.ellipse(radius, 0, petalLength, 13 + metrics.mid * 20, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
    ctx.restore();
  }

  const core = ctx.createRadialGradient(0, 0, 0, 0, 0, 110 + metrics.low * 90);
  core.addColorStop(0, hexToRgba(currentPalette[2], 0.88));
  core.addColorStop(0.22, hexToRgba(currentPalette[1], 0.42 + metrics.energy * 0.2));
  core.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = core;
  ctx.beginPath();
  ctx.arc(0, 0, 110 + metrics.low * 90, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  spawnMotes(width, height, metrics.high * 18 + metrics.energy * 6);
  ctx.save();
  ctx.globalCompositeOperation = "lighter";
  for (let i = motes.length - 1; i >= 0; i -= 1) {
    const mote = motes[i];
    mote.x += mote.vx * dt;
    mote.y += mote.vy * dt;
    mote.life -= dt * (0.28 + metrics.energy * 0.12);
    mote.vy -= 1.5 * dt;

    if (mote.life <= 0) {
      motes.splice(i, 1);
      continue;
    }

    ctx.fillStyle = hexToRgba(mote.color, Math.max(0, mote.life * 0.72));
    ctx.beginPath();
    ctx.arc(mote.x, mote.y, mote.size * (0.7 + mote.life), 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

function animate(now) {
  resizeCanvas();
  const rect = elements.canvas.getBoundingClientRect();
  const dt = Math.min(0.05, (now - lastFrameTime) / 1000);
  lastFrameTime = now;

  const metrics = getAudioMetrics();
  const mode = elements.visualMode.value;

  if (mode === "waves") {
    drawWaves(rect.width, rect.height, metrics, now);
  } else if (mode === "bloom") {
    drawBloom(rect.width, rect.height, metrics, dt, now);
  } else {
    drawStars(rect.width, rect.height, metrics, dt, now);
  }

  animationId = requestAnimationFrame(animate);
}

elements.fileInput.addEventListener("change", (event) => {
  handleFile(event.target.files?.[0]);
});

elements.playButton.addEventListener("click", togglePlay);
elements.restartButton.addEventListener("click", restartAudio);
elements.fullscreenButton.addEventListener("click", toggleFullscreen);
elements.seekRange.addEventListener("input", seekAudio);

elements.emotionRange.addEventListener("input", updateEmotion);
elements.sensitivityRange.addEventListener("input", updateSensitivity);

elements.languageButton.addEventListener("click", () => {
  language = language === "zh" ? "en" : "zh";
  translatePage();
});

elements.audio.addEventListener("loadedmetadata", updateProgress);
elements.audio.addEventListener("timeupdate", updateProgress);
elements.audio.addEventListener("play", () => {
  elements.playButton.querySelector("[data-i18n]").textContent = text("pause");
  elements.playButton.querySelector("span:first-child").textContent = "⏸";
  elements.stage.classList.add("is-playing");
  setStatus("statusPlaying");
});
elements.audio.addEventListener("pause", () => {
  elements.playButton.querySelector("[data-i18n]").textContent = text("play");
  elements.playButton.querySelector("span:first-child").textContent = "▶";
  elements.stage.classList.remove("is-playing");
  if (!elements.audio.ended && hasFile) setStatus("statusPaused");
});
elements.audio.addEventListener("ended", () => {
  elements.stage.classList.remove("is-playing");
  elements.playButton.querySelector("[data-i18n]").textContent = text("play");
  elements.playButton.querySelector("span:first-child").textContent = "▶";
  setStatus("statusEnded");
});
elements.audio.addEventListener("error", () => {
  if (elements.audio.error) setStatus("errorPlayback", true);
});

document.addEventListener("fullscreenchange", () => {
  elements.fullscreenButton.querySelector("[data-i18n]").textContent =
    document.fullscreenElement ? text("exitFullscreen") : text("fullscreen");
  setTimeout(resizeCanvas, 60);
});

window.addEventListener("resize", resizeCanvas);
window.addEventListener("pagehide", () => {
  elements.audio.pause();
  releaseObjectUrl();
  if (animationId) cancelAnimationFrame(animationId);
  if (audioContext && audioContext.state !== "closed") {
    audioContext.close().catch(() => {});
  }
});

updateEmotion();
updateSensitivity();
translatePage();
resizeCanvas();
animationId = requestAnimationFrame(animate);
