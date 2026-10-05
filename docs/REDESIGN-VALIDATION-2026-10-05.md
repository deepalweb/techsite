# DR TECH redesign — implementation and validation

5 October 2026. Implemented locally; no commit, push or deployment performed.

Later on 5 October, the hero was updated to the owner's photographic workstation reference. The results below record the earlier studio-render revision. Current hero assets, the explicit optional 3D interaction and the updated browser review are documented in `docs/HERO-WORKSTATION-UPDATE.md`.

## Result

The supplied visual reference is translated into an original midnight-blue and cyan studio direction. Large typography and the unframed hardware scene identify Computer & IT Support immediately. Service discovery uses numbered rows; pricing and the existing process share a calm chapter. A branching signal bridges Home IT and Business IT, followed by restrained plan comparison and a larger digital showcase.

Existing routes, English/Sinhala/Tamil resources, Noto fonts, verified prices, founder information, SEO metadata, prerendering, request validation, service preselection, phone links and WhatsApp contact details are preserved. New design copy is provided in all three languages. No new prices, testimonials, certifications, service areas or customer installations are claimed.

## Hardware and performance changes

The existing renderer is reused with cyan lighting, improved device positions and a software screen focus. Its responsive poster is generated from the actual scene. The laptop, Wi-Fi, printer and software controls update visible prices and request links. The controls also work in the error state. Three.js is absent from the initial image-only resource path and still pauses offscreen/inactive; reduced motion selects final camera positions immediately.

The existing 529 KB logo is retained as an original, while the header uses an 8,208-byte WebP and the favicon uses a 4,070-byte PNG. Responsive hardware posters are 47,290 bytes and 20,106 bytes. The real website screenshot is 52,260 bytes. No decorative multi-megabyte assets were added.

Language changes use React transitions to keep interaction responsive during a full multilingual rerender. Prerendered HTML now carries a route marker; hydration occurs only when that marker matches the browser URL. This fixes React hydration errors when a static host falls back to the homepage HTML for a different route, while retaining hydration for matching English pages.

## Validation

- Baseline `npm test` and `npm run build` passed before implementation.
- Hero prototype tests/build passed before subsequent sections; desktop/tablet/mobile browser captures informed typography and scene-edge refinements.
- Final `npm test` passes all existing tests in EN/SI/TA: seven routes, links/anchors, assets, service preselection, request validation, field preservation and encoded WhatsApp handoff.
- Final production build passes and prerenders all seven public routes plus 404.
- `scripts/check-output.mjs` verifies route markers, one H1, titles, canonical URLs, prerendered content, HTTP responses and the noindex 404 document.
- Browser layout checks cover the seven routes and 404 in three languages at 1440px, 390px and 320px: 72 combinations. Home also receives 768px tablet captures in all three languages.
- Browser interaction checks cover request preselection, invalid/valid details, summary, encoded WhatsApp URL, returning to previous steps, keyboard menu activation/Escape/focus return, language changes, lazy WebGL, software focus, normal camera animation, reduced motion and WebGL failure.
- Screenshots were visually reviewed for the hero, service rows, pricing, business infrastructure, digital showcase, request form and all route/language combinations through route overviews. Tamil overflow was corrected through wrapping and grid/flex constraints without reducing translated font sizes.

Local screenshots and raw results live under `docs/review/` and are ignored by Git. Baseline, hero, refined hero, section revisions, final layouts and production validation are retained for comparison.

## Local performance sample

Production preview in Chrome, 4× CPU slowdown, local asset server, actual external-font/analytics network access. These are lab diagnostics, not field Core Web Vitals or an INP certification.

| Width | LCP | CLS | Sampled interaction |
| --- | --- | --- | --- |
| 1440px | 1.212 s | 0.00087 | Language switch: 40 ms |
| 390px | 0.704 s | 0.00330 | Mobile menu: 72 ms |

Three.js was not requested before interaction. The JavaScript entry is approximately 149 KB gzip; the optional Three.js renderer is approximately 132 KB gzip. Vite retains its chunk-size advisory for chunks over 500 KB uncompressed. Field performance and constrained-network behavior should be measured on the deployed host.

## Genuine-work assets still needed

The featured digital image is a real screenshot of this website. IT Inventory and TravelBuddy retain project-approved descriptions with clearly labelled screenshot-approval placeholders and links to project details. Their release status is not invented. Customer-work photography is explicitly pending permission. The founder uses the existing initials treatment, not a fabricated portrait.

## Repeatable local review

`npm test` and `npm run build` use the repository's existing dependencies. Browser/image helpers use Playwright and Sharp installed outside the application, under `%LOCALAPPDATA%/Temp/drtech-review/node_modules` on this Windows workstation. They do not add production dependencies or alter the application lockfile.

Run `node scripts/visual-review.mjs final` against the development server to capture 1440/768/390 layouts. `node scripts/browser-checks.mjs` captures and checks routes and flows. `node scripts/lab-performance.mjs` samples the production preview. Set `REVIEW_URL` to select a server, `REVIEW_BROWSER` to select the Chrome executable, and `PLAYWRIGHT_MODULE` to select another Playwright installation. `render-poster.mjs` additionally accepts `REVIEW_TOOLS` for its Playwright/Sharp directory and requires the development server for the renderer module.

Current local preview: http://127.0.0.1:5181/
