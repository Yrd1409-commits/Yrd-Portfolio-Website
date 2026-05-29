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
- Hero 3D background: `src/components/HeroScene.tsx`
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

## Motion Notes

- Text reveal components live in `src/App.tsx`.
- Work filtering uses Framer Motion `layout` and `AnimatePresence`.
- Hero background uses Three.js in `src/components/HeroScene.tsx`.
- Three.js is dynamically imported so the main app bundle stays lighter.
- If editing the hero scene, verify it still renders on desktop and mobile.

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
- 3D background is visible but does not overpower text.

## Known Launch Tasks

- Replace placeholder `#` links.
- Replace placeholder email with the real email.
- Add real project screenshots or videos.
- Tune personal copy once final positioning is clear.
- Deploy to Vercel and connect the custom domain.
