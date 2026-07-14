# CONTROL

## Status Contract

status_file: PLAN.md
attempt_log: ATTEMPTS.md
durable_notes: NOTES.md
qa_file: QA.md
update_memory_after: every_experiment
check_control_before: phase_change, strategic_pivot, deployment_attempt, github_push, notion_creation, expensive_step

## Human Priorities

primary_priority: evidence_quality
secondary_priority: stable_live_demo

## Scope Knobs

scope_mode: mvp_only
product_name: TripCanvas
presentation_priority: harness_story_first
time_budget_minutes: 40
stop_if_core_demo_passes: true

## Product Knobs

storage_mode: browser_local_indexeddb_preferred_with_localstorage_fallback
image_policy: browser_local_file_only_no_url_input_no_cloud_upload
layout_mode: map_first_responsive_detail_panel_desktop_right_mobile_bottom
design_direction: pinterest_inspired_warm_cream_image_first
notion_mode: editable_korean_presenter_outline
deployment_mode: required_try_vercel_then_practical_fallback
intervention_policy: avoid_direct_code_edits_unless_blocked

## Decision Gates

require_approval_for:
- removing_required_deployment
- replacing_notion_with_local_only_outline
- dropping_github_push
- adding_auth_database_binary_upload_or_multi_user_scope
- direct_human_code_intervention_beyond_small_unblockers
- destructive_change
- unrelated_refactor

## Latest Human Nudge

Use `TripCanvas` as the initial name. Run Tighten through Compile. Deployment is required. Notion must be written in Korean and stay editable by the presenter. Use browser-local storage only. User-added images must come from local photo file selection only, with no image URL input or fallback and no real cloud upload in this iteration. Final completion requires a real visible world map with clickable countries or country regions. The desired product layout is map-first: clicking a country opens or updates a selected-country detail surface, with memories and the add-memory form in a desktop right-side panel or mobile bottom panel/sheet. Do not implement this as one long scroll page with all sections stacked.
