# The Vault by hijacker9173

The Vault is a static, hand-curated cabinet of curiosities: research archives, published Codices, dream-video files, soundtracks, essays, and interactive experiments gathered into one navigable personal site.

The first screen is not a landing page in the marketing sense. It is the working shelf: a large hero, a "New in the Vault" drawer, and the Archive Rooms grid that points visitors into the main collections.

## Main Sections

- `index.html` - home shelf with the latest featured entries and Archive Rooms.
- `about.html` - project framing and intent.
- `gumroad.html` - Codices catalog linking out to Gumroad products.
- `vault-map.html` - Category Atlas, the site map grouped by shelf.
- `dreamledger/` - short-video dream collections such as Cosmos and Metroid.
- `marginalia/` - reflective essays and written fragments.
- `recordroom/` - soundtrack player with cover art, 15-second previews, and full audio playback.
- `odyssey/` - interactive Odyssey quiz and journey map.
- `stephenking-bibliography/` - Stephen King bibliography shelf.
- `grhplovecraftmythos08/` - Lovecraft Mythos concordance.
- `templar-timeline-atlas/` - Templar timeline and atlas.
- `The Franklin Expedition 1845-1848/` - Franklin Expedition route archive.
- `YokaiStudies/` - Japanese folklore compendium.

## Project Structure

```text
LocalGithub/
  assets/                  Shared hero images and Codices covers
  dreamledger/             Dream Ledger hub and dream collection pages
  marginalia/              Writing room and individual essays
  recordroom/              The Record Room, audio files, cover art, and player scripts
  odyssey/                 Odyssey quiz, journey map, styles, and assets
  styles.css               Shared Vault styling for core pages
  index.html               Main Vault home
  gumroad.html             Codices catalog
  vault-map.html           Category Atlas
  about.html               About page
```

Some older or adjacent project folders may still exist in the workspace. The active Vault navigation is controlled by the drawer menus and the Archive Rooms / Category Atlas pages.

## Local Preview

Most pages can be opened directly in a browser:

```text
file:///C:/Users/edwintong/Downloads/LocalGithub/index.html
```

Because this is a static site, no build step is required for the core Vault pages. If a browser blocks local media behavior, use a simple local static server from the `LocalGithub` folder.

## Adding New Content

When adding a new Vault item, update the relevant source page and the discovery surfaces:

1. Add or copy any images into `assets/` or the relevant section's `assets/` folder.
2. Add the entry to its section page, such as `gumroad.html`, `dreamledger/index.html`, `marginalia/index.html`, or `recordroom/index.html`.
3. Update `index.html` if the item should appear in "New in the Vault".
4. Update `vault-map.html` so the Category Atlas stays current.
5. Check image paths carefully for production: folder and file name case matters.
6. Render the changed page locally and verify that images, links, and media load correctly.

## Style Notes

- The visual language is warm, archival, literary, and slightly cinematic.
- Navigation is centered around "Browse the Vault" and the drawer menu.
- The home "New in the Vault" section is intentionally kept to one large feature, four smaller cards, and one wide card.
- Use local assets where possible instead of hotlinking images.
- Prefer lowercase folder links for production consistency, for example `recordroom/`.

## Current Counts

The Category Atlas currently tracks:

- 6 research archives
- 13 Codices
- 2 Dream Ledger files
- 7 soundtracks
- 2 Marginalia notes

Update these counts in `vault-map.html` when new shelves are added.


