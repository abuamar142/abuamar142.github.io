/**
 * Runtime hydration of the dynamic regions.
 *
 * The page arrives fully rendered from the build (snapshot data), so this is
 * an enhancement rather than the renderer: it fetches the API, and on success
 * replaces the shared-region slots with fresh markup built by the same
 * functions the build used. On failure nothing is removed — the snapshot markup
 * stays and only a notice appears.
 *
 * Consequence to keep in mind: text and links are always present; what can be
 * stale is the numbers and the project list, and only until the fetch settles.
 */

import type { Snapshot, LiveData } from '../data/types'
import type { Locale } from '../render/sections'
import {
  renderBio,
  renderProjects,
  renderContributions,
  renderSkills,
  renderStats,
  renderContact,
} from '../render/sections'

const API = 'https://portfolio.abuamar.online/api/v1'
const TIMEOUT_MS = 8000

interface HydrateOptions {
  lang: 'id' | 'en'
  t: Locale
  snapshot: Snapshot
}

async function fetchJSON<T>(path: string): Promise<T> {
  const response = await fetch(`${API}${path}`, {
    // Public endpoints; no cookies mean no credentialed CORS requirement.
    credentials: 'omit',
    headers: { Accept: 'application/json' },
    signal: AbortSignal.timeout(TIMEOUT_MS),
  })
  if (!response.ok) throw new Error(`${path} -> HTTP ${response.status}`)
  const body = (await response.json()) as { success?: boolean; data?: T }
  if (!body?.success || body.data === undefined) throw new Error(`${path} -> malformed payload`)
  return body.data
}

function slot(name: string): HTMLElement | null {
  return document.querySelector<HTMLElement>(`[data-live="${name}"]`)
}

function replace(name: string, html: string): void {
  const element = slot(name)
  if (element) element.innerHTML = html
}

export function hydrate({ lang, t, snapshot }: HydrateOptions): void {
  const releases = new Map(snapshot.releases.map((release) => [release.repo, release.tag]))
  const banner = document.querySelector<HTMLElement>('[data-stale-banner]')

  const showStale = () => {
    if (banner) banner.hidden = false
  }

  const apply = (data: LiveData) => {
    // Releases are fetched at build time only: the GitHub API is rate-limited
    // per IP and a per-visitor call would start failing under traffic.
    replace('bio', renderBio(data.personalInfo, lang))
    replace('contact', renderContact(data.personalInfo, t))
    replace('stats', renderStats(data, t))
    replace('projects', renderProjects(data.projects, releases, t))
    replace('contributions', renderContributions(data.achievements, t))
    replace('skills', renderSkills(data.skills, t))
    if (banner) banner.hidden = true
  }

  const load = async () => {
    try {
      const [profile, achievements] = await Promise.all([
        fetchJSON<{
          personalInfo: LiveData['personalInfo']
          skills: LiveData['skills']
          experiences: LiveData['experiences']
          projects: LiveData['projects']
        }>('/profile'),
        fetchJSON<{ achievements: LiveData['achievements'] }>('/achievements'),
      ])

      apply({
        personalInfo: profile.personalInfo,
        skills: profile.skills ?? [],
        experiences: profile.experiences ?? [],
        projects: profile.projects ?? [],
        achievements: achievements.achievements ?? [],
      })
    } catch (error) {
      // Silent by design when it works; loud enough to debug when it does not.
      console.warn('[hub] live data unavailable, keeping the committed snapshot:', error)
      showStale()
    }
  }

  document.querySelector<HTMLElement>('[data-retry]')?.addEventListener('click', () => {
    if (banner) banner.hidden = true
    void load()
  })

  void load()
}
