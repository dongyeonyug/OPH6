# Tighten Notes

## Resolved Ambiguities

### Product name

Why it mattered: the app name appears in UI copy, README, Notion outline, deployment metadata, and the 3-minute presentation.

Interpretations considered:
- Keep `WanderPins` as a Pinterest-like travel pin metaphor.
- Use a broader, more presentation-friendly name.

Decision: use `TripCanvas`.

Reason: `TripCanvas` preserves the visual-memory idea without sounding too derivative of Pinterest, and it works naturally in the phrase "turn your travel memories into a canvas."

### Deployment requirement

Why it mattered: deployment changes the completion bar from local demo to public, judge-verifiable artifact.

Interpretations considered:
- Deployment as nice-to-have, with local demo fallback.
- Deployment as required `done_when` item.

Decision: deployment is required.

Reason: a production URL strengthens live-demo reliability and makes the Ralphthon submission easier for judges to inspect.

### Notion output format

Why it mattered: an over-polished final page may be harder for the presenter to adapt under event pressure.

Interpretations considered:
- Locked/polished final submission page.
- Editable presenter outline.

Decision: create an editable Korean-language Notion presentation outline.

Reason: the event presentation is in Korea and limited to 3 minutes, so the presenter needs a Korean outline they can adjust quickly.

### Image source policy

Why it mattered: real uploads would increase implementation risk, while image URL input would weaken the product direction. The user wants a direct photo-saving experience.

Interpretations considered:
- Local file-only user image input with bundled/static sample images for seed cards.
- Hybrid input with online image URL fallback.

Decision: local file-only user image input.

Reason: the MVP should behave like a travel memory app, not a URL scrapbook. User-added images come from local file selection only, persist in the same browser/device, and avoid real cloud upload in this iteration.

## Compile Gate Result

- Measurable `done_when`: present and approved.
- Scorecard: present with threshold, regression checks, scoring paths, and stop condition.
- Scope boundaries/non-goals: present.
- Fast feedback loop: present.
- Verification checks: present.
- Working memory: present.
- Human control surface: present.
- Context/files for implementation: present.
- Korean-language Notion requirement: present.

Result: ready for `GOAL.md` execution.
