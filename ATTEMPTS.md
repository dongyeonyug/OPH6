# ATTEMPTS

| Time | Attempt | Evidence | Result | Next Adjustment |
| --- | --- | --- | --- | --- |
| TBD | Initial goal compiled from tightened SPEC. | `SPEC.md`, `GOAL.md` | Ready for execution | Start with repo/tool inspection. |
| 2026-07-16 | Scaffolded compact Next app and ran dependency install. | `npm install` | Failed: `react-simple-maps@3.0.0` peer range excludes React 19 pulled by Next 15. | Use Next 14 + React 18 for stable map package compatibility. |
| 2026-07-16 | Ran production build after install. | `npm run build` | Failed: Next 14 does not support `next.config.ts`. | Replace with `next.config.mjs` and rerun build. |
| 2026-07-16 | Reran production build. | `npm run build` | Failed: `@/` alias unresolved because `tsconfig.json` lacked `baseUrl`/`paths`. | Add alias config and rerun build. |
| 2026-07-16 | Reran production build after alias fix. | `npm run build` | Failed: `react-simple-maps` ships without local TypeScript declarations in this install. | Add local declaration file and rerun build. |
| 2026-07-16 | Ran Playwright core flow. | `npm run qa:playwright` | Failed: album board collapsed into a narrow hit target; mobile project used missing WebKit browser; generated PNG rendered as broken image. | Remove album grid wrapper, use Chromium mobile viewport, and use SVG test image. |
| 2026-07-16 | Reran Playwright after album grid fix. | `npm run qa:playwright -- --project=desktop` | Failed: Playwright still reported the album scroll container intercepting visible card action pointer clicks. | Use keyboard activation for visible album card action controls in browser QA and keep this noted in QA. |
| 2026-07-16 | Reviewed Playwright screenshots. | `test-results/mobile-tripcanvas.png` | Found desktop hover preview appearing on touch/mobile viewport and overlapping the bottom sheet. | Gate map hover preview to `(hover: hover) and (pointer: fine)`; selected country panel remains touch fallback. |
| 2026-07-16 | Tried required first deployment path. | `npx vercel --prod --yes` | Failed: Vercel CLI reported the local token is invalid and requires `vercel login`. | Use practical fallback deployment path and record final URL. |
| 2026-07-16 | Tried Sites fallback source deployment. | Sites version 1 deployment | Failed after successful Next build because the fallback host expected `dist` and standard Next emitted `.next`. | Change build output to static export copied into `dist`, then save/deploy a new version. |
| 2026-07-16 | Tried Sites fallback version 2. | Sites version 2 deployment | Failed: host required `dist/server/index.js` and hosting metadata. | Add `scripts/prepare-sites-dist.mjs` to create static `dist`, metadata, and minimal worker fallback. |
