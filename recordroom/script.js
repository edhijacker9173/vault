const tracks = [
  {
    title: "Cosmos",
    file: "sounds/Cosmos.mp3",
    cover: "assets/cosmos.jpg",
    desc: "A luminous dream-score file for scale, silence, drifting light, and impossible distance.",
    shelf: "Dream Ledger score"
  },
  {
    title: "Metroid",
    file: "sounds/Metroid.mp3",
    cover: "assets/metroid.jpg",
    desc: "Neon pursuit, hot machinery, alien corridors, and the pressure of motion.",
    shelf: "Dream Ledger score"
  },
  {
    title: "Warp Gate 2050",
    file: "sounds/Warp Gate 2050.mp3",
    cover: "assets/warp-gate-2050.jpg",
    desc: "A future-portal pulse with bright synthetic movement and cinematic lift.",
    shelf: "Future archive"
  },
  {
    title: "Black Magic",
    file: "sounds/Black Magic.mp3",
    cover: "assets/black-magic.jpg",
    desc: "Dark ritual tones, low-lit atmosphere, and a slow occult groove.",
    shelf: "Occult shelf"
  },
  {
    title: "Voodoo Alley",
    file: "sounds/Voodoo Alley.mp3",
    cover: "assets/voodoo-alley.jpg",
    desc: "Backstreet rhythm, shadowy brass, and a humid midnight cadence.",
    shelf: "Nocturne file"
  },
  {
    title: "Fuego del Corazón",
    file: "sounds/Fuego del Corazón.mp3",
    cover: "assets/fuego-del-coraz-n.jpg",
    desc: "A warm ember-lit track with Latin fire, close-room rhythm, and late-night movement.",
    shelf: "Bar room cut"
  }
];

const PREVIEW_SECONDS = 15;
const audio = document.getElementById("record-audio");
const table = document.getElementById("record-table");
const featuredTitle = document.getElementById("featured-title");
const featuredDesc = document.getElementById("featured-desc");
const playerCover = document.getElementById("player-cover");
const playerTitle = document.getElementById("player-title");
const playerMode = document.getElementById("player-mode");
const toggleButton = document.querySelector("[data-toggle-play]");
const seek = document.getElementById("seek");
const currentTime = document.getElementById("current-time");
const duration = document.getElementById("duration");

let activeIndex = 0;
let previewMode = false;
let previewStart = 0;
let previewEnd = PREVIEW_SECONDS;

function formatTime(value) {
  if (!Number.isFinite(value)) return "0:00";
  const minutes = Math.floor(value / 60);
  const seconds = Math.floor(value % 60).toString().padStart(2, "0");
  return minutes + ":" + seconds;
}

function sourceFor(track) {
  return track.file;
}

function setActiveTrack(index, modeText = "Ready to play") {
  activeIndex = index;
  const track = tracks[index];

  featuredTitle.textContent = track.title;
  featuredDesc.textContent = track.desc;
  playerCover.src = track.cover;
  playerCover.alt = track.title + " soundtrack cover";
  playerTitle.textContent = track.title;
  playerMode.textContent = modeText;

  document.querySelectorAll(".record-row").forEach((row) => {
    row.classList.toggle("active", Number(row.dataset.index) === index);
  });
}

function loadTrack(index, shouldPlay, mode) {
  const track = tracks[index];
  previewMode = mode === "preview";
  previewStart = 0;
  previewEnd = PREVIEW_SECONDS;
  setActiveTrack(index, previewMode ? "Previewing first " + PREVIEW_SECONDS + " seconds" : "Full soundtrack selected");

  audio.src = sourceFor(track);
  audio.currentTime = previewStart;
  if (shouldPlay) {
    audio.play().catch(() => {
      playerMode.textContent = "Tap play to start audio";
    });
  }
}

function playFull(index = activeIndex) {
  loadTrack(index, true, "full");
}

function previewTrack(index = activeIndex) {
  loadTrack(index, true, "preview");
}

