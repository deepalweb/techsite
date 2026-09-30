# DR TECH redesign plan

Date: 2026-09-30
Status: Proposed direction; no website implementation or deployment in this planning pass.

## 1. Evidence and limits

Read the user's complete pasted review and the installed frontend-design skill. Reviewed local App.jsx, package.json and design notes. Searched current web references, including official sites and archived visual examples.

The live HTML loads /assets/index-cDr6gZiB.js. Inspection of that public bundle confirms project entries including ERP_AI_AGENT and TravelBuddy, the business headline "Your IT department. Without the overhead.", and a networkRenderer chunk. The local checkout at e43b0a5 does not contain these additions. Reconcile the deployed source and the local checkout before building; preserve all newer work and unrelated local changes.

No browser is connected in this environment. Live interaction, actual 3D quality, layout and mobile performance have not been visually verified. Text extraction of the live home page returned no readable page content. Therefore the supplied review is useful input, not a verified visual audit.

## 2. Decision

Rebuild the information hierarchy and visual composition around two audiences, in this order:
1. Individuals who need help with a computer, Wi-Fi, printer or software.
2. Businesses seeking ongoing IT care, networking, cloud and security support.

Business visitors receive a direct navigation link to their section/page, so they need not read the individual-customer content first. Digital development is a secondary business service, not a third equally dominant homepage story. No Resources promotion until useful products are available.

Keep existing prices, contact details, language support and the useful request flow. Rework presentation rather than discarding functional code indiscriminately.

## 3. Research and interpretation

- Lusion: https://lusion.co/ and its Synthetic Human case study https://lusion.co/projects/synthetic_human/ describe integrated 3D design, animation, asset optimization and frontend work. Take the art direction and coherent materials/lighting; do not copy unrelated abstract forms.
- Lusion v3 visual record: https://www.awwwards.com/sites/lusion-v3 shows an earlier design. This is an archived reference, not a claim about today's exact homepage.
- Apple MacBook Pro: https://www.apple.com/macbook-pro/ provides a hardware presentation and content-hierarchy reference. Take object detail, breathing room and clear text/actions; do not assume its visuals are live WebGL or copy its branding.
- Bruno Simon: https://bruno-simon.com/ explicitly uses an explorable 3D world with driving and quality controls. Take coherent spatial design and deliberate interactions. A game interface would obstruct a repair customer's task and is unsuitable here.

Design interpretation: premium 3D depends on the object, modelling, materials, lighting, camera framing and how it explains the service. Hover tilt, floating icons and glow alone do not achieve this.

## 4. Proposed homepage

Navigation: logo | Home IT | Business IT | Pricing | About | Get support. Retain compact language selection. Projects and Digital can sit under the business page/footer. Pricing should open home-service pricing with a clearly labelled business-plan link.

A. Individual customers

1. Home-service hero
   Draft headline: "Computer trouble? Let's get it sorted."
   Supporting copy: laptop, desktop, Wi-Fi and printer support around Colombo and Kotte; home visit, pickup and remote options subject to confirmation.
   Primary action: Get support. Secondary: See repair prices.
   Business IT navigation link stays visible immediately.
   One custom hardware composition beside the text, not behind it.

2. Choose the problem
   Four compact selectable options: Laptop / PC, Wi-Fi, Printer, Software / backup.
   Each prefills the appropriate service in the support flow. Provide a Not sure option.
   Keep the interaction functional with keyboard and touch; the 3D scene is optional.

3. Upfront repair pricing and what happens next
   Short rows, not another wall of equal-weight cards.
   Diagnosis LKR 1,500–2,500; laptop speed boost LKR 3,500–7,500; Wi-Fi/printer LKR 2,500–5,000, pending confirmation against current business pricing.
   Clearly state estimate-first, parts/travel exclusions and scope.
   Explain: tell us the issue → agree estimate and service → receive support.
   Do not require scrolling through business plans to reach repair prices.

4. Evidence of care
   Founder identification and relevant experience; ideally two genuine repair/setup examples and approved customer feedback.
   If those assets are unavailable, use verified credentials and an honest process explanation. Do not invent reviews, counts, credentials or installations.
   An individual customer can decide and make contact before the business chapter.

B. Business customers

5. Business introduction
   Clear change of surface and composition. Draft headline: "One partner for your business IT."
   Explain managed support through outcomes: connected staff, dependable systems, protected information.
   An optional office diorama shows workstation, router/AP and backup equipment with a shared visual language.
   Three user-controlled categories: Connect, Protect, Support. No forced six-stage scroll sequence.
   Action: Discuss business IT; secondary link to the dedicated business page.

6. Monthly support
   Compact comparison of Starter, Growth and Pro with current prices.
   Confirm actual device coverage, visit frequency, response commitments and exclusions before publishing comparisons. Do not fabricate tier differences or a Most popular badge.
   Link to /business for full scope and frequently asked business questions.

7. Real work and digital capability
   Short preview of genuine installations when available.
   Small secondary link to Digital solutions and selected software projects; no full developer portfolio or product store on the homepage.

8. Final support and footer
   Clear Get support, WhatsApp and Call options; concise FAQ if needed.
   No repeated oversized CTA bands.

