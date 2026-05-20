# WillAdamsDotDev — Agent Guide

## Quick start
```sh
pnpm install           # install deps
pnpm run dev           # dev server at http://localhost:4321 (--host)
pnpm run build         # static build to dist/
pnpm run preview       # serve built dist/
```

## Architecture
- **Astro 5** file-based routing. Pages under `src/pages/`, articles as content collections in `src/content/articles/`.
- **Two layouts**: `src/layouts/Layout.astro` (master shell with Header/Navbar/Footer, OG meta, Tailwind + daisyUI `forest` theme). `MarkdownLayout.astro` wraps Layout for article pages — adds hero image, `<picture>` with AVIF srcset, blur-up placeholder, and `<slot />` for article body.
- **Content collections**: single `articles` collection, Zod-validated via `src/schemas/articleSchema.ts`. Drafts hidden in production (`data.draft !== true`).
- `/uses` page is an exception — imports raw markdown directly (`src/md/uses.md`), not a collection entry.
- **All images** hosted on Cloudinary (`bushblade` cloud). No local images except `public/favicon.svg`. Images use AVIF format, responsive `<picture>` srcset, and a blur-up + predominant-color placeholder technique.
- **Zero client-side framework**. No React/Solid/Vue. Interactivity is vanilla `<script>` tags for image fade-in (`transitionImage` in `src/utils/domUtils.ts`).
- **Pre-fetching**: internal links use `data-astro-prefetch` for instant nav.

## Path aliases (TypeScript)
```
@components/* → src/components/*
@layouts/*    → src/layouts/*
@styles/*     → src/styles/*
@utils/*      → src/utils/*
@icons/*      → src/icons/*
```

## Styling
- **Tailwind CSS v4** — uses `@import "tailwindcss"` directives (NOT the old `@tailwind` directives).
- **daisyUI 5** with `forest` (dark) theme as default.
- **`@tailwindcss/typography`** plugin — used on content pages via `prose` classes.
- Markdown-specific overrides in `src/styles/mdstyles.css` (heading anchors, blockquotes, code blocks, image centering).

## Cloudinary
- Configured in `src/utils/cloudinary.ts`. Cloud name: `bushblade`.
- Credentials in `.env` (not committed — `.env` is gitignored).
- Functions: `getCloudinaryUrl(publicId, options?)` and `getPredominantColor(publicId)` (Admin API, for placeholder backgrounds).

## Linting & formatting
```sh
pnpm exec astro check   # type-check Astro files
pnpm exec eslint src/   # lint (astro-eslint, JSX a11y rules)
pnpm exec prettier src/ --check
```
Astro-specific: `.astro` files use the `astro` Prettier parser via `prettier-plugin-astro`.

## Config reference
| File | Purpose |
|---|---|
| `astro.config.mjs` | Astro config, rehype plugins (slugs, autolink headings, external links in new tabs), Shiki Dracula theme |
| `tsconfig.json` | Extends `astro/tsconfigs/strict`, path aliases |
| `.prettierrc.cjs` | No semis, single quotes, trailing commas (es5), printWidth 80, Prettier plugin for Astro |
| `eslint.config.js` | `eslint-plugin-astro` recommended rules, `eslint-plugin-jsx-a11y` |
| `package.json` | ESM (`"type": "module"`) |

## Key conventions
- No semicolons in JS/TS (Prettier enforced).
- Single quotes everywhere (including JSX).
- Tailwind classes used heavily in templates.
- Dates formatted via `Intl.DateTimeFormat` (en-GB) + custom ordinal suffix — no date library.
- Articles sorted by `pubDate` descending.
- Image `transitionImage()` helper is imported via inline `<script>` in Astro components; component-level scripts are rare.
