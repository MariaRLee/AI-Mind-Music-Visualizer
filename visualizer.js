"use strict";

const MAX_FILE_SIZE = 100 * 1024 * 1024;

const i18n = {
  zh: {
    title: "腦波音樂視覺化",
    subtitle: "讓音樂變成星光、波浪、花朵與彩色冰淇淋。",
    privacyTitle: "本機隱私模式",
    privacyText: "音樂只在您的瀏覽器中播放與分析，不會上傳、儲存或提供給第三方。",
    musicSource: "音樂來源",
    musicSourceHelp: "可選擇本機腦波音樂，也可只播放內建節奏。",
    chooseMusic: "選擇本機腦波音樂",
    noFile: "尚未選擇音樂",
    fileHelp: "支援 MP3、WAV、M4A、AAC、OGG；建議小於 100 MB。",
    visualSettings: "視覺設定",
    visualSettingsHelp: "選擇喜歡的動畫與情緒色彩。",
    visualMode: "視覺模式",
    stars: "星光流動",
    waves: "療癒波浪",
    bloom: "綻放光影",
    icecream: "彩色冰淇淋",
    emotion: "情緒值",
    sensitivity: "動畫靈敏度",
    rhythmTitle: "背景節奏",
    rhythmHelp: "由瀏覽器即時合成，不含外部或受版權限制的音樂檔。",
    rhythmStyle: "節奏類型",
    rhythmVolume: "節奏音量",
    none: "無",
    rumba: "倫巴 Rumba",
    chacha: "恰恰 Cha-cha",
    play: "播放",
    pause: "暫停",
    restart: "重新開始",
    fullscreen: "全螢幕",
    exitFullscreen: "離開全螢幕",
    visualizer: "Music Visualizer",
    stageHint: "選擇音樂或背景節奏後，按下播放",
    footer: "Local processing · No upload · No storage · No tracking",
    statusReady: "請選擇本機音樂或背景節奏。",
    statusLoaded: "音樂已在本機載入，沒有上傳。",
    statusPlaying: "正在本機播放與視覺化。",
    statusPaused: "已暫停。",
    statusEnded: "播放完成。",
    statusRhythmOnly: "正在播放瀏覽器合成節奏。",
    errorType: "無法辨識此音訊格式，請改用 MP3、WAV、M4A、AAC 或 OGG。",
    errorSize: "檔案超過 100 MB，請選擇較小的音樂檔案。",
    errorPlayback: "瀏覽器無法播放此音訊。建議改用 MP3 或 WAV。",
    errorAudio: "無法啟動音訊分析，請重新整理頁面後再試。"
  },
  en: {
    title: "Brainwave Music Visualizer",
    subtitle: "Turn music into starlight, waves, blossoms, and colorful ice cream.",
    privacyTitle: "Local Privacy Mode",
    privacyText: "Your music is played and analyzed only in your browser. It is not uploaded, stored, or shared.",
    musicSource: "Music Source",
    musicSourceHelp: "Choose local brainwave music or use a built-in rhythm by itself.",
    chooseMusic: "Choose Local Brainwave Music",
    noFile: "No music selected",
    fileHelp: "Supports MP3, WAV, M4A, AAC, and OGG; under 100 MB recommended.",
    visualSettings: "Visual Settings",
    visualSettingsHelp: "Choose an animation and emotion palette.",
    visualMode: "Visual Mode",
    stars: "Star Flow",
    waves: "Healing Waves",
    bloom: "Blooming Light",
    icecream: "Colorful Ice Cream",
    emotion: "Emotion",
    sensitivity: "Visual Sensitivity",
    rhythmTitle: "Background Rhythm",
    rhythmHelp: "Synthesized live in your browser with no external or copyrighted music file.",
    rhythmStyle: "Rhythm Style",
    rhythmVolume: "Rhythm Volume",
    none: "None",
    rumba: "Rumba",
    chacha: "Cha-cha",
    play: "Play",
    pause: "Pause",
    restart: "Restart",
    fullscreen: "Full Screen",
    exitFullscreen: "Exit Full Screen",
    visualizer: "Music Visualizer",
    stageHint: "Choose music or a rhythm, then press play",
    footer: "Local processing · No upload · No storage · No tracking",
    statusReady: "Choose local music or a background rhythm.",
    statusLoaded: "Music loaded locally. Nothing was uploaded.",
    statusPlaying: "Playing and visualizing locally.",
    statusPaused: "Paused.",
    statusEnded: "Playback finished.",
    statusRhythmOnly: "Playing a browser-synthesized rhythm.",
    errorType: "This audio format is not recognized. Try MP3, WAV, M4A, AAC, or OGG.",
    errorSize: "This file is larger than 100 MB. Please choose a smaller audio file.",
    errorPlayback: "Your browser cannot play this audio. MP3 or WAV is recommended.",
    errorAudio: "Audio analysis could not start. Refresh the page and try again."
  }
};

