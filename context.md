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
- No search, i18n, versioning, etc. yet. That comes later.
- shadcn-svelte (`src/lib/components/ui/`) is always the component base.

## Upcoming

A proprietary component library called **Coral**, with additional utilities on top of shadcn-svelte, will be integrated later. It doesn't exist yet.
