/* ============================================================
   Franklin Expedition Interactive Map — app.js
   Sources: Wikipedia, Parks Canada, Victory Point Records,
   Canadian Mysteries, USNI Naval History Magazine
   ============================================================ */

// ── TIMELINE EVENTS ─────────────────────────────────────────
const TIMELINE_EVENTS = [
  {
    id: 0,
    date: "19 May 1845",
    title: "Departure from Greenhithe",
    desc: "HMS Erebus and HMS Terror depart Greenhithe, Kent at dawn with 134 officers and men. Sir John Franklin commands Erebus; Captain Francis Crozier commands Terror. Escorted by HMS Rattler and supply vessel Barretto Junior.",
    coords: [51.4504, 0.2823],
    zoom: 6,
    category: "departure",
    source: "Franklin's Lost Expedition, Wikipedia"
  },
  {
    id: 1,
    date: "Early June 1845",
    title: "Stromness, Orkney Islands",
    desc: "The ships stop at Stromness in the Orkney Islands to take aboard fresh water. This was the traditional departure point for Arctic voyages. The last letters home were sent from here by many crew members.",
    coords: [58.9614, -3.2994],
    zoom: 7,
    category: "supply",
    source: "John Franklin, Wikipedia"
  },
  {
    id: 2,
    date: "4 July 1845",
    title: "Arrival at Disko Island, Greenland",
    desc: "After 30 days at sea, the expedition reaches Disko Bay on the west coast of Greenland. The final supplies including fresh meat from 10 oxen are loaded aboard at the Whalefish Islands (Qeqertaarsuaq). Five men are sent home due to illness.",
    coords: [69.75, -53.50],
    zoom: 7,
    category: "supply",
    source: "Aglooka / The Heritage Portal"
  },
  {
    id: 3,
    date: "12 July 1845",
    title: "Departure from Whalefish Islands",
    desc: "The expedition departs the Whalefish Islands steering west-northwest. The last mail for family and friends in the UK is dispatched. Franklin reports all is well and the mission is on schedule. Barretto Junior turns back for England.",
    coords: [69.25, -53.55],
    zoom: 7,
    category: "departure",
    source: "The Heritage Portal"
  },
  {
    id: 4,
    date: "Late July 1845",
    title: "Last European Sighting — Baffin Bay",
    desc: "The final sighting of the Franklin Expedition by Europeans. Whalers Prince of Wales (Capt. Dannett) and Enterprise (Capt. Robert Martin) encounter Terror and Erebus in Baffin Bay on 28–29 July 1845, waiting for ice conditions to clear before crossing to Lancaster Sound.",
    coords: [74.5, -60.0],
    zoom: 6,
    category: "sighting",
    source: "Franklin's Lost Expedition, Wikipedia"
  },
  {
    id: 5,
    date: "August 1845",
    title: "Entry into Lancaster Sound",
    desc: "Erebus and Terror enter Lancaster Sound — the eastern gateway to the Arctic. This is the last confirmed leg of their route before the ships vanish. They sail west along Barrow Strait as instructed.",
    coords: [74.3, -84.0],
    zoom: 6,
    category: "route",
    source: "Victory Point Record (1847/1848)"
  },
  {
    id: 6,
    date: "Autumn 1845",
    title: "Wellington Channel Exploration",
    desc: "Franklin ascends Wellington Channel to latitude 77°N — further north than any previous explorer. Finding the way blocked, the ships return south via the west coast of Cornwallis Island, circumnavigating it and proving it an island.",
    coords: [76.5, -92.0],
    zoom: 5,
    category: "route",
    source: "Victory Point Record"
  },
  {
    id: 7,
    date: "Winter 1845–1846",
    title: "First Winter: Beechey Island",
    desc: "The expedition over-winters at Beechey Island in the lee of the Devon Island coast at 74°43'N 91°39'W. Three crew members die and are buried on shore: John Torrington (1 Jan 1846), John Hartnell (4 Jan 1846), and William Braine (3 Apr 1846). Their graves are discovered by searchers in 1850.",
    coords: [74.717, -91.85],
    zoom: 6,
    category: "winter",
    source: "Beechey Island, Wikipedia"
  },
  {
    id: 8,
    date: "Summer 1846",
    title: "South Through Peel Sound",
    desc: "Leaving Beechey Island after the ice breaks up, Franklin steers south through Peel Sound between Somerset Island and Prince of Wales Island — an open passage rarely clear in that era. They emerge into the top of Victoria Strait.",
    coords: [72.5, -96.5],
    zoom: 5,
    category: "route",
    source: "Academia.edu / The Heritage Portal"
  },
  {
    id: 9,
    date: "12 September 1846",
    title: "Ships Beset in the Ice",
    desc: "At approximately 70°05'N, 98°23'W, north of King William Island, both Erebus and Terror become locked in the pack ice of Victoria Strait. The ice does not release them. They will remain trapped here for nearly two years.",
    coords: [70.083, -98.383],
    zoom: 6,
    category: "trapped",
    source: "Victory Point Record"
  },
  {
    id: 10,
    date: "28 May 1847",
    title: "Victory Point Note — Part I Deposited",
    desc: "Lieutenant Graham Gore leads a party from the ships and deposits a note in a cairn at Victory Point (69°37'N 98°41'W) on King William Island's northwest coast. The note reports all is well and lists ship positions. Franklin is alive and in command. A blank margin is left for future additions.",
    coords: [69.62, -98.683],
    zoom: 7,
    category: "record",
    source: "Victory Point Record / Canadian Mysteries"
  },
  {
    id: 11,
    date: "11 June 1847",
    title: "Death of Sir John Franklin",
    desc: "Sir John Franklin dies. The cause is unknown — likely a combination of illness, lead poisoning from soldered food tins, and the physical toll of the Arctic. He is the first of 24 officers and 105 crew who will perish. Command passes to Captain Francis Crozier.",
    coords: [70.083, -98.383],
    zoom: 6,
    category: "death",
    source: "Victory Point Record (1848 addendum)"
  },
  {
    id: 12,
    date: "22 April 1848",
    title: "Ships Abandoned — Victory Point Record Updated",
    desc: "Captain Crozier and Captain Fitzjames add a desperate addendum to the 1847 Victory Point note: the ships have been abandoned. 105 survivors land at Victory Point — 24 men have already died, including Franklin. They intend to march south toward Back's Fish River, 400 miles away.",
    coords: [69.62, -98.683],
    zoom: 7,
    category: "record",
    source: "Victory Point Record / PBS NOVA"
  },
  {
    id: 13,
    date: "April–June 1848",
    title: "The Death March South",
    desc: "The 105 survivors march south along King William Island's western and southern coasts — starving, suffering from scurvy, and incapacitated by what is now believed to be lead poisoning and botulism. Bodies, equipment, and supplies are strewn along 150 miles of coastline.",
    coords: [68.9, -99.1],
    zoom: 6,
    category: "retreat",
    source: "The Dark Atlas / USNI"
  },
  {
    id: 14,
    date: "1848–1859",
    title: "Search Expeditions Begin",
    desc: "Over 40 expeditions are launched to find Franklin. Lady Franklin finances multiple searches. In 1850, graves on Beechey Island are found. In 1859, Lt. William Hobson and Commander Francis McClintock aboard the Fox discover the Victory Point cairn and its devastating notes.",
    coords: [73.0, -91.0],
    zoom: 5,
    category: "search",
    source: "McClintock / USNI Naval History"
  },
  {
    id: 15,
    date: "1869",
    title: "Inuit Testimonies Collected",
    desc: "American explorer Charles Francis Hall collects extensive Inuit oral histories describing the fate of the Franklin crew. Inuit testimony describes one ship sinking in the ice northwest of King William Island and the other drifting south, found in pristine condition far to the south — pointing precisely where the wrecks would eventually be found.",
    coords: [69.1, -98.8],
    zoom: 6,
    category: "sighting",
    source: "Aglooka.ca / David C. Woodman"
  },
  {
    id: 16,
    date: "September 2014",
    title: "HMS Erebus Discovered",
    desc: "Parks Canada underwater archaeologists locate HMS Erebus in approximately 11 metres of water in Wilmot and Crampton Bay, Queen Maud Gulf, east of O'Reilly Island at 68.245°N 98.873°W. The wreck sits upright on the seabed, largely intact — exactly where Inuit elders had described since 1869.",
    coords: [68.245778, -98.872861],
    zoom: 8,
    category: "wreck",
    source: "Parks Canada / Archaeology Magazine"
  },
  {
    id: 17,
    date: "12 September 2016",
    title: "HMS Terror Discovered",
    desc: "The Arctic Research Foundation announces the discovery of HMS Terror in Terror Bay, south shore of King William Island, at 68°54'13\"N 98°56'18\"W in 24 metres of water. Found in \"pristine\" condition with masts standing, doors closed, contents preserved — exactly where Inuit hunters had reported it.",
    coords: [68.9036, -98.9383],
    zoom: 8,
    category: "wreck",
    source: "CBC News / Wikipedia"
  },
  {
    id: 18,
    date: "2019",
    title: "National Historic Site Declared",
    desc: "The Wrecks of HMS Erebus and HMS Terror are designated a National Historic Site of Canada, with protected zones established around both wrecks. Parks Canada and Inuit Tapiriit Kanatami jointly manage the site, recognizing Inuit knowledge as central to the discovery.",
    coords: [68.6, -98.9],
    zoom: 7,
    category: "memorial",
    source: "Parks Canada"
  },
  {
    id: 19,
    date: "2024–Present",
    title: "Ongoing Excavations",
    desc: "Annual underwater archaeological expeditions continue to excavate both wrecks. Thousands of artifacts have been recovered including officers' cabins, navigation instruments, medicine chests, and personal effects. The ships may still hold the final journals of the expedition, sealed in the ice-cold water.",
    coords: [68.245778, -98.872861],
    zoom: 8,
    category: "memorial",
    source: "Parks Canada / The Dark Atlas"
  }
];

