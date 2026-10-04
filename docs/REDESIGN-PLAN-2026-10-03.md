# DR TECH — Technology, restored

Date: 3 October 2026
Status: proposed design plan; no website implementation or deployment performed.

## Objective and review

Make DR TECH a convincing local IT service website and a demonstration of Deepal's design ability. Visitors should quickly understand the service, find a starting price and request support; prospective digital clients should see evidence of considered visual and interaction design.

This review uses the supplied brief and current repository at commit 710684e. The live URL could not be accessed through the browsing tool. Visual conclusions require desktop and mobile browser review before implementation.

The brief's strongest idea is a consistent editorial composition, with three showcase moments and calm, useful sections between them. Preserve the existing Home IT → pricing → process/trust → Business IT → digital → contact journey.

Some recommendations are already partly implemented: device selection changes the Three.js camera, repair pricing uses rows, and the business chapter has a distinct dark treatment. Extend these rather than rebuilding them. The hero still uses separate copy and framed hardware columns; the problem chooser uses cards; Digital Solutions is a small text strip. These are the clearest structural opportunities.

Avoid treating every suggested effect as a requirement. Custom cursors, magnetic buttons, hover sounds, mandatory loading intros and extensive scroll animation add complexity without establishing a design signature. Prioritize composition, real work, readable content and reliable interactions.

## Art direction

Concept: **Technology, restored.** A precise editorial layout with tangible hardware and a restrained signal-blue line that connects the experience.

- Home IT: warm off-white surfaces, graphite type and grounded studio hardware.
- Business IT: midnight surfaces, clean network geometry and the same signal line.
- Digital: an editorial project gallery with actual interface screenshots and generous space.
- Retain cobalt #2867ed as the principal blue and burnt orange #c2410c for primary support actions. Check contrast for every actual foreground/background pairing.
- Use a strong display treatment for short English headings and a readable body face. Begin by testing the existing Plus Jakarta Sans at larger sizes before introducing another font. Preserve Noto Sans Sinhala/Tamil and allow language-specific line breaks and spacing.
- Use an aligned grid, fine rules, numbered rows and asymmetric compositions. Reserve contained cards for content that benefits from comparison, such as monthly plans.
- The signal line should identify selected devices and section changes. Avoid repeated glow, glass panels and ornamental particles.

## Homepage design

| Section | Proposed experience | Visitor action |
| --- | --- | --- |
| Navigation | Compact wordmark, clear Home IT / Business IT / Digital paths, language switch and support button. Pricing remains easy to reach. | Choose service or get support |
| Hero | One shared stage for large “Computer trouble?” typography, studio hardware and “Let's get you back to your day.” Keep the location and a support button immediately visible. Integrate the scene into the layout rather than a separate rounded panel. | Get support or select a device |
| Device selector | Laptop / Wi-Fi / Printer selection reframes the scene and updates a nearby text panel with relevant problems, current starting price and a service-specific support link. | Request help for selected device |
| What's not working? | Four numbered service rows with clear labels, brief descriptions and prices where applicable. A shared illustration changes on hover or focus; touch visitors get all essential information without hover. | Open preselected support flow |
| No guesswork | Quiet pricing rows with service, scope and prominent LKR range. Keep exclusions and estimate terms adjacent. Use current business data; do not invent new prices. | Review prices or request estimate |
| Process and trust | Compact three-step sequence followed by verified founder information. Real portrait if supplied; otherwise use the existing initials treatment. | Understand what happens next |
| Business chapter | “Your people have work to do.” Darker scene, restrained connected-system graphic and concise service outcomes. A short line-drawing transition is optional. | Explore Business IT |
| Monthly plans | Clear comparison with price, scope, exclusions and contact action. Keep it visually quieter than the business opening. | Discuss a plan |
| Digital showcase | “We fix technology. We build it too.” Show one strong project in a large browser frame and two smaller previews, using genuine screenshots. Include the problem solved, contribution and accurate project status. | Explore digital work |
| Contact and footer | Direct support, WhatsApp and telephone options; service area and useful navigation. | Contact DR TECH |

The supplied “70% editorial / 20% cinematic / 10% experimental” split is a useful creative constraint, not a measurable layout requirement. Most of the page should remain easy to scan.

## Three showcase moments

