---
title: Introduction
description: A Svelte 5 + shadcn-svelte template for building documentation sites.
group: Getting Started
---

svdocs is a template for building documentation sites with **Svelte 5** and **shadcn-svelte**.

Content lives right here, as Markdown compiled by [svmd](https://github.com/imlargo/svmd), a
Svelte-aware Markdown compiler, not a generic renderer. That means Svelte components, `{expressions}`
and control blocks like `{#if}` work directly inside a page, not just around it.

## Why

The goal is to eventually cover the same ground as
[Starlight](https://starlight.astro.build/), but for the Svelte ecosystem. For now, that means a
simple, iterable UI built on shadcn-svelte.

## Adding a page

Drop a new `.md` file under `src/content/docs/`, with frontmatter for `title`, `description` and
`group`. The sidebar picks it up automatically, with nothing else to register.
