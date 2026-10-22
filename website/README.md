# Info Haji website

Static landing page for the Info Haji app: home, privacy policy, and terms. Astro builds plain HTML for GitHub Pages. The React Native app in the repo root is a separate Yarn project.

```bash
cd website
npm install --legacy-peer-deps
npm run dev
```

Production check:

```bash
npm run build
npm run preview
```

Output is `website/dist`. GitHub Actions (`.github/workflows/pages.yml`) publishes that folder. The intended address is `https://infohaji.naandalist.com`. DNS needs a `CNAME` from `infohaji` to `naandalist.github.io` (Cloudflare proxy off), and the repo Pages source must be GitHub Actions.

Privacy policy URL for Play: `https://infohaji.naandalist.com/privacy/`.

## SEO

The shared layout renders canonical URLs, descriptions, Open Graph and Twitter metadata in static HTML. The home page includes MobileApplication JSON-LD based on the visible app information; no unverified ratings are published. The 404 page uses `noindex`.

Canonical URLs use trailing slashes. Update `src/pages/sitemap.xml.ts` when adding indexable pages. `public/robots.txt` points to that sitemap. Keep Markdown source in `src/content/` so Astro does not publish duplicate pages under `/content/`.