// ── MAP LOCATIONS ────────────────────────────────────────────
const MAP_LOCATIONS = {
  // Main route waypoints — densely plotted sea routes avoiding landmasses
  // Each segment follows navigable open water channels
  route: [
    // ── SEGMENT 1: Greenhithe → North Sea coast → Orkney ──
    // Route hugs east coast of Britain, rounds Duncansby Head, enters
    // Pentland Firth from the EAST, then crosses open water to Stromness
    [51.4504, 0.2823],      // Greenhithe departure
    [51.50, 0.70],          // Thames Estuary mouth
    [51.60, 1.30],          // Off Southend into North Sea
    [52.00, 1.80],          // North Sea, off Suffolk
    [52.50, 2.00],          // North Sea, off Norfolk
    [53.50, 1.80],          // North Sea, off Lincolnshire
    [54.00, 1.00],          // Off Yorkshire coast
    [55.00, 0.80],          // North Sea, off Tyne
    [55.90, -0.20],         // Off Firth of Forth
    [56.50, -0.40],         // North Sea, off Angus coast
    [57.50, -0.80],         // Off Aberdeenshire, Peterhead area
    [57.80, -1.80],         // Rounding Kinnaird Head
    [58.20, -2.80],         // Off Moray Firth outer coast
    [58.40, -3.40],         // NE Scotland coast, past Helmsdale
    [58.55, -3.20],         // Caithness coast north of Wick
    [58.62, -3.10],         // Close to Caithness headland, open water
    [58.637, -3.07],        // Duncansby Head — absolute NE tip of mainland
    [58.66, -2.95],         // Pentland Firth, east of Stroma, open water
    [58.72, -2.87],         // Clear open water: east of South Ronaldsay
    [58.78, -2.88],         // East of South Ronaldsay (open North Sea water)
    [58.87, -2.90],         // East of Orkney Mainland, clear of all islands
    [58.94, -2.95],         // North-east approach to Scapa Flow
    [58.93, -3.10],         // Scapa Flow — open water inside Orkney islands
    [58.95, -3.25],         // Scapa Flow west, approaching Hoy Sound
    [58.955, -3.28],        // Hoy Sound entrance
    [58.9614, -3.2994],     // Stromness, Orkney — moored at pier

    // ── SEGMENT 2: Orkney → Atlantic crossing → Greenland ──
    // Exit north through Hoy Sound, then NW past top of Orkney into open Atlantic
    [59.10, -3.40],         // Hoy Sound — leaving Stromness northward
    [59.20, -3.30],         // North of Mainland Orkney (open channel)
    [59.30, -3.50],         // NW Orkney, clear of Brough Head
    [59.40, -3.80],         // Open Atlantic north of Orkney
    [59.60, -4.50],         // Atlantic, NW of Orkney
    [60.10, -5.50],         // Atlantic, south of Faroe direction
    [60.50, -8.00],         // West of Shetland, open ocean
    [61.50, -14.00],        // Open North Atlantic
    [62.00, -22.00],        // Approaching Iceland from south
    [63.40, -24.00],        // South of Iceland
    [64.50, -27.00],        // Denmark Strait approach (south)
    [65.50, -34.00],        // Mid-Atlantic
    [66.50, -42.00],        // Nearing Greenland waters
    [67.50, -49.00],        // Davis Strait, approaching Greenland
    [68.20, -52.00],        // Off west Greenland coast
    [68.80, -52.50],        // Disko Bay approach
    [69.25, -53.55],        // Whalefish Islands (Disko Bay)

    // ── SEGMENT 3: Disko Bay → Davis Strait → Baffin Bay ──
    [69.60, -54.50],        // Exiting Disko Bay northward
    [70.50, -56.00],        // Davis Strait, north of Disko
    [72.00, -58.00],        // Mid Davis Strait
    [73.00, -59.50],        // Upper Davis Strait
    [74.00, -60.00],        // Entering Baffin Bay
    [74.50, -60.00],        // Baffin Bay — last sighting point

    // ── SEGMENT 4: Baffin Bay → Lancaster Sound entry ──
    [74.80, -64.00],        // Baffin Bay, west
    [74.60, -70.00],        // Approaching Lancaster Sound from east
    [74.40, -77.00],        // Lancaster Sound, east
    [74.30, -83.00],        // Lancaster Sound, mid
    [74.30, -84.00],        // Lancaster Sound entry marker

    // ── SEGMENT 5: Lancaster Sound → Wellington Channel → Beechey ──
    [74.50, -87.00],        // Barrow Strait, east
    [74.70, -89.00],        // Barrow Strait
    [75.00, -90.50],        // South of Devon Island
    [75.50, -91.00],        // Wellington Channel south entrance
    [76.00, -91.50],        // Wellington Channel
    [76.50, -92.00],        // Wellington Channel — max north 77°N
    [76.00, -92.00],        // Return south down Wellington Channel
    [75.50, -91.80],        // West side of Cornwallis Island
    [75.00, -93.00],        // SW corner of Cornwallis circumnavigation
    [74.80, -93.50],        // South of Cornwallis
    [74.717, -91.85],       // Beechey Island — first winter

    // ── SEGMENT 6: Beechey → Peel Sound → Victoria Strait ──
    [74.50, -92.50],        // Leaving Beechey Island south
    [74.00, -93.50],        // Barrow Strait, west
    [73.50, -94.00],        // Top of Peel Sound
    [73.00, -95.00],        // Peel Sound, north
    [72.50, -96.00],        // Peel Sound, mid
    [72.00, -96.50],        // Peel Sound, south
    [71.50, -97.50],        // Franklin Strait, north
    [71.00, -98.00],        // Franklin Strait
    [70.60, -98.30],        // Approaching Victoria Strait
    [70.083, -98.383],      // Trapped in ice — 12 Sept 1846
  ],

  // Named places with popups
  named: [
    {
      id: "greenhithe",
      name: "Greenhithe, Kent",
      category: "departure",
      color: "#4a9eff",
      date: "19 May 1845",
      coords: [51.4504, 0.2823],
      desc: "Departure point of HMS Erebus and HMS Terror. The ships left in the early morning watched by cheering crowds on the riverbanks of the Thames."
    },
    {
      id: "stromness",
      name: "Stromness, Orkney",
      category: "supply",
      color: "#f59e0b",
      date: "Early June 1845",
      coords: [58.9614, -3.2994],
      desc: "Last stop in the British Isles. Fresh water taken on board. The Franklin Expedition Museum now stands here, adjacent to the very pier where the ships moored."
    },
    {
      id: "whalefish",
      name: "Whalefish Islands (Disko Bay)",
      category: "supply",
      color: "#f59e0b",
      date: "4–12 July 1845",
      coords: [69.25, -53.55],
      desc: "Final resupply point. Ten oxen slaughtered for fresh meat. Five men returned to England. The last letters home were sent. Supply ship Barretto Junior departed for England."
    },
    {
      id: "baffin",
      name: "Last Sighting — Baffin Bay",
      category: "sighting",
      color: "#34d399",
      date: "28–29 July 1845",
      coords: [74.5, -60.0],
      desc: "Whalers Prince of Wales and Enterprise were the last Europeans to see the Franklin Expedition. Both ships were moored to an iceberg awaiting a break in conditions to enter Lancaster Sound."
    },
    {
      id: "lancaster",
      name: "Lancaster Sound Entry",
      category: "route",
      color: "#4a9eff",
      date: "August 1845",
      coords: [74.3, -84.0],
      desc: "The eastern gateway to the Northwest Passage. Franklin was ordered to sail west through here and continue until he found an open route to the Pacific Ocean."
    },
    {
      id: "wellington",
      name: "Wellington Channel",
      category: "route",
      color: "#4a9eff",
      date: "Autumn 1845",
      coords: [76.5, -92.0],
      desc: "Franklin explored north to 77°N up Wellington Channel before ice blocked further progress. The expedition returned south and wintered at Beechey Island."
    },
    {
      id: "beechey",
      name: "Beechey Island — First Winter",
      category: "winter",
      color: "#60a5fa",
      date: "Winter 1845–1846",
      coords: [74.717, -91.85],
      desc: "The expedition's first winter quarters. Three crew members died and were buried here: John Torrington (age 20), John Hartnell (25), and William Braine (32). Their graves were found in 1850. Modern autopsies revealed high lead levels in their remains — from the soldered tins used to preserve food."
    },
    {
      id: "peelsound",
      name: "Peel Sound",
      category: "route",
      color: "#4a9eff",
      date: "Summer 1846",
      coords: [72.5, -96.5],
      desc: "Franklin chose to sail south through Peel Sound — an unusually open passage in 1846 that would remain icebound for years afterward. This fateful choice led the ships directly into Victoria Strait."
    },
    {
      id: "trapped",
      name: "Ships Trapped in Ice",
      category: "trapped",
      color: "#a78bfa",
      date: "12 September 1846",
      coords: [70.083, -98.383],
      desc: "Position recorded in the Victory Point Note: 70°05'N 98°23'W. Both ships became irreversibly beset in the pack ice of Victoria Strait. Unlike the east coast of King William Island (later used by Amundsen), this western channel never clears completely in summer — the ice is continuously replenished from the north."
    },
    {
      id: "victorypoint",
      name: "Victory Point",
      category: "record",
      color: "#a78bfa",
      date: "May 1847 / April 1848",
      coords: [69.62, -98.683],
      desc: "The only written record ever found of the Franklin Expedition. A standard Admiralty form was deposited here in May 1847 by Lieutenant Gore, reporting all well. A desperate addendum was added in April 1848 by Crozier and Fitzjames announcing Franklin's death and the abandonment of both ships. Found by Lt. Hobson in 1859."
    },
    {
      id: "crozier_landing",
      name: "Crozier's Landing",
      category: "retreat",
      color: "#fb923c",
      date: "26 April 1848",
      coords: [69.37, -98.68],
      desc: "Captain Crozier landed 105 survivors here at 69°37'42\"N 98°41'W on 26 April 1848. They immediately began a desperate march south, dragging heavy boats on sledges. The Back River, their target, was over 400 kilometres away across open Arctic tundra."
    },
    {
      id: "erebus_wreck",
      name: "Wreck of HMS Erebus",
      category: "wreck",
      color: "#f87171",
      date: "Found: September 2014",
      coords: [68.245778, -98.872861],
      desc: "Discovered by Parks Canada in 11 metres of water in Wilmot and Crampton Bay. The wreck lies upright on the seabed, masts partially intact, with cabins and cargo relatively preserved by the cold water. Hundreds of artifacts recovered including navigation instruments and personal effects. Exact position: 68°14'44.8\"N 98°52'22.3\"W"
    },
    {
      id: "terror_wreck",
      name: "Wreck of HMS Terror",
      category: "wreck",
      color: "#f87171",
      date: "Found: September 2016",
      coords: [68.9036, -98.9383],
      desc: "Discovered in 24 metres of water in Terror Bay, south of King William Island. Found in remarkable condition — doors closed, windows intact, personal belongings undisturbed. The ship appears to have been deliberately sailed or drifted here after the official abandonment date, suggesting survivors may have attempted to navigate it south. Exact position: 68°54'13\"N 98°56'18\"W"
    },
    {
      id: "starvation_cove",
      name: "Starvation Cove",
      category: "retreat",
      color: "#fb923c",
      date: "~Summer 1848",
      coords: [67.97, -99.05],
      desc: "The southernmost point where remains of Franklin's crew were found. Bodies and artifacts were found here near the mouth of the Adelaide Peninsula. Evidence suggests the last survivors perished in this area, approximately 40 km from the nearest Hudson's Bay Company post they never reached."
    }
  ],

  // Search expeditions route — McClintock's Fox 1857–59 approach
  // Came via Bellot Strait (Somerset Island south coast) to Victory Point
  searchRoutes: [
    [74.717, -91.85],   // Beechey Island (where graves were found 1850)
    [74.50, -91.50],    // South from Beechey
    [74.00, -92.50],    // Barrow Strait west
    [73.60, -91.80],    // Somerset Island north coast
    [73.20, -91.50],    // East coast Somerset Island
    [72.70, -91.80],    // Approaching Prince Regent Inlet
    [72.20, -91.80],    // Prince Regent Inlet
    [72.00, -94.00],    // Bellot Strait east entrance
    [72.00, -95.00],    // Through Bellot Strait
    [72.00, -96.00],    // Bellot Strait west exit / Peel Sound top
    [71.60, -96.80],    // South into Peel Sound
    [70.80, -97.50],    // Peel Sound south
    [70.20, -98.00],    // Franklin Strait
    [69.80, -98.40],    // NW coast of King William Island approach
    [69.62, -98.683],   // Victory Point — cairn discovered
  ],

  // Retreat route — survivors marching south along KWI coast
  // Carefully following the western & southern coastline of King William Island
  retreatRoute: [
    [69.62, -98.683],   // Victory Point — departure 26 April 1848
    [69.50, -98.80],    // NW coast KWI, heading south
    [69.37, -98.68],    // Crozier's Landing point
    [69.20, -99.00],    // West coast KWI continuing south
    [69.00, -99.20],    // SW corner of King William Island
    [68.80, -99.30],    // South coast KWI, west end
    [68.60, -99.10],    // South coast KWI
    [68.40, -99.20],    // Todd Islets area
    [68.20, -99.10],    // Adelaide Peninsula north
    [68.00, -99.10],    // Nearing Starvation Cove
    [67.97, -99.05],    // Starvation Cove — last known survivors
  ]
};

