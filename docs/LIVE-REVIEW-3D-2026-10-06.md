# Live review and 3D enhancement — 6 October 2026

Reviewed https://www.drtech.lk/ in Chrome at 1440px and 390px, including the hero, Business IT chapter and digital showcase. Live screenshots are retained locally under `docs/review/live-2026-10-06/`.

## Findings

The existing site clearly communicates IT support, exposes prices and support actions, and fits desktop/mobile without horizontal overflow. It has no live canvas; the hero is a photograph with a short CSS entrance. The Business IT stack is a static list. The large ERP and customer-photography placeholders correctly avoid invented proof, but weaken the showcase until approved assets are available.

## Applied direction

Extend the approved support-first website with real 3D hardware and controlled depth rather than replacing its business purpose or contact flow. Keep EN/SI/TA, existing prices and routes, ERP_AI_AGENT as the primary project, and all support actions. The previously removed tabs, view toggle and price panel remain absent.

The hero progressively loads the existing Three.js renderer after the page load and an idle delay. It adds a desktop tower and a connected-device signal path, a bounded camera arrival, and small pointer-driven perspective changes. The renderer stops drawing after the camera settles and pauses offscreen or in hidden tabs. The photograph remains the initial/fallback asset; reduced motion and data-saving preferences skip the renderer entirely. The live stage fades out the photograph to prevent duplicated devices.

Business IT gains an authored connected-system diagram with a one-time connection sequence and CSS perspective. Project preview depth responds to hover/focus while keeping text outside the transformed media. These supporting effects add no second WebGL runtime or new dependency.

## Validation evidence

- Existing tests pass in English, Sinhala and Tamil; production build and all seven prerender/HTTP route checks pass.
- The existing browser suite passed 72 route/language/width combinations with no overflow, missing images or browser exceptions.
- `scripts/3d-checks.mjs` verified image-first markup, renderer stopping after settling, pointer response, offscreen pause, actual WebGL context-loss recovery, and photographic fallbacks for reduced motion, data saving and unavailable WebGL. Translated 3D hero layouts passed at 1440px and 390px; raw results and captures are under `docs/review/3d-2026-10-06/`.
- The first lifecycle check exposed frame-count-driven camera timing on a slow software renderer. An elapsed-time deadline now bounds the arrival at 750ms and pointer settling at 280ms. The rerun passed.
- Impeccable's detector reported only the existing approved gradient heading. An independent finish review accepted the scoped visual/interaction changes and requested an update of the outdated renderer description in DESIGN.md.
- The documenter updated DESIGN.md from the implementation. The reviewer scored that sole persistence correction resolved and returned `ship`; that verdict pass covers the documentation correction and leaves the original scoped screenshot review unchanged.

## Remaining asset limitations

The programmable hardware is illustrative geometry, not a customer installation or a scan of the photographic studio. Genuine customer photographs and approved ERP screenshots are still required to replace the labelled placeholders. No new factual claims, prices or release status are introduced. This work remains local until publishing or pushing is requested.
