/* The King Shelf - interactivity layer */

(function () {
  "use strict";

  (function themeInit() {
    const toggle = document.querySelector("[data-theme-toggle]");
    const root = document.documentElement;
    let mode = "dark";
    root.setAttribute("data-theme", mode);
    paintIcon();

    function paintIcon() {
      if (!toggle) return;
      toggle.setAttribute(
        "aria-label",
        "Switch to " + (mode === "dark" ? "light" : "dark") + " mode"
      );
      toggle.innerHTML =
        mode === "dark"
          ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>'
          : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
    }

    if (toggle) {
      toggle.addEventListener("click", () => {
        mode = mode === "dark" ? "light" : "dark";
        root.setAttribute("data-theme", mode);
        paintIcon();
      });
    }
  })();

  const stories = Array.isArray(window.STORIES) ? window.STORIES.slice() : [];

  const state = {
    q: "",
    sort: "written-asc",
    entity: "",
    theme: ""
  };

  const $cards = document.getElementById("cards");
  const $count = document.getElementById("count");
  const $total = document.getElementById("total");
  const $empty = document.getElementById("empty");
  const $q = document.getElementById("q");
  const $sort = document.getElementById("sort");
  const $entityFilter = document.getElementById("entityFilter");
  const $themeFilter = document.getElementById("themeFilter");
  const $reset = document.getElementById("reset");
  const $emptyReset = document.getElementById("emptyReset");
  const $entityChips = document.getElementById("entityChips");
  const $svg = document.getElementById("networkSvg");

  const entityCounts = new Map();
  const themeCounts = new Map();

  stories.forEach((s) => {
    (s.entities || []).forEach((e) => {
      const k = entityKey(e);
      entityCounts.set(k, (entityCounts.get(k) || 0) + 1);
    });
    (s.themes || []).forEach((theme) => {
      themeCounts.set(theme, (themeCounts.get(theme) || 0) + 1);
    });
  });

  $total.textContent = stories.length;
  setStat("stories", stories.length);
  setStat("entities", entityCounts.size);

  if (stories.length) {
    const years = stories.map((s) => s.writtenYear).filter(Number.isFinite);
    const minY = Math.min(...years);
    const maxY = Math.max(...years);
    setStat("years", maxY - minY + 1);
  } else {
    setStat("years", 0);
  }

  populateSelect($entityFilter, entityCounts);
  populateSelect($themeFilter, themeCounts);

  function setStat(name, value) {
    const el = document.querySelector(`[data-stat="${name}"]`);
    if (el) el.textContent = value;
  }

  function populateSelect(select, map) {
    const items = [...map.entries()].sort(
      (a, b) => b[1] - a[1] || a[0].localeCompare(b[0])
    );
    items.forEach(([name, count]) => {
      const option = document.createElement("option");
      option.value = name;
      option.textContent = `${name} (${count})`;
      select.appendChild(option);
    });
  }

  const monthName = (n) =>
    [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ][n - 1];

  function fmtDate(raw) {
    if (!raw) return "Unknown";
    const match = String(raw).match(/^(\d{4})(?:-(\d{2}))?/);
    if (!match) return raw;
    return match[2] ? `${monthName(Number(match[2]))} ${match[1]}` : match[1];
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function entityKey(name) {
    return String(name).replace(/\s*\(.+\)\s*$/, "").trim();
  }

  function cmpDate(a, b) {
    if (!a && !b) return 0;
    if (!a) return 1;
    if (!b) return -1;
    return String(a).localeCompare(String(b));
  }

  function getFiltered() {
    const q = state.q.trim().toLowerCase();
    const list = stories.filter((s) => {
      if (state.entity && !(s.entities || []).some((e) => entityKey(e) === state.entity)) {
        return false;
      }
      if (state.theme && !(s.themes || []).includes(state.theme)) {
        return false;
      }
      if (!q) return true;

      const haystack = [
        s.title,
        s.summary,
        s.venue,
        s.note,
        (s.entities || []).join(" "),
        (s.themes || []).join(" "),
        (s.locations || []).join(" "),
        (s.artifacts || []).join(" ")
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return haystack.includes(q);
    });

    const sorters = {
      "written-asc": (a, b) => cmpDate(a.written, b.written) || a.title.localeCompare(b.title),
      "written-desc": (a, b) => cmpDate(b.written, a.written) || a.title.localeCompare(b.title),
      "published-asc": (a, b) => cmpDate(a.published, b.published) || a.title.localeCompare(b.title),
      "published-desc": (a, b) => cmpDate(b.published, a.published) || a.title.localeCompare(b.title),
      "title-asc": (a, b) => a.title.localeCompare(b.title),
      "title-desc": (a, b) => b.title.localeCompare(a.title),
      "entities-desc": (a, b) => (b.entities?.length || 0) - (a.entities?.length || 0) || a.title.localeCompare(b.title),
      "entities-asc": (a, b) => (a.entities?.length || 0) - (b.entities?.length || 0) || a.title.localeCompare(b.title),
      "venue-asc": (a, b) => a.venue.localeCompare(b.venue) || cmpDate(a.published, b.published)
    };

    list.sort(sorters[state.sort] || sorters["written-asc"]);
    return list;
  }

  function render() {
    const list = getFiltered();
    $count.textContent = list.length;
    $empty.hidden = list.length !== 0;
    $cards.setAttribute("aria-busy", "true");
    $cards.innerHTML = list.map(renderCard).join("");
    $cards.setAttribute("aria-busy", "false");
    renderChipsState();
    renderNetworkHighlight();
  }

  function renderCard(s) {
    const threadTags = (s.entities || [])
      .map((e) => `<button class="tag entity" data-entity="${escapeHtml(entityKey(e))}" type="button">${escapeHtml(e)}</button>`)
      .join("");
    const themeTags = (s.themes || [])
      .map((theme) => `<button class="tag theme" data-theme-tag="${escapeHtml(theme)}" type="button">${escapeHtml(theme)}</button>`)
      .join("");
    const settings = (s.locations || [])
      .map((place) => `<span class="tag plain">${escapeHtml(place)}</span>`)
      .join("");
    const notes = (s.artifacts || [])
      .map((item) => `<span class="tag plain">${escapeHtml(item)}</span>`)
      .join("");

    return `
      <li class="card" data-id="${escapeHtml(s.id)}">
        <div class="card-top">
          <div>
            <h3 class="card-title">${escapeHtml(s.title)}</h3>
            <p class="card-venue">${escapeHtml(s.venue)}</p>
          </div>
          <div class="card-dates" aria-label="Release details">
            <span>Released <b>${fmtDate(s.published || s.written)}</b></span>
            <span>Year <b>${escapeHtml(s.publishedYear || s.writtenYear || "")}</b></span>
          </div>
        </div>

        <p class="card-summary">${escapeHtml(s.summary)}</p>

        <div class="card-meta">
          <div class="meta-row">
            <span class="meta-label">Threads</span>
            ${threadTags || '<span class="tag plain">None</span>'}
          </div>
          ${
            settings
              ? `<div class="meta-row"><span class="meta-label">Settings</span>${settings}</div>`
              : ""
          }
          ${
            notes
              ? `<div class="meta-row"><span class="meta-label">Notes</span>${notes}</div>`
              : ""
          }
          <div class="meta-row">
            <span class="meta-label">Themes</span>
            ${themeTags || '<span class="tag plain">Unclassified</span>'}
          </div>
        </div>

        <div class="card-foot">
          <span class="note">${s.note ? escapeHtml(s.note) : ""}</span>
          <a class="card-source" href="${escapeHtml(s.sourceUrl)}" target="_blank" rel="noopener" title="Open official Stephen King Written Works list">
            Source
          </a>
        </div>
      </li>`;
  }

  function renderChips() {
    const items = [...entityCounts.entries()].sort(
      (a, b) => b[1] - a[1] || a[0].localeCompare(b[0])
    );
    $entityChips.innerHTML = items
      .map(
        ([name, count]) => `
        <button type="button" class="entity-chip" data-entity-chip="${escapeHtml(name)}" role="listitem">
          <span>${escapeHtml(name)}</span>
          <span class="count">${count}</span>
        </button>`
      )
      .join("");
  }

  function renderChipsState() {
    $entityChips.querySelectorAll("[data-entity-chip]").forEach((chip) => {
      chip.classList.toggle("active", chip.dataset.entityChip === state.entity);
    });
  }

  function renderNetwork() {
    const W = 1000;
    const padX = 30;
    const padY = 42;
    const rowGap = 28;
    const entities = [...entityCounts.entries()].sort(
      (a, b) => b[1] - a[1] || a[0].localeCompare(b[0])
    );
    const worksSorted = stories.slice().sort((a, b) => {
      return (a.writtenYear || 0) - (b.writtenYear || 0) || a.title.localeCompare(b.title);
    });
    const H = Math.max(620, (Math.max(entities.length, worksSorted.length) - 1) * rowGap + padY * 2);

    $svg.setAttribute("viewBox", `0 0 ${W} ${H}`);
    $svg.style.aspectRatio = `${W} / ${H}`;

    const entityGap = (H - padY * 2) / Math.max(entities.length - 1, 1);
    const workGap = (H - padY * 2) / Math.max(worksSorted.length - 1, 1);

    const entityPos = new Map();
    entities.forEach(([name], i) => {
      entityPos.set(name, { x: padX + 155, y: padY + i * entityGap });
    });

    const workPos = new Map();
    worksSorted.forEach((workItem, i) => {
      workPos.set(workItem.id, { x: W - padX - 230, y: padY + i * workGap });
    });

    const edges = [];
    worksSorted.forEach((workItem) => {
      (workItem.entities || []).forEach((entity) => {
        const key = entityKey(entity);
        if (entityPos.has(key)) edges.push({ entity: key, work: workItem.id });
      });
    });

    const linkPaths = edges
      .map((edge) => {
        const a = entityPos.get(edge.entity);
        const b = workPos.get(edge.work);
        const mid = (a.x + b.x) / 2;
        const d = `M${a.x},${a.y} C${mid},${a.y} ${mid},${b.y} ${b.x},${b.y}`;
        return `<path class="net-link" data-entity="${escapeHtml(edge.entity)}" data-story="${escapeHtml(edge.work)}" d="${d}" fill="none" stroke-width="1.1"/>`;
      })
      .join("");

    const entityNodes = entities
      .map(([name, count]) => {
        const p = entityPos.get(name);
        const r = 4 + Math.min(count, 6);
        const plural = count === 1 ? "work" : "works";
        return `<g class="net-entity" data-entity="${escapeHtml(name)}" tabindex="0" role="button" aria-label="${escapeHtml(name)}, in ${count} ${plural}">
          <circle cx="${p.x}" cy="${p.y}" r="${r}"/>
          <text x="${p.x - 10}" y="${p.y + 4}" text-anchor="end">${escapeHtml(name)}</text>
        </g>`;
      })
      .join("");

    const workNodes = worksSorted
      .map((workItem) => {
        const p = workPos.get(workItem.id);
        return `<g class="net-story" data-story="${escapeHtml(workItem.id)}" tabindex="0" role="link" aria-label="${escapeHtml(workItem.title)}, ${escapeHtml(workItem.writtenYear)}">
          <circle cx="${p.x}" cy="${p.y}" r="4"/>
          <text x="${p.x + 10}" y="${p.y + 4}">${escapeHtml(workItem.title)} <tspan fill="currentColor" opacity="0.5">- ${escapeHtml(workItem.writtenYear)}</tspan></text>
        </g>`;
      })
      .join("");

    const labels = `
      <text x="${padX + 155}" y="20" text-anchor="end" fill="currentColor" opacity="0.5" font-family="ui-monospace, JetBrains Mono, monospace" font-size="10" letter-spacing="2">THREADS</text>
      <text x="${W - padX - 230}" y="20" fill="currentColor" opacity="0.5" font-family="ui-monospace, JetBrains Mono, monospace" font-size="10" letter-spacing="2">WORKS</text>
    `;

    $svg.innerHTML = labels + linkPaths + workNodes + entityNodes;
  }

  function renderNetworkHighlight() {
    const active = state.entity;
    const filteredIds = new Set(getFiltered().map((s) => s.id));

    $svg.querySelectorAll(".net-entity").forEach((node) => {
      const isActive = active && node.dataset.entity === active;
      const involved = !active || node.dataset.entity === active;
      node.classList.toggle("active", Boolean(isActive));
      node.classList.toggle("faded", !involved);
    });

    $svg.querySelectorAll(".net-story").forEach((node) => {
      node.classList.toggle("faded", !filteredIds.has(node.dataset.story));
    });

    $svg.querySelectorAll(".net-link").forEach((path) => {
      const inResults = filteredIds.has(path.dataset.story);
      const matchEntity = !active || path.dataset.entity === active;
      const visible = inResults && matchEntity;
      path.classList.toggle("active", Boolean(active && matchEntity && inResults));
      path.classList.toggle("faded", !visible);
    });
  }

  let qTimer;
  $q.addEventListener("input", (event) => {
    clearTimeout(qTimer);
    qTimer = setTimeout(() => {
      state.q = event.target.value;
      render();
    }, 120);
  });

  $sort.addEventListener("change", (event) => {
    state.sort = event.target.value;
    render();
  });

  $entityFilter.addEventListener("change", (event) => {
    state.entity = event.target.value;
    render();
  });

  $themeFilter.addEventListener("change", (event) => {
    state.theme = event.target.value;
    render();
  });

  function resetAll() {
    state.q = "";
    state.sort = "written-asc";
    state.entity = "";
    state.theme = "";
    $q.value = "";
    $sort.value = "written-asc";
    $entityFilter.value = "";
    $themeFilter.value = "";
    render();
  }

  $reset.addEventListener("click", resetAll);
  $emptyReset.addEventListener("click", resetAll);

  document.addEventListener("click", (event) => {
    const entityButton = event.target.closest("[data-entity]");
    if (entityButton) {
      const name = entityButton.dataset.entity;
      state.entity = state.entity === name ? "" : name;
      $entityFilter.value = state.entity;
      render();
      if (entityButton.closest("#networkSvg")) {
        document.getElementById("timeline").scrollIntoView({ behavior: "smooth", block: "start" });
      }
      return;
    }

    const themeButton = event.target.closest("[data-theme-tag]");
    if (themeButton) {
      const value = themeButton.dataset.themeTag;
      state.theme = state.theme === value ? "" : value;
      $themeFilter.value = state.theme;
      render();
      return;
    }

    const chip = event.target.closest("[data-entity-chip]");
    if (chip) {
      const name = chip.dataset.entityChip;
      state.entity = state.entity === name ? "" : name;
      $entityFilter.value = state.entity;
      render();
      document.getElementById("timeline").scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    const workNode = event.target.closest(".net-story");
    if (workNode) {
      const card = document.querySelector(`.card[data-id="${CSS.escape(workNode.dataset.story)}"]`);
      if (!card) return;
      card.scrollIntoView({ behavior: "smooth", block: "center" });
      card.style.transition = "outline-color 1.4s";
      card.style.outline = "2px solid var(--color-primary)";
      card.style.outlineOffset = "4px";
      setTimeout(() => {
        card.style.outline = "none";
      }, 1400);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    const target = event.target;
    if (target.classList && (target.classList.contains("net-entity") || target.classList.contains("net-story"))) {
      event.preventDefault();
      target.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    }
  });

  renderChips();
  renderNetwork();
  render();
})();