// ── COLOR MAP BY CATEGORY ────────────────────────────────────
const CATEGORY_COLORS = {
  departure: "#4a9eff",
  supply: "#f59e0b",
  sighting: "#34d399",
  route: "#4a9eff",
  winter: "#60a5fa",
  trapped: "#a78bfa",
  record: "#a78bfa",
  death: "#f87171",
  retreat: "#fb923c",
  search: "#fbbf24",
  wreck: "#f87171",
  memorial: "#34d399"
};

const CATEGORY_ICONS = {
  departure: "⚓",
  supply: "📦",
  sighting: "👁",
  route: "→",
  winter: "❄",
  trapped: "🧊",
  record: "📜",
  death: "✝",
  retreat: "↓",
  search: "🔍",
  wreck: "⚓",
  memorial: "🏛"
};

// ── INITIALIZE MAP ───────────────────────────────────────────
let map, currentEventIdx = 0, playInterval = null;
let layers = {};
let timelineMarker = null;

function initMap() {
  // Center on Arctic Canada
  map = L.map('map', {
    center: [70.0, -85.0],
    zoom: 4,
    zoomControl: true,
    attributionControl: true,
    maxZoom: 12,
    minZoom: 3
  });

  // Tile providers — OSM as reliable base, CARTO overlays for style
  // Dark mode: CARTO dark_matter (with OSM fallback)
  // Light mode: CARTO voyager (with OSM fallback)

  const osmAttrib = '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
  const cartoAttrib = osmAttrib + ' © <a href="https://carto.com/attributions">CARTO</a>';

  // OSM standard — always available, works everywhere
  const osmStandard = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: osmAttrib,
    subdomains: 'abc',
    maxZoom: 19,
    crossOrigin: true
  });

  // CARTO dark — preferred dark style
  const cartoDark = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_matter/{z}/{x}/{y}{r}.png', {
    attribution: cartoAttrib,
    subdomains: 'abcd',
    maxZoom: 20,
    crossOrigin: true,
    errorTileUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=='
  });

  // CARTO voyager — preferred light style
  const cartoLight = L.tileLayer('https://{s}.basemaps.cartocdn.com/voyager/{z}/{x}/{y}{r}.png', {
    attribution: cartoAttrib,
    subdomains: 'abcd',
    maxZoom: 20,
    crossOrigin: true
  });

  // OSM with CSS filter for dark mode (reliable fallback)
  const osmDark = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: osmAttrib,
    subdomains: 'abc',
    maxZoom: 19,
    crossOrigin: true,
    className: 'osm-dark-filter'
  });

  // Track which tile layers are currently active
  let activeDarkLayer = null;
  let activeLightLayer = null;

  // Try to load a tile layer, fall back to OSM on error
  function loadTileWithFallback(primary, fallback) {
    primary.addTo(map);
    let tilesLoaded = false;
    primary.on('tileload', () => { tilesLoaded = true; });
    primary.on('tileerror', () => {
      if (!tilesLoaded) {
        map.removeLayer(primary);
        fallback.addTo(map);
      }
    });
    return primary;
  }

  // Initial load — dark mode
  activeDarkLayer = loadTileWithFallback(cartoDark, osmDark);

  // Track theme changes to swap tiles
  const updateTiles = () => {
    const theme = document.documentElement.getAttribute('data-theme');
    if (theme === 'light') {
      // Remove dark layers
      if (map.hasLayer(cartoDark)) map.removeLayer(cartoDark);
      if (map.hasLayer(osmDark)) map.removeLayer(osmDark);
      // Add light
      activeLightLayer = loadTileWithFallback(cartoLight, osmStandard);
    } else {
      // Remove light layers
      if (map.hasLayer(cartoLight)) map.removeLayer(cartoLight);
      if (map.hasLayer(osmStandard)) map.removeLayer(osmStandard);
      // Add dark
      activeDarkLayer = loadTileWithFallback(cartoDark, osmDark);
    }
  };

  // Observe theme attribute changes
  const observer = new MutationObserver(updateTiles);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

  // Build layers
  buildRouteLayers();
  buildNamedMarkers();
  buildTimelineMarker();
  updateTimelineUI(0);
}

