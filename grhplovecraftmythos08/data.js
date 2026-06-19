// Cthulhu Mythos stories by H.P. Lovecraft.
// Composition dates and first publication info verified against hplovecraft.com
// (The H.P. Lovecraft Archive). Story page URLs link directly to each tale.
window.STORIES = [
  {
    id: "dagon",
    title: "Dagon",
    written: "1917-07",
    writtenYear: 1917,
    published: "1919-11",
    publishedYear: 1919,
    venue: "The Vagrant",
    summary:
      "A morphine-addicted narrator recounts how, adrift in the Pacific during WWI, he stumbled onto a newly upheaved island and saw a colossal, fish-like being worshipping a monolith. The encounter shattered his sanity; he now lives in dread that the same thing is at his door.",
    entities: ["Deep Ones", "Dagon"],
    locations: ["Pacific Ocean", "Risen island"],
    themes: ["Cosmic indifference", "Ancient pre-human cults", "Submerged horror"],
    note: "First-published prototype for the Deep Ones / Dagon material later expanded in The Shadow over Innsmouth.",
    sourceUrl: "https://www.hplovecraft.com/writings/texts/fiction/d.aspx"
  },
  {
    id: "nameless-city",
    title: "The Nameless City",
    written: "1921-01",
    writtenYear: 1921,
    published: "1921-11",
    publishedYear: 1921,
    venue: "The Wolverine",
    summary:
      "An Arabian explorer descends into a buried, low-ceilinged city older than any known human culture and discovers murals depicting its reptilian creators. The story closes with the famous couplet attributed to Abdul Alhazred: 'That is not dead which can eternal lie...'",
    entities: ["Crawling Ones", "Abdul Alhazred"],
    locations: ["Arabian Desert", "Nameless City"],
    artifacts: ["Necronomicon (attributed couplet)"],
    themes: ["Forbidden archaeology", "Pre-human civilizations", "Cyclopean architecture"],
    note: "First appearance of the Necronomicon's mad poet Abdul Alhazred and the iconic couplet.",
    sourceUrl: "https://www.hplovecraft.com/writings/texts/fiction/nc.aspx"
  },
  {
    id: "festival",
    title: "The Festival",
    written: "1923-10",
    writtenYear: 1923,
    published: "1925-01",
    publishedYear: 1925,
    venue: "Weird Tales",
    summary:
      "A man answers an ancestral summons to the ancient seaport of Kingsport at Yuletide and is led by silent kin into a crypt beneath a church, where a winged horror waits to bear celebrants away into the depths.",
    entities: ["Byakhee-like steeds (unnamed)"],
    locations: ["Kingsport, Massachusetts"],
    artifacts: ["Necronomicon"],
    themes: ["Hereditary cults", "Holiday inversion", "New England gothic"],
    note: "First explicit on-page quotation of the Necronomicon and an early Arkham-cycle Massachusetts setting.",
    sourceUrl: "https://www.hplovecraft.com/writings/texts/fiction/f.aspx"
  },
  {
    id: "call-of-cthulhu",
    title: "The Call of Cthulhu",
    written: "1926-08",
    writtenYear: 1926,
    published: "1928-02",
    publishedYear: 1928,
    venue: "Weird Tales",
    summary:
      "Three interlocking documents — a sculptor's dreams, a New Orleans cult raid, and a Norwegian sailor's log — converge on a sunken city in the South Pacific where the priest-thing Cthulhu briefly stirs. The narrator concludes that humanity lives on a placid island of ignorance amid black seas of infinity.",
    entities: ["Cthulhu", "Great Old Ones", "Cthulhu Cult"],
    locations: ["R'lyeh", "Providence", "New Orleans", "South Pacific"],
    artifacts: ["Necronomicon", "Cthulhu idol"],
    themes: ["Cosmic indifference", "Cyclic awakening", "Worldwide cult network"],
    note: "Foundational Mythos story; names Cthulhu, R'lyeh, and the 'stars are right' premise.",
    sourceUrl: "https://www.hplovecraft.com/writings/texts/fiction/cc.aspx"
  },
  {
    id: "ccdw",
    title: "The Case of Charles Dexter Ward",
    written: "1927",
    writtenYear: 1927,
    published: "1941-05",
    publishedYear: 1941,
    venue: "Weird Tales (posthumous, abridged)",
    summary:
      "Young Charles Dexter Ward of Providence resurrects his witch-burned ancestor Joseph Curwen through the 'essential saltes' of his bones. Curwen replaces Ward; his physician Dr. Willett uncovers the substitution and destroys the wizard with a dismissal formula.",
    entities: ["Yog-Sothoth (invoked)", "Joseph Curwen (revenant)"],
    locations: ["Providence, Rhode Island", "Pawtuxet"],
    artifacts: ["Necronomicon", "Book of Eibon", "Liber Damnatus", "Essential saltes"],
    themes: ["Resurrection alchemy", "Ancestral guilt", "Colonial New England occultism"],
    note: "Novel-length; Lovecraft never published it in his lifetime. First appeared posthumously in Weird Tales in abridged form.",
    sourceUrl: "https://www.hplovecraft.com/writings/texts/fiction/cdw.aspx"
  },
  {
    id: "colour",
    title: "The Colour Out of Space",
    written: "1927-03",
    writtenYear: 1927,
    published: "1927-09",
    publishedYear: 1927,
    venue: "Amazing Stories",
    summary:
      "A meteorite lands on the Gardner farm west of Arkham. Over months, an indescribable colour from its core blights the land, twists the family, and drains every living thing before lifting back into space — leaving a 'blasted heath' that still grows.",
    entities: ["The Colour (unclassifiable entity)"],
    locations: ["Arkham", "Blasted Heath"],
    themes: ["Truly alien biology", "Slow contamination", "Beyond human senses"],
    note: "Lovecraft considered this his finest work. Introduces the 'blasted heath' and a fully non-anthropomorphic horror.",
    sourceUrl: "https://www.hplovecraft.com/writings/texts/fiction/cs.aspx"
  },
  {
    id: "dunwich",
    title: "The Dunwich Horror",
    written: "1928-08",
    writtenYear: 1928,
    published: "1929-04",
    publishedYear: 1929,
    venue: "Weird Tales",
    summary:
      "In decaying Dunwich, Massachusetts, Lavinia Whateley bears twin sons to Yog-Sothoth. Wilbur, the visible twin, dies trying to steal the Necronomicon from Miskatonic University; his invisible brother goes on a rampage until Dr. Henry Armitage banishes it on Sentinel Hill.",
    entities: ["Yog-Sothoth", "Wilbur Whateley", "Dunwich Horror (twin)"],
    locations: ["Dunwich, Massachusetts", "Miskatonic University", "Sentinel Hill"],
    artifacts: ["Necronomicon", "Whateley diary"],
    themes: ["Half-human progeny", "Banishment ritual", "Decaying rural America"],
    note: "Introduces Dr. Henry Armitage and the Miskatonic library as Mythos institutions.",
    sourceUrl: "https://www.hplovecraft.com/writings/texts/fiction/dh.aspx"
  },
  {
    id: "whisperer",
    title: "The Whisperer in Darkness",
    written: "1930",
    writtenYear: 1930,
    published: "1931-08",
    publishedYear: 1931,
    venue: "Weird Tales",
    summary:
      "Miskatonic folklorist Albert Wilmarth corresponds with Vermont recluse Henry Akeley about crab-like beings in the hills. Wilmarth visits the farmhouse, where 'Akeley' urges him to travel with the Mi-Go to Yuggoth in a brain cylinder; Wilmarth discovers the host is a hollow disguise.",
    entities: ["Mi-Go (Fungi from Yuggoth)", "Nyarlathotep (mentioned)", "Shub-Niggurath (mentioned)"],
    locations: ["Vermont hills", "Yuggoth (Pluto)", "Miskatonic University"],
    artifacts: ["Brain cylinders", "Black stone"],
    themes: ["Interplanetary contact", "Body-swap deception", "Forbidden correspondence"],
    note: "Introduces the Mi-Go and Yuggoth and explicitly cross-references R'lyeh, the Necronomicon, and Tsathoggua.",
    sourceUrl: "https://www.hplovecraft.com/writings/texts/fiction/wid.aspx"
  },
  {
    id: "mountains",
    title: "At the Mountains of Madness",
    written: "1931",
    writtenYear: 1931,
    published: "1936-02",
    publishedYear: 1936,
    venue: "Astounding Stories (serialized Feb–Apr 1936)",
    summary:
      "Miskatonic geologist William Dyer warns the Starkweather–Moore expedition away from Antarctica. He recounts discovering a cyclopean city built by the Elder Things, deciphering its bas-reliefs, and fleeing a resurrected shoggoth — and worse — beyond the mountains.",
    entities: ["Elder Things (Old Ones)", "Shoggoths", "Mi-Go (mentioned)", "Cthulhu spawn (mentioned)"],
    locations: ["Antarctica", "Mountains of Madness", "Elder Thing city"],
    artifacts: ["Necronomicon", "Bas-reliefs"],
    themes: ["Deep time geology", "Created-becomes-creator", "Cosmic history"],
    note: "Novel-length. Establishes the Elder Things' history and the shoggoth uprising.",
    sourceUrl: "https://www.hplovecraft.com/writings/texts/fiction/mm.aspx"
  },
  {
    id: "innsmouth",
    title: "The Shadow over Innsmouth",
    written: "1931-11",
    writtenYear: 1931,
    published: "1936-04",
    publishedYear: 1936,
    venue: "Visionary Publishing (chapbook)",
    summary:
      "A young antiquarian's visit to the decaying Massachusetts port of Innsmouth uncovers a town interbred with the Deep Ones under the Esoteric Order of Dagon. He barely escapes — only to discover, through genealogy, that his own ancestry will pull him back to the sea.",
    entities: ["Deep Ones", "Dagon", "Hydra", "Esoteric Order of Dagon"],
    locations: ["Innsmouth, Massachusetts", "Devil Reef", "Y'ha-nthlei"],
    themes: ["Hybrid heredity", "Town under cult control", "Inevitable transformation"],
    note: "Only one of Lovecraft's books published in his lifetime — the Visionary Publishing chapbook, 1936.",
    sourceUrl: "https://www.hplovecraft.com/writings/texts/fiction/soi.aspx"
  },
  {
    id: "witch-house",
    title: "The Dreams in the Witch House",
    written: "1932-02",
    writtenYear: 1932,
    published: "1933-07",
    publishedYear: 1933,
    venue: "Weird Tales",
    summary:
      "Miskatonic mathematics student Walter Gilman rents Keziah Mason's old garret in Arkham. Non-Euclidean angles of the room and his higher-math studies pull him through dream-portals to other dimensions, where he is forced into a child sacrifice by the witch and her familiar Brown Jenkin.",
    entities: ["Nyarlathotep (as Black Man)", "Azathoth", "Keziah Mason", "Brown Jenkin"],
    locations: ["Arkham", "Witch House (Keziah Mason's room)", "Hyperspace"],
    artifacts: ["Necronomicon"],
    themes: ["Hyperdimensional geometry", "Witchcraft as physics", "Sleep as travel"],
    note: "Closest Lovecraft came to fusing modern physics with traditional witch-cult lore.",
    sourceUrl: "https://www.hplovecraft.com/writings/texts/fiction/dwh.aspx"
  },
  {
    id: "doorstep",
    title: "The Thing on the Doorstep",
    written: "1933-08",
    writtenYear: 1933,
    published: "1937-01",
    publishedYear: 1937,
    venue: "Weird Tales",
    summary:
      "Daniel Upton recounts how his friend Edward Derby married Asenath Waite of Innsmouth and was progressively possessed by her — actually her dead father Ephraim. Upton shoots the body inhabiting Derby after a half-decomposed visitor leaves a confessional note on his doorstep.",
    entities: ["Deep Ones (heritage)", "Ephraim Waite", "Shoggoths (mentioned)"],
    locations: ["Arkham", "Innsmouth", "Chesuncook, Maine"],
    artifacts: ["Necronomicon"],
    themes: ["Mind transfer", "Possession across genders and graves", "Marriage as predation"],
    note: "Bridges the Innsmouth cycle with the body-swap themes of The Shadow Out of Time.",
    sourceUrl: "https://www.hplovecraft.com/writings/texts/fiction/td.aspx"
  },
  {
    id: "shadow-time",
    title: "The Shadow Out of Time",
    written: "1934-11",
    writtenYear: 1934,
    published: "1936-06",
    publishedYear: 1936,
    venue: "Astounding Stories",
    summary:
      "Economics professor Nathaniel Wingate Peaslee loses five years to amnesia in 1908. He learns his mind was swapped with a member of the Great Race of Yith, who archived him in their pre-human library in Australia. An expedition recovers a manuscript in his own handwriting — proving it happened.",
    entities: ["Great Race of Yith", "Flying Polyps", "Cthulhu (mentioned)"],
    locations: ["Miskatonic University", "Pnakotus (Australia)", "Pre-Cambrian Earth"],
    artifacts: ["Pnakotic Manuscripts", "Yithian library"],
    themes: ["Time as habitable space", "Civilizational succession", "Memory as evidence"],
    note: "Completes Lovecraft's cosmology of pre-human Earth occupiers (Elder Things, Cthulhu spawn, Yith, Mi-Go).",
    sourceUrl: "https://www.hplovecraft.com/writings/texts/fiction/sot.aspx"
  },
  {
    id: "haunter",
    title: "The Haunter of the Dark",
    written: "1935-11",
    writtenYear: 1935,
    published: "1936-12",
    publishedYear: 1936,
    venue: "Weird Tales",
    summary:
      "Providence writer Robert Blake investigates an abandoned church on Federal Hill and finds the Shining Trapezohedron — a window onto an avatar of Nyarlathotep that can only move in darkness. A blackout frees the entity; Blake dies as it reaches him across the city.",
    entities: ["Nyarlathotep (Haunter of the Dark)", "Starry Wisdom Cult"],
    locations: ["Providence", "Federal Hill", "Free-Will Church"],
    artifacts: ["Shining Trapezohedron", "Necronomicon", "De Vermis Mysteriis"],
    themes: ["Curiosity as fatal", "Avatars of Nyarlathotep", "Light as the only ward"],
    note: "Dedicated to Robert Bloch; last fiction Lovecraft completed.",
    sourceUrl: "https://www.hplovecraft.com/writings/texts/fiction/hd.aspx"
  }
];

// Canonical entity catalogue used for the relationship panel.
window.ENTITIES = [
  { name: "Cthulhu", kind: "Great Old One" },
  { name: "Yog-Sothoth", kind: "Outer God" },
  { name: "Azathoth", kind: "Outer God" },
  { name: "Nyarlathotep", kind: "Outer God / Avatar" },
  { name: "Shub-Niggurath", kind: "Outer God" },
  { name: "Dagon", kind: "Great Old One" },
  { name: "Hydra", kind: "Great Old One" },
  { name: "Deep Ones", kind: "Race" },
  { name: "Mi-Go", kind: "Race" },
  { name: "Elder Things", kind: "Race" },
  { name: "Shoggoths", kind: "Race" },
  { name: "Great Race of Yith", kind: "Race" },
  { name: "Flying Polyps", kind: "Race" }
];

window.HPLA_BASE = "https://www.hplovecraft.com";
