---
title: Installation
description: Get the template running locally.
group: Getting Started
updated: 2026-09-25
---

## Requirements

- Node 20 or newer
- pnpm

## Clone and install

```bash
git clone https://github.com/imlargo/svdocs
cd svdocs
pnpm install
```

## Development

```bash
pnpm dev
```

Starts the Vite dev server at `http://localhost:5173`. shadcn-svelte components live under
`src/lib/components/ui/`, and can be added with the shadcn-svelte CLI as usual.

## Build

```bash
pnpm build
pnpm preview
```

Builds the site, with the docs pages prerendered, and serves the result locally. The template
ships with `adapter-auto`, which detects common hosts. Switch to a specific adapter if yours is not
one of them.
