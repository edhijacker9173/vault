(() => {
  if (window.VaultAudioPlayer) return;

  const PREVIEW_SECONDS = 15;
  const STORAGE_KEY = "vaultAudioPlayerState";
  const script = document.currentScript;
  const rootUrl = new URL(".", script ? script.src : window.location.href);
  const shellUrl = new URL("vault-shell.html", rootUrl);
  const rawTracks = [
    {
      title: "Break Me Open",
      file: "recordroom/sounds/Break Me Open.mp3",
      cover: "recordroom/assets/break-me-open.svg",
      desc: "A raw, open-hearted sound file with shadowed pulse, fracture, release, and late-night motion.",
      shelf: "Soundroom single"
    },
    {
      title: "Cosmos",
      file: "recordroom/sounds/Cosmos.mp3",
      cover: "recordroom/assets/cosmos.jpg",
      desc: "A luminous dream-score file for scale, silence, drifting light, and impossible distance.",
      shelf: "Dream Ledger score"
    },
    {
      title: "Metroid",
      file: "recordroom/sounds/Metroid.mp3",
      cover: "recordroom/assets/metroid.jpg",
      desc: "Neon pursuit, hot machinery, alien corridors, and the pressure of motion.",
      shelf: "Dream Ledger score"
    },
    {
      title: "Warp Gate 2050",
      file: "recordroom/sounds/Warp Gate 2050.mp3",
      cover: "recordroom/assets/warp-gate-2050.jpg",
      desc: "A future-portal pulse with bright synthetic movement and cinematic lift.",
      shelf: "Future archive"
    },
    {
      title: "5th Element",
      file: "recordroom/sounds/5th Element.mp3",
      cover: "recordroom/assets/5th-element.png",
      desc: "A luminous fifth-element cut with cosmic pulse, elemental glow, and a polished sci-fi lounge atmosphere.",
      shelf: "Elemental archive"
    },
    {
      title: "Black Magic",
      file: "recordroom/sounds/Black Magic.mp3",
      cover: "recordroom/assets/black-magic.jpg",
      desc: "Dark ritual tones, low-lit atmosphere, and a slow occult groove.",
      shelf: "Occult shelf"
    },
    {
      title: "Voodoo Alley",
      file: "recordroom/sounds/Voodoo Alley.mp3",
      cover: "recordroom/assets/voodoo-alley.jpg",
      desc: "Backstreet rhythm, shadowy brass, and a humid midnight cadence.",
      shelf: "Nocturne file"
    },
    {
      title: "Fuego del Corazon",
      file: "recordroom/sounds/Fuego del Coraz\u00f3n.mp3",
      cover: "recordroom/assets/fuego-del-coraz-n.jpg",
      desc: "A warm ember-lit track with Latin fire, close-room rhythm, and late-night movement.",
      shelf: "Bar room cut"
    }
  ];

  const tracks = rawTracks.map((track) => ({
    ...track,
    file: new URL(track.file, rootUrl).href,
    cover: new URL(track.cover, rootUrl).href
  }));

  function formatTime(value) {
    if (!Number.isFinite(value)) return "0:00";
    const minutes = Math.floor(value / 60);
    const seconds = Math.floor(value % 60).toString().padStart(2, "0");
    return minutes + ":" + seconds;
  }

  function rootRelativeFromUrl(url) {
    const rootHref = rootUrl.href;
    const cleanHref = url.href.split("#")[0].split("?")[0];
    if (!cleanHref.startsWith(rootHref)) return null;

    let relative = cleanHref.slice(rootHref.length) || "index.html";
    if (relative.endsWith("/")) relative += "index.html";
    return relative;
  }

  if (window.top !== window) {
    const listeners = new Set();
    let proxyState = {
      activeIndex: 0,
      track: tracks[0],
      hidden: true,
      playing: false,
      mode: "Ready to play",
      currentTime: 0,
      duration: NaN
    };

    function emitProxy() {
      listeners.forEach((listener) => listener({ ...proxyState }));
    }

    function updateProxyState(nextState) {
      const activeIndex = Number.isInteger(nextState.activeIndex) ? nextState.activeIndex : proxyState.activeIndex;
      proxyState = {
        ...proxyState,
        ...nextState,
        activeIndex,
        track: tracks[activeIndex] || tracks[0]
      };
      emitProxy();
    }

    function sendAction(action, payload) {
      window.parent.postMessage({ vaultAudioAction: action, ...(payload || {}) }, "*");
    }

    function selectTrack(index = proxyState.activeIndex) {
      updateProxyState({ activeIndex: index, track: tracks[index] || tracks[0], hidden: false, mode: "Ready to play" });
      sendAction("selectTrack", { index });
    }

    function playFull(index = proxyState.activeIndex) {
      updateProxyState({ activeIndex: index, track: tracks[index] || tracks[0], hidden: false, playing: true, mode: "Full soundtrack selected" });
      sendAction("playFull", { index });
    }

    function previewTrack(index = proxyState.activeIndex) {
      updateProxyState({ activeIndex: index, track: tracks[index] || tracks[0], hidden: false, playing: true, mode: "Previewing first " + PREVIEW_SECONDS + " seconds" });
      sendAction("previewTrack", { index });
    }

    function close() {
      updateProxyState({ hidden: true, playing: false });
      sendAction("close");
    }

    window.addEventListener("message", (event) => {
      const data = event.data || {};
      if (data.vaultAudioState) updateProxyState(data.vaultAudioState);
    });

    document.addEventListener("click", (event) => {
      const previewButton = event.target.closest("[data-vault-preview-index]");
      if (previewButton) {
        previewTrack(Number(previewButton.dataset.vaultPreviewIndex));
        return;
      }

      const playButton = event.target.closest("[data-vault-play-index]");
      if (playButton) {
        playFull(Number(playButton.dataset.vaultPlayIndex));
        return;
      }

      const selectedRow = event.target.closest("[data-vault-select-index]");
      if (selectedRow && !event.target.closest("button, a")) {
        selectTrack(Number(selectedRow.dataset.vaultSelectIndex));
      }

      if (event.target.closest("[data-vault-preview]")) {
        previewTrack(proxyState.activeIndex);
        return;
      }

      if (event.target.closest("[data-vault-play-full]")) {
        playFull(proxyState.activeIndex);
      }
    });

    window.VaultAudioPlayer = {
      tracks,
      formatTime,
      playFull,
      previewTrack,
      selectTrack,
      close,
      getState() {
        return { ...proxyState };
      },
      onChange(listener) {
        listeners.add(listener);
        listener({ ...proxyState });
        return () => listeners.delete(listener);
      }
    };

    sendAction("requestState");
    return;
  }

  (() => {
    const currentUrl = new URL(window.location.href);
    const currentPage = currentUrl.href.split("#")[0].split("?")[0];
    const shellPage = shellUrl.href.split("#")[0].split("?")[0];
    const params = new URLSearchParams(currentUrl.search);

    if (currentPage === shellPage || params.has("plain")) return;

    const relative = rootRelativeFromUrl(currentUrl);
    if (!relative) return;

    let targetPage = relative;
    if (currentUrl.search) {
      const nextParams = new URLSearchParams(currentUrl.search);
      nextParams.delete("plain");
      const query = nextParams.toString();
      if (query) targetPage += "?" + query;
    }
    if (currentUrl.hash) targetPage += currentUrl.hash;

    const nextUrl = new URL(shellUrl.href);
    nextUrl.searchParams.set("page", targetPage);
    window.location.replace(nextUrl.href);
  })();

  let state = {
    activeIndex: 0,
    mode: "ready",
    hidden: true,
    wasPlaying: false,
    currentTime: 0,
    minimized: false,
    minimizedPosition: null
  };

  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
    if (stored && Number.isInteger(stored.activeIndex)) {
      state = { ...state, ...stored, hidden: stored.hidden !== false };
      state.minimizedPosition = normalizePlayerPosition(stored.minimizedPosition);
    }
  } catch {
    state = { ...state };
  }

  let previewMode = false;
  let previewStart = 0;
  let previewEnd = PREVIEW_SECONDS;
  const listeners = new Set();

  function normalizePlayerPosition(position) {
    if (!position || typeof position !== "object") return null;
    const x = Number(position.x);
    const y = Number(position.y);
    if (!Number.isFinite(x) || !Number.isFinite(y)) return null;
    return { x, y };
  }

  function clampPlayerPosition(position) {
    const margin = 10;
    const rect = player.getBoundingClientRect();
    const width = rect.width || 320;
    const height = rect.height || 58;
    const maxX = Math.max(margin, window.innerWidth - width - margin);
    const maxY = Math.max(margin, window.innerHeight - height - margin);
    return {
      x: Math.min(Math.max(position.x, margin), maxX),
      y: Math.min(Math.max(position.y, margin), maxY)
    };
  }

  function clearPlayerPosition() {
    player.style.removeProperty("left");
    player.style.removeProperty("top");
    player.style.removeProperty("right");
    player.style.removeProperty("bottom");
  }

  function applyMinimizedPosition() {
    if (!state.minimized || !state.minimizedPosition) {
      clearPlayerPosition();
      return;
    }

    state.minimizedPosition = clampPlayerPosition(state.minimizedPosition);
    player.style.left = state.minimizedPosition.x + "px";
    player.style.top = state.minimizedPosition.y + "px";
    player.style.right = "auto";
    player.style.bottom = "auto";
  }

  const style = document.createElement("style");
  style.textContent = `
    .vault-audio-player {
      position: fixed;
      right: 18px;
      bottom: 18px;
      left: 18px;
      z-index: 120;
      display: grid;
      grid-template-columns: minmax(0, 1.1fr) auto minmax(180px, 0.9fr) auto auto;
      gap: 18px;
      align-items: center;
      max-width: 1180px;
      margin: 0 auto;
      padding: 12px 14px;
      border: 1px solid rgba(197, 139, 58, 0.36);
      border-radius: 12px;
      color: #fff7e8;
      background: rgba(13, 9, 7, 0.92);
      box-shadow: 0 18px 70px rgba(0, 0, 0, 0.5);
      backdrop-filter: blur(18px);
    }

    .vault-audio-player[hidden] { display: none; }

    .vault-audio-player.minimized {
      left: auto;
      width: min(520px, calc(100% - 36px));
      grid-template-columns: minmax(0, 1fr) auto auto auto;
      gap: 12px;
      padding: 10px 12px;
      cursor: grab;
      touch-action: none;
      user-select: none;
    }

    .vault-audio-player.minimized.dragging {
      cursor: grabbing;
    }

    .vault-player-track {
      display: flex;
      min-width: 0;
      gap: 12px;
      align-items: center;
    }

    .vault-player-track img {
      width: 52px;
      height: 52px;
      flex: 0 0 52px;
      border: 1px solid rgba(197, 139, 58, 0.34);
      border-radius: 8px;
      object-fit: cover;
      background: #17100d;
    }

    .vault-player-track strong,
    .vault-player-track span {
      display: block;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .vault-player-track strong {
      font-family: "Cormorant Garamond", Georgia, serif;
      font-size: 1.35rem;
      line-height: 1;
    }

    .vault-player-track span {
      margin-top: 4px;
      color: #d8c4aa;
      font-size: 0.86rem;
    }


    .vault-audio-player.minimized .vault-player-track {
      gap: 0;
    }

    .vault-audio-player.minimized .vault-player-track img,
    .vault-audio-player.minimized .vault-player-track span,
    .vault-audio-player.minimized .vault-player-progress {
      display: none;
    }

    .vault-audio-player.minimized .vault-player-track strong {
      font-size: 1.1rem;
    }

    .vault-player-controls {
      display: inline-flex;
      gap: 8px;
      align-items: center;
      justify-content: center;
    }

    .vault-player-button {
      display: inline-grid;
      place-items: center;
      width: 40px;
      height: 40px;
      border: 1px solid rgba(197, 139, 58, 0.36);
      border-radius: 999px;
      color: #fff7e8;
      background: rgba(255, 255, 255, 0.05);
      cursor: pointer;
    }

    .vault-player-button svg {
      width: 19px;
      height: 19px;
      fill: currentColor;
    }

    .vault-player-button.primary {
      color: #130d09;
      background: #d39438;
      border-color: #d39438;
    }

    .vault-player-pause,
    body.vault-player-playing .vault-player-play { display: none; }
    body.vault-player-playing .vault-player-pause { display: block; }

    .vault-player-progress {
      display: grid;
      grid-template-columns: auto minmax(110px, 1fr) auto;
      gap: 8px;
      align-items: center;
      color: #d8c4aa;
      font-size: 0.78rem;
      min-width: 0;
    }

    .vault-player-progress input {
      width: 100%;
      accent-color: #d39438;
    }

    .vault-player-minimize,
    .vault-player-close {
      width: 38px;
      height: 38px;
      border-radius: 999px;
      border: 1px solid rgba(255, 255, 255, 0.14);
      color: #d8c4aa;
      background: rgba(255, 255, 255, 0.04);
      cursor: pointer;
      font-size: 1rem;
      line-height: 1;
      text-transform: uppercase;
    }

    @media (max-width: 760px) {
      .vault-audio-player {
        grid-template-columns: 1fr auto auto;
        gap: 10px 12px;
        padding: 11px;
      }

      .vault-audio-player.minimized {
        right: 12px;
        bottom: 12px;
        left: auto;
        width: min(390px, calc(100% - 24px));
        grid-template-columns: minmax(0, 1fr) auto auto auto;
      }

      .vault-player-controls {
        grid-column: 1 / -1;
        grid-row: 2;
        justify-content: flex-start;
      }

      .vault-player-progress {
        grid-column: 1 / -1;
        grid-row: 3;
      }

      .vault-player-minimize { grid-column: 2; grid-row: 1; }
      .vault-player-close { grid-column: 3; grid-row: 1; }

      .vault-audio-player.minimized .vault-player-controls {
        grid-column: auto;
        grid-row: auto;
      }
    }  `;
  document.head.appendChild(style);

  const player = document.createElement("aside");
  player.className = "vault-audio-player";
  player.hidden = state.hidden;
  player.setAttribute("aria-label", "Vault audio player");
  player.innerHTML = `
    <audio preload="metadata"></audio>
    <div class="vault-player-track">
      <img alt="" />
      <div>
        <strong></strong>
        <span></span>
      </div>
    </div>
    <div class="vault-player-controls">
      <button class="vault-player-button" type="button" data-vault-prev aria-label="Previous track">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6h2v12H6zM9 12l9 6V6z" /></svg>
      </button>
      <button class="vault-player-button primary" type="button" data-vault-toggle aria-label="Play or pause selected soundtrack">
        <svg class="vault-player-play" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z" /></svg>
        <svg class="vault-player-pause" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 5h4v14H7zM13 5h4v14h-4z" /></svg>
      </button>
      <button class="vault-player-button" type="button" data-vault-next aria-label="Next track">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M16 6h2v12h-2zM15 12l-9 6V6z" /></svg>
      </button>
    </div>
    <div class="vault-player-progress">
      <span data-vault-current>0:00</span>
      <input data-vault-seek type="range" min="0" max="100" value="0" aria-label="Seek through soundtrack" />
      <span data-vault-duration>0:00</span>
    </div>
    <button class="vault-player-minimize" type="button" data-vault-minimize aria-label="Minimize audio player">-</button>
    <button class="vault-player-close" type="button" data-vault-close aria-label="Close audio player">x</button>
  `;
  document.body.appendChild(player);

  const audio = player.querySelector("audio");
  const cover = player.querySelector("img");
  const title = player.querySelector("strong");
  const mode = player.querySelector(".vault-player-track span");
  const seek = player.querySelector("[data-vault-seek]");
  const current = player.querySelector("[data-vault-current]");
  const duration = player.querySelector("[data-vault-duration]");

  const minimizeButton = player.querySelector("[data-vault-minimize]");
  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        activeIndex: state.activeIndex,
        mode: state.mode,
        hidden: player.hidden,
        wasPlaying: !audio.paused && !player.hidden,
        currentTime: Number.isFinite(audio.currentTime) ? audio.currentTime : 0,
        minimized: state.minimized === true,
        minimizedPosition: normalizePlayerPosition(state.minimizedPosition)
      }));
    } catch {
      /* localStorage can be unavailable in some locked-down browser contexts. */
    }
  }

  function frameState() {
    return {
      activeIndex: state.activeIndex,
      hidden: player.hidden,
      playing: !audio.paused,
      mode: mode.textContent,
      currentTime: audio.currentTime,
      duration: audio.duration,
      minimized: state.minimized === true,
      minimizedPosition: normalizePlayerPosition(state.minimizedPosition)
    };
  }

  function broadcastState() {
    const message = { vaultAudioState: frameState() };
    document.querySelectorAll("iframe").forEach((frame) => {
      try {
        frame.contentWindow.postMessage(message, "*");
      } catch {
        /* The frame may not be ready yet. */
      }
    });
  }

  function emit() {
    const snapshot = getState();
    listeners.forEach((listener) => listener(snapshot));
    broadcastState();
  }

  function setAudioTime(value) {
    if (!Number.isFinite(value) || value <= 0) return;
    try {
      audio.currentTime = value;
    } catch {
      audio.addEventListener("loadedmetadata", () => {
        try { audio.currentTime = value; } catch {}
      }, { once: true });
    }
  }

  function updateTrack(modeText) {
    const track = tracks[state.activeIndex] || tracks[0];
    cover.src = track.cover;
    cover.alt = track.title + " soundtrack cover";
    title.textContent = track.title;
    mode.textContent = modeText || state.mode || "Ready to play";
    if (!audio.src || audio.src !== track.file) {
      audio.src = track.file;
      setAudioTime(state.currentTime);
    }
    emit();
  }


  function setMinimized(isMinimized) {
    state.minimized = isMinimized === true;
    player.classList.toggle("minimized", state.minimized);
    minimizeButton.textContent = state.minimized ? "+" : "-";
    minimizeButton.setAttribute("aria-label", state.minimized ? "Expand audio player" : "Minimize audio player");
    if (state.minimized) {
      requestAnimationFrame(applyMinimizedPosition);
    } else {
      clearPlayerPosition();
    }
    saveState();
    broadcastState();
  }
  function setVisible(isVisible) {
    player.hidden = !isVisible;
    if (isVisible && state.minimized) requestAnimationFrame(applyMinimizedPosition);
    saveState();
    broadcastState();
  }

  let playerDrag = null;

  function startPlayerDrag(event) {
    if (!state.minimized || player.hidden) return;
    if (event.button !== undefined && event.button !== 0) return;
    const dragTarget = event.target;
    if (!dragTarget || typeof dragTarget.closest !== "function") return;
    if (dragTarget.closest("button, input, a")) return;

    const rect = player.getBoundingClientRect();
    playerDrag = {
      pointerId: event.pointerId,
      offsetX: event.clientX - rect.left,
      offsetY: event.clientY - rect.top
    };
    player.classList.add("dragging");
    try { player.setPointerCapture(event.pointerId); } catch {}
    event.preventDefault();
  }

  function movePlayerDrag(event) {
    if (!playerDrag || event.pointerId !== playerDrag.pointerId) return;
    state.minimizedPosition = clampPlayerPosition({
      x: event.clientX - playerDrag.offsetX,
      y: event.clientY - playerDrag.offsetY
    });
    applyMinimizedPosition();
  }

  function endPlayerDrag(event) {
    if (!playerDrag || event.pointerId !== playerDrag.pointerId) return;
    try { player.releasePointerCapture(event.pointerId); } catch {}
    player.classList.remove("dragging");
    playerDrag = null;
    saveState();
  }

  function loadTrack(index, shouldPlay, modeName) {
    state.activeIndex = (index + tracks.length) % tracks.length;
    state.mode = modeName === "preview"
      ? "Previewing first " + PREVIEW_SECONDS + " seconds"
      : "Full soundtrack selected";
    previewMode = modeName === "preview";
    previewStart = 0;
    previewEnd = PREVIEW_SECONDS;
    state.currentTime = 0;
    setVisible(true);
    updateTrack(state.mode);
    audio.currentTime = previewStart;

    if (shouldPlay) {
      audio.play().catch(() => {
        mode.textContent = "Tap play to start audio";
      });
    }

    saveState();
  }

  function playFull(index = state.activeIndex) {
    loadTrack(index, true, "full");
  }

  function previewTrack(index = state.activeIndex) {
    loadTrack(index, true, "preview");
  }

  function selectTrack(index = state.activeIndex) {
    state.activeIndex = (index + tracks.length) % tracks.length;
    previewMode = false;
    state.mode = "Ready to play";
    state.currentTime = 0;
    setVisible(true);
    updateTrack(state.mode);
    audio.currentTime = 0;
    saveState();
  }

  function closePlayer() {
    audio.pause();
    setVisible(false);
    document.body.classList.remove("vault-player-playing");
    saveState();
  }

  function updateProgress() {
    current.textContent = formatTime(audio.currentTime);
    duration.textContent = formatTime(audio.duration);
    if (Number.isFinite(audio.duration) && audio.duration > 0) {
      seek.value = String((audio.currentTime / audio.duration) * 100);
    } else {
      seek.value = "0";
    }
    saveState();
    broadcastState();
  }

  function getState() {
    return {
      activeIndex: state.activeIndex,
      track: tracks[state.activeIndex],
      hidden: player.hidden,
      playing: !audio.paused,
      mode: mode.textContent,
      currentTime: audio.currentTime,
      duration: audio.duration,
      minimized: state.minimized === true,
      minimizedPosition: normalizePlayerPosition(state.minimizedPosition)
    };
  }

  function tryAutoResume() {
    if (!state.wasPlaying || state.hidden) return;

    setVisible(true);
    const resume = () => {
      setAudioTime(state.currentTime);
      audio.play().catch(() => {
        mode.textContent = "Tap play to resume audio";
      });
    };

    if (audio.readyState >= 1) {
      resume();
    } else {
      audio.addEventListener("loadedmetadata", resume, { once: true });
    }
  }

  player.querySelector("[data-vault-toggle]").addEventListener("click", () => {
    setVisible(true);
    if (!audio.src) updateTrack("Ready to play");
    if (audio.paused) {
      audio.play().catch(() => {
        mode.textContent = "Tap play to start audio";
      });
    } else {
      audio.pause();
    }
  });

  minimizeButton.addEventListener("click", () => setMinimized(!state.minimized));
  player.addEventListener("pointerdown", startPlayerDrag);
  player.addEventListener("pointermove", movePlayerDrag);
  player.addEventListener("pointerup", endPlayerDrag);
  player.addEventListener("pointercancel", endPlayerDrag);
  player.querySelector("[data-vault-prev]").addEventListener("click", () => playFull(state.activeIndex - 1));
  player.querySelector("[data-vault-next]").addEventListener("click", () => playFull(state.activeIndex + 1));
  player.querySelector("[data-vault-close]").addEventListener("click", closePlayer);

  seek.addEventListener("input", () => {
    if (!Number.isFinite(audio.duration) || audio.duration <= 0) return;
    audio.currentTime = (Number(seek.value) / 100) * audio.duration;
  });

  audio.addEventListener("timeupdate", () => {
    if (previewMode && audio.currentTime >= previewEnd) {
      audio.pause();
      audio.currentTime = previewStart;
      mode.textContent = "Preview complete";
      previewMode = false;
    }
    updateProgress();
  });

  audio.addEventListener("loadedmetadata", updateProgress);
  audio.addEventListener("play", () => {
    mode.textContent = previewMode ? "Previewing first " + PREVIEW_SECONDS + " seconds" : "Playing full soundtrack";
    document.body.classList.add("vault-player-playing");
    saveState();
    emit();
  });
  audio.addEventListener("pause", () => {
    document.body.classList.remove("vault-player-playing");
    saveState();
    emit();
  });
  audio.addEventListener("ended", () => {
    previewMode = false;
    document.body.classList.remove("vault-player-playing");
    mode.textContent = "Playback complete";
    saveState();
    emit();
  });

  window.addEventListener("pagehide", saveState);
  window.addEventListener("beforeunload", saveState);
  window.addEventListener("resize", () => {
    if (!state.minimized || !state.minimizedPosition) return;
    applyMinimizedPosition();
    saveState();
  });

  window.addEventListener("message", (event) => {
    const data = event.data || {};
    switch (data.vaultAudioAction) {
      case "playFull":
        playFull(Number(data.index));
        break;
      case "previewTrack":
        previewTrack(Number(data.index));
        break;
      case "selectTrack":
        selectTrack(Number(data.index));
        break;
      case "close":
        closePlayer();
        break;
      case "requestState":
        broadcastState();
        break;
      default:
        break;
    }
  });

  document.addEventListener("click", (event) => {
    const previewButton = event.target.closest("[data-vault-preview-index]");
    if (previewButton) {
      previewTrack(Number(previewButton.dataset.vaultPreviewIndex));
      return;
    }

    const playButton = event.target.closest("[data-vault-play-index]");
    if (playButton) {
      playFull(Number(playButton.dataset.vaultPlayIndex));
      return;
    }

    const selectedRow = event.target.closest("[data-vault-select-index]");
    if (selectedRow && !event.target.closest("button, a")) {
      selectTrack(Number(selectedRow.dataset.vaultSelectIndex));
    }

    if (event.target.closest("[data-vault-preview]")) {
      previewTrack(state.activeIndex);
      return;
    }

    if (event.target.closest("[data-vault-play-full]")) {
      playFull(state.activeIndex);
    }
  });

  setMinimized(state.minimized);
  updateTrack(state.wasPlaying && !state.hidden ? "Resuming audio" : state.mode);
  if (!state.hidden) setVisible(true);
  tryAutoResume();

  window.VaultAudioPlayer = {
    tracks,
    formatTime,
    playFull,
    previewTrack,
    selectTrack,
    close: closePlayer,
    getState,
    onChange(listener) {
      listeners.add(listener);
      listener(getState());
      return () => listeners.delete(listener);
    }
  };
})();




