# Portfolio Skills Guide

This file explains how to update the portfolio without needing to understand the whole codebase.

## Edit Your Name And Main Text

Most visible page copy is in:

```text
src/App.tsx
```

Useful things to search for:

- `Yash Raj`
- `I build marketing systems`
- `I'm Yash Raj`
- `Let's build something`
- `mailto:`

The browser tab title is in:

```text
index.html
```

## Add A New Project

Open:

```text
src/data/projects.ts
```

Add one new object to the `projects` array.

Use one of these categories:

```ts
'Marketing Project'
'Automation'
'Web App / Website'
```

Example:

```ts
{
  id: 'clinic-landing-page',
  title: 'Clinic landing page',
  category: 'Web App / Website',
  status: 'Live',
  description: 'Conversion-focused landing page for a local clinic.',
  tags: ['React', 'Tailwind', 'Lead capture'],
  links: { live: 'https://example.com' },
  date: '2026-06',
}
```

Newest projects appear first because the grid sorts by `date`.

## Add A New Currently Building Item

Open:

```text
src/data/learning.ts
```

Add one new object to the `learning` array.

Use one of these icons:

```ts
'Sparkles'
'Code2'
'Workflow'
```

Example:

```ts
{
  id: 'portfolio-case-studies',
  title: 'Writing portfolio case studies',
  note: 'Documenting what was built, why it matters, and what improved.',
  progress: 35,
  icon: 'Sparkles',
}
```

## Change Fonts

Fonts are loaded in:

```text
index.html
```

The global font is set in:

```text
src/index.css
```

Current fonts:

- Main font: Almarai
- Accent italic font: Instrument Serif

## Change Colors

Main color settings are split between:

```text
src/App.tsx
src/index.css
tailwind.config.js
```

Important colors:

- Main cream text: `#E1E0CC`
- Tailwind primary: `#DEDBC8`
- About card: `#101010`
- Project cards: `#212121`
- Automation accent: `#A8B89C`
- Web accent: `#9CA8B8`

## Edit The 3D Background

The animated hero background lives in:

```text
src/components/HeroScene.tsx
```

The current scene uses:

- A warped shader surface
- Soft cream/sage/slate colors
- Fine drifting particles
- A lazy-loaded Three.js import

When editing it, keep the text readable. The background should feel cinematic, not distracting.

## Local Preview

Start the site:

```bash
npm.cmd run dev
```

Open:

```text
http://127.0.0.1:5173
```

Build before deployment:

```bash
npm.cmd run build
```

## Host On Vercel

1. Push the project to GitHub.
2. Import the GitHub repo into Vercel.
3. Use Vite settings:
   - Build command: `npm run build`
   - Output folder: `dist`
4. Deploy.
5. Add your domain in Vercel under project settings.
6. Copy the DNS records Vercel gives you into your domain provider.

Typical DNS pattern:

```text
@    A      76.76.21.21
www  CNAME  value-shown-by-vercel
```

Always use the exact DNS values Vercel shows for your project.
