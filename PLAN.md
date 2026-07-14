# PLAN

## Goal

Build and submit TripCanvas as a deployed Ralphthon MVP plus autonomous-loop evidence package.

## Current Strategy

Keep the product small and reliable, with a map-first UI where clicking a country opens a responsive detail panel/sheet instead of a one-page stacked scroll layout. Then use the harness artifacts, GitHub history, deployment, QA trail, and editable Korean Notion outline to maximize the Ralphthon AI-agent-utilization score.

## Phases

- [ ] Inspect target repo, existing files, and tool availability.
- [ ] Initialize Git if needed and create the initial harness/spec commit before app implementation.
- [ ] Scaffold or update the Next.js app.
- [ ] Implement the TripCanvas core demo flow with desktop right-side detail panel and mobile bottom detail panel/sheet.
- [ ] Add browser-local persistence with IndexedDB preferred and localStorage fallback.
- [ ] Apply Pinterest-inspired visual polish.
- [ ] Run fast feedback checks.
- [ ] Push to GitHub.
- [ ] Deploy to production.
- [ ] Create editable Korean Notion presentation outline.
- [ ] Run final verification and update `QA.md`.

## Open Decisions

- None. Product name is `TripCanvas`; deployment is required; Notion must be Korean and editable; user-added images are local-file-only with no image URL input or fallback; layout must be map-first with country details in a desktop right panel and mobile bottom panel/sheet, not a single stacked scroll page.
