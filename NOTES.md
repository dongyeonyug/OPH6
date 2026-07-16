# NOTES

## Durable Context

- Product name: `TripCanvas`.
- Competition strategy: prioritize Ralph loop/harness design over feature count.
- Required final proof: working deployed app, GitHub source, editable Korean local `PRESENTATION.md`, QA evidence, and working-memory trail.
- Deployment is mandatory. A local-only demo is not complete.
- `PRESENTATION.md` must be written in Korean and should be an editable local presenter document, not a locked polished final page or external document.
- User-added images must come from local file selection only. The app must not expose image URL input, paste, or fallback UI.
- Browser-local storage is confirmed. Prefer IndexedDB for image data and use localStorage only for lightweight metadata or fallback state.
- Final completion requires a real visible world map with clickable countries or country regions.
- Required layout clarification: the final app must be map-first. A country click opens/updates a selected-country detail surface; desktop uses a right-side panel, mobile uses a bottom panel/sheet. Do not implement a single long scroll page where map, board, and form are all stacked.
- Interaction clarification: country click should show the country summary and saved photo board preview first, with `사진 추가`, `사진첩 열기`, and `슬라이드쇼` as clear actions rather than making the add form the default first view. Clicking a photo card should open a large photo viewer/lightbox and return to the same album/board when closed.
- Country album decision: implement the recommended flow where `사진 추가` saves photos to the selected country, `사진첩 열기` opens a country-specific editable album, and `슬라이드쇼` opens a country-specific viewer.
- Save-field decision: only country and photo are required. Title/description, date, tags, and category are optional; empty optional metadata should display fallbacks such as `설명 없는 사진`, `날짜 없음`, and `기타`.
- Time budget decision: target development time is about 50 minutes.
- Map visual clarification: countries with saved photos should use a restrained neutral/soft visited state. Pinterest Red should be reserved for the selected country, primary CTA, and small active accents.
- Product-surface boundary: the completed app UI must not show Ralphthon evidence panels, GOAL/PLAN/QA/CONTROL labels, GitHub/deployment status cards, presentation process content, or other service-irrelevant submission metadata. Harness evidence belongs in README, local `PRESENTATION.md`, QA, and repository documents.
- External presentation-document writing is removed from the goal contract; use repository-local `PRESENTATION.md` only.
- The first `/goal` execution must initialize Git if needed and create an initial commit for the harness/spec state before app implementation begins.

## Chronological Notes

- TBD Execution notes begin when the `/goal` run starts.
- 2026-07-16: Implemented TripCanvas as a compact Next.js app on React 18/Next 14 for `react-simple-maps` compatibility.
- 2026-07-16: Browser-local image storage uses IndexedDB for blobs and localStorage for metadata fallback.
- 2026-07-16: Playwright desktop/mobile core flow passes after fixing mobile hover preview and using keyboard activation for album card actions where Playwright pointer hit testing saw the scroll container.
- 2026-07-16: Vercel production deployment is blocked by invalid local token. Sites fallback project created with `.openai/hosting.json`.
