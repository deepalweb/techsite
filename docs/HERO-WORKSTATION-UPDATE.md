# Photographic workstation hero

5 October 2026. Local update based on the owner's “Neon Blue IT Support Hero.png” reference.

The photographic workstation is a generated illustration, not a DR TECH customer installation. All navigation, headings, calls to action, device controls and prices remain HTML. Existing localized copy, logo, prices, routes, support flow and WhatsApp links are retained. No additional service promises from the mockup are introduced.

## Assets and generation

- Desktop: `public/assets/hero-workstation-v2.webp`, 1680 × 945, 67,638 bytes.
- Mobile: `public/assets/hero-workstation-v2-mobile.webp`, 900 × 552, 47,370 bytes; a dedicated crop of the same scene.
- Tool: built-in image_gen, using the supplied mockup as the edit target. Typography, UI and the floating Wi-Fi symbol were removed; the studio scene was retained.
- The original output remains under the Codex generated_images directory; optimized project assets are saved in this repository.

Final generation prompt:

> Edit the supplied website mockup into a clean photographic background asset for its hero. Remove ALL typography, navigation, logos, buttons, badges, icons, service cards, location marker and all text. Reconstruct the clean scene underneath. Preserve the premium realistic workstation composition: large open graphite laptop with abstract flowing electric-blue wallpaper in the lower center-right, desktop tower just behind its left, two-antenna Wi-Fi router to the right, black printer with white paper at far right, mouse on desk, subtle plants, shelving and workshop window behind. Remove the floating luminous Wi-Fi symbol above the router; keep only realistic blue indicator LEDs. The left 42% must be quiet empty nearly-black midnight navy negative space (#030b18) for HTML headings, with no hardware or bright background clutter there. Keep all main hardware completely visible within the right 58%, leave breathing room below the desk for HTML controls. Rich blue lighting, restrained cyan highlights, realistic materials, professional IT support studio, a little less neon than the mockup. Wide landscape 16:9 image, no text, no people, no logos or watermarks. This is illustrative marketing imagery, not a customer installation.

## Progressive interaction

At the owner's request, the “Explore in 3D” control, device tabs and indicative-price overlay have been removed from the hero. The hero now shows the unobstructed workstation image with the main support and pricing links. Services and pricing remain available in their dedicated sections below.

The existing HardwareScene source is retained but is no longer mounted or bundled into the live website. The hero has no WebGL dependency or device-selection animation. Responsive layout space keeps the image below the copy on mobile and beside it on desktop.

## Review

### Hero motion with Impeccable

The hero now has one bounded arrival: a cyan connection line restores beneath SUPPORT over 650 ms, while the already-visible workstation image settles from 1.025 scale to 1 over 700 ms. Support and pricing arrows provide 140 ms hover/focus feedback. There are no loops, scroll effects, hidden content, new dependencies or restored 3D controls. Reduced motion uses a static completed line and photograph, retaining the existing focus/color feedback.

The Impeccable animation playbook and craft floor guided this refinement. Its mechanical detector was run once and reported only the existing gradient-text treatment; that approved visual direction was preserved. Desktop/mobile captures at the start, middle and end of the sequence, plus EN/SI/TA and reduced-motion checks, are recorded under `docs/review/hero-motion/`.

1440px desktop, 768px tablet and 390px mobile captures of the clean hero in EN/SI/TA are under `docs/review/hero-clean/`. Production browser flow checks in `scripts/browser-checks.mjs` verify that the removed controls are absent, the photograph remains visible and no renderer is downloaded. The support request flow is unchanged.

Validation passed: tests, production build, prerender/HTTP checks and 72 production browser layout combinations, with no overflow, missing images or browser exceptions. Browser flow checks also passed for support validation, WhatsApp URL generation, language switching, keyboard menu behavior and the clean static hero. The digital showcase screenshot was refreshed to remove the old overlays (83,306-byte WebP), and the project description was corrected in all three languages. This update is local and has not been published.
