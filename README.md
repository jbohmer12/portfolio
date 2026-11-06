# Joaquin Bohmer — Portfolio

Astro + GSAP + Three.js + Lenis. Static site, deploys free to Netlify or GitHub Pages.

The background ("Signal") is a live WebGL patch: cursor speed drives **MID**, scroll speed drives **LOW**, time noise drives **HIGH** — the meters in the hero show it. Hovering a project re-tints the whole site in that project's palette.

## Run it

```bash
nvm use            # Node 22.22+ (see .nvmrc)
npm install
npm run dev        # http://localhost:4321
npm run build      # outputs to /dist
```

## Edit content

Everything lives in **`src/data/projects.ts`**: projects, case-study sections, stats, awards, experience, links.

### Add your images (do this first)

Every image slot without a file shows a generative gradient, so nothing looks broken — but real visuals are what sells the work.

1. Put files in `public/projects/<slug>/` (e.g. `public/projects/redline/dashboard.jpg`).
2. In `projects.ts`, add `src` to the matching media item:
   ```ts
   cover: { src: '/projects/redline/cover.jpg', alt: 'Redline dashboard', wide: true },
   ```
3. `.mp4` / `.webm` work too (autoplay, muted, looped) — screen recordings are great for Redline and the Club de lo Roto app.

Suggested slots per project:

| Project | Cover | Section media |
|---|---|---|
| Redline | Dashboard screenshot | Inventory list + part detail, eBay listing flow, UI system |
| STEP | Device render | Device iterations, app screens, final device + app |
| Ooln | Trading UI | Trading interface, waitlist site, investor deck |
| Club de lo Roto | Gold logo | Logo exploration, Instagram grid, visitor/fixer app screens |

### Still to fill in

- [ ] STEP: award year/category, team size, your exact role, research you did
- [ ] Redline: real dates (currently "2025 — Present")
- [ ] Résumé: add `public/resume.pdf` and set `resume: '/resume.pdf'` in `site`
- [ ] Domain: set `site` in `astro.config.mjs`
- [ ] Check every claim reads true to you before publishing

## Deploy (Netlify — recommended)

1. Create a GitHub repo and push:
   ```bash
   git init && git add . && git commit -m "Portfolio v1"
   gh repo create portfolio --public --source=. --push   # or create it on github.com
   ```
2. On netlify.com → **Add new site → Import from GitHub** → pick the repo. `netlify.toml` already sets the build command, output folder and Node version.
3. **Domain settings → Add custom domain** (e.g. joaquinbohmer.com).

Every `git push` redeploys automatically.

## Structure

```
src/
  data/projects.ts        ← all content
  layouts/Base.astro      ← nav, cursor, footer/contact, page curtain
  pages/index.astro       ← home: hero, approach, work index, marquee, recognition
  pages/work/[slug].astro ← case-study template (one page per project)
  pages/about.astro
  components/MediaBlock.astro
  scripts/signal.ts       ← the WebGL shader background
  scripts/main.ts         ← smooth scroll, text reveals, cursor, hover, transitions
  styles/global.css       ← tokens, type scale, shared styles
```

Respects `prefers-reduced-motion` (no smooth scroll, no reveals, static shader).
