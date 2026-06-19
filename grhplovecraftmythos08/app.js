/* The Mythos Concordance — interactivity layer */

(function () {
  "use strict";

  /* ---------------------- Theme toggle ---------------------- */
  (function themeInit() {
    const t = document.querySelector("[data-theme-toggle]");
    const root = document.documentElement;
    let mode = matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "dark";
    // default to dark for art direction; user can switch.
    root.setAttribute("data-theme", mode);
    paintIcon();

    function paintIcon() {
      if (!t) return;
      t.setAttribute(
        "aria-label",
        "Switch to " + (mode === "dark" ? "light" : "dark") + " mode"
      );
      t.innerHTML =
        mode === "dark"
          ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>'
          : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
    }

    t &&
      t.addEventListener("click", () => {
        mode = mode === "dark" ? "light" : "dark";
        root.setAttribute("data-theme", mode);
        paintIcon();
      });
  })();

  /* ---------------------- State ---------------------- */
  const stories = window.STORIES.slice();

  const state = {
    q: "",
    sort: "written-asc",
    entity: "",
    theme: ""
  };

  /* ---------------------- Refs ---------------------- */
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

  $total.textContent = stories.length;
  document.querySelector('[data-stat="stories"]').textContent = stories.length;

  /* ---------------------- Derive entity / theme catalogue ---------------------- */
  const entityCounts = new Map();
  const themeCounts = new Map();
  stories.forEach((s) => {
    (s.entities || []).forEach((e) => {
      const k = e.replace(/\s*\(.+\)\s*$/, "").trim();
      entityCounts.set(k, (entityCounts.get(k) || 0) + 1);
    });
    (s.themes || []).forEach((th) =>
      themeCounts.set(th, (themeCounts.get(th) || 0) + 1)
    );
  });
  document.querySelector('[data-stat="entities"]').textContent = entityCounts.size;
  const minY = Math.min(...stories.map((s) => s.writtenYear));
  const maxY = Math.max(...stories.map((s) => s.writtenYear));
  document.querySelector('[data-stat="years"]').textContent = maxY - minY;

  // Populate dropdowns (sorted by frequency desc, then alpha)
  function populateSelect(sel, map) {
    const items = [...map.entries()].sort(
      (a, b) => b[1] - a[1] || a[0].localeCompare(b[0])
    );
    items.forEach(([name, count]) => {
      const o = document.createElement("option");
      o.value = name;
      o.textContent = `${name}  (${count})`;
      sel.appendChild(o);
    });
  }
  populateSelect($entityFilter, entityCounts);
  populateSelect($themeFilter, themeCounts);

  /* ---------------------- Helpers ---------------------- */
  const monthName = (n) =>
    [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ][n - 1];

  function fmtDate(raw) {
    if (!raw) return "—";
    const m = raw.match(/^(\d{4})(?:-(\d{2}))?/);
    if (!m) return raw;
    return m[2] ? `${monthName(+m[2])} ${m[1]}` : m[1];
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;")
      .replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  function entityKey(name) {
    return name.replace(/\s*\(.+\)\s*$/, "").trim();
  }

  /* ---------------------- Filter + sort ---------------------- */
  function getFiltered() {
    const q = state.q.trim().toLowerCase();
    let list = stories.filter((s) => {
      if (state.entity) {
        const has = (s.entities || []).some(
          (e) => entityKey(e) === state.entity
        );
        if (!has) return false;
      }
      if (state.theme) {
        if (!(s.themes || []).includes(state.theme)) return false;
      }
      if (q) {
        const hay = [
          s.title,
          s.summary,
          s.venue,
          (s.entities || []).join(" "),
          (s.themes || []).join(" "),
          (s.locations || []).join(" "),
          (s.artifacts || []).join(" "),
          s.note
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });

    const sorters = {
      "written-asc":   (a, b) => cmpDate(a.written, b.written) || a.title.localeCompare(b.title),
      "written-desc":  (a, b) => cmpDate(b.written, a.written) || a.title.localeCompare(b.title),
      "published-asc": (a, b) => cmpDate(a.published, b.published) || a.title.localeCompare(b.title),
      "published-desc":(a, b) => cmpDate(b.published, a.published) || a.title.localeCompare(b.title),
      "title-asc":     (a, b) => a.title.localeCompare(b.title),
      "title-desc":    (a, b) => b.title.localeCompare(a.title),
      "entities-desc": (a, b) => (b.entities?.length || 0) - (a.entities?.length || 0) || a.title.localeCompare(b.title),
      "entities-asc":  (a, b) => (a.entities?.length || 0) - (b.entities?.length || 0) || a.title.localeCompare(b.title),
      "venue-asc":     (a, b) => a.venue.localeCompare(b.venue) || cmpDate(a.published, b.published)
    };
    list.sort(sorters[state.sort] || sorters["written-asc"]);
    return list;
  }
  function cmpDate(a, b) {
    if (!a && !b) return 0;
    if (!a) return 1;
    if (!b) return -1;
    return a.localeCompare(b);
  }

  /* ---------------------- Render cards ---------------------- */
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
    const entityTags = (s.entities || [])
      .map(
        (e) =>
          `<button class="tag entity" data-entity="${escapeHtml(entityKey(e))}" type="button">${escapeHtml(e)}</button>`
      )
      .join("");
    const themeTags = (s.themes || [])
      .map(
        (th) =>
          `<button class="tag theme" data-theme-tag="${escapeHtml(th)}" type="button">${escapeHtml(th)}</button>`
      )
      .join("");
    const locs = (s.locations || [])
      .map((l) => `<span class="tag plain">${escapeHtml(l)}</span>`)
      .join("");
    const arts = (s.artifacts || [])
      .map((a) => `<span class="tag plain">${escapeHtml(a)}</span>`)
      .join("");

    return `
      <li class="card" data-id="${s.id}">
        <div class="card-top">
          <div>
            <h3 class="card-title">${escapeHtml(s.title)}</h3>
            <p class="card-venue">First in <em>${escapeHtml(s.venue)}</em></p>
          </div>
          <div class="card-dates" aria-label="Composition and publication dates">
            <span>Written <b>${fmtDate(s.written)}</b></span>
            <span>Published <b>${fmtDate(s.published)}</b></span>
          </div>
        </div>

        <p class="card-summary">${escapeHtml(s.summary)}</p>

        <div class="card-meta">
          <div class="meta-row">
            <span class="meta-label">Entities</span>
            ${entityTags || '<span class="tag plain">—</span>'}
          </div>
          ${
            locs
              ? `<div class="meta-row"><span class="meta-label">Locations</span>${locs}</div>`
              : ""
          }
          ${
            arts
              ? `<div class="meta-row"><span class="meta-label">Texts &amp; relics</span>${arts}</div>`
              : ""
          }
          <div class="meta-row">
            <span class="meta-label">Themes</span>
            ${themeTags}
          </div>
        </div>

        <div class="card-foot">
          <span class="note">${s.note ? escapeHtml(s.note) : ""}</span>
          <a class="card-source" href="${escapeHtml(s.sourceUrl)}" target="_blank" rel="noopener" title="Read on The H. P. Lovecraft Archive">
            HPLA ↗
          </a>
        </div>
      </li>`;
  }

  /* ---------------------- Entity chips ---------------------- */
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
      chip.classList.toggle(
        "active",
        chip.dataset.entityChip === state.entity
      );
    });
  }

  /* ---------------------- Network graph (SVG) ---------------------- */
  function renderNetwork() {
    const W = 1000;
    const H = 620;
    const padX = 30;
    const padY = 40;

    // Only include entities present in >= 1 story (already true), but order by count.
    const entities = [...entityCounts.entries()].sort(
      (a, b) => b[1] - a[1] || a[0].localeCompare(b[0])
    );
    const storiesSorted = stories
      .slice()
      .sort((a, b) => a.writtenYear - b.writtenYear);

    const eGapY = (H - padY * 2) / Math.max(entities.length - 1, 1);
    const sGapY = (H - padY * 2) / Math.max(storiesSorted.length - 1, 1);

    const ePos = new Map();
    entities.forEach(([name], i) => {
      ePos.set(name, { x: padX + 150, y: padY + i * eGapY });
    });
    const sPos = new Map();
    storiesSorted.forEach((s, i) => {
      sPos.set(s.id, { x: W - padX - 220, y: padY + i * sGapY });
    });

    // Build edges
    const edges = [];
    storiesSorted.forEach((s) => {
      (s.entities || []).forEach((e) => {
        const k = entityKey(e);
        if (ePos.has(k)) {
          edges.push({ entity: k, story: s.id });
        }
      });
    });

    // Render with curved paths
    const linkPaths = edges
      .map((ed) => {
        const a = ePos.get(ed.entity);
        const b = sPos.get(ed.story);
        const mx = (a.x + b.x) / 2;
        const d = `M${a.x},${a.y} C${mx},${a.y} ${mx},${b.y} ${b.x},${b.y}`;
        return `<path class="net-link" data-entity="${escapeHtml(ed.entity)}" data-story="${ed.story}" d="${d}" fill="none" stroke-width="1.2"/>`;
      })
      .join("");

    const entityNodes = entities
      .map(([name, count]) => {
        const p = ePos.get(name);
        const r = 4 + Math.min(count, 6);
        return `<g class="net-entity" data-entity="${escapeHtml(name)}" tabindex="0" role="button" aria-label="${escapeHtml(name)}, in ${count} ${count === 1 ? "story" : "stories"}">
          <circle cx="${p.x}" cy="${p.y}" r="${r}"/>
          <text x="${p.x - 10}" y="${p.y + 4}" text-anchor="end">${escapeHtml(name)}</text>
        </g>`;
      })
      .join("");

    const storyNodes = storiesSorted
      .map((s) => {
        const p = sPos.get(s.id);
        return `<g class="net-story" data-story="${s.id}" tabindex="0" role="link" aria-label="${escapeHtml(s.title)}, ${s.writtenYear}">
          <circle cx="${p.x}" cy="${p.y}" r="4"/>
          <text x="${p.x + 10}" y="${p.y + 4}">${escapeHtml(s.title)} <tspan fill="currentColor" opacity="0.5">· ${s.writtenYear}</tspan></text>
        </g>`;
      })
      .join("");

    // Column labels
    const labels = `
      <text x="${padX + 150}" y="20" text-anchor="end" fill="currentColor" opacity="0.5" font-family="ui-monospace, JetBrains Mono, monospace" font-size="10" letter-spacing="2">ENTITIES</text>
      <text x="${W - padX - 220}" y="20" fill="currentColor" opacity="0.5" font-family="ui-monospace, JetBrains Mono, monospace" font-size="10" letter-spacing="2">STORIES</text>
    `;

    $svg.innerHTML = labels + linkPaths + storyNodes + entityNodes;
  }

  function renderNetworkHighlight() {
    // Fade nodes/edges not matching the active entity (if any)
    const active = state.entity;
    const filteredIds = new Set(getFiltered().map((s) => s.id));

    $svg.querySelectorAll(".net-entity").forEach((g) => {
      const isActive = active && g.dataset.entity === active;
      const involved = !active || g.dataset.entity === active;
      g.classList.toggle("active", !!isActive);
      g.classList.toggle("faded", !involved);
    });
    $svg.querySelectorAll(".net-story").forEach((g) => {
      const inResults = filteredIds.has(g.dataset.story);
      g.classList.toggle("faded", !inResults);
    });
    $svg.querySelectorAll(".net-link").forEach((p) => {
      const inResults = filteredIds.has(p.dataset.story);
      const matchEntity = !active || p.dataset.entity === active;
      const visible = inResults && matchEntity;
      p.classList.toggle("active", !!(active && matchEntity && inResults));
      p.classList.toggle("faded", !visible);
    });
  }

  /* ---------------------- Wire up events ---------------------- */
  let qTimer;
  $q.addEventListener("input", (e) => {
    clearTimeout(qTimer);
    qTimer = setTimeout(() => {
      state.q = e.target.value;
      render();
    }, 120);
  });
  $sort.addEventListener("change", (e) => { state.sort = e.target.value; render(); });
  $entityFilter.addEventListener("change", (e) => { state.entity = e.target.value; render(); });
  $themeFilter.addEventListener("change", (e) => { state.theme = e.target.value; render(); });

  function resetAll() {
    state.q = ""; state.sort = "written-asc"; state.entity = ""; state.theme = "";
    $q.value = ""; $sort.value = "written-asc";
    $entityFilter.value = ""; $themeFilter.value = "";
    render();
  }
  $reset.addEventListener("click", resetAll);
  $emptyReset.addEventListener("click", resetAll);

  // Delegated clicks on tags / chips / network
  document.addEventListener("click", (e) => {
    const entBtn = e.target.closest("[data-entity]");
    if (entBtn) {
      const name = entBtn.dataset.entity;
      state.entity = state.entity === name ? "" : name;
      $entityFilter.value = state.entity;
      render();
      // Scroll into view when activated from network
      if (entBtn.closest("#networkSvg")) {
        document.getElementById("timeline").scrollIntoView({ behavior: "smooth", block: "start" });
      }
      return;
    }
    const themeBtn = e.target.closest("[data-theme-tag]");
    if (themeBtn) {
      const v = themeBtn.dataset.themeTag;
      state.theme = state.theme === v ? "" : v;
      $themeFilter.value = state.theme;
      render();
      return;
    }
    const chip = e.target.closest("[data-entity-chip]");
    if (chip) {
      const name = chip.dataset.entityChip;
      state.entity = state.entity === name ? "" : name;
      $entityFilter.value = state.entity;
      render();
      document.getElementById("timeline").scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    const storyNode = e.target.closest(".net-story");
    if (storyNode) {
      const id = storyNode.dataset.story;
      const card = document.querySelector(`.card[data-id="${id}"]`);
      if (card) {
        card.scrollIntoView({ behavior: "smooth", block: "center" });
        card.style.transition = "outline-color 1.4s";
        card.style.outline = "2px solid var(--color-primary)";
        card.style.outlineOffset = "4px";
        setTimeout(() => { card.style.outline = "none"; }, 1400);
      }
    }
  });

  // Keyboard activation for network nodes
  document.addEventListener("keydown", (e) => {
    if (e.key !== "Enter" && e.key !== " ") return;
    const t = e.target;
    if (t.classList && (t.classList.contains("net-entity") || t.classList.contains("net-story"))) {
      e.preventDefault();
      t.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    }
  });

  /* ---------------------- Initial paint ---------------------- */
  renderChips();
  renderNetwork();
  render();
})();