const emotions = [
  { level: -6, zh: "極度不喜歡・雪滴花", en: "Extreme Dislike · Snowdrop", colors: ["#9ca9bd", "#cbd6e3", "#eef4f8"] },
  { level: -5, zh: "非常不喜歡・勿忘我", en: "Strong Dislike · Forget-me-not", colors: ["#9faee8", "#c9d2ff", "#eef0ff"] },
  { level: -4, zh: "很不喜歡・洋甘菊", en: "Dislike · Chamomile", colors: ["#aa9cd3", "#d7cff0", "#f3effb"] },
  { level: -3, zh: "不喜歡・薰衣草", en: "Mild Dislike · Lavender", colors: ["#9c89d8", "#d5c8f4", "#f2edff"] },
  { level: -2, zh: "有點不喜歡・蒲公英", en: "Slight Dislike · Dandelion", colors: ["#79abc1", "#bfe1ea", "#eff9fb"] },
  { level: -1, zh: "略有保留・滿天星", en: "Reserved · Baby's Breath", colors: ["#78b39d", "#c2e4d7", "#effaf6"] },
  { level: 0, zh: "平衡・白色桔梗", en: "Balanced · White Lisianthus", colors: ["#9ab1c2", "#d8e3eb", "#ffffff"] },
  { level: 1, zh: "微微喜歡・小雛菊", en: "Slightly Positive · Daisy", colors: ["#b8cb7e", "#e2eab5", "#fbf9d8"] },
  { level: 2, zh: "有點喜歡・粉紅康乃馨", en: "Positive · Pink Carnation", colors: ["#e69ab7", "#f5c8d8", "#fff0f5"] },
  { level: 3, zh: "喜歡・鬱金香", en: "Like · Tulip", colors: ["#ed9d7e", "#f6c8b5", "#fff1e9"] },
  { level: 4, zh: "很喜歡・向日葵", en: "Strong Like · Sunflower", colors: ["#e9b84b", "#f7dc92", "#fff6cf"] },
  { level: 5, zh: "非常喜歡・牡丹", en: "Very Strong Like · Peony", colors: ["#dc83ad", "#f3bfd5", "#fff0f7"] },
  { level: 6, zh: "極度喜歡・百合", en: "Extreme Like · Lily", colors: ["#dec18b", "#f2dfb6", "#fff9e5"] }
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
  rhythmStyle: document.getElementById("rhythmStyle"),
  rhythmVolume: document.getElementById("rhythmVolume"),
  rhythmVolumeValue: document.getElementById("rhythmVolumeValue"),
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
let musicGain = null;
let rhythmGain = null;
let frequencyData = null;
let timeData = null;
let animationId = null;
let lastFrameTime = performance.now();
let stars = [];
let sprinkles = [];
let currentPalette = emotions[6].colors;
let hasFile = false;
let sessionPlaying = false;
let rhythmTimer = null;
let rhythmStep = 0;
let nextRhythmTime = 0;

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
  updateEmotion();
  updatePlayUi();
  elements.fullscreenButton.querySelector("[data-i18n]").textContent =
    document.fullscreenElement ? text("exitFullscreen") : text("fullscreen");
  if (!hasFile && elements.rhythmStyle.value === "none") {
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
  document.documentElement.style.setProperty("--accent", emotion.colors[1]);
  document.documentElement.style.setProperty("--accent-strong", emotion.colors[0]);
}

function updateSensitivity() {
  elements.sensitivityValue.value = `${elements.sensitivityRange.value}%`;
}

function updateRhythmVolume() {
  const volume = Number(elements.rhythmVolume.value);
  elements.rhythmVolumeValue.value = `${volume}%`;
  if (rhythmGain && audioContext) {
    rhythmGain.gain.setTargetAtTime(volume / 100, audioContext.currentTime, 0.02);
  }
}

function updateAvailability() {
  const available = hasFile || elements.rhythmStyle.value !== "none";
  elements.playButton.disabled = !available;
  elements.restartButton.disabled = !available;
}

function updatePlayUi() {
  const icon = elements.playButton.querySelector("span:first-child");
  const label = elements.playButton.querySelector("[data-i18n]");
  icon.textContent = sessionPlaying ? "⏸" : "▶";
  label.textContent = sessionPlaying ? text("pause") : text("play");
  elements.stage.classList.toggle("is-playing", sessionPlaying);
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

  stopSession(false);
  releaseObjectUrl();
  objectUrl = URL.createObjectURL(file);
  elements.audio.src = objectUrl;
  elements.audio.load();

  hasFile = true;
  elements.fileName.textContent = file.name;
  elements.seekRange.disabled = false;
  elements.currentTime.textContent = "0:00";
  elements.duration.textContent = "0:00";
  elements.seekRange.value = "0";
  updateAvailability();
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

  musicGain = audioContext.createGain();
  musicGain.gain.value = 1;
  rhythmGain = audioContext.createGain();
  rhythmGain.gain.value = Number(elements.rhythmVolume.value) / 100;

  sourceNode = audioContext.createMediaElementSource(elements.audio);
  sourceNode.connect(musicGain);
  musicGain.connect(analyser);
  rhythmGain.connect(analyser);
  analyser.connect(audioContext.destination);

  frequencyData = new Uint8Array(analyser.frequencyBinCount);
  timeData = new Uint8Array(analyser.fftSize);
}

function createNoiseBuffer() {
  const length = Math.floor(audioContext.sampleRate * 0.08);
  const buffer = audioContext.createBuffer(1, length, audioContext.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < length; i += 1) data[i] = Math.random() * 2 - 1;
  return buffer;
}

function scheduleKick(time, strength = 0.8) {
  const osc = audioContext.createOscillator();
  const gain = audioContext.createGain();
  osc.type = "sine";
  osc.frequency.setValueAtTime(110, time);
  osc.frequency.exponentialRampToValueAtTime(48, time + 0.12);
  gain.gain.setValueAtTime(0.0001, time);
  gain.gain.exponentialRampToValueAtTime(0.34 * strength, time + 0.008);
  gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.16);
  osc.connect(gain).connect(rhythmGain);
  osc.start(time);
  osc.stop(time + 0.18);
}