// ── BUILD ROUTE LINES ────────────────────────────────────────
function buildRouteLayers() {
  // Main expedition route
  const mainRoute = L.polyline(MAP_LOCATIONS.route, {
    color: '#4a9eff',
    weight: 3,
    opacity: 0.85,
    dashArray: '10, 5',
    className: 'route-animated'
  });

  // Search expeditions (McClintock's Fox route)
  const searchRoute = L.polyline(MAP_LOCATIONS.searchRoutes, {
    color: '#fbbf24',
    weight: 2,
    opacity: 0.65,
    dashArray: '8, 6'
  });

  // Retreat route (south along King William Island coast)
  const retreatRoute = L.polyline(MAP_LOCATIONS.retreatRoute, {
    color: '#fb923c',
    weight: 2.5,
    opacity: 0.8,
    dashArray: '5, 7'
  });

  layers.routeMain = mainRoute;
  layers.routeSearch = searchRoute;
  layers.routeRetreat = retreatRoute;

  map.addLayer(mainRoute);
  map.addLayer(searchRoute);
  map.addLayer(retreatRoute);
}

// ── BUILD NAMED MARKERS ──────────────────────────────────────
function buildNamedMarkers() {
  layers.sightings = L.layerGroup();
  layers.supply = L.layerGroup();
  layers.victory = L.layerGroup();
  layers.wrecks = L.layerGroup();
  layers.deaths = L.layerGroup();

  MAP_LOCATIONS.named.forEach(loc => {
    const color = CATEGORY_COLORS[loc.category] || '#4a9eff';
    const icon = CATEGORY_ICONS[loc.category] || '●';
    const isPulse = ['wreck', 'record', 'trapped'].includes(loc.category);

    const markerEl = document.createElement('div');
    markerEl.className = `custom-marker${isPulse ? ' marker-pulse' : ''}`;
    markerEl.style.cssText = `background:${color};color:#fff;border-color:rgba(255,255,255,0.8);`;
    markerEl.innerHTML = `<span style="font-size:10px;line-height:1;">${icon}</span>`;
    markerEl.style.color = '#fff';

    const divIcon = L.divIcon({
      html: markerEl.outerHTML,
      className: '',
      iconSize: [28, 28],
      iconAnchor: [14, 14],
      popupAnchor: [0, -16]
    });

    const marker = L.marker(loc.coords, { icon: divIcon });

    const popupHtml = `
      <div class="popup-inner">
        <div class="popup-category" style="color:${color}">${loc.category.replace(/_/g, ' ').toUpperCase()}</div>
        <div class="popup-title">${loc.name}</div>
        <div class="popup-date">${loc.date}</div>
        <div class="popup-desc">${loc.desc}</div>
        <div class="popup-coords">${loc.coords[0].toFixed(4)}°N, ${Math.abs(loc.coords[1]).toFixed(4)}°${loc.coords[1] < 0 ? 'W' : 'E'}</div>
      </div>`;

    marker.bindPopup(popupHtml, {
      maxWidth: 280,
      className: 'franklin-popup'
    });

    // Assign to layer groups
    if (loc.category === 'sighting') {
      layers.sightings.addLayer(marker);
    } else if (loc.category === 'supply') {
      layers.supply.addLayer(marker);
    } else if (loc.category === 'record') {
      layers.victory.addLayer(marker);
    } else if (loc.category === 'wreck') {
      layers.wrecks.addLayer(marker);
    } else {
      layers.deaths.addLayer(marker);
    }
  });

  // Add all layers to map
  map.addLayer(layers.sightings);
  map.addLayer(layers.supply);
  map.addLayer(layers.victory);
  map.addLayer(layers.wrecks);
  map.addLayer(layers.deaths);
}

