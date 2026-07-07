const PREVIEW_SECONDS = 15;
const table = document.getElementById("record-table");
const featuredTitle = document.getElementById("featured-title");
const featuredDesc = document.getElementById("featured-desc");

const player = window.VaultAudioPlayer;
const tracks = player ? player.tracks : [];

function renderTracks() {
  if (!table || !player) return;

  table.innerHTML = tracks.map((track, index) => {
    const number = String(index + 1).padStart(2, "0");
    return "<article class=\"record-row\" data-vault-select-index=\"" + index + "\">" +
      "<span class=\"record-row-number\">" + number + "</span>" +
      "<img src=\"" + track.cover + "\" alt=\"" + track.title + " soundtrack cover\" />" +
      "<div><strong>" + track.title + "</strong><small>" + track.desc + "</small></div>" +
      "<span class=\"record-duration\" data-duration-index=\"" + index + "\">" + track.shelf + " / --:--</span>" +
      "<div class=\"row-actions\">" +
      "<button class=\"record-pill\" type=\"button\" data-vault-preview-index=\"" + index + "\">Preview</button>" +
      "<button class=\"record-pill accent\" type=\"button\" data-vault-play-index=\"" + index + "\">Play full</button>" +
      "</div></article>";
  }).join("");
}

function loadDurations() {
  tracks.forEach((track, index) => {
    const probe = new Audio(track.file);
    probe.preload = "metadata";
    probe.addEventListener("loadedmetadata", () => {
      const target = document.querySelector("[data-duration-index=\"" + index + "\"]");
      if (target) target.textContent = track.shelf + " / " + player.formatTime(probe.duration);
    });
  });
}

function syncRecordRoom(state) {
  if (!state || !state.track) return;

  if (featuredTitle) featuredTitle.textContent = state.track.title;
  if (featuredDesc) featuredDesc.textContent = state.track.desc;

  document.querySelectorAll(".record-row").forEach((row) => {
    row.classList.toggle("active", Number(row.dataset.vaultSelectIndex) === state.activeIndex);
  });
}

if (player) {
  renderTracks();
  loadDurations();
  const stopSync = player.onChange(syncRecordRoom);
  window.addEventListener("pagehide", stopSync, { once: true });

  document.querySelectorAll("[data-record-play-full]").forEach((button) => {
    button.addEventListener("click", () => player.playFull(player.getState().activeIndex));
  });

  document.querySelectorAll("[data-record-preview]").forEach((button) => {
    button.addEventListener("click", () => player.previewTrack(player.getState().activeIndex));
  });
}


