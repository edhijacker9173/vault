(function () {
  "use strict";

  const categories = window.ATLAS_CATEGORIES || [];
  const locations = window.ATLAS_LOCATIONS || [];
  const events = (window.ATLAS_EVENTS || []).slice().sort((a, b) => a.year - b.year);

  const categoryMap = new Map(categories.map((category) => [category.id, category]));
  const locationMap = new Map(locations.map((location) => [location.id, location]));

  const state = {
    query: "",
    year: Math.max(...events.map((event) => event.year)),
    categories: new Set(categories.map((category) => category.id)),
    location: "",
    selectedId: events.at(-1)?.id || ""
  };

  const refs = {
    search: document.getElementById("search"),
    yearRange: document.getElementById("yearRange"),
    yearLabel: document.getElementById("yearLabel"),
    categoryButtons: document.getElementById("categoryButtons"),
    locationFocus: document.getElementById("locationFocus"),
    clearLocation: document.getElementById("clearLocation"),
    reset: document.getElementById("reset"),
    resultCount: document.getElementById("resultCount"),
    mapStage: document.querySelector(".map-stage"),
    leafletMap: document.getElementById("leafletMap"),
    routeSvg: document.getElementById("routeSvg"),
    mapPins: document.getElementById("mapPins"),
    detailPanel: document.getElementById("detailPanel"),
    eventList: document.getElementById("eventList")
  };

  const atlasMap = {
    map: null,
    routes: null,
    pins: null
  };

  document.querySelector('[data-stat="events"]').textContent = events.length;
  document.querySelector('[data-stat="locations"]').textContent = locations.length;
  refs.yearRange.min = Math.min(...events.map((event) => event.year));
  refs.yearRange.max = state.year;
  refs.yearRange.value = state.year;

  initLeafletMap();
  renderCategoryButtons();
  render();

  refs.search.addEventListener("input", (event) => {
    state.query = event.target.value;
    render();
  });

  refs.yearRange.addEventListener("input", (event) => {
    state.year = Number(event.target.value);
    state.selectedId = nearestVisibleEvent()?.id || "";
    render();
  });

  refs.clearLocation.addEventListener("click", () => {
    state.location = "";
    render();
  });

  refs.reset.addEventListener("click", () => {
    state.query = "";
    state.year = Number(refs.yearRange.max);
    state.categories = new Set(categories.map((category) => category.id));
    state.location = "";
    state.selectedId = events.at(-1)?.id || "";
    refs.search.value = "";
    refs.yearRange.value = state.year;
    render();
  });

  function renderCategoryButtons() {
    refs.categoryButtons.innerHTML = categories
      .map((category) => {
        return `
          <button
            class="category-btn active"
            type="button"
            data-category="${escapeHtml(category.id)}"
            style="--cat-color: ${escapeHtml(category.color)}"
          >
            <span>${escapeHtml(category.label)}</span>
            <span class="category-dot" aria-hidden="true"></span>
          </button>
        `;
      })
      .join("");

    refs.categoryButtons.addEventListener("click", (event) => {
      const button = event.target.closest("[data-category]");
      if (!button) return;
      const id = button.dataset.category;
      if (state.categories.has(id) && state.categories.size > 1) {
        state.categories.delete(id);
      } else {
        state.categories.add(id);
      }
      state.selectedId = nearestVisibleEvent()?.id || "";
      render();
    });
  }

  function getVisibleEvents() {
    const query = state.query.trim().toLowerCase();
    return events.filter((event) => {
      if (event.year > state.year) return false;
      if (!state.categories.has(event.category)) return false;
      if (state.location && !event.locationIds.includes(state.location)) return false;
      if (!query) return true;

      const places = event.locationIds
        .map((id) => locationMap.get(id))
        .filter(Boolean)
        .map((location) => `${location.name} ${location.region}`)
        .join(" ");
      const haystack = [
        event.title,
        event.summary,
        event.significance,
        event.displayYear,
        places,
        categoryMap.get(event.category)?.label || ""
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(query);
    });
  }

  function nearestVisibleEvent() {
    const visible = getVisibleEvents();
    if (!visible.length) return null;
    return visible.reduce((best, event) => {
      const bestDistance = Math.abs(best.year - state.year);
      const eventDistance = Math.abs(event.year - state.year);
      if (eventDistance < bestDistance) return event;
      if (eventDistance === bestDistance && event.year > best.year) return event;
      return best;
    }, visible[0]);
  }

  function render() {
    refs.yearLabel.textContent = state.year;
    const visibleEvents = getVisibleEvents();
    if (!visibleEvents.some((event) => event.id === state.selectedId)) {
      state.selectedId = visibleEvents.at(-1)?.id || "";
    }
    refs.resultCount.textContent = `${visibleEvents.length} ${visibleEvents.length === 1 ? "event" : "events"} visible`;
    refs.locationFocus.textContent = state.location ? formatLocation(state.location) : "All places";

    syncCategoryButtons();
    renderRoutes(visibleEvents);
    renderPins(visibleEvents);
    renderDetail(visibleEvents);
    renderEventCards(visibleEvents);
  }

  function syncCategoryButtons() {
    refs.categoryButtons.querySelectorAll("[data-category]").forEach((button) => {
      button.classList.toggle("active", state.categories.has(button.dataset.category));
    });
  }

  function initLeafletMap() {
    if (!window.L || !refs.leafletMap) return;

    atlasMap.map = L.map(refs.leafletMap, {
      zoomControl: false,
      attributionControl: false,
      scrollWheelZoom: false,
      doubleClickZoom: true,
      boxZoom: false,
      keyboard: true,
      minZoom: 3,
      maxZoom: 8
    });

    L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
      maxZoom: 8
    }).addTo(atlasMap.map);

    L.control
      .zoom({
        position: "topleft",
        zoomInTitle: "Zoom in",
        zoomOutTitle: "Zoom out"
      })
      .addTo(atlasMap.map);

    L.control.attribution({ prefix: false, position: "bottomright" }).addTo(atlasMap.map);
    atlasMap.map.attributionControl.addAttribution(
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
    );

    atlasMap.routes = L.layerGroup().addTo(atlasMap.map);
    atlasMap.pins = L.layerGroup().addTo(atlasMap.map);
    refs.mapStage.classList.add("has-leaflet");
    atlasMap.map.fitBounds(
      [
        [27, -8],
        [57, 39]
      ],
      { padding: [18, 18] }
    );
  }

  function renderRoutes(visibleEvents) {
    const pathEvents = visibleEvents.filter((event) => event.locationIds.length);
    if (atlasMap.map) {
      atlasMap.routes.clearLayers();

      for (let i = 1; i < pathEvents.length; i += 1) {
        const from = locationMap.get(pathEvents[i - 1].locationIds[0]);
        const to = locationMap.get(pathEvents[i].locationIds[0]);
        const fromPoint = getLatLng(from);
        const toPoint = getLatLng(to);
        if (!fromPoint || !toPoint || from.id === to.id) continue;

        const selected = pathEvents[i].id === state.selectedId || pathEvents[i - 1].id === state.selectedId;
        L.polyline([fromPoint, toPoint], {
          color: selected ? "#d54545" : "#c58b3a",
          weight: selected ? 3 : 1.6,
          opacity: selected ? 0.88 : 0.48,
          dashArray: selected ? null : "6 8",
          interactive: false
        }).addTo(atlasMap.routes);
      }

      refs.routeSvg.innerHTML = "";
      return;
    }

    const paths = [];
    for (let i = 1; i < pathEvents.length; i += 1) {
      const from = locationMap.get(pathEvents[i - 1].locationIds[0]);
      const to = locationMap.get(pathEvents[i].locationIds[0]);
      if (!from || !to || from.id === to.id) continue;
      const x1 = from.x * 10;
      const y1 = from.y * 6.2;
      const x2 = to.x * 10;
      const y2 = to.y * 6.2;
      const cx = (x1 + x2) / 2;
      const cy = Math.min(y1, y2) - 55;
      const selected = pathEvents[i].id === state.selectedId || pathEvents[i - 1].id === state.selectedId;
      paths.push(`<path class="route-line ${selected ? "active" : ""}" d="M${x1},${y1} Q${cx},${cy} ${x2},${y2}" />`);
    }
    refs.routeSvg.innerHTML = paths.join("");
  }

  function renderPins(visibleEvents) {
    const locationStats = new Map();
    visibleEvents.forEach((event) => {
      event.locationIds.forEach((id) => {
        const current = locationStats.get(id) || { count: 0, categories: new Map(), selected: false };
        current.count += 1;
        current.categories.set(event.category, (current.categories.get(event.category) || 0) + 1);
        if (event.id === state.selectedId) current.selected = true;
        locationStats.set(id, current);
      });
    });

    if (atlasMap.map) {
      atlasMap.pins.clearLayers();
      refs.mapPins.innerHTML = "";

      [...locationStats.entries()].forEach(([id, stats]) => {
        const location = locationMap.get(id);
        const point = getLatLng(location);
        if (!location || !point) return;

        const dominant = [...stats.categories.entries()].sort((a, b) => b[1] - a[1])[0]?.[0];
        const category = categoryMap.get(dominant) || categories[0];
        const active = stats.selected || state.location === id;
        const marker = L.circleMarker(point, {
          radius: active ? 10 : 7,
          weight: active ? 3 : 2,
          color: active ? "#f4ead2" : category.color,
          fillColor: category.color,
          fillOpacity: active ? 0.95 : 0.78,
          opacity: 0.95,
          className: active ? "leaflet-pin active" : "leaflet-pin"
        });

        marker.bindTooltip(location.name, {
          permanent: true,
          direction: "bottom",
          offset: [0, 10],
          opacity: 1,
          className: "leaflet-pin-label"
        });

        marker.on("click", () => {
          state.location = state.location === id ? "" : id;
          state.selectedId = nearestVisibleEvent()?.id || "";
          render();
        });

        marker.addTo(atlasMap.pins);
      });

      return;
    }

    refs.mapPins.innerHTML = [...locationStats.entries()]
      .map(([id, stats]) => {
        const location = locationMap.get(id);
        if (!location) return "";
        const dominant = [...stats.categories.entries()].sort((a, b) => b[1] - a[1])[0]?.[0];
        const category = categoryMap.get(dominant) || categories[0];
        return `
          <button
            class="pin ${stats.selected || state.location === id ? "active" : ""}"
            type="button"
            data-location="${escapeHtml(id)}"
            style="left: ${location.x}%; top: ${location.y}%; --cat-color: ${escapeHtml(category.color)}"
            aria-label="${escapeHtml(location.name)}, ${stats.count} visible events"
            title="${escapeHtml(location.name)} (${stats.count})"
          >
            <span class="pin-label">${escapeHtml(location.name)}</span>
          </button>
        `;
      })
      .join("");

    refs.mapPins.querySelectorAll("[data-location]").forEach((pin) => {
      pin.addEventListener("click", () => {
        state.location = state.location === pin.dataset.location ? "" : pin.dataset.location;
        state.selectedId = nearestVisibleEvent()?.id || "";
        render();
      });
    });
  }

  function renderDetail(visibleEvents) {
    const selected = visibleEvents.find((event) => event.id === state.selectedId) || visibleEvents.at(-1);
    if (!selected) {
      refs.detailPanel.innerHTML = `
        <p class="detail-year">No events</p>
        <h3>No matching route</h3>
        <p>Try clearing the search, year, place, or layer filters.</p>
      `;
      return;
    }

    const category = categoryMap.get(selected.category);
    const places = selected.locationIds.map(formatLocation).join(" / ");
    refs.detailPanel.innerHTML = `
      <p class="detail-year">${escapeHtml(selected.displayYear)}</p>
      <h3>${escapeHtml(selected.title)}</h3>
      <div class="detail-meta">
        <span class="pill category" style="--cat-color: ${escapeHtml(category.color)}">${escapeHtml(category.label)}</span>
        ${selected.locationIds.map((id) => `<span class="pill">${escapeHtml(formatLocation(id))}</span>`).join("")}
      </div>
      <p>${escapeHtml(selected.summary)}</p>
      <div class="detail-block">
        <strong>Why it matters</strong>
        <p>${escapeHtml(selected.significance)}</p>
      </div>
      <div class="detail-block">
        <strong>Atlas note</strong>
        <p>${escapeHtml(places)} · ${escapeHtml(selected.source)}</p>
      </div>
    `;
  }

  function renderEventCards(visibleEvents) {
    refs.eventList.innerHTML = visibleEvents
      .map((event) => {
        const category = categoryMap.get(event.category);
        const places = event.locationIds.map(formatLocation).join(" / ");
        return `
          <li>
            <button
              type="button"
              class="event-card ${event.id === state.selectedId ? "active" : ""}"
              data-event="${escapeHtml(event.id)}"
              style="--cat-color: ${escapeHtml(category.color)}"
            >
              <span class="year">${escapeHtml(event.displayYear)} · ${escapeHtml(category.label)}</span>
              <h3>${escapeHtml(event.title)}</h3>
              <p>${escapeHtml(event.summary)}</p>
              <span class="pill">${escapeHtml(places)}</span>
            </button>
          </li>
        `;
      })
      .join("");

    refs.eventList.querySelectorAll("[data-event]").forEach((button) => {
      button.addEventListener("click", () => {
        const event = events.find((item) => item.id === button.dataset.event);
        if (!event) return;
        state.selectedId = event.id;
        state.year = Math.max(state.year, event.year);
        refs.yearRange.value = state.year;
        render();
        refs.detailPanel.scrollIntoView({ behavior: "smooth", block: "center" });
      });
    });
  }

  function formatLocation(id) {
    const location = locationMap.get(id);
    if (!location) return id;
    return `${location.name}, ${location.region}`;
  }

  function getLatLng(location) {
    if (!location || !Number.isFinite(location.lat) || !Number.isFinite(location.lng)) return null;
    return [location.lat, location.lng];
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }
})();
