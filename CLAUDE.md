# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Vite dev server → http://localhost:5173
npm run build      # Production build to dist/
npm run preview    # Preview production build locally
```

No test suite is configured. Verify changes by running `npm run dev` and using Playwright (`node_modules/.bin/playwright`) to screenshot the running app.

## Architecture

Single-page React app. All content is in `src/App.jsx`, which composes sections sequentially. There are no routes.

**Layers:**
- `src/animations/BeeAnimation.jsx` — Fixed full-viewport Three.js Canvas (z-index 15, pointer-events none) that renders 8 cloned `honeybee.glb` instances flying at different z-depths. Loaded once via `useGLTF`, cloned with `SkeletonUtils.clone` from `three-stdlib` so each bee has an independent `AnimationMixer`.
- `src/animations/Scene3D.jsx` — Three.js Canvas used inside specific sections for floating hex particles and dust.
- `src/sections/` — Page sections in render order: Hero → Story → Benefits → HoneyFlow → ProductShowcase → Gallery → Testimonials → FAQ → Contact.
- `src/components/` — Navigation, Footer, and unused legacy components (BeeFloatingEffect, HoneyDivider, HoneycombVisual, Hero, ProductCard, Products, USPGrid, About).
- `src/index.css` — All CSS custom properties (`--honey`, `--earth`, `--cream`, etc.), glassmorphism utilities, bee wing keyframes, marquee, masonry, and floating label form styles.
- `tailwind.config.js` — Extended with honey/earth color tokens, box-shadow aliases, animation names, and a CSS honeycomb `backgroundImage`.

**Animation stack:**
- Framer Motion — scroll-driven transforms (`useScroll` + `useTransform`), `useInView` reveals, spring-based 3D card tilt on hover.
- GSAP (installed, available for use, currently unused — `import gsap from 'gsap'`).
- Lenis (installed, not wired up — must be initialized in `main.jsx` if smooth scroll is needed).

**3D stack:**
- `@react-three/fiber` + `@react-three/drei` + `three` + `three-stdlib`.
- GLB assets must be listed in `vite.config.js` → `assetsInclude: ['**/*.glb', '**/*.gltf']` or they fail to import.
- Only `src/assests/bees/honeybee/source/honeybee.glb` is web-ready. The other bee archives (`bee.zip`, `worker-honey-bee.zip`, `bee (1).zip`) contain Blender/FBX source files.

**Styling:** Tailwind utility classes + custom CSS classes defined in `index.css`. The `luxury-heading` class applies Playfair Display; `luxury-serif` applies Cormorant Garamond. Both fonts must be loaded via a `<link>` in `index.html`.

## Key constraints

- The `BeeAnimation` Canvas uses `alpha: true` and is `pointer-events: none` — it sits above all HTML but never blocks clicks.
- Bee flight paths are deterministic from a seed so they are stable across re-renders. `BEE_SCALE`, `Z_LAYERS`, and `BEE_COUNT` at the top of `BeeAnimation.jsx` are the primary tuning knobs.
- Section IDs (`#home`, `#story`, `#benefits`, `#products`, `#gallery`, `#contact`) are referenced by both nav links and CTA buttons — keep them in sync.
- The `assests` folder name is intentionally misspelled (matches existing import paths — do not rename).
