import type { Snapshot } from '../data/types'

/**
 * JSON-LD graph for the hub: one Person plus the projects as an ItemList.
 *
 * Built from the committed snapshot rather than from anything fetched at
 * runtime, because structured data has to be inside the HTML a crawler reads.
 * When the snapshot is a day old the graph is a day old, which is the tradeoff
 * the runtime fetch already made for the visible content.
 */
export function buildJsonLd(data: Snapshot, lang: 'id' | 'en', siteUrl: string): string {
  const { personalInfo, projects } = data
  const origin = siteUrl.replace(/\/$/, '')

  const person = {
    '@type': 'Person',
    '@id': `${origin}/#person`,
    name: personalInfo.fullname,
    alternateName: personalInfo.nickname,
    jobTitle: personalInfo.title,
    email: `mailto:${personalInfo.email}`,
    url: origin,
    description: lang === 'id' ? personalInfo.bio_id : personalInfo.bio_en,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Bantul',
      addressRegion: 'Yogyakarta',
      addressCountry: 'ID',
    },
    sameAs: [personalInfo.github, personalInfo.linkedin, personalInfo.instagram, 'https://abuamar.online'].filter(
      Boolean,
    ),
  }

  // Only projects with a resolvable public URL: an ItemList entry whose link
  // 404s is worse than no entry.
  const featured = projects.filter((project) => project.githubUrl || project.liveUrl)

  const list = {
    '@type': 'ItemList',
    name: lang === 'id' ? 'Proyek yang dirilis' : 'Projects shipped',
    itemListElement: featured.slice(0, 12).map((project, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: project.title,
      description: project.description,
      url: project.liveUrl || project.githubUrl,
    })),
  }

  return JSON.stringify({ '@context': 'https://schema.org', '@graph': [person, list] })
}
