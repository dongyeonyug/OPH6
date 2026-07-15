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
- Interaction clarification: country click should show the saved photo board first, with `사진 추가` as a clear action rather than making the add form the default first view. Clicking a memory card should open a large photo viewer/lightbox and return to the same board when closed.
- Map visual clarification: countries with saved photos should use a restrained neutral/soft visited state. Pinterest Red should be reserved for the selected country, primary CTA, and small active accents.
- Product-surface boundary: the completed app UI must not show Ralphthon evidence panels, GOAL/PLAN/QA/CONTROL labels, GitHub/deployment status cards, Notion process content, or other service-irrelevant submission metadata. Harness evidence belongs in README, Notion, QA, and repository documents.
- The first `/goal` execution must initialize Git if needed and create an initial commit for the harness/spec state before app implementation begins.

## Chronological Notes

- TBD Execution notes begin when the `/goal` run starts.