// ── TIMELINE CURSOR MARKER ───────────────────────────────────
function buildTimelineMarker() {
  const el = document.createElement('div');
  el.style.cssText = `
    width: 20px; height: 20px;
    background: #fff;
    border: 3px solid #4a9eff;
    border-radius: 50%;
    box-shadow: 0 0 0 4px rgba(74,158,255,0.3), 0 2px 8px rgba(0,0,0,0.6);
  `;

  const icon = L.divIcon({
    html: el.outerHTML,
    className: '',
    iconSize: [20, 20],
    iconAnchor: [10, 10]
  });

  const ev = TIMELINE_EVENTS[0];
  timelineMarker = L.marker(ev.coords, { icon, zIndexOffset: 1000 });
  timelineMarker.addTo(map);
}

// ── TIMELINE TICKS ───────────────────────────────────────────
function buildTimelineTicks() {
  const container = document.getElementById('timelineTicks');
  const years = ['1845', '', '', '', '', '', '', '', '1846', '', '', '', '1847', '1848', '', '', '2014', '2016', '', ''];
  years.forEach((y, i) => {
    const tick = document.createElement('span');
    tick.className = 'tick';
    tick.textContent = y;
    tick.title = TIMELINE_EVENTS[i]?.date || '';
    tick.addEventListener('click', () => {
      document.getElementById('timelineSlider').value = i;
      updateTimelineUI(i);
    });
    container.appendChild(tick);
  });
}

