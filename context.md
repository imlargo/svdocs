# Context

**svdocs** is a template built with **Svelte 5** and **shadcn-svelte**, meant as a base for building documentation sites.

## Direction

Long-term aspiration: become something similar to [Starlight](https://starlight.astro.build/), but for the Svelte ecosystem.

## Current scope

Built simply and iteratively:

- Content is Markdown, compiled by [svmd](https://github.com/imlargo/svmd) (`@svmd/vite` +
  `@svmd/content`), under `src/content/docs/**/*.md`. A page's frontmatter (`title`,
  `description`, `group`) drives its route, its sidebar entry and its SEO tags, with nothing to
  register by hand. See `src/lib/features/docs/content.ts` and `src/lib/features/docs/sidebar.ts`.
- Search is built from the same pages. `src/lib/features/docs/search/vite-plugin.ts` indexes every section of
  `src/content/docs` into a virtual module that loads when search opens, and the rest of
  `src/lib/features/docs/search/` ranks it. `rehype-heading-ids.ts` writes heading ids at build time, so a result links straight to
  its section.
- No i18n, versioning, etc. yet. That comes later.
- shadcn-svelte (`src/lib/components/ui/`) is always the component base.

## Upcoming

A proprietary component library called **Coral**, with additional utilities on top of shadcn-svelte, will be integrated later. It doesn't exist yet.
