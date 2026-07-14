# NOTES

## Durable Context

- Product name: `TripCanvas`.
- Competition strategy: prioritize Ralph loop/harness design over feature count.
- Required final proof: working deployed app, GitHub source, editable Korean Notion outline, QA evidence, and working-memory trail.
- Deployment is mandatory. A local-only demo is not complete.
- Notion must be written in Korean and should be an editable presenter outline, not a locked polished final page.
- User-added images must come from local file selection only. The app must not expose image URL input, paste, or fallback UI.
- Browser-local storage is confirmed. Prefer IndexedDB for image data and use localStorage only for lightweight metadata or fallback state.
- Final completion requires a real visible world map with clickable countries or country regions.
- Required layout clarification: the final app must be map-first. A country click opens/updates a selected-country detail surface; desktop uses a right-side panel, mobile uses a bottom panel/sheet. Do not implement a single long scroll page where map, board, and form are all stacked.
- The first `/goal` execution must initialize Git if needed and create an initial commit for the harness/spec state before app implementation begins.

## Chronological Notes

- TBD Execution notes begin when the `/goal` run starts.