// ── UPDATE TIMELINE UI ───────────────────────────────────────
function updateTimelineUI(idx) {
  currentEventIdx = idx;
  const ev = TIMELINE_EVENTS[idx];
  if (!ev) return;

  // Update event card
  document.getElementById('eventDate').textContent = ev.date;
  document.getElementById('eventTitle').textContent = ev.title;
  document.getElementById('eventDesc').textContent = ev.desc;
  document.getElementById('eventCoords').textContent =
    `${ev.coords[0].toFixed(4)}°N, ${Math.abs(ev.coords[1]).toFixed(4)}°${ev.coords[1] < 0 ? 'W' : 'E'}`;
  document.getElementById('eventCounter').textContent = `${idx + 1} / ${TIMELINE_EVENTS.length}`;

  // Update ticks
  document.querySelectorAll('.tick').forEach((t, i) => {
    t.classList.toggle('active', i === idx);
  });

  // Move timeline cursor
  if (timelineMarker) {
    timelineMarker.setLatLng(ev.coords);
  }

  // Fly to location
  map.flyTo(ev.coords, Math.min(ev.zoom || 5, 8), { duration: 1.2 });

  // Color the event card accent
  const color = CATEGORY_COLORS[ev.category] || '#4a9eff';
  document.getElementById('eventDate').style.color = color;

  // Apply event-specific route visibility hint
  if (['wreck', 'record'].includes(ev.category)) {
    document.getElementById('eventCard').style.borderColor = color;
  } else {
    document.getElementById('eventCard').style.borderColor = '';
  }
}

