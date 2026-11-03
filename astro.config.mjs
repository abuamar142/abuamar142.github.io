import { defineConfig } from 'astro/config'
import tailwindcss from '@tailwindcss/vite'

// Static output only: the deploy target is GitHub Pages, which serves files and
// nothing else. Runtime data comes from portfolio-service in the browser, so
// there is no server here to render it.
export default defineConfig({
  site: 'https://abuamar142.github.io',
  output: 'static',
  trailingSlash: 'ignore',
  build: { format: 'directory' },
  vite: { plugins: [tailwindcss()] },
})
