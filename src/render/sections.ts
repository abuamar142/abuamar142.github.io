/**
 * Markup builders shared by the build and the runtime island.
 *
 * Both paths must produce the identical DOM, otherwise every hydration
 * replaces "server markup" with a slightly different "client markup" and the
 * page visibly reshuffles. So the shapes live here once: Astro renders them at
 * build time with `set:html`, the island re-renders the same slots with fresh
 * API data.
 *
 * Everything is a string, so every interpolation is escaped.
 */

import type { Achievement, PersonalInfo, Project, Skill, Experience } from '../data/types'
import type { Copy } from '../i18n/copy'

const ESCAPES: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
}

export function esc(value: unknown): string {
  return String(value ?? '').replace(/[&<>"']/g, (ch) => ESCAPES[ch] ?? ch)
}

/** Only http(s) links survive: the payload is ours, but a typo must not become javascript:. */
export function safeHref(url: string | undefined): string | null {
  if (!url) return null
  try {
    const parsed = new URL(url)
    return parsed.protocol === 'http:' || parsed.protocol === 'https:' ? parsed.toString() : null
  } catch {
    return null
  }
}

export type Locale = Copy


/* ---------------------------------------------------------------- metrics */

export function renderStats(
  data: { projects: Project[]; skills: Skill[]; achievements: Achievement[]; experiences: Experience[] },
  locale: Locale,
): string {
  // Years of practice: earliest start year among experiences with a MM/YYYY or
  // YYYY start, measured against the current year. Derived, never typed by hand.
  const years = earliestStartYear(data.experiences)
  const since = years ? `${new Date().getFullYear() - years}+` : ''

  const rows: Array<[string, string]> = [
    [locale.statYears, since],
    [locale.statProjects, String(data.projects.length)],
    [locale.statSkills, String(data.skills.length)],
    [locale.statAchievements, String(data.achievements.length)],
  ]

  return rows
    .filter(([, value]) => value !== '')
    .map(
      ([name, value]) => `
        <div class="flex flex-col gap-1 border-l border-hairline pl-4">
          <span class="label">${esc(name)}</span>
          <span class="font-mono text-2xl font-medium leading-none text-ink">${esc(value)}<em class="not-italic text-terracotta">.</em></span>
        </div>`,
    )
    .join('')
}

function earliestStartYear(experiences: Experience[]): number | null {
  let earliest: number | null = null
  for (const exp of experiences) {
    const match = exp.duration.match(/(\d{4})/)
    if (!match) continue
    const year = Number(match[1])
    if (Number.isFinite(year) && (earliest === null || year < earliest)) earliest = year
  }
  return earliest
}

/* --------------------------------------------------------------- projects */

/** Products that are a running service rather than a repository to read. */
const FEATURED = [
  'Tambangan - Perahu Tracker',
  'Hafalan - Quran Tracker',
  'Warloc - Chat Backup Viewer',
  'Plasma Token Usage',
  'Pondok Pesantren Asy-Syaikhoni',
  'LMS Bahasa Arab',
]

export function featuredProjects(projects: Project[]): Project[] {
  const byTitle = new Map(projects.map((project) => [project.title, project]))
  const ordered = FEATURED.map((title) => byTitle.get(title)).filter(
    (project): project is Project => project !== undefined,
  )
  // If a title is renamed in the database, fall back to the first entries
  // rather than rendering a short, arbitrary list.
  if (ordered.length < 3) return projects.slice(0, 6)
  return ordered
}

export function renderProjects(projects: Project[], releases: Map<string, string>, locale: Locale): string {
  return featuredProjects(projects)
    .map((project, index) => {
      const repo = safeHref(project.githubUrl)
      const live = safeHref(project.liveUrl)
      const tag = releases.get(repoSlug(project.githubUrl))
      const number = String(index + 1).padStart(2, '0')

      const links = [
        live
          ? `<a class="action-link" href="${live}" target="_blank" rel="noopener noreferrer">${esc(locale.projectsDemo)}<span class="arrow" aria-hidden="true">→</span></a>`
          : '',
        repo
          ? `<a class="action-link" href="${repo}" target="_blank" rel="noopener noreferrer">${esc(locale.projectsRepo)}<span class="arrow" aria-hidden="true">→</span></a>`
          : '',
      ]
        .filter(Boolean)
        .join('')

      return `
        <article class="figure-block flex flex-col">
          <div class="flex items-center justify-between gap-4 border-b border-hairline-light px-5 py-4">
            <span class="data">${number}</span>
            ${tag ? `<span class="caption text-terracotta">${esc(tag)}</span>` : '<span class="caption"></span>'}
          </div>
          <div class="flex flex-1 flex-col gap-3 px-5 py-5">
            <h3 class="display-sub">${esc(project.title)}</h3>
            <p class="prose-body text-[0.9375rem] leading-relaxed">${esc(project.description)}</p>
            <ul class="mt-auto flex flex-wrap gap-1.5 pt-2" aria-label="${esc(locale.techLabel)}">
              ${project.technologies.map((tech) => `<li><span class="chip">${esc(tech)}</span></li>`).join('')}
            </ul>
          </div>
          <div class="flex min-h-12 flex-wrap items-center gap-5 border-t border-hairline-light px-5 py-3">
            ${links || `<span class="caption">${esc(locale.projectsNoLink)}</span>`}
          </div>
        </article>`
    })
    .join('')
}

function repoSlug(url: string): string {
  const match = url?.match(/github\.com\/[^/]+\/([^/?#]+)/)
  return match ? match[1] : ''
}

/* ---------------------------------------------------------- contributions */

export function contributions(achievements: Achievement[]): Achievement[] {
  return achievements
    .filter((item) => item.type === 'contribution')
    .sort((a, b) => (a.date < b.date ? 1 : -1))
}

export function renderContributions(achievements: Achievement[], locale: Locale): string {
  return contributions(achievements)
    .map((item, index) => {
      const number = String(index + 1).padStart(2, '0')
      // The description carries the upstream links in its LAST paragraph, not
      // the first — so the prose is the first paragraph and the actions are
      // every URL the whole description mentions.
      const paragraphs = item.description.split(/\n\s*\n/).filter((part) => part.trim() !== '')
      const firstParagraph = paragraphs[0] ?? ''
      const links = [...new Set(item.description.match(/https?:\/\/[^\s)]+/g) ?? [])]
        .map((url) => safeHref(url.replace(/[.,;:]+$/, '')))
        .filter((url): url is string => url !== null)
        .map(
          (url) =>
            `<a class="action-link" href="${esc(url)}" target="_blank" rel="noopener noreferrer">${esc(linkLabel(url))}<span class="arrow" aria-hidden="true">→</span></a>`,
        )
        .join('')
      return `
        <article class="flex flex-col gap-3 border-t border-hairline py-6 md:grid md:grid-cols-[5rem_minmax(0,1fr)] md:gap-8">
          <div class="flex items-baseline gap-3 md:flex-col md:gap-1">
            <span class="data">${number}</span>
            <span class="caption">${esc(formatMonth(item.date, locale.code))}</span>
          </div>
          <div class="flex min-w-0 flex-col gap-3">
            <div class="flex flex-col gap-1">
              <h3 class="display-sub">${esc(item.title)}</h3>
              <p class="caption">${esc(item.organizer)}${
                item.certificate_number ? ` · ${esc(item.certificate_number)}` : ''
              }</p>
            </div>
            <p class="prose-body text-[0.9375rem] leading-relaxed">${esc(firstParagraph)}</p>
            <div class="flex flex-wrap items-center gap-x-5 gap-y-2">
              <span class="label text-terracotta">${esc(locale.contributionLabel)}</span>
              ${links}
            </div>
          </div>
        </article>`
    })
    .join('')
}

/**
 * A review number is the useful label ("#987"), and a repository path is not
 * far behind ("streak"). Both beat a bare host, which says nothing when two
 * links in the same card point at the same site.
 */
function linkLabel(url: string): string {
  const review = url.match(/\/(?:pull|issues|merge_requests)\/(\d+)/)
  if (review) return `#${review[1]}`
  const repo = url.match(/github\.com\/[^/]+\/([^/?#]+)/)
  if (repo) return repo[1]
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return url
  }
}

function formatMonth(iso: string, locale: 'id' | 'en'): string {
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return iso
  return new Intl.DateTimeFormat(locale === 'id' ? 'id-ID' : 'en-GB', {
    month: 'long',
    year: 'numeric',
  }).format(date)
}

/* --------------------------------------------------------------- identity */

/** Hero paragraph: the API carries both locales; the page shows its own. */
export function renderBio(info: PersonalInfo, lang: 'id' | 'en'): string {
  return esc(lang === 'id' ? info.bio_id || info.bio_en : info.bio_en || info.bio_id)
}

/** Contact ledger: address rows stay in the same order as the built markup. */
export function renderContact(info: PersonalInfo, locale: Locale): string {
  const email = safeHref(`mailto:${info.email}`)
  const whatsapp = safeHref(info.whatsApp)
  return `
    <div class="flex flex-col gap-1 bg-paper p-4">
      <dt class="label">${esc(locale.contactEmail)}</dt>
      <dd class="m-0">${email ? `<a class="action-link break-all" href="${esc(email)}">${esc(info.email)}</a>` : esc(info.email)}</dd>
    </div>
    <div class="flex flex-col gap-1 bg-paper p-4">
      <dt class="label">${esc(locale.contactWhatsapp)}</dt>
      <dd class="m-0">${whatsapp ? `<a class="action-link" href="${esc(whatsapp)}">${esc(info.phone)}</a>` : esc(info.phone)}</dd>
    </div>
    <div class="flex flex-col gap-1 bg-paper p-4">
      <dt class="label">${esc(locale.contactLocation)}</dt>
      <dd class="m-0 font-serif text-[0.9375rem] text-ink-2">${esc(info.location)}</dd>
    </div>`
}

/* ----------------------------------------------------------------- skills */

const CATEGORY_ORDER: Array<Skill['category']> = ['mobile', 'web', 'backend', 'tools']

export function renderSkills(skills: Skill[], locale: Locale): string {
  return CATEGORY_ORDER.map((category) => {
    const items = skills.filter((skill) => skill.category === category)
    if (items.length === 0) return ''
    return `
      <div class="flex flex-col gap-3 border-t border-hairline-light pt-4">
        <div class="flex items-baseline justify-between gap-3">
          <h3 class="label text-ink">${esc(locale.categoryLabel[category])}</h3>
          <span class="data">${items.length}</span>
        </div>
        <ul class="flex flex-wrap gap-1.5">
          ${items
            .map(
              (skill) =>
                `<li><span class="chip">${esc(skill.name)}<span class="ml-1.5 text-ink-4">${esc(locale.levelLabel[skill.level])}</span></span></li>`,
            )
            .join('')}
        </ul>
      </div>`
  }).join('')
}
