import type { APIRoute } from 'astro'

// Two locales, two URLs; the sitemap lists both with their alternates so
// search engines pick the right one per language rather than treating the
// English page as duplicate Indonesian content.
const routes = [
  { path: '/', lang: 'id', alternate: '/en/' },
  { path: '/en/', lang: 'en', alternate: '/' },
]

export const GET: APIRoute = ({ site }) => {
  const origin = site ?? new URL('https://abuamar142.github.io')
  const urls = routes
    .map((route) => {
      const loc = new URL(route.path, origin).toString()
      const alt = new URL(route.alternate, origin).toString()
      const altLang = route.lang === 'id' ? 'en' : 'id'
      return `  <url>
    <loc>${loc}</loc>
    <xhtml:link rel="alternate" hreflang="${route.lang}" href="${loc}"/>
    <xhtml:link rel="alternate" hreflang="${altLang}" href="${alt}"/>
  </url>`
    })
    .join('\n')

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>
`,
    { headers: { 'Content-Type': 'application/xml; charset=utf-8' } },
  )
}
