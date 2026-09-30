# DR TECH Services

React + Vite website with English, Sinhala and Tamil content.

## Local development

- `npm install`
- `npm run dev` — local preview.
- `npm test` — routes, links, translations, service preselection and enquiry flow.
- `npm run build` — production build and static HTML generation for all pages.
- `npm run preview` — inspect the production build locally.

## Customer journeys

The homepage introduces individual support and repair pricing before business services. Home IT, Business, Digital, Projects, About and Support have dedicated URLs. Existing portfolio metadata is retained in `src/data/projects.js`.

Support links can preselect a service, for example `/support?service=printer`. The enquiry is sent only when the customer presses Send in WhatsApp. The site does not claim to confirm appointments and does not persist customer details in local storage.

## Visuals

`src/components/studio/` contains the new site and an optional Three.js hardware viewer. The generated workstation illustration appears immediately. The real 3D module loads after selecting “Explore in 3D”; its camera renders in response to controls, stops when hidden and respects reduced motion. The interactive model and the illustration are separate assets with matching subject matter, not identical geometry.

`public/assets/IMAGE-CREDITS.md` records sources and the generation prompt. The website does not use these illustrative renders as customer-project evidence.

## Hosting and verification

The build exports HTML for seven public pages plus a not-found page. `public/staticwebapp.config.json` maps the routes for the existing Azure Static Web Apps deployment. Page titles, canonical URLs, sitemap and static descriptions are generated per route. The default HTML is English; language controls render Sinhala/Tamil on the client.

Automated component tests stub animation wrappers and do not validate browser geometry or WebGL. Desktop/mobile screenshots, actual graphics interaction, hydration and real-device performance must be reviewed before production sign-off. No browser connection was available during this implementation.

See `docs/REDESIGN-PLAN-2026-09-30.md` and `docs/REDESIGN-IMPLEMENTATION.md`.
