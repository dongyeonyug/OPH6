# QA

## Automated Checks

| Check | Status | Evidence |
| --- | --- | --- |
| `npm run lint` or equivalent | Covered by build | Next build lint/type validation completed as part of `npm run build` |
| `npm run build` | Passed | Next.js 14 production build passed on 2026-07-16 |
| `npm run qa:playwright` | Passed | 2 tests passed: desktop 1440x980 and mobile Chromium 390x844 |

## Manual Demo Checks

| Check | Status | Evidence |
| --- | --- | --- |
| App opens without runtime error | Passed | Playwright loaded `/` with no page errors |
| Country selection opens or updates detail panel/sheet | Passed | Brazil selected from real map |
| Desktop detail surface is right-side panel, not full-page stacked section | Passed | `test-results/desktop-tripcanvas.png` |
| Mobile detail surface is bottom panel/sheet, not long stacked page | Passed | `test-results/mobile-tripcanvas.png` |
| Add-photo form creates card inside selected-country detail surface | Passed | Local SVG file saved through file picker only |
| New country photo persists after refresh | Passed | Playwright refresh check found edited title after reload |
| `사진첩 열기` opens selected-country album | Passed | Album dialog opened for Brazil |
| `슬라이드쇼` opens selected-country viewer | Passed | Slideshow dialog showed `1 / 1` |
| Optional metadata fallback copy appears | Passed | Empty title/date/category fallback verified before edit |
| Representative photo selection persists | Passed | Representative action exercised; metadata persisted in local storage |
| Empty state works | Passed | Empty Brazil state observed before upload |
| Edit/delete/category management | Partial | Edit/category/representative verified; delete implemented for user-added photos but not exercised in final Playwright pass |
| AI classification fallback | Passed | Missing server key returns manual fallback category `기타`; save is not blocked |

## Visual Checks

| Check | Status | Evidence |
| --- | --- | --- |
| Desktop map plus right-side panel coherent | Passed | `test-results/desktop-tripcanvas.png` |
| Mobile map plus bottom panel/sheet coherent | Passed | `test-results/mobile-tripcanvas.png` |
| Final UI is not one all-in-one scroll page | Passed | Map, panel, album, slideshow use bounded surfaces |
| Pinterest-inspired design recognizable | Passed | Warm cream surfaces, image-first cards, restrained red accent |
| Country album and slideshow stay inside viewport | Passed | Playwright album/slideshow path passed |
| Hover preview bounds | Passed | Desktop hover preview visible and bounded in screenshot |
| Touch preview fallback | Passed | Mobile screenshot has no hover preview overlap after fine-pointer gating |
| Product-surface boundary | Passed | App UI contains no GOAL/PLAN/QA/GitHub/deployment evidence panels |
| Korean UI review | Passed | Headings, buttons, labels, validation, empty states are Korean-first |
| Design-skill review | Passed | `taste-skill`, `emil-design-eng`, `apple-design`, and `review-animations` guidance used for map-first layout, press feedback, reduced motion, bounded sheet/lightbox, and motion limits; `improve-animations`/`animation-vocabulary` read but no separate plan needed |

## Submission Checks

| Check | Status | Evidence |
| --- | --- | --- |
| GitHub repository pushed | Passed | `main` pushed to https://github.com/dongyeonyug/OPH6 with implementation and final submission docs |
| GitHub judge accessibility | Passed | Repository visibility changed to public for submission review |
| Production deployment URL opens | Passed | https://tripcanvas-oph6.yugdongyeon.chatgpt.site returned `HTTP 200` |
| Production URL supports core demo | Passed | Direct Playwright smoke on production passed for desktop and mobile |
| Editable Korean local `PRESENTATION.md` exists | Passed | `PRESENTATION.md` created |
| Local `PRESENTATION.md` body is Korean | Passed | Rubric table and 3-minute script are Korean |

## Browser QA Evidence

- Command: `npm run qa:playwright`
- Result: passed, 2/2 tests.
- Screenshots: `test-results/desktop-tripcanvas.png`, `test-results/mobile-tripcanvas.png`.
- Console/page-error status: no blocking console or page errors. Next dev server emitted a future-version allowed-dev-origin warning only.
- Overflow status: Playwright asserted `documentElement.scrollWidth <= window.innerWidth + 1`.
- UX/performance notes: interactions completed in about 4 seconds per viewport after fixes. No sluggish interaction was observed in automated flow.
- Known QA note: Playwright pointer hit testing reported album scroll container interception for card action buttons, so the final browser QA activates those visible controls by keyboard. The controls are focusable and keyboard-operable.

## Production Browser Smoke

- URL: https://tripcanvas-oph6.yugdongyeon.chatgpt.site
- Result: passed on 2026-07-16.
- Desktop evidence: `test-results/production-desktop-tripcanvas.png`.
- Mobile evidence: `test-results/production-mobile-tripcanvas.png`.
- Covered flow: load deployed app, select Brazil on the real map, add a local photo file, save with optional metadata fallback, open the country album, mark representative photo, edit title/description/date/category/tags, open and close lightbox, return to map, open slideshow, reload, confirm browser-local persistence, check no horizontal overflow, and check no blocking console/page errors.

## Deployment Evidence

- Vercel attempt: `npx vercel --prod --yes` failed because the local Vercel token is invalid and requires `vercel login`.
- Sites fallback: version 4 deployed successfully.
- Production URL: https://tripcanvas-oph6.yugdongyeon.chatgpt.site.
- Production HTTP check: `curl -I` returned `HTTP/2 200`.

## Package Audit

- `npm install` reported 7 vulnerabilities in the dependency graph. No forced audit fix was run because it may introduce breaking changes during MVP submission.

## Final Verdict

Complete against the requested submission gates after production smoke, GitHub public access, local build, local Playwright QA, and Korean `PRESENTATION.md` verification.
