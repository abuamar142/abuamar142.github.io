/**
 * Fetch the live portfolio payload into content/snapshot.json.
 *
 * The hub renders its first HTML from this snapshot and then replaces the
 * dynamic regions with whatever the API returns at visit time. Keeping the
 * snapshot in the repo is what stops the page from being blank when the API is
 * down, when CORS is misconfigured, or when a crawler does not run JS.
 *
 * Writes nothing when the API fails: the previous snapshot stays, the build
 * still succeeds, and the failure is loud on stderr.
 */

const API = 'https://portfolio.abuamar.online/api/v1'
const OUT = new URL('../content/snapshot.json', import.meta.url)

// Release tags per repository, fetched from the public GitHub API. Unauthenticated
// requests are rate-limited per IP; a miss is not fatal (version is optional).
const RELEASE_REPOS = ['warloc', 'kanzoo', 'plasma-tokenusage']

async function getJSON(url: string, timeoutMs = 10000): Promise<any> {
  const res = await fetch(url, { signal: AbortSignal.timeout(timeoutMs) })
  if (!res.ok) throw new Error(`${url} -> HTTP ${res.status}`)
  return res.json()
}

async function latestRelease(repo: string): Promise<{ repo: string; tag: string; publishedAt: string } | null> {
  try {
    const data = await getJSON(`https://api.github.com/repos/abuamar142/${repo}/releases/latest`, 6000)
    return { repo, tag: data.tag_name, publishedAt: data.published_at }
  } catch {
    return null
  }
}

const [profile, achievements] = await Promise.all<any>([
  getJSON(`${API}/profile`),
  getJSON(`${API}/achievements`),
])

if (!profile?.success || !profile.data) throw new Error('profile payload missing data')
if (!achievements?.success || !achievements.data) throw new Error('achievements payload missing data')

const releases = (await Promise.all(RELEASE_REPOS.map(latestRelease))).filter(Boolean)

const snapshot = {
  fetchedAt: new Date().toISOString(),
  personalInfo: profile.data.personalInfo,
  skills: profile.data.skills ?? [],
  experiences: profile.data.experiences ?? [],
  projects: profile.data.projects ?? [],
  achievements: achievements.data.achievements ?? [],
  releases,
}

await Bun.write(OUT, `${JSON.stringify(snapshot, null, 2)}\n`)
console.log(
  `snapshot: ${snapshot.projects.length} projects, ${snapshot.skills.length} skills, ` +
    `${snapshot.achievements.length} achievements, ${releases.length} releases`,
)
