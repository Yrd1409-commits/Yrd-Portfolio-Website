# Agent Guide

This repository is a personal portfolio for Yash Raj. It is a React + Vite + TypeScript + Tailwind CSS site with Framer Motion, Lucide icons, and a lazy-loaded Three.js hero background.

## Project Commands

- Install dependencies: `npm.cmd install`
- Start local development: `npm.cmd run dev`
- Build for production: `npm.cmd run build`
- Preview production build: `npm.cmd run preview`

Use `npm.cmd` on Windows because PowerShell may block `npm.ps1`.

## Architecture

- Main app: `src/App.tsx`
- Global CSS and custom utilities: `src/index.css`
- Project data: `src/data/projects.ts`
- Learning/status data: `src/data/learning.ts`
- Hero robot video background and cursor interaction: `src/App.tsx`
- Legacy hero 3D scene component: `src/components/HeroScene.tsx`
- Static public assets: `public/projects/`
- Vercel SPA routing config: `vercel.json`
- HTML shell and Google Fonts: `index.html`
- Tailwind config: `tailwind.config.js`

## Editing Rules

- Keep content data-driven wherever possible.
- Adding a new project should only require adding one object to `src/data/projects.ts`.
- Adding a new learning item should only require adding one object to `src/data/learning.ts`.
- Preserve the current dark, cinematic, warm-cream visual direction.
- Keep the top nav simple: `Work`, `About`, `Contact`.
- Do not re-add separate nav items for Automations or Writing unless the site gets real standalone sections for them.
- Keep project categories aligned with the current filter model:
  - `Marketing Project`
  - `Automation`
  - `Web App / Website`
- Project cards can link to dedicated work pages using `links.caseStudy`, such as `/work/john-clark-audi-google-ads`.
- Dedicated case-study pages should stay part of the React app, not separate static HTML pages.
- If adding a public workbook, image, or downloadable file, place it in `public/projects/` and link with an absolute public path such as `/projects/file-name.ods`.

## Current Project Pages

- John Clark Audi Google Ads account build:
  - Card data: `src/data/projects.ts`
  - Route: `/work/john-clark-audi-google-ads`
  - Thumbnail: `public/projects/john-clark-audi-google-ads.svg`
  - Workbook download: `public/projects/john-clark-audi-google-ads-workbook.ods`
  - Workbook tabs verified: `Campaign_Settings`, `Ad_Groups`, `Keywords`, `Negative_Keywords`, `Responsive_Search_Ads`, `RSAs_-_Additional`, `Sitelinks`, `Callouts_&_Snippets`
- AlignGrowth booking recovery MVP:
  - Card data: `src/data/projects.ts`
  - Route: `/work/aligngrowth-booking-recovery`
  - Thumbnail: `public/projects/aligngrowth-flow-new-booking.png`
  - Brand/logo asset: `public/projects/aligngrowth-logo.png`
  - External service-agency link: `https://aligngrowthuk.com/`
  - Supporting workflow images:
    - `public/projects/aligngrowth-flow-new-booking.png`
    - `public/projects/aligngrowth-flow-missed-call.png`
    - `public/projects/aligngrowth-flow-cancellation.png`
    - `public/projects/aligngrowth-flow-reschedule.png`
  - The workflow images are sanitized public screenshots. Keep webhook URLs and sample payload values hidden before adding or replacing any n8n screenshots.
  - This is positioned as an MVP/proof-of-concept for aesthetics clinics and service businesses, not as a finished client deployment.
  - Mobile workflow screenshots should use an internal horizontal scroll container so the page itself does not horizontally overflow.

## Design Notes

- Primary visible text color is `#E1E0CC`.
- Tailwind `primary` is `#DEDBC8`.
- Background is intentionally black/dark.
- About card uses `#101010`.
- Project cards use `#212121`.
- Category accents:
  - Marketing Project: `#DEDBC8`
  - Automation: `#A8B89C`
  - Web App / Website: `#9CA8B8`
- Use Lucide icons for interface icons.
- Avoid emoji in UI copy.
- Keep text readable on mobile and avoid horizontal overflow.
- Treat responsive behavior as mandatory for every visual change.
- On mobile, case-study pages should stack content in one column: text first, image/media below, then supporting sections.
- Images and SVG thumbnails must not crop awkwardly on mobile unless that crop is intentional. Prefer `object-contain` and stable aspect ratios for project mockups with text inside them.
- Check that buttons wrap cleanly on narrow screens and do not force horizontal scrolling.

## Motion Notes

- Text reveal components live in `src/App.tsx`.
- Work filtering uses Framer Motion `layout` and `AnimatePresence`.
- Hero background uses a robot/AI video in `src/App.tsx`.
- Desktop pointer hover drives throttled cursor-to-pose robot movement, CSS-variable parallax, palette lighting, and a small hero-only bordered cursor marker. Cursor left/middle/right should map to left/front/right robot head positions.
- Keep the robot video paused on desktop and scrub to eased pose targets. Avoid autoplay loops or playback-rate tricks because they make the robot feel random and can lag.
- Keep the default browser cursor visible. Do not hide it or replace it with a full-site decorative cursor.
- Mobile uses normal muted inline playback.
- `src/components/HeroScene.tsx` is a legacy Three.js component and is not the active hero background unless reintroduced intentionally.

## Before Finishing Changes

Run:

```bash
npm.cmd run build
```

Then visually check:

- Hero fits on desktop and mobile.
- Nav does not overflow on mobile.
- Work filters still show correct counts.
- Project cards stay centered when only one filter result is visible.
- Project links open the intended page or section.
- Dedicated case-study pages work on desktop and mobile.
- Mobile pages have no horizontal scrolling.
- Project images/media collapse cleanly and stay readable on mobile.
- 3D background is visible but does not overpower text.

For responsive checks, test at least one mobile viewport around `390x844` and one desktop viewport before pushing.

## Deployment Notes

- Repository is connected to GitHub and deployed on Vercel.
- Pushing `master` to GitHub triggers a Vercel redeploy.
- `vercel.json` rewrites all routes to `index.html` so direct URLs like `/work/john-clark-audi-google-ads` work on refresh and when shared.
- Custom domain setup has been started for `yashrajdhillor.com`; Vercel handles hosting and SSL.

## Known Launch Tasks

- Replace placeholder `#` links.
- Replace placeholder email with the real email.
- Add real project screenshots or videos.
- Tune personal copy once final positioning is clear.
