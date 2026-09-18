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

### Manual deploys are the deliberate choice, not a gap

As of 17 September 2026 the decision is to **keep deploying manually**. Connecting
the Vercel GitHub integration was investigated and set aside for now; it also needs
a Peregrine-Consulting owner to install the Vercel GitHub App, since `deo-222` has
push and triage but not admin. Do not treat manual deploys as a defect to be fixed
in passing, and do not run `vercel git connect` without being asked.

The cost of that choice is that **`vercel --prod` ships whatever is in the working
directory at that moment**, not what is on `main`. A deploy from a stale or
half-finished checkout silently republishes old copy over good copy. This has
already happened once in each direction.

### "Production" here is the client's review environment

This matters more than it sounds. `wilwoodwebsite.vercel.app` is where **the client
reviews work**, and the review happens *after* deploying, not before. Dr. Hinkley
looks at the Vercel URL. The public site the business actually runs on is still Wix
at `recoveryatwildwoodfarm.com`, untouched by anything here.

So deploying is not publishing, and unreviewed copy on the Vercel URL is the normal
state of things rather than an incident. Deploy a working branch so the client can
see a proposed change: that is the intended workflow, not a shortcut. Do not stall a
deploy waiting for sign-off that is meant to happen on the deployed page, and do not
warn about "publishing unreviewed copy" while this is the arrangement.

**This flips at cutover.** Once `recoveryatwildwoodfarm.com` points here, that same
command publishes to the real public site, and the caution above becomes real. At
that point client review has to move to preview deploys: `npx vercel` without
`--prod` gives its own URL and leaves production alone. Re-read this section when
the domain moves.

### Deploying

```bash
git status                           # know what is in the tree; commit or stash first
npm run build                        # regenerate dist/
npx vercel --prod                    # deploy to the review URL
```

Deploying `main` is the default, but deploying a branch is fine and often the point.
The hazard is not which branch, it is deploying a **stale or half-finished tree by
accident**, which silently reverts live content to older copy. That has already
happened in both directions in a single day. Know what is in the working directory
before you deploy it.

Verify against the live URL rather than trusting the deploy output, since a
successful deploy of the wrong content still reports success:

```bash
curl -s https://wilwoodwebsite.vercel.app | grep -c Macchiato
```

A deploy is not finished until the live page has been checked. If you deployed a
branch, get `main` caught up reasonably soon, so the next person deploying from a
clean checkout does not quietly undo it.

## Not to be confused with the client's live site

`recoveryatwildwoodfarm.com` currently serves the client's existing **Wix** site. It
is not served from this repository today, so do not assume a change here reaches it.

**That is the intended destination, though.** The plan as of 17 September 2026 is to
point `recoveryatwildwoodfarm.com` at this Vercel project and retire the Wix setup.
The site is already built for it: every page's `rel="canonical"` and `og:url`, the
sitemap and `robots.txt` all reference `recoveryatwildwoodfarm.com` rather than the
`.vercel.app` URL. Nothing in the markup needs changing at launch.

One present-day consequence: because canonicals point at the live domain, the
`.vercel.app` copy tells search engines the authoritative version lives elsewhere.
That is the desired behaviour while this is a preview, and it becomes correct
automatically once the domain moves. Do not "fix" canonicals to point at the
`.vercel.app` host.

Cutting over is a DNS change at the registrar plus adding the domain in the Vercel
project, not a code change. Before it happens, the items under **Known outstanding
work** stop being nice-to-haves: the consultation page is phone-only with no form
handler or contact email, Dr. Hinkley's rewritten bio is unsigned-off, and the
clinical, licensing and privacy language is unreviewed.

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
out of date whenever someone edits source without rebuilding. It has already gone
stale this way once, when the 16 September review edited all seven source pages and
left the tracked build output untouched.

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
  is two acres. The therapy dog is **Macchiato** - note the spelling. The farm's
  dogs are coffee-named and the removed one was Cappuccino, so "Makiato", which
  came out of the meeting transcript phonetically, is wrong. No pigs.
- **Tone:** warm and sincere, never arch or sarcastic.
- **No em dashes in site copy.** This was an explicit client request and was
  applied across the site in its own commit.
- Queer-normative positioning, kept broad and relatable rather than niche.

## Design

- Type: **Cormorant Garamond** (display), Jost (body and labels), Italianno
  (script accent), at light weights and fine strokes. Playfair Display was the
  original direction, was replaced by the current type system, and appears nowhere
  in the codebase. Do not reintroduce it.
- Palette: blues and greens on a bright neutral ground, with two deliberate
  exceptions noted below.
- Minimal copy on the homepage; detail belongs on interior pages.
- Colours and type scale live in `assets/brand.css` - change tokens there rather
  than hard-coding values in `styles.css`.
- Content images are lazy-loaded. The hero and the header logo are eager, which is
  intentional since both are above the fold.
- `.media img`, `.feature-img`, `.portrait` and `.inset-img` carry a
  `--fade-bottom` mask, so those images fade out at the base. The hero does **not**,
  per explicit client direction.

### The palette exceptions are intentional

The original client direction was "bright and airy, no tan or muted/faded tones".
Two places knowingly depart from it, both by design decision rather than drift:

- The farm section uses `--moss: oklch(86% 0.042 124)`, a desaturated olive-sage
  matched to the photography. Chroma `0.042` and hue `124` make it markedly flatter
  and yellower than the other greens, which sit at hue `155`. The commit is
  "Match the farm green to the photography, faded".
- The hero sits on `--ink-strong`, a near-black, behind the photograph.

Neither is a bug and neither needs reporting as one. If the palette is revisited,
treat these as decisions to argue with rather than mistakes to correct.

## Known outstanding work

Tracked in more detail in `README.md`:

- Hero image is 2048px, soft on large retina displays; a 2500px+ original is needed.
- Dr. Hinkley's rewritten (non-religious) bio still needs his sign-off.
- The consultation page is phone-only; a form handler and contact email need wiring.
- The logo mark is a raster PNG; an SVG, plus a reversed version for the dark
  footer, is needed.
- Clinical, licensing and privacy language is unreviewed.
