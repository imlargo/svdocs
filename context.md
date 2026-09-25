# Context

**svdocs** is a template built with **Svelte 5** and **shadcn-svelte**, meant as a base for building documentation sites.

## Direction

Long-term aspiration: become something similar to [Starlight](https://starlight.astro.build/), but for the Svelte ecosystem.

## Current scope

Built simply and iteratively:

- Content is Markdown, compiled by [svmd](https://github.com/imlargo/svmd) (`@svmd/vite` +
  `@svmd/content`), under `src/content/docs/**/*.md`. A page's frontmatter (`title`,
  `description`, `group`) drives its route, its sidebar entry and its SEO tags, with nothing to
  register by hand. See `src/lib/content/docs.ts` and `src/lib/config/sidebar.ts`.
- Search is built from the same pages. `vite-plugin-search.ts` indexes every section of
  `src/content/docs` into a virtual module that loads when search opens, and `src/lib/search/`
  ranks it. `rehype-heading-ids.ts` writes heading ids at build time, so a result links straight to
  its section.
- No i18n, versioning, etc. yet. That comes later.
- shadcn-svelte (`src/lib/components/ui/`) is always the component base.

## Upcoming

A proprietary component library called **Coral**, with additional utilities on top of shadcn-svelte, will be integrated later. It doesn't exist yet.