## 5. Supporting pages

- /home-it: individual services, service area, repair pricing and repair FAQ.
- /business: ongoing IT support, network/cloud/security services, plan scope and genuine installation evidence.
- /digital: websites, Odoo and automation, limited to services actually offered.
- /projects: software work, clearly separated from customer installation case studies.
- /about: founder, verified experience and contact information.
- /support: shareable and accessible request flow; a drawer may enhance it later.
- /resources: only when products or genuinely useful free material are ready.

Preserve old section-link entry points, establish redirects if needed, and provide useful page titles and indexable content. Confirm which live routes already exist before changing URLs.

## 6. Visual system

Palette proposal: midnight #081426, graphite #152235, blue #2463EB, porcelain #F4F7FB, white #FFFFFF, muted slate #A9B7CC on dark surfaces. Verify final contrast, especially on light surfaces.

Use dark scenes for the two chapter introductions, light surfaces for pricing and reading, and blue primarily for actions and meaningful selection. Avoid prescribing an arbitrary percentage of dark versus light.

Typography: shortlist one strong sans-serif with a true Sinhala/Tamil companion. Test real translated headlines at phone widths before committing. Keep short line lengths and purposeful size contrasts. Avoid uppercase labels above every heading.

Layout: left-aligned service copy beside the 3D object on desktop; concise copy and contact action before the visual on mobile. Alternate compositions by content need. No requirement to place every paragraph in a rounded card. Rounded corners and icons should be consistent only where components have the same role.

## 7. 3D art direction and behavior

Individual scene: a believable laptop, a router and a printer arranged as a small cared-for workstation. Graphite plastic, brushed metal, frosted surfaces where appropriate, soft contact shadows and one coherent blue accent. Avoid abstract network planets, floating shields and circuit-board wallpaper.

The laptop is the dominant object. Selecting a service can reframe the relevant device once. Keep copy and actions as HTML outside the canvas. No fake live diagnostic statuses.

Business scene: reuse the visual language in a compact office arrangement. User selection highlights connectivity or backup/support components. Keep this optional; one excellent hero is preferable to two weak scenes.

Pipeline: choose custom-made or properly licensed 3D assets, record licenses, create a polished still composition first, then prototype motion. Do not rebuild the entire site before the scene looks convincing as a still image.

Desktop: restrained camera response and short state transitions; no constant spinning or scroll hijacking.
Mobile: the same composition as an optimized static render by default; add real-time interaction only if real-device testing supports it.
Reduced motion, unsupported graphics and failed loading: static fallback with all services and actions available. Stop rendering when offscreen or the tab is hidden.

Implementation candidate: use React with a lazy-loaded Three.js scene if confirmed appropriate after reconciling the live source. The modelling quality is a separate asset task; adding a graphics library does not solve art direction.

## 8. Contact flow

Get support always means the same action. Preselect service from the problem chooser. Keep WhatsApp and Call as immediate alternatives. Preserve entered data while moving between steps. Do not require an account. State explicitly that the customer must send the prepared message in WhatsApp; the website does not confirm a booking.

A support drawer must have focus handling, Escape/close controls, labelled fields and usable mobile scrolling. Keep a full-page alternative. Avoid showing a form as a mandatory hurdle before direct contact.

## 9. Delivery sequence

1. Reconcile current production source; inventory sections, URLs, prices and genuine assets.
2. Make desktop and mobile wireframes for the complete home-first/business-second journey.
3. Produce two still hero concepts using the same content: hardware close-up and compact workstation. Compare actual compositions, not colour variations.
4. Select the composition through a visual review. This is a design-quality checkpoint, not a deployment approval requirement.
5. Build only the hero + problem chooser + price preview as an interactive prototype. Review on desktop and a representative Android phone before scaling it.
6. Build the remaining sections and supporting pages with verified content.
7. Check multilingual layouts, keyboard operation, reduced motion, mobile performance, request flow, links, SEO and direct route loading. Produce screenshots for review.
8. Present the completed staging version for a small customer test, then publish under the user's deployment instructions.

## 10. Acceptance criteria

- In five seconds a visitor can tell what DR TECH does, where it serves and how to get help.
- Individuals reach service choices and repair prices before business content.
- Businesses can jump directly to their relevant content from the first screen.
- Three individual customers and two business contacts can find an appropriate next step without coaching; record confusion rather than asking only whether they like it.
- Contact controls and text render without waiting for 3D. No site-wide graphics loading screen.
- Proposed performance target: LCP at or below 2.5 seconds under an agreed representative mobile test; validate on an actual mid-range phone and a throttled connection. Targets are not measured results.
- No layout jump when graphics load, no horizontal overflow at 360px, readable translated headings, visible keyboard focus and reduced-motion fallback.
- Every photo/testimonial/price/scope claim has an owner or source. No fake project evidence.
- No release sign-off based only on a successful code build; actual browser screenshots and interaction checks are required.

## Needed before final content lock

Authentic work photos with permission to publish, a founder portrait if desired, approved testimonials, current service pricing, and actual monthly plan limits. Their absence does not block wireframing or the first visual concept.