// ── LAYER TOGGLES ────────────────────────────────────────────
function setupLayerToggles() {
  document.getElementById('layerRoute').addEventListener('change', e => {
    toggleLayer(layers.routeMain, e.target.checked);
    toggleLayer(layers.routeRetreat, e.target.checked);
  });
  document.getElementById('layerSearch').addEventListener('change', e => {
    toggleLayer(layers.routeSearch, e.target.checked);
  });
  document.getElementById('layerSightings').addEventListener('change', e => {
    toggleLayer(layers.sightings, e.target.checked);
  });
  document.getElementById('layerSupply').addEventListener('change', e => {
    toggleLayer(layers.supply, e.target.checked);
  });
  document.getElementById('layerVictory').addEventListener('change', e => {
    toggleLayer(layers.victory, e.target.checked);
  });
  document.getElementById('layerWrecks').addEventListener('change', e => {
    toggleLayer(layers.wrecks, e.target.checked);
  });
  document.getElementById('layerDeaths').addEventListener('change', e => {
    toggleLayer(layers.deaths, e.target.checked);
  });
}

function toggleLayer(layer, show) {
  if (!layer) return;
  if (show) map.addLayer(layer);
  else map.removeLayer(layer);
}

// ── PLAY/PAUSE ───────────────────────────────────────────────
function setupPlayback() {
  const btn = document.getElementById('playBtn');
  const icon = document.getElementById('playIcon');
  const label = document.getElementById('playLabel');

  btn.addEventListener('click', () => {
    if (playInterval) {
      clearInterval(playInterval);
      playInterval = null;
      btn.classList.remove('playing');
      icon.innerHTML = '<polygon points="5 3 19 12 5 21 5 3"/>';
      label.textContent = 'Auto-Play';
    } else {
      btn.classList.add('playing');
      icon.innerHTML = '<rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>';
      label.textContent = 'Pause';

      if (currentEventIdx >= TIMELINE_EVENTS.length - 1) {
        document.getElementById('timelineSlider').value = 0;
        updateTimelineUI(0);
      }

      playInterval = setInterval(() => {
        const next = currentEventIdx + 1;
        if (next >= TIMELINE_EVENTS.length) {
          clearInterval(playInterval);
          playInterval = null;
          btn.classList.remove('playing');
          icon.innerHTML = '<polygon points="5 3 19 12 5 21 5 3"/>';
          label.textContent = 'Auto-Play';
          return;
        }
        document.getElementById('timelineSlider').value = next;
        updateTimelineUI(next);
      }, 3500);
    }
  });
}