1. **Hero:** Typography and hardware occupy the same visual composition. Selection changes both the scene and useful service information. Keep text outside the canvas so it remains readable and accessible.
2. **Home to Business:** Change background, scale and imagery at a clear chapter boundary. Prototype a brief progressive line reveal; ship a static transition if motion reduces clarity or speed. Do not require a second continuous WebGL scene.
3. **Digital work:** Actual interface previews demonstrate design capability. Perspective is subtle and optional; screenshots remain legible. Each preview links to a detailed case study.

Do not make the proposed laptop separation sequence a first-release dependency. It requires extra scene work and can delay visitors reaching the services. Test the static composition first, then add one short optional transition if it improves the experience.

## Supporting pages

- `/home-it`: reuse service rows, expand repair scope and prices, explain visit/remote/pickup options and retain the request links.
- `/business`: extend the infrastructure visual, explain outcomes and provide a meaningful plan comparison.
- `/digital`: present website and business-system services with relevant examples, process and enquiry action.
- `/projects`: use real screenshots and concise case studies: problem, role, decisions, result and current status. Public source code alone is not evidence of a launched product.
- `/about`: founder, verified experience and service approach.
- `/support`: keep the request form visually calm and preserve service preselection, validation and multilingual behavior.
- `404`: use the same type, signal motif and a clear route back to services.

## Mobile, motion and accessibility

Design the 390px mobile composition alongside the desktop layout. The headline, support action and service identity should appear before decorative details; the hardware follows with large device controls. Service rows stack description and price without horizontal scrolling.

Use native scrolling. Avoid scroll hijacking, pinned multi-screen introductions and touch interactions that depend on hover. Keep normal pointer behavior and visible keyboard focus. Device controls expose selection state; updated text must be available without viewing the scene. Plan for longer Sinhala and Tamil text rather than shrinking it into English dimensions.

Keep the existing image-first, lazy WebGL approach. Provide usable static imagery when WebGL is unavailable and immediate final states for reduced motion. Pause rendering offscreen and in inactive tabs, as the existing renderer does. Restrict animated effects to the hero selection, optional chapter reveal and simple feedback on controls.

## Implementation plan and review gates

### 1. Establish the baseline

Run the existing site locally and capture homepage, menu and request flow at 1440px, 768px and 390px. Review all three languages. Record real visual problems, performance and existing route behavior. This is required because source review cannot establish the quality of the rendered layout.

### 2. Approve a concrete visual direction

Produce desktop and mobile compositions for the hero, service rows, pricing, business opening and digital showcase. Define spacing, typography, colors, buttons and the signal motif. Review static layouts before adding cinematic motion.

### 3. Build the core experience

Update `Pages.jsx`, `Shell.jsx` and the shared styles. Resolve the overlapping rules in `index.css` and `visual-direction.css` into a deliberate style structure. Preserve existing routes, localized copy, price data and service-specific request links. Build the calm sections and mobile layout before advanced effects.

### 4. Develop the showcase moments

Extend `HardwareScene.jsx` with selected-service information and update the scene composition only where needed. Add the business transition and real digital previews. Reuse the existing renderer's lifecycle and fallback handling.

### 5. Validate and prepare for release

Run the repository tests and production build, including prerendering. Review every route and support flow in the browser. Check keyboard navigation, menu behavior, reduced motion, WebGL failure, translated layouts and narrow screens. Compare the result with the baseline and proposed compositions.

Target Core Web Vitals: LCP ≤ 2.5 seconds, INP ≤ 200ms and CLS ≤ 0.1, with mobile lab checks before release and field validation when sufficient real traffic is available. Set asset budgets from the baseline; avoid loading Three.js on the initial static hero path.

Implementation and publishing are separate steps. This document proposes the redesign and does not deploy it.

## Assets and content needed

- Real screenshots for two or three selected projects, with permission to display them.
- Accurate role, scope, project status and any supportable outcomes for each case study.
- Optional real founder portrait; do not fabricate one.
- A consistent hardware render/poster derived from the chosen scene composition.
- Verified pricing and plan scope. Preserve existing published values until changed by the owner.

If screenshots are unavailable, use an explicitly labeled concept preview rather than implying client work or a delivered product.

## Definition of success

The page has a recognizable signal-line and editorial visual language; a visitor can quickly find services, pricing and support; the three showcase moments demonstrate design decisions; mobile and translated layouts receive equal attention; motion is optional; and Digital Solutions offers credible evidence of work rather than decoration alone.

Recommended next deliverable: a concrete desktop and mobile design prototype for the hero, problem rows and digital showcase, followed by the complete homepage implementation after visual review.
