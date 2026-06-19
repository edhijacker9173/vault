# Handoff - The King Shelf

## What this is

This is a separate working copy generated from the local Lovecraft bibliography site. It keeps the same static-site structure and interaction model, but replaces the content with a Stephen King bibliography.

## Files

- `index.html` - redesigned catalog shell, updated copy, source/scope notes, and clean script includes.
- `data.js` - bibliography records exposed as `window.STORIES`.
- `app.js` - filtering, sorting, cards, chips, theme toggle, and dynamic network graph.
- `styles.css` - dark paperback catalog interface using the same red, warm-paper, and shelf palette.
- `assets/king-shelf-hero.png` - local generated bitmap hero asset.

## Data scope

The data includes released novels, Bachman novels, novellas, story collections, nonfiction, and major coauthored books. It excludes limited editions, interviews, speeches, anthology appearances, uncollected short stories, and unreleased future titles.

The official Stephen King Written Works list was used for dates and categories:
https://stephenking.com/works/

## Notes

- `The Green Mile` is represented once as the 1996 serial novel instead of six separate installment cards.
- `Other Worlds Than These` is excluded because the official date is October 6, 2026, later than this copy's creation date of June 17, 2026.
- Summaries and thread tags are original browsing metadata for this local copy, not official publisher copy.
