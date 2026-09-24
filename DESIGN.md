# DR TECH interface

The public site uses a calm, local service identity: deep navy, warm white and teal, with readable typography and clear next steps.

## Colour

- Navy `#0b202b`: hero and primary text.
- Teal `#087f79`: actions, selected states and focus accents.
- Paper `#f5f7f6`: page background.
- Muted text `#526477`; borders `#dce5e3`.

## Typography

Plus Jakarta Sans with the existing language fallbacks. Large editorial hero headings; smaller, practical form labels. Sinhala and Tamil headings use extra line height and normal tracking.

## Layout

1280px maximum content width. Split hero and request section on desktop; single columns on mobile. Three service paths connect home repair, business care and digital setup. Mobile actions keep support within reach.

## Components and motion

Solid teal actions, 10–18px corner radii, restrained borders and shadows. Short hover feedback, once-only section reveals and animated form progress. OS reduced-motion preferences apply throughout.

## Request flow

Service → issue → contact details → review. Validate before advancing, preserve entries when navigating back, and focus each new step heading. Details remain in component memory until the user opens WhatsApp; no customer data is stored locally. The customer must send the message in WhatsApp. The UI does not claim a request was delivered or a visit booked.

Photos can be attached in WhatsApp. Scheduling, server-side storage, admin tools and customer tracking require a future backend implementation. Existing service prices and business information remain the source of truth.

## Verification

`npm test` checks all three languages, invalid input, back navigation, message encoding and honest handoff status. Animation wrappers are stubbed in these component tests; they do not replace browser layout and animation checks. `npm run build` validates production compilation.
