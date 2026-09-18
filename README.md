# Wildwood Farm Modern Website Concept

Static concept site for Dr. Michael Hinkley and Recovery at Wildwood Farm.

Serve the folder with any static server (`npx serve` or `python3 -m http.server`) so the
subpage routes resolve. `npm run build` copies everything into `dist/` for Vercel.

## Direction

- Blues and greens on a bright neutral ground. Two deliberate exceptions: the farm
  section uses `--moss`, a desaturated olive-sage matched to the photography, and the
  hero sits on a near-black behind its photograph. The original direction said no
  muted or faded tones; both departures were intentional design decisions
- Type: Cormorant Garamond (display), Jost (body/labels), Italianno (script accent).
  Playfair Display was the original direction and is no longer used anywhere
- Warm, sincere tone matching recoveryatwildwoodfarm.com; never arch or sarcastic
- Minimal copy on the homepage; detail lives on the interior pages
- Queer-normative recovery positioning, kept broad and relatable rather than niche
- Dr. Hinkley visible as the primary trust builder
- Consultation-led calls to action: fit and needs, never pricing
- No religious references anywhere on the site
- Farm animals (goats, chickens, therapy dogs) featured on the homepage

## Pages

| Route | Purpose |
| --- | --- |
| `/` | Minimal homepage: hero, who comes here, the animals, three differentiators, consultation CTA |
| `/the-farm/` | The land, its two-hundred-year history, the gardens and the animals |
| `/the-program/` | Six-month model, weekly structure, full "who comes here" list, FAQ |
| `/queer-normative-care/` | Friendly vs. queer-normative, questions to ask any program |
| `/dr-hinkley/` | Founder and clinical director |
| `/for-families/` | Family programme and family FAQ |
| `/consultation/` | Free first conversation, finding the right fit |

## Imagery

| File | Used for |
| --- | --- |
| `hero-vine.jpg` | Homepage hero (no fade, per client direction) |
| `farm-field.jpg` | Farm page full-bleed feature |
| `farmhouse.jpg` | Farm page, history section. The yellow farmhouse front, requested by the client in the 16 September review |
| `barn-tree.jpg` | Currently unused; replaced by `farmhouse.jpg` and kept as a spare |
| `goats.jpg` / `chickens.jpg` / `therapy-dogs.jpg` | Animal grid, homepage and farm page |
| `dr-hinkley.jpg` | Portrait on the Dr. Hinkley page, 720x900. The client-supplied headshot, which replaced an earlier file that was an exact 2000x2000 square with no camera EXIF. This one carries an Exif block and a Photoshop marker but still no camera model, so it has been through an editor rather than straight off a camera |
| `logo-mark.png` | The lily from the logo lockup, used in the header beside the live wordmark |
| `og.jpg` | Social share card, 1200x630, cropped from the vine photo |
| `hero-barns.jpg` | Currently unused; kept as a spare |

Photos are plain JPEG; no WebP tooling was available on this machine, so they were
resized to roughly their displayed dimensions instead. Everything but the hero is
lazy-loaded.

## Logo

The supplied artwork (`FARM logo 2-logo.pdf`) is a full lockup: a line-drawn lily
above a ruled box containing WILDWOOD FARM and FROM SHAME TO PRIDE. The header
uses only the lily, paired with live text, because the lockup's own wordmark would
render around 10px tall at header size. The lily was cropped above the box rule,
which passes through the stem, so the grass tuft at its base is not included.

A vector version would be better than `logo-mark.png`: no PDF-to-SVG converter was
available on this machine, so the mark is a 206x220 PNG rasterised from the PDF
(about 4x the displayed size, so it stays crisp on retina). The dark line art also
disappears on the blue footer, which is why the footer brand remains text-only.

## Outstanding before launch

- **Hero resolution**: `assets/img/hero-vine.jpg` is 2048px wide, which is fine at 1x but
  soft on large retina displays. A 2500px+ original would be better.
- **Dr. Hinkley bio**: the previous copy was built around twenty years as a Catholic priest.
  All religious references have been removed; the replacement copy needs his sign-off.
- **Consultation form**: currently phone only. A form handler and contact email need wiring.
- **Logo as vector**: an SVG of the lily mark, and a light/reversed version for use on
  the blue footer and dark hero.
- ~~**Animals on the farm**~~: resolved in the 16 September review. Pigs are out, and
  the site now lists laying hens, goats, lambs and Macchiato the therapy dog.
- Clinical, licensing and privacy language to be reviewed.
