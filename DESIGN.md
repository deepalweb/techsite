# DR TECH — Technology, restored.

October 2026 visual direction: a premium midnight-blue IT support studio, with cyan as the service signal and a clear support action. The supplied advertisement informed atmosphere and hardware recognition; its people, artwork and layout are not reused.

## Visual system

Midnight #030B18, secondary navy #06162B, elevated navy #09213D, electric blue #168BFF, cyan #19D9F5, white #F7FAFF and mist #A9BDD3. The calm pricing chapter uses cool paper #EAF0F7 with dark ink. Plus Jakarta Sans is retained alongside Noto Sans Sinhala and Tamil. Large editorial headings, numbered rows, fine rules and restrained corners establish the hierarchy. Long translated words wrap and get extra vertical space.

The thin signal line restores beneath the hero heading in one brief arrival and branches into business infrastructure. The photographic workstation appears immediately, then eligible browsers gain a bounded 3D camera arrival and restrained mouse-driven perspective. Support/pricing arrows provide brief hover and keyboard-focus feedback. The business SVG network connects once when visible; project media links use restrained CSS perspective on hover and keyboard focus, with the resting tilt removed on mobile. Reduced motion keeps the completed connection, photograph and project previews still. No loops, scroll hijacking, loading intro or live 3D controls.

## Homepage sequence

Hero → editorial service selector → pricing and process → explicitly pending customer photography → verified founder → Home-to-Business signal transition → Business IT → monthly plans → digital project showcase → support and contact.

## Hero and progressive hardware

The unframed workstation shares the hero stage with Computer & IT / Support typography: beside the copy on desktop and beneath the actions on mobile. Its laptop, desktop tower, router and printer communicate the service directly. The hero prioritizes Get Support and See Repair Prices; services and prices are presented in the sections below.

The responsive photographic workstation illustration is based on the owner's approved reference. It remains the immediate first view and the fallback. The owner subsequently requested removal of the 3D control, device tabs and price overlay; do not restore those controls without a request. See `docs/HERO-WORKSTATION-UPDATE.md` for the photograph's generation and review details.

The 6 October enhancement mounts a dynamically imported Three.js scene with actual laptop, router, printer and desktop-tower geometry. Loading waits until 1,200 ms after the page load, then uses an idle callback where available. After the first rendered frame, the photograph fades away so the stage does not show duplicate devices. The camera arrival has a 750 ms deadline; mouse movement and departure settle within 280 ms after the latest event. Drawing stops once the camera settles and pauses while offscreen or the document is hidden. The scene is decorative and owns no support controls.

Reduced-motion and data-saving preferences skip WebGL entirely. Import, initialization or WebGL context failure restores the photograph; a change to reduced motion also disposes the scene. Keep this photograph-first enhancement and its static fallback rather than making 3D a prerequisite for support or pricing.

## Service assets — 10 October refinement

The service selector uses four original Three.js product assets: a graphite laptop, router with cyan signal arcs, ivory printer and spatial software-window stack. Desktop hover and keyboard focus select the matching model; the same geometry is exported to PNG for the immediate view, phone thumbnails and static fallbacks. These illustrations are service signposts, not customer-work evidence or ERP screenshots.

The service renderer loads only when the stage is visible on screens at least 768px wide. It shares the existing dynamically imported renderer module, draws on demand, and disposes its context when offscreen or the document is hidden. Reduced-motion and data-saving preferences keep the exported assets. Context or initialization failure restores the static asset. No hero controls, device tabs or price overlay are introduced. Browser evidence and reproduction commands are recorded in `docs/SERVICE-3D-2026-10-10.md`.

## Current static homepage photograph — 10 October

The homepage in public/redesign now uses the existing approved workstation image only. The owner requested removal of the 3D asset. The scene module, Three.js preload and graphics controls are absent. The illustration settles from a slight close crop and darker lighting to its final view once over 750 ms; reduced motion displays it still. The desktop photograph fills the hero behind the copy, with a dark left-side overlay and a soft bottom transition. Mobile places the copy and actions first, followed by a full-width device crop. Repair help is the primary blue action; repair prices is the secondary text action. The image is immediately visible, eagerly loaded and has fixed dimensions. It is an approved generated workstation illustration, not customer photography.

## Honest evidence

ERP_AI_AGENT is the primary featured project and links to its verified public GitHub repository. Its interface screenshot remains explicitly pending approval. DR TECH Website and IT Inventory are secondary previews; the website uses an actual screenshot and IT Inventory retains its screenshot placeholder. Other projects remain on the Projects page. Project details preserve repository/enquiry links and do not invent deployment status. Customer photography is clearly pending. The founder retains the existing initials treatment and verified experience.

## Shared architecture

Routes, multilingual resources, SEO/prerendering, verified prices, service preselection and the guided WhatsApp flow are retained. `index.css` supplies shared layout and existing form styles; `visual-direction.css` defines the new studio treatment and responsive compositions. Design-specific copy is supplied in all three languages in `src/i18n/redesign.js`.

See `docs/REDESIGN-VALIDATION-2026-10-05.md` for historical redesign checks, screenshots, asset sizes and remaining limitations, and `docs/LIVE-REVIEW-3D-2026-10-06.md` for the new enhancement. Its bounded desktop/mobile checks cover English, Sinhala and Tamil, settling, offscreen suspension, context-loss recovery and static fallbacks; results and screenshots are in `docs/review/3d-2026-10-06/`. The production website is already live at https://www.drtech.lk/; this 6 October 3D enhancement remains local and has not been pushed or deployed.
