# DR TECH — Digital Infrastructure in Motion

## Brief review and implementation plan

Use a professional dark interface with restrained spatial visuals: approximately 70% clear service information, 20% dimensional illustrations and 10% effects. Keep prices, service coverage and contact actions easy to find.

1. Establish the navy, electric-blue and glass surface system across navigation, sections, pricing and the support form.
2. Replace the photographic hero with a connected network illustration enhanced by a lazy-loaded Three.js scene.
3. Add floating service paths and a keyboard/touch-accessible service ecosystem with relevant details.
4. Explain business support through progressive infrastructure layers and a technology orbit.
5. Add clearly labelled illustrative photography, planned resource previews and a final support CTA.
6. Preserve English, Sinhala, Tamil, existing prices and the WhatsApp request flow; verify responsive layouts, reduced motion and WebGL fallback.

## Implemented architecture

React + Vite + Tailwind remain the application foundation. Framer Motion handles card tilt and scroll reveals; Three.js handles the hero geometry directly. Next.js, React Three Fiber and GSAP are unnecessary for this single-page experience and would add migration or dependency overhead without a needed feature.

`src/infrastructure.css` contains the new surface system and responsive illustrations. `NetworkScene.jsx` renders an immediate CSS/SVG illustration with a dynamically imported `networkRenderer.js` enhancement. The renderer is downloaded only at desktop widths, with reduced motion off and data saver off. Pixel ratio is capped at 1.5, rendering pauses offscreen or in a hidden tab, and GPU resources are disposed on unmount. Unsupported WebGL retains the illustration. There are no external 3D models or textures.

Service selection works by click, touch, keyboard focus or mouse hover and updates an associated details panel. The business diagram changes its highlighted layer as that layer enters the viewport. Existing TiltCard motion is limited to four degrees and mouse pointers. Reduced motion disables tilt, decorative loops and entrance animation.

## Visual system

The reusable `TechAsset.jsx` component provides original dimensional SVG laptop, server, globe and shield illustrations for the service cards, hero nodes and office diagram. Supporting Lucide icons use raised surfaces across service cards, technology satellites, business plans and resource previews. These assets require no additional dependencies or external downloads; `assets-3d.css` controls their responsive sizing and reduced-motion behavior.

- Background: #050B14
- Surface: #0A1525
- Cards: #0F2035
- Primary: #168BFF; button fill uses a darker blue for white text
- Accent: #36C5FF
- Text: #F5F8FC
- Secondary text: #A1B1C5 for dark-surface readability
- Type: Plus Jakarta Sans; normal tracking and increased line height for Sinhala and Tamil

Homepage order: navigation, network hero, service paths, interactive services, trust, business infrastructure, technology stack, illustrative photography, business plans, digital services, founder credentials, repair prices, resource previews, support request, FAQ, final CTA, footer.

The hero now prioritises laptop, computer and printer repairs. Its actions lead to the support request and repair prices. The orbit uses a dimensional laptop and printer with diagnostics, Wi-Fi, upgrades, software and backup icons. Odoo remains in the relevant business sections, but is excluded from the hero. Hero copy is localised in English, Sinhala and Tamil.

The hero background reuses the repository's `hero-repair-option.png` repair-workbench illustration. Directional navy overlays protect the copy and orbit contrast, with a stronger overlay and adjusted crop on mobile. The image is decorative and is not presented as a photograph of DR TECH staff or completed customer work.

## Content boundaries

The existing server-rack photograph is stock, credited to Brett Sayles / Pexels in the visible caption and IMAGE-CREDITS.md. It is not presented as a DR TECH installation. A genuine project gallery and customer testimonials still require owner-supplied photographs, captions and approved quotes. No projects, customers, reviews or certification partnerships were invented.

The four resource concepts are visibly marked as in planning, unavailable for purchase or download. Their actions prepare an interest enquiry in WhatsApp; there is no live storefront or purchase flow.

## Request behavior

The four-step support flow preserves entries and prepares a WhatsApp message. Customers press Send in WhatsApp themselves. No appointment or submission is confirmed by the website. Photos can be attached in WhatsApp. There is no booking backend or customer portal.

## Validation

`npm test` covers translated rendering, anchors, service selection, prices, support validation, message encoding and backward navigation. `npm run build` produces the production bundle. Browser checks cover desktop, 390px mobile, 320px Sinhala, Tamil, reduced motion, missing WebGL, image loading, mobile navigation and horizontal overflow. The optional Three.js chunk is approximately 133 KB gzip and is excluded from mobile and reduced-motion startup.