function scheduleClick(time, pitch = 900, strength = 0.6) {
  const osc = audioContext.createOscillator();
  const gain = audioContext.createGain();
  osc.type = "triangle";
  osc.frequency.setValueAtTime(pitch, time);
  gain.gain.setValueAtTime(0.0001, time);
  gain.gain.exponentialRampToValueAtTime(0.12 * strength, time + 0.002);
  gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.055);
  osc.connect(gain).connect(rhythmGain);
  osc.start(time);
  osc.stop(time + 0.07);
}

function scheduleShaker(time, strength = 0.45) {
  const source = audioContext.createBufferSource();
  source.buffer = createNoiseBuffer();
  const filter = audioContext.createBiquadFilter();
  const gain = audioContext.createGain();
  filter.type = "highpass";
  filter.frequency.value = 4200;
  gain.gain.setValueAtTime(0.0001, time);
  gain.gain.exponentialRampToValueAtTime(0.08 * strength, time + 0.002);
  gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.045);
  source.connect(filter).connect(gain).connect(rhythmGain);
  source.start(time);
  source.stop(time + 0.06);
}

function scheduleTone(time, frequency, duration = 0.14, strength = 0.35) {
  const osc = audioContext.createOscillator();
  const gain = audioContext.createGain();
  osc.type = "sine";
  osc.frequency.setValueAtTime(frequency, time);
  gain.gain.setValueAtTime(0.0001, time);
  gain.gain.exponentialRampToValueAtTime(0.10 * strength, time + 0.012);
  gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);
  osc.connect(gain).connect(rhythmGain);
  osc.start(time);
  osc.stop(time + duration + 0.02);
}

