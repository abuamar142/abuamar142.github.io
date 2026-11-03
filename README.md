# abuamar142.github.io

Gateway hub for M. Abu Amar Al Badawi. One page, two locales (`/` Indonesian,
`/en/` English), static output deployed to GitHub Pages.

## What it is

A directory, not a résumé: the full record lives at
[abuamar.online](https://abuamar.online). This page answers "who is this and
where do I go next" — portfolio, writing, source, tools — and backs it with the
project list, the open-source contributions, and the toolkit.

## Data

Content comes from `portfolio-service` at `portfolio.abuamar.online`:

| Endpoint | Used for |
|---|---|
| `GET /api/v1/profile` | identity, skills, experiences, projects (incl. `liveUrl`), education |
| `GET /api/v1/achievements` | contributions section, achievement count |

The page is **rendered at build time from `content/snapshot.json`**, then a small
island fetches the API and re-renders the same regions with fresh data. That
order matters:

- the HTML a crawler or a no-JS visitor gets is complete, not a skeleton;
- if the API is down, blocked, or slow, the snapshot markup stays and a notice
  appears instead of an empty page.

Refresh the snapshot with `bun run snapshot` and commit the result. Release tags
for the project cards are fetched from the GitHub API at build time only, because
that API is rate-limited per IP and a per-visitor call would start failing.

### CORS

The service allow-lists origins literally, so `https://abuamar142.github.io`
must be in its list or every browser fetch is blocked. That origin ships in the
service defaults; it can also be added without a rebuild through the
`ALLOWED_ORIGINS` env var (comma-separated).

## Commands

```bash
bun install
bun run dev        # local dev server
bun run build      # static build to dist/
bun run preview    # serve dist/
bun run check      # astro check (types + diagnostics)
bun run linkcheck  # every external link must resolve
bun run snapshot   # refresh content/snapshot.json from the API
```

## Deploy

Push to `master`. GitHub Actions builds, type-checks, link-checks, and uploads
to Pages. Pages source must be set to **GitHub Actions** (Settings → Pages →
Source); the repo previously shipped a committed Flutter web build instead.

## Design

Tokens are copied from the portfolio's `DESIGN.md` ("The Editorial Dossier"):
terracotta `#b8442a` on cream `#f3f4ef`, Newsreader / Source Serif 4 / IBM Plex
Sans + Mono, sharp corners, numbered sections. The hub and abuamar.online share
one visual language on purpose — two identities for one person is the thing this
page exists to avoid.
