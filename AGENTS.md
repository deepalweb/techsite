# DR TECH project guidance

## Interface work

Use the Impeccable skill supplied by the `renaissance-geek.impeccable` VS Code extension for frontend design, critique, audits and refinement in this project. The extension is recommended in `.vscode/extensions.json`.

On this Windows workstation, find the installed extension under `%USERPROFILE%/.vscode/extensions/renaissance-geek.impeccable-*`. Read its `skills/impeccable/SKILL.md` and follow its relevant playbook. Use that installed copy rather than duplicating the same skill into this workspace or the Codex skills directory. If it is unavailable, report that and use the available frontend-design skill.

Follow the skill's setup and command-routing rules. Do not assume that installing the extension automatically registers its skill with Codex. The bundled skill can be read and its launcher invoked directly from the project directory. Do not update the skill or enable hooks unless the user requests that action.

## Preserve the approved website

- Treat `DESIGN.md` and the user's current instructions as the design authority. Keep the photographic navy/blue/cyan hero and its support/pricing actions. The user removed the 3D control, device tabs and price overlay; do not restore them without a request.
- Feature ERP_AI_AGENT as the primary project in the digital showcase, linking to https://github.com/deepalweb/ERP_AI_AGENT. Keep its release status and screenshot availability accurate.
- Preserve English, Sinhala and Tamil, appropriate Noto fonts, existing routes, SEO/prerendering, verified prices, support validation and WhatsApp contact details.
- Do not invent customer work, testimonials, prices, credentials or launch status. Clearly label missing approved photography and screenshots.
- Keep UI changes within the requested scope. Review desktop/mobile and translated layouts using bounded browser checks, and run the relevant existing tests and production build after changes.
- Deployment, publishing and pushing changes require a user request; a local UI update does not imply publishing.