function scheduleRhythmStep(style, step, time) {
  if (style === "rumba") {
    const kickSteps = [0, 6, 10, 14];
    const clickSteps = [3, 7, 11, 15];
    if (kickSteps.includes(step)) scheduleKick(time, step === 0 ? 1 : 0.68);
    if (clickSteps.includes(step)) scheduleClick(time, step % 8 === 3 ? 760 : 980, 0.65);
    if (step % 2 === 0) scheduleShaker(time, 0.42);
    if ([0, 5, 8, 13].includes(step)) {
      const notes = { 0: 220, 5: 247, 8: 262, 13: 247 };
      scheduleTone(time, notes[step], 0.16, 0.28);
    }
  } else if (style === "chacha") {
    if ([0, 4, 8, 12].includes(step)) scheduleKick(time, step === 0 ? 0.88 : 0.58);
    if ([2, 6, 9, 10, 13, 14].includes(step)) scheduleClick(time, step >= 9 ? 1180 : 920, 0.72);
    scheduleShaker(time, step % 2 === 0 ? 0.52 : 0.34);
    if ([0, 4, 8, 12].includes(step)) {
      const notes = [262, 294, 330, 294];
      scheduleTone(time, notes[step / 4], 0.11, 0.24);
    }
  }
}

function rhythmStepDuration(style) {
  const bpm = style === "chacha" ? 116 : 92;
  return 60 / bpm / 4;
}

function rhythmScheduler() {
  if (!audioContext || !sessionPlaying) return;
  const style = elements.rhythmStyle.value;
  if (style === "none") return;

  while (nextRhythmTime < audioContext.currentTime + 0.12) {
    scheduleRhythmStep(style, rhythmStep, nextRhythmTime);
    nextRhythmTime += rhythmStepDuration(style);
    rhythmStep = (rhythmStep + 1) % 16;
  }
}

function startRhythm() {
  if (elements.rhythmStyle.value === "none") return;
  stopRhythm();
  rhythmStep = 0;
  nextRhythmTime = audioContext.currentTime + 0.04;
  rhythmScheduler();
  rhythmTimer = window.setInterval(rhythmScheduler, 25);
}

function stopRhythm() {
  if (rhythmTimer) {
    window.clearInterval(rhythmTimer);
    rhythmTimer = null;
  }
}

async function startSession() {
  try {
    await ensureAudioGraph();
    sessionPlaying = true;
    updatePlayUi();

    if (hasFile) {
      await elements.audio.play();
      setStatus("statusPlaying");
    } else {
      setStatus("statusRhythmOnly");
    }

    startRhythm();
  } catch (error) {
    console.error(error);
    sessionPlaying = false;
    updatePlayUi();
    setStatus(error.name === "NotSupportedError" ? "errorPlayback" : "errorAudio", true);
  }
}

function stopSession(updateStatus = true) {
  if (hasFile && !elements.audio.paused) elements.audio.pause();
  stopRhythm();
  sessionPlaying = false;
  updatePlayUi();
  if (updateStatus) setStatus("statusPaused");
}

function togglePlay() {
  if (!hasFile && elements.rhythmStyle.value === "none") return;
  if (sessionPlaying) stopSession();
  else startSession();
}

function restartSession() {
  if (hasFile) elements.audio.currentTime = 0;
  rhythmStep = 0;
  if (sessionPlaying) startRhythm();
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
  elements.audio.currentTime = (Number(elements.seekRange.value) / 1000) * elements.audio.duration;
}

