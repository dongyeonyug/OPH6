# PLAN

## Goal

Build and submit TripCanvas as a deployed Ralphthon MVP plus autonomous-loop evidence package.

## Current Strategy

Keep the product small and reliable within roughly 50 minutes, with a map-first UI where clicking a country opens a responsive detail panel/sheet instead of a one-page stacked scroll layout. The selected-country panel should lead to country-specific photo saving, `사진첩 열기`, and `슬라이드쇼`. Then use the harness artifacts, GitHub history, deployment, QA trail, and editable Korean local `PRESENTATION.md` to maximize the Ralphthon AI-agent-utilization score without requiring an external presentation document.

Current phase: Phase 2/3 combined implementation. The repository already has harness commits on `main`, so implementation continues on top of existing history without rewriting.

## Phases

- [x] Inspect target repo, existing files, and tool availability.
- [x] Verify existing Git history and harness/spec commits.
- [x] Scaffold or update the Next.js app.
- [x] Implement the TripCanvas core demo flow with desktop right-side detail panel and mobile bottom detail panel/sheet.
- [x] Add browser-local persistence with IndexedDB preferred and localStorage fallback.
- [x] Add country-specific album flow: `사진 추가`, `사진첩 열기`, representative photo, edit/delete, and `슬라이드쇼`.
- [x] Apply Pinterest-inspired visual polish.
- [x] Run fast feedback checks.
- [ ] Push to GitHub.
- [ ] Deploy to production.
- [x] Create editable Korean local `PRESENTATION.md`.
- [ ] Run final verification and update `QA.md`.

## Open Decisions

- None. Product name is `TripCanvas`; development budget is about 50 minutes; deployment is required; local `PRESENTATION.md` must be Korean and editable; no external presentation document is required; user-added images are local-file-only with no image URL input or fallback; layout must be map-first with country details in a desktop right panel and mobile bottom panel/sheet, not a single stacked scroll page. Country click shows the summary/photo preview first, `사진 추가`, `사진첩 열기`, and `슬라이드쇼` are explicit actions, photo-card click opens a large photo viewer/lightbox, visited-country map styling stays understated, and service-irrelevant Ralphthon/GOAL/QA/GitHub/PRESENTATION.md evidence must not appear on the user-facing app surface. Country and photo are the only required save fields; optional metadata can be empty and should show `설명 없는 사진`, `날짜 없음`, and `기타` fallbacks.
