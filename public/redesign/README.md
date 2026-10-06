# DR TECH 3D company redesign

Complete standalone export of the approved ChatGPT Sites redesign, 6 October 2026. HTML, CSS, JavaScript, original brand imagery and Three.js are included locally. No build or external CDN is needed.

The existing React app, translated routes and Azure deployment remain intact. Vite copies this folder into dist/redesign during the existing build. Serve with a trailing slash at /redesign/ so relative assets resolve. For a standalone preview, serve this directory over HTTP.

Features: animated and draggable 3D workstation; reduced-motion and pause controls; repair and SME service sections; pricing tabs; FAQ; WhatsApp enquiry composer; responsive navigation and contact actions.

Validation: JavaScript syntax and HTML asset/anchor checks passed in the source Site. Asset URLs were made relative for this subdirectory. Browser/WebGL verification was unavailable. The main React app was not modified; its translations are not included in this standalone English export.

Published reference: https://drtech-3d-services.deepalr.chatgpt.site