async function toggleFullscreen() {
  try {
    if (!document.fullscreenElement) await elements.stage.requestFullscreen();
    else await document.exitFullscreen();
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

  if (!analyser || !frequencyData || !timeData || !sessionPlaying) {
    const t = performance.now() * 0.001;
    return {
      low: (0.12 + Math.sin(t * 0.9) * 0.02) * sensitivity,
      mid: (0.10 + Math.sin(t * 1.3 + 1) * 0.018) * sensitivity,
      high: (0.08 + Math.sin(t * 1.8 + 2) * 0.015) * sensitivity,
      energy: (0.10 + Math.sin(t * 0.7) * 0.018) * sensitivity,
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
  const energy = Math.min(1.4, (low * 0.45 + mid * 0.38 + high * 0.17) * 1.5);

  return { low, mid, high, energy, waveform: timeData };
}

function createStars(width, height) {
  const count = Math.max(80, Math.min(220, Math.floor((width * height) / 3500)));
  stars = Array.from({ length: count }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    size: 0.7 + Math.random() * 2.2,
    speed: 4 + Math.random() * 14,
    twinkle: Math.random() * Math.PI * 2,
    colorIndex: Math.floor(Math.random() * 3)
  }));
}

function clearPastel(width, height, energy) {
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, hexToRgba(currentPalette[2], 1));
  gradient.addColorStop(0.52, hexToRgba(currentPalette[1], 0.72));
  gradient.addColorStop(1, "#f7fbff");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  const glow = ctx.createRadialGradient(
    width * 0.65, height * 0.25, 0,
    width * 0.65, height * 0.25, Math.max(width, height) * 0.55
  );
  glow.addColorStop(0, `rgba(255,255,255,${0.58 + energy * 0.12})`);
  glow.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, width, height);
}

