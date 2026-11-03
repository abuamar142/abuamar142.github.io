/**
 * Fail the build when a link a visitor can click is dead.
 *
 * Checks every external href in the built HTML plus the project/live URLs in
 * the snapshot (those are the ones the runtime island renders, so they are not
 * guaranteed to appear in the static markup).
 *
 * Exit code is the gate: a deploy with a 404 link is worse than a deploy that
 * waited, and the four private repositories this caught once are exactly the
 * failure mode being guarded against.
 */

import { readFileSync } from 'node:fs'
import { readdir } from 'node:fs/promises'
import { join } from 'node:path'

const DIST = new URL('../dist', import.meta.url).pathname
const SNAPSHOT = new URL('../content/snapshot.json', import.meta.url).pathname

const INTERNAL_PREFIX = 'https://abuamar142.github.io'
const CONCURRENCY = 6
const TIMEOUT_MS = 15000

async function htmlFiles(dir: string): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true })
  const files: string[] = []
  for (const entry of entries) {
    const path = join(dir, entry.name)
    if (entry.isDirectory()) files.push(...(await htmlFiles(path)))
    else if (entry.name.endsWith('.html')) files.push(path)
  }
  return files
}

function collect(html: string): Set<string> {
  const urls = new Set<string>()
  for (const match of html.matchAll(/href="(https?:\/\/[^"]+)"/g)) urls.add(match[1])
  return urls
}

async function probe(
  url: string,
  attempt = 1,
): Promise<{ url: string; status: number | null; error?: string }> {
  try {
    // HEAD first: cheaper and enough for a link target. Some hosts reject HEAD,
    // so a 405/501 falls back to GET.
    let response = await fetch(url, {
      method: 'HEAD',
      redirect: 'follow',
      signal: AbortSignal.timeout(TIMEOUT_MS),
      headers: { 'User-Agent': 'abuamar-hub-linkcheck' },
    })
    if (response.status === 405 || response.status === 501) {
      response = await fetch(url, {
        method: 'GET',
        redirect: 'follow',
        signal: AbortSignal.timeout(TIMEOUT_MS),
        headers: { 'User-Agent': 'abuamar-hub-linkcheck' },
      })
    }
    // 429 is a throttle, not a missing page: Instagram and friends rate-limit
    // datacenter IPs, so a CI runner is told to slow down for a link that works
    // fine in a browser. Retry once, then accept it as reachable.
    if (response.status === 429 && attempt === 1) {
      await new Promise((resolve) => setTimeout(resolve, 3000))
      return probe(url, 2)
    }
    return { url, status: response.status }
  } catch (error) {
    return { url, status: null, error: error instanceof Error ? error.message : String(error) }
  }
}

async function pool<T, R>(items: T[], limit: number, work: (item: T) => Promise<R>): Promise<R[]> {
  const results: R[] = []
  let index = 0
  const workers = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (index < items.length) {
      const current = items[index++]
      results.push(await work(current))
    }
  })
  await Promise.all(workers)
  return results
}

const snapshot = JSON.parse(readFileSync(SNAPSHOT, 'utf8')) as {
  projects: Array<{ title: string; githubUrl: string; liveUrl: string }>
}

const targets = new Set<string>()
for (const file of await htmlFiles(DIST)) {
  for (const url of collect(readFileSync(file, 'utf8'))) {
    if (!url.startsWith(INTERNAL_PREFIX)) targets.add(url)
  }
}
for (const project of snapshot.projects) {
  if (project.githubUrl) targets.add(project.githubUrl)
  if (project.liveUrl) targets.add(project.liveUrl)
}

const list = [...targets].sort()
console.log(`checking ${list.length} external links`)

const results = await pool(list, CONCURRENCY, probe)

// What counts as broken, and what only looks broken from a CI runner:
//
//   401 / 403  the page exists but gates bots (LinkedIn answers 999)
//   429        the host throttles this IP; a browser visitor is fine
//
// Everything else that is not 2xx/3xx is a real defect: 404 and 410 are gone,
// 5xx means the deploy behind the link is down, and a null status is DNS or
// connection failure.
const NOT_A_DEFECT = new Set([401, 403, 429, 999])
const bad = results.filter((result) => {
  if (result.status === null) return true
  if (NOT_A_DEFECT.has(result.status)) return false
  return result.status < 200 || result.status >= 400
})

for (const result of results) {
  const mark = bad.includes(result) ? 'FAIL' : ' ok '
  console.log(`[${mark}] ${result.status ?? result.error} ${result.url}`)
}

if (bad.length > 0) {
  console.error(`\n${bad.length} dead link(s)`)
  process.exit(1)
}
console.log('\nall links resolve')
