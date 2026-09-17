# CLAUDE.md

Guidance for Claude Code working in this repository.

## Golden rule: never push to `main`

**Never commit or push directly to `main`. Always branch and open a pull request.**

`main` has no branch protection on GitHub, so nothing mechanically stops a direct
push. The discipline has to come from here. Every change, however small, goes:

```bash
git checkout main && git pull
git checkout -b short-descriptive-branch-name
# ...work, commit...
git push -u origin short-descriptive-branch-name
gh pr create
```

Do not merge your own PR without the user asking. Do not force-push `main` under
any circumstances. Do not rewrite published history.

## What this is

A static marketing site for **Recovery at Wildwood Farm** (Dr. Michael Hinkley),
an extended sober living program. Hand-written HTML and CSS, no framework, no
build step beyond a file copy.

## Deployment: manual, not automatic

**Live at https://wilwoodwebsite.vercel.app** (alias of
`wilwoodwebsite-isha-peregrine.vercel.app`). Public, no auth.

**Vercel is not connected to this GitHub repository.** There is no Git integration,
no webhook, and no deployment checks on pull requests. Merging a PR to `main`
deploys **nothing**.

Every deployment so far has been a manual Vercel CLI run from this folder on Isha's
laptop, under the personal scope `isha-peregrine`, project `wilwood_website` (note
the misspelling, missing a `d`). `vercel.json` and `npm run build` are real and do
run, but only when someone invokes a deploy by hand:

```bash
npx vercel --prod
```

Consequences to keep in mind:

- `main` can be, and has been, ahead of what is live. Always check the live site
  rather than assuming `main` reflects it.
- A merged PR is not a shipped change. Deploying is a separate, deliberate step.
- Deploys depend on one machine's stored Vercel credentials. Nobody else can ship.

Connecting the Vercel GitHub integration would make merges deploy automatically and
is worth doing, but installing it needs admin on the repo. The `deo-222` account has
push and triage only, so it requires a Peregrine-Consulting owner.

## Not to be confused with the client's live site

`recoveryatwildwoodfarm.com` is the client's existing **Wix** site. It is unrelated
to this repository, is not served from it, and must never be assumed to be a deploy
target. This repo is the rebuild concept.

## Layout

| Path | What it is |
| --- | --- |
| `index.html` | Homepage |
| `the-farm/`, `the-program/`, `queer-normative-care/`, `dr-hinkley/`, `for-families/`, `consultation/` | Interior pages, each an `index.html` |
| `styles.css` | All page styling |
| `assets/brand.css` | Design tokens: colours, type scale, spacing |
| `assets/reveal.js` | Scroll-reveal animations |
| `assets/img/` | Photography and logo mark |
| `dist/` | **Build output — generated, but tracked in git. See below.** |

Each route is a directory with an `index.html`, so the site needs a static server
that resolves directory indexes. Serve it with `npx serve` or
`python3 -m http.server`; opening `index.html` off the filesystem breaks the
subpage links.

## The `dist/` trap — read this before editing

`npm run build` is a plain `cp -R` of the source files into `dist/`. Vercel runs
it on deploy, so **the live site is always built fresh from source**.

But `dist/` is *also* committed to the repository, which means it silently drifts
out of date whenever someone edits source without rebuilding. It is currently
stale on the `client-review-16-sep` branch for exactly this reason.

Therefore:

- **Always edit the source files, never the copies under `dist/`.** An edit made
  in `dist/` looks correct locally and is destroyed by the next build.
- After changing any source page, run `npm run build` and commit the regenerated
  `dist/` alongside it, so the tracked copy does not drift.
- If a change appears to work on Vercel but not locally, or vice versa, suspect a
  stale `dist/` first.

## Git identity

Commits must be authored as `isha@tryperegrine.com`. GitHub attributes commits by
**email**, not by name, and that address is the one linked to the `deo-222`
account. This is set per-repository:

```bash
git config user.name "deo-222"
git config user.email "isha@tryperegrine.com"
```

The machine's *global* git identity is `id222 <id222@scarletmail.rutgers.edu>`,
which is **not** linked to any GitHub account. Commits made under it show up as an
unlinked plain-text name with no avatar and no contribution credit. The repo-local
config above overrides it here, but check `git config user.email` before the first
commit in any new clone.

Never rewrite existing commit authorship to fix this retroactively. Doing so
rewrites every SHA and detaches the local branch from `origin`, which is precisely
the mess that had to be cleaned up on 17 Sep 2026.

## Content and tone

These are client directions, not suggestions. Violating them creates real problems.

- **Not a clinical program.** Wildwood is an *extended sober living* program that
  is clinically and trauma informed, with leadership on site. Clinical work is
  delivered by professional partners (Yale New Haven Hospital, Middlesex Health,
  local clinical groups), who provide PHP and IOP. Never describe Wildwood itself
  as providing clinical leadership or clinical care.
- **No religious references anywhere.** Dr. Hinkley's earlier bio was built around
  twenty years as a Catholic priest; all of it has been removed deliberately.
- **No pricing or cost.** Calls to action lead to a free consultation about fit
  and needs, never to a price.
- **Language:** "farmstead" or "living farm", never "working farm". The property
  is two acres. The therapy dog is Makiato. No pigs.
- **Tone:** warm and sincere, never arch or sarcastic.
- **No em dashes in site copy.** This was an explicit client request and was
  applied across the site in its own commit.
- Queer-normative positioning, kept broad and relatable rather than niche.

## Design

- Palette: blues and greens, bright and airy. No tan, no muted or faded tones.
- Type: Playfair Display (display), Jost (body and labels), Italianno (script
  accent), at light weights and fine strokes.
- Minimal copy on the homepage; detail belongs on interior pages.
- Colours and type scale live in `assets/brand.css` — change tokens there rather
  than hard-coding values in `styles.css`.
- Everything but the hero image is lazy-loaded.

## Known outstanding work

Tracked in more detail in `README.md`:

- Hero image is 2048px, soft on large retina displays; a 2500px+ original is needed.
- Dr. Hinkley's rewritten (non-religious) bio still needs his sign-off.
- The consultation page is phone-only; a form handler and contact email need wiring.
- The logo mark is a raster PNG; an SVG, plus a reversed version for the dark
  footer, is needed.
- Clinical, licensing and privacy language is unreviewed.