function drawStars(width, height, metrics, dt, time) {
  clearPastel(width, height, metrics.energy);
  ctx.save();
  ctx.globalCompositeOperation = "screen";

  for (const star of stars) {
    star.y -= star.speed * (1 + metrics.energy * 4) * dt;
    star.x += Math.sin(time * 0.0004 + star.twinkle) * 8 * dt;
    if (star.y < -10) {
      star.y = height + 10;
      star.x = Math.random() * width;
    }

    const pulse = 0.55 + Math.sin(time * 0.002 + star.twinkle) * 0.28;
    const radius = star.size * (1 + metrics.high * 2.7);
    ctx.fillStyle = hexToRgba(currentPalette[star.colorIndex], Math.max(0.24, pulse));
    ctx.beginPath();
    ctx.arc(star.x, star.y, radius, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

function drawWaves(width, height, metrics, time) {
  clearPastel(width, height, metrics.energy);
  ctx.save();
  ctx.lineCap = "round";

  for (let layer = 0; layer < 7; layer += 1) {
    const baseY = height * (0.28 + layer * 0.075);
    const amplitude = 10 + metrics.low * 52 + layer * 2.5;
    const frequency = 0.008 + layer * 0.0015;
    const speed = time * (0.00055 + layer * 0.00005);

    ctx.beginPath();
    for (let x = -20; x <= width + 20; x += 8) {
      let sample = 0;
      if (metrics.waveform) {
        const index = Math.floor((x / width) * (metrics.waveform.length - 1));
        sample = (metrics.waveform[Math.max(0, index)] - 128) / 128;
      }
      const y = baseY + Math.sin(x * frequency + speed * 7 + layer) * amplitude + sample * (8 + metrics.mid * 34);
      if (x === -20) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }

    ctx.strokeStyle = hexToRgba(currentPalette[layer % 3], 0.30 + metrics.mid * 0.16);
    ctx.lineWidth = 2 + metrics.energy * 2.6;
    ctx.shadowBlur = 13 + metrics.energy * 20;
    ctx.shadowColor = currentPalette[layer % 3];
    ctx.stroke();
  }
  ctx.restore();
}

function drawBloom(width, height, metrics, time) {
  clearPastel(width, height, metrics.energy);
  const cx = width / 2;
  const cy = height / 2;
  const petalCount = 14;
  ctx.save();
  ctx.translate(cx, cy);
  ctx.globalCompositeOperation = "screen";

  for (let layer = 5; layer >= 1; layer -= 1) {
    const radius = 34 + layer * 28 + metrics.mid * 50;
    const petalLength = 46 + layer * 12 + metrics.high * 48;
    ctx.save();
    ctx.rotate(time * 0.00005 * (layer % 2 === 0 ? 1 : -1));

    for (let petal = 0; petal < petalCount; petal += 1) {
      ctx.save();
      ctx.rotate((Math.PI * 2 * petal) / petalCount);
      const gradient = ctx.createRadialGradient(radius, 0, 0, radius, 0, petalLength);
      gradient.addColorStop(0, hexToRgba(currentPalette[2], 0.76));
      gradient.addColorStop(0.55, hexToRgba(currentPalette[layer % 3], 0.34));
      gradient.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.ellipse(radius, 0, petalLength, 14 + metrics.mid * 18, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
    ctx.restore();
  }

  const core = ctx.createRadialGradient(0, 0, 0, 0, 0, 92 + metrics.low * 70);
  core.addColorStop(0, "rgba(255,255,255,0.95)");
  core.addColorStop(0.35, hexToRgba(currentPalette[1], 0.52));
  core.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = core;
  ctx.beginPath();
  ctx.arc(0, 0, 92 + metrics.low * 70, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function conePath(x, y, width, height) {
  ctx.beginPath();
  ctx.moveTo(x - width / 2, y);
  ctx.lineTo(x + width / 2, y);
  ctx.lineTo(x, y + height);
  ctx.closePath();
}

function drawIceCream(width, height, metrics, time) {
  const bg = ctx.createLinearGradient(0, 0, width, height);
  bg.addColorStop(0, "#fff7fb");
  bg.addColorStop(0.48, "#f0f8ff");
  bg.addColorStop(1, "#fffbed");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, width, height);

  const extraColors = ["#ff9ec4", "#ffd166", "#8ed8c5", "#8fb9ff", "#c9a7ff", "#ffb38a"];
  const count = width < 620 ? 4 : 6;
  const gap = width / (count + 1);
  const baseline = height * 0.64;

  for (let i = 0; i < count; i += 1) {
    const x = gap * (i + 1);
    const bounce = Math.sin(time * 0.0025 + i * 0.8) * (5 + metrics.mid * 16);
    const coneTop = baseline + bounce;
    const coneWidth = Math.min(72, gap * 0.55);
    const coneHeight = 118 + metrics.low * 28;

    const coneGradient = ctx.createLinearGradient(x - coneWidth / 2, coneTop, x + coneWidth / 2, coneTop + coneHeight);
    coneGradient.addColorStop(0, "#f2bf78");
    coneGradient.addColorStop(1, "#d9994f");
    ctx.fillStyle = coneGradient;
    conePath(x, coneTop, coneWidth, coneHeight);
    ctx.fill();

    ctx.strokeStyle = "rgba(151,102,48,0.25)";
    ctx.lineWidth = 1;
    for (let line = -2; line <= 2; line += 1) {
      ctx.beginPath();
      ctx.moveTo(x - coneWidth / 2 + 8, coneTop + 18 + line * 14);
      ctx.lineTo(x + coneWidth / 2 - 8, coneTop + 48 + line * 14);
      ctx.stroke();
    }

    const scoopCount = 2 + (i % 2);
    for (let scoop = 0; scoop < scoopCount; scoop += 1) {
      const radius = 31 + metrics.high * 13 + scoop * 2;
      const scoopY = coneTop - 20 - scoop * 42;
      const color = extraColors[(i + scoop) % extraColors.length];
      const scoopGradient = ctx.createRadialGradient(x - radius * 0.28, scoopY - radius * 0.30, 3, x, scoopY, radius);
      scoopGradient.addColorStop(0, "#ffffff");
      scoopGradient.addColorStop(0.15, color);
      scoopGradient.addColorStop(1, hexToRgba(color, 0.82));

      ctx.fillStyle = scoopGradient;
      ctx.beginPath();
      ctx.arc(x, scoopY, radius, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "rgba(255,255,255,0.42)";
      ctx.beginPath();
      ctx.ellipse(x - radius * 0.25, scoopY - radius * 0.28, radius * 0.22, radius * 0.11, -0.5, 0, Math.PI * 2);
      ctx.fill();

      const sprinkleCount = Math.floor(4 + metrics.high * 14);
      for (let s = 0; s < sprinkleCount; s += 1) {
        const seed = i * 97 + scoop * 41 + s * 13;
        const angle = (seed * 0.71) % (Math.PI * 2);
        const distance = radius * (0.24 + ((seed * 0.37) % 0.48));
        const sx = x + Math.cos(angle) * distance;
        const sy = scoopY + Math.sin(angle) * distance;
        ctx.strokeStyle = extraColors[(seed + 2) % extraColors.length];
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(sx - 2, sy - 2);
        ctx.lineTo(sx + 3, sy + 2);
        ctx.stroke();
      }
    }
  }

  if (sessionPlaying && metrics.high > 0.12) {
    const newCount = Math.min(5, Math.floor(metrics.high * 8));
    for (let i = 0; i < newCount; i += 1) {
      sprinkles.push({
        x: Math.random() * width,
        y: -10,
        vx: (Math.random() - 0.5) * 12,
        vy: 18 + Math.random() * 28,
        rotation: Math.random() * Math.PI,
        color: extraColors[Math.floor(Math.random() * extraColors.length)],
        life: 1
      });
    }
  }

  for (let i = sprinkles.length - 1; i >= 0; i -= 1) {
    const sprinkle = sprinkles[i];
    sprinkle.x += sprinkle.vx * 0.016;
    sprinkle.y += sprinkle.vy * 0.016;
    sprinkle.rotation += 0.05;
    sprinkle.life -= 0.003;
    if (sprinkle.y > height + 20 || sprinkle.life <= 0) {
      sprinkles.splice(i, 1);
      continue;
    }

    ctx.save();
    ctx.translate(sprinkle.x, sprinkle.y);
    ctx.rotate(sprinkle.rotation);
    ctx.strokeStyle = sprinkle.color;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(-4, 0);
    ctx.lineTo(4, 0);
    ctx.stroke();
    ctx.restore();
  }

  if (sprinkles.length > 220) sprinkles.splice(0, sprinkles.length - 220);
}

function animate(now) {
  resizeCanvas();
  const rect = elements.canvas.getBoundingClientRect();
  const dt = Math.min(0.05, (now - lastFrameTime) / 1000);
  lastFrameTime = now;

  const metrics = getAudioMetrics();
  const mode = elements.visualMode.value;
  if (mode === "waves") drawWaves(rect.width, rect.height, metrics, now);
  else if (mode === "bloom") drawBloom(rect.width, rect.height, metrics, now);
  else if (mode === "icecream") drawIceCream(rect.width, rect.height, metrics, now);
  else drawStars(rect.width, rect.height, metrics, dt, now);

  animationId = requestAnimationFrame(animate);
}

elements.fileInput.addEventListener("change", (event) => handleFile(event.target.files?.[0]));
elements.playButton.addEventListener("click", togglePlay);
elements.restartButton.addEventListener("click", restartSession);
elements.fullscreenButton.addEventListener("click", toggleFullscreen);
elements.seekRange.addEventListener("input", seekAudio);
elements.emotionRange.addEventListener("input", updateEmotion);
elements.sensitivityRange.addEventListener("input", updateSensitivity);
elements.rhythmVolume.addEventListener("input", updateRhythmVolume);

elements.rhythmStyle.addEventListener("change", () => {
  updateAvailability();
  if (sessionPlaying) {
    startRhythm();
    if (!hasFile) setStatus("statusRhythmOnly");
  } else if (!hasFile) {
    setStatus(elements.rhythmStyle.value === "none" ? "statusReady" : "statusRhythmOnly");
  }
});

elements.languageButton.addEventListener("click", () => {
  language = language === "zh" ? "en" : "zh";
  translatePage();
});

elements.audio.addEventListener("loadedmetadata", updateProgress);
elements.audio.addEventListener("timeupdate", updateProgress);
elements.audio.addEventListener("ended", () => {
  stopRhythm();
  sessionPlaying = false;
  updatePlayUi();
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
  stopSession(false);
  releaseObjectUrl();
  if (animationId) cancelAnimationFrame(animationId);
  if (audioContext && audioContext.state !== "closed") audioContext.close().catch(() => {});
});

updateEmotion();
updateSensitivity();
updateRhythmVolume();
updateAvailability();
translatePage();
resizeCanvas();
animationId = requestAnimationFrame(animate);
