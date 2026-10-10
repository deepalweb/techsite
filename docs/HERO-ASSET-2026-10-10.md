# Static homepage hero asset refinement

Scope: `public/redesign/scene.js`, the hero's accessible description and motion-control removal, and its decorative cursor. Other homepage content and React service routes are preserved.

The user's approved direction is a realistic laptop, desktop PC, router and printer scene matching the navy/blue photograph. The geometry, procedural desk grain and reflection panels are original code-authored illustrations. The laptop screen samples the wallpaper region of the existing approved workstation image. No external model, customer photograph or fabricated interface screenshot was added.

Validation: production build and existing EN/SI/TA route/support tests passed. Chrome checks at 1440 × 900 and 390 × 844 confirmed a rendered scene, no horizontal overflow and no page errors. Reduced motion confirmed the photograph with no WebGL canvas. Simulated WebGL context loss confirmed photograph restoration. Screenshots are in ignored `docs/review/hero-desktop.png`, `hero-mobile.png` and `hero-reduced.png`.

The Impeccable detector ran once. It reported incumbent whole-page typography, card, background and contrast findings outside this narrowly requested hardware refinement; no page-wide restyling was performed. Existing production bundle-size warnings remain.

This is a detailed procedural 3D illustration, not a photogrammetry model. It uses no external texture/HDR downloads. Changes are local only.

Follow-up after owner feedback: removed the hard desk edge, reduced saturated rim lighting, lowered the camera angle, reduced tower/router scale and separated the printer. Desktop/mobile screenshots are `docs/review/hero-clean-desktop.png` and `hero-clean-mobile.png`; both checks confirmed a ready scene, no page errors and no horizontal overflow.

## Superseded by photographic hero

The owner subsequently requested removal of 3D. The current homepage now displays assets/workstation.webp with one 750 ms CSS focus/lighting settle. scene.js was removed and the Three.js preload disconnected. The production assertion now checks for the photographic hero. Desktop/mobile checks passed: loaded image, no canvas or 3D requests, no overflow or page errors; reduced motion has no image animation. Existing EN/SI/TA tests and production build passed. The image remains accurately described as an illustration.

## Photograph-led composition

The image now spans the desktop hero, with an overlay keeping the copy readable in its natural left-side space. Mobile stacks the copy/actions above a full-width image crop. Removed the separate image frame, decorative hero grid, upper label and caption. Kept existing factual headline/body text; repair help and repair prices are the hero actions. Desktop (1440px), tablet (900px) and phone (390px) screenshots were inspected; each had a loaded image, no overflow and no page errors. Existing tests and the production build passed.
