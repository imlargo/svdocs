---
title: Changelog
description: What changed in svdocs, newest first.
group: Resources
updated: 2026-09-25
---

svdocs has no tagged release yet, so everything after `0.0.1` is listed as unreleased. Add a
`## version (date)` heading for each release, newest first.

## Unreleased

- Search over every page, opened with `Ctrl K`, `⌘K` or `/`. Results link to the exact section.
- A table of contents for each page, from Coral's `kit/toc`.
- Previous and next links at the bottom of each page.
- An optional `updated` date in the frontmatter, shown at the bottom of the page.
- "Copy page" and "View as Markdown" on every page.
- Syntax highlighting for code blocks with Shiki, in light and dark.
- Heading ids are written at build time, so a link with a `#section` works before any JavaScript runs.
- Docs are Markdown compiled by svmd. The sidebar, breadcrumbs and page titles come from each page's frontmatter.
- A landing page written in Markdown, at `src/routes/(home)/+page.md`.

## 0.0.1 (2026-09-20)

- Initial scaffold: SvelteKit, Svelte 5 and shadcn-svelte.
- A navbar with a theme toggle and a link to the GitHub repository.
