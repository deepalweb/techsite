import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { readFile } from 'node:fs/promises'

// Production promotes this static homepage after prerendering the React routes.
// Serve the same homepage in development without replacing their Vite entry.
function redesignHomepage() {
  return {
    name: 'redesign-homepage',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const pathname = req.url?.split('?')[0]
        if (!['/', '/index.html'].includes(pathname)) return next()
        try {
          const source = await readFile(new URL('./public/redesign/index.html', import.meta.url), 'utf8')
          const html = source.replace(/(href|src)="\.\//g, '$1="/redesign/')
          res.setHeader('Content-Type', 'text/html; charset=utf-8')
          res.setHeader('Cache-Control', 'no-store')
          res.end(await server.transformIndexHtml(req.url, html))
        } catch (error) {
          next(error)
        }
      })
    },
  }
}

export default defineConfig({
  plugins: [redesignHomepage(), react()],
})