// ── NAVIGATION BUTTONS ───────────────────────────────────────
function setupNavButtons() {
  document.getElementById('prevBtn').addEventListener('click', () => {
    if (currentEventIdx > 0) {
      const newIdx = currentEventIdx - 1;
      document.getElementById('timelineSlider').value = newIdx;
      updateTimelineUI(newIdx);
    }
  });

  document.getElementById('nextBtn').addEventListener('click', () => {
    if (currentEventIdx < TIMELINE_EVENTS.length - 1) {
      const newIdx = currentEventIdx + 1;
      document.getElementById('timelineSlider').value = newIdx;
      updateTimelineUI(newIdx);
    }
  });
}

// ── SLIDER INPUT ─────────────────────────────────────────────
function setupSlider() {
  document.getElementById('timelineSlider').addEventListener('input', e => {
    updateTimelineUI(parseInt(e.target.value));
  });
}

// ── DARK/LIGHT TOGGLE ────────────────────────────────────────
function setupThemeToggle() {
  const btn = document.querySelector('[data-theme-toggle]');
  const html = document.documentElement;
  let theme = html.getAttribute('data-theme') || 'dark';

  const setTheme = (t) => {
    theme = t;
    html.setAttribute('data-theme', t);
    btn.setAttribute('aria-label', `Switch to ${t === 'dark' ? 'light' : 'dark'} mode`);
    btn.innerHTML = t === 'dark'
      ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>'
      : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
  };

  btn.addEventListener('click', () => setTheme(theme === 'dark' ? 'light' : 'dark'));
  setTheme(theme);
}

// ── SLIDER PROGRESS FILL ─────────────────────────────────────
function updateSliderFill(slider) {
  const pct = (parseInt(slider.value) / (TIMELINE_EVENTS.length - 1)) * 100;
  slider.style.background = `linear-gradient(to right, #4a9eff ${pct}%, var(--color-border) ${pct}%)`;
}

// ── SMOOTH SCROLL: CTA + scroll arrow → map section ─────────
function setupHeroScrolls() {
  const cta = document.getElementById('exploreCta');
  const arrow = document.getElementById('scrollArrow');
  const target = document.getElementById('map-section');

  const scrollToMap = (e) => {
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    // Invalidate map size after scroll settles (Leaflet needs this)
    setTimeout(() => map && map.invalidateSize(), 600);
  };

  if (cta) cta.addEventListener('click', scrollToMap);
  if (arrow) arrow.addEventListener('click', scrollToMap);

  // Also invalidate map on any scroll to keep tiles correct
  window.addEventListener('scroll', () => {
    if (map) map.invalidateSize({ animate: false });
  }, { passive: true });
}

// ── INIT ─────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initMap();
  buildTimelineTicks();
  setupLayerToggles();
  setupPlayback();
  setupNavButtons();
  setupSlider();
  setupThemeToggle();
  setupHeroScrolls();

  // Slider fill on change
  const slider = document.getElementById('timelineSlider');
  const refreshFill = () => updateSliderFill(slider);
  slider.addEventListener('input', refreshFill);
  refreshFill();
});