function renderTracks() {
  table.innerHTML = tracks.map((track, index) => {
    const activeClass = index === activeIndex ? " active" : "";
    const number = String(index + 1).padStart(2, "0");
    return "<article class=\"record-row" + activeClass + "\" data-index=\"" + index + "\">" +
      "<span class=\"record-row-number\">" + number + "</span>" +
      "<img src=\"" + track.cover + "\" alt=\"" + track.title + " soundtrack cover\" />" +
      "<div><strong>" + track.title + "</strong><small>" + track.desc + "</small></div>" +
      "<span class=\"record-duration\" data-duration-index=\"" + index + "\">" + track.shelf + " / --:--</span>" +
      "<div class=\"row-actions\">" +
      "<button class=\"record-pill\" type=\"button\" data-preview-index=\"" + index + "\">Preview</button>" +
      "<button class=\"record-pill accent\" type=\"button\" data-play-index=\"" + index + "\">Play full</button>" +
      "</div></article>";
  }).join("");

  table.querySelectorAll("[data-preview-index]").forEach((button) => {
    button.addEventListener("click", () => previewTrack(Number(button.dataset.previewIndex)));
  });

  table.querySelectorAll("[data-play-index]").forEach((button) => {
    button.addEventListener("click", () => playFull(Number(button.dataset.playIndex)));
  });

  table.querySelectorAll(".record-row").forEach((row) => {
    row.addEventListener("click", (event) => {
      if (event.target.closest("button")) return;
      setActiveTrack(Number(row.dataset.index));
    });
  });
}

function loadDurations() {
  tracks.forEach((track, index) => {
    const probe = new Audio(sourceFor(track));
    probe.preload = "metadata";
    probe.addEventListener("loadedmetadata", () => {
      const target = document.querySelector("[data-duration-index=\"" + index + "\"]");
      if (target) target.textContent = track.shelf + " / " + formatTime(probe.duration);
    });
  });
}

function updateProgress() {
  currentTime.textContent = formatTime(audio.currentTime);
  duration.textContent = formatTime(audio.duration);
  if (Number.isFinite(audio.duration) && audio.duration > 0) {
    seek.value = String((audio.currentTime / audio.duration) * 100);
  } else {
    seek.value = "0";
  }
}

function updatePlayingState() {
  document.body.classList.toggle("playing", !audio.paused);
}

document.querySelectorAll("[data-play-full]").forEach((button) => {
  button.addEventListener("click", () => playFull(activeIndex));
});

document.querySelector("[data-preview]").addEventListener("click", () => previewTrack(activeIndex));

toggleButton.addEventListener("click", () => {
  if (!audio.src) {
    playFull(activeIndex);
    return;
  }
  if (audio.paused) {
    audio.play().catch(() => {
      playerMode.textContent = "Tap play to start audio";
    });
  } else {
    audio.pause();
  }
});

document.querySelector("[data-prev]").addEventListener("click", () => {
  const nextIndex = (activeIndex - 1 + tracks.length) % tracks.length;
  playFull(nextIndex);
});

document.querySelector("[data-next]").addEventListener("click", () => {
  const nextIndex = (activeIndex + 1) % tracks.length;
  playFull(nextIndex);
});

seek.addEventListener("input", () => {
  if (!Number.isFinite(audio.duration) || audio.duration <= 0) return;
  audio.currentTime = (Number(seek.value) / 100) * audio.duration;
});

audio.addEventListener("timeupdate", () => {
  if (previewMode && audio.currentTime >= previewEnd) {
    audio.pause();
    audio.currentTime = previewStart;
    playerMode.textContent = "Preview complete";
    previewMode = false;
  }
  updateProgress();
});

audio.addEventListener("loadedmetadata", updateProgress);
audio.addEventListener("play", () => {
  playerMode.textContent = previewMode ? "Previewing first " + PREVIEW_SECONDS + " seconds" : "Playing full soundtrack";
  updatePlayingState();
});
audio.addEventListener("pause", updatePlayingState);
audio.addEventListener("ended", () => {
  previewMode = false;
  updatePlayingState();
  playerMode.textContent = "Playback complete";
});

renderTracks();
loadDurations();
setActiveTrack(0);
audio.src = sourceFor(tracks[0]);
