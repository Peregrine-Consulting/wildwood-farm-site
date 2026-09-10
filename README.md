# Wildwood Farm Modern Website Concept

Static concept site for Dr. Michael Hinkley and Recovery at Wildwood Farm.

Serve the folder with any static server (`npx serve` or `python3 -m http.server`) so the
subpage routes resolve. `npm run build` copies everything into `dist/` for Vercel.

## Direction

- Blues and greens, bright and airy; no tan or muted/faded tones
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
| `/the-program/` | Six-month model, weekly structure, full "who comes here" list, FAQ |
| `/queer-normative-care/` | Friendly vs. queer-normative, questions to ask any program |
| `/dr-hinkley/` | Founder and clinical director |
| `/for-families/` | Family programme and family FAQ |
| `/consultation/` | Free first conversation, finding the right fit |

## Outstanding before launch

- **Animal photos**: `assets/img/placeholder-goats.svg`, `placeholder-chickens.svg` and
  `placeholder-therapy-dogs.svg` are labeled placeholders awaiting real photography.
- **Hero image**: `assets/img/hero-barns.jpg` to be replaced with a 2500px+ frame from the second shoot.
- **Dr. Hinkley bio**: the previous copy was built around twenty years as a Catholic priest.
  All religious references have been removed; the replacement copy needs his sign-off.
- **Consultation form**: currently phone only. A form handler and contact email need wiring.
- Clinical, licensing and privacy language to be reviewed.
