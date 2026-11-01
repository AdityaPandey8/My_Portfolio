# ADITYA — THE SERIES

A cinematic, 3D, streaming-inspired portfolio for **Aditya Pandey** — AI & Full-Stack Developer | Innovation Builder.
Every section is an episode, every project is an Original.

> Personal portfolio with a fictional streaming-platform look. Not affiliated with any streaming service and uses none of their logos.

## Features

- **Opening title sequence** → "Who's watching?" profile picker (Aditya / Recruiter / Developer / Founder) that reorders the sections
- **Real-time WebGL 3D hero** (Three.js): glowing AI core, orbit rings with satellites, neural-network point cloud and starfield — follows the mouse, spins and fades on scroll, pauses off-screen, falls back gracefully without WebGL and respects reduced-motion
- **Interactive 3D Skill Universe** — drag/swipe to spin every skill on a sphere; tap one to open its category
- 3D tilt cards, pinned horizontal "Originals" project reel, project detail overlays with **Live Demo** + **GitHub** links
- Journey told as seasons & episodes, Top 10 row, leadership moments, "Play Intro" cinematic, designed resume preview + PDF download
- Smooth scrolling (Lenis), custom cursor, fully responsive (phone → ultrawide)

## Run it locally

Requires **Node.js 18+**.

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build → dist/
npm run preview
```

Deploy `dist/` anywhere static — on **Vercel**, just import the repo (framework preset: Vite).

## Updating the content

All content lives in **`src/data/portfolio.ts`** — profile, education, experience, "What I Do" pillars, projects, leadership moments, skills, seasons, top picks and intro slides.

| To change… | Edit |
| --- | --- |
| Name, intro, email, links | `profile` |
| A project / add a new one | `projects` (add `live` and `github` URLs when available — buttons appear automatically) |
| Certificates | `certifications` — the certificates rail appears as soon as it has entries |
| Skills (cards + 3D globe) | `skillCategories`, `skillEvidence` |
| Journey | `seasons` |

### Portrait / avatar

`avatar.png` (project root) is the background-removed avatar. Replace it and run `npm run images` to regenerate the portraits and the social share image in `public/assets/`.

### Resume

`public/assets/Aditya_Pandey_Resume.pdf` — swap in your own PDF with the same name any time.

## Tech

React 18 · TypeScript · Vite 6 · Tailwind CSS 4 · Framer Motion · Three.js · Lenis
