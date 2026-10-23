# AGENTS.md

Working guide for AI agents (and humans) on this project. These rules are mandatory.

## What this repo is

svdocs: a SvelteKit 3 + Svelte 5 template for documentation sites, built on
[imlargo/svelte-template](https://github.com/imlargo/svelte-template). See [`context.md`](./context.md)
for the product context, scope and direction. It has no backend, no auth and no environment
variables: the docs are Markdown, prerendered at build time.

## Skills

If imlargo's skills are installed ([imlargo/skills](https://github.com/imlargo/skills)), follow
`imlargo`, `imlargo-anti-slop`, `imlargo-workflow`, `imlargo-frontend`, `imlargo-svelte` and
`imlargo-design`. This file is self-contained without them, and wins where it is more specific.

## Workflow

- Before writing code: explore the repo, understand the folder structure, the existing conventions
  and the code related to the task. Follow the pattern of the equivalent area before inventing one.
- Keep changes simple and iterative. Don't build for future scope (i18n, versioning, more Coral)
  until it's explicitly asked for.
- Do not add new dependencies without a clear need; first check whether something existing solves
  the problem.
- Do not carry debt between tasks: leave `pnpm run lint`, `pnpm run check`, `pnpm run test` and
  `pnpm run build` green before calling anything done.

## Structure

```
src/
  content/docs/          The docs, as Markdown. Frontmatter: title, description, group, updated
  hooks.server.ts        handleError
  hooks.client.ts        Client-side handleError
  lib/
    config/              What changes per project: app (branding, links), navigation (navbar)
    core/                logger: the single exit point for logs
    features/docs/       Content collection, sidebar, heading ids, code highlighting, components
      search/            Index (Vite plugin, build time), engine, highlighting, lazy loader
    components/
      ui/                shadcn — do not edit
      coral/             Vendored kit on top of shadcn — do not edit
      layout/            Navbar, docs sidebar, table of contents
    hooks/               Reactive state classes with runes
    utils/               Pure functions (paths)
  routes/
    (home)/              Landing page, written in Markdown (+page.md)
    (docs)/docs/         Every docs page, prerendered
```

The build-time pieces (`features/docs/code-highlighter.ts`, `rehype-heading-ids.ts`,
`search/vite-plugin.ts` and what they import) are loaded by `vite.config.ts` in Node: they import
each other with relative paths and a `.ts` extension, and never touch the DOM.

## UI / Styles

- **Always Tailwind.** Custom CSS only when it is strictly impossible with Tailwind utilities.
- **shadcn first:** shadcn-svelte is always the component base. If an applicable component exists,
  use it as is: don't replace or bypass it.
- `src/lib/components/ui/` (shadcn) is **untouchable**: do not edit, extend or delete files there.
  It is excluded from `prettier`/`eslint` on purpose. Compose variants outside it.
- `src/lib/components/coral/` is a vendored kit on top of shadcn: same rule as `ui/`. It is
  updated by copying in a new version from upstream, never by editing it here.
- **No scale sizes.** Do not use `size="sm"`, `"lg"` or `"xs"`: keep the base size. The exception
  is `size="icon"` and its variants: that is a shape, not a scale.

## Code

- **SvelteKit 3:** import from `#lib/...` with the real path and an explicit extension
  (`#lib/config/app.js`), never `$lib`. Hook types come from `@sveltejs/kit/hooks`.
- **Links to the app's own pages:** the pathnames in `#lib/config/` and the docs sidebar keep their
  leading `/` (they are compared with `page.url.pathname`); for an `href`, pass them through
  `resolvePathname()` (`#lib/utils/paths.ts`), not `resolve()`, which reads a leading `/` as a
  route ID.
- **Zero barrels:** no `index.ts` of our own that re-exports. The `index.ts` files in `ui/` are
  shadcn's convention, and the empty `src/lib/index.ts` comes from `sv create`.
- **Types** live where their domain lives (`features/docs/types.ts`). Never `any`: use `unknown`
  and narrow it.
- **No magic strings:** typed constants for fixed values, keys and routes.
- **Idiomatic over clever:** if SvelteKit already solves it (`load`, `page.url`, prerendering),
  use that. `$effect` is for syncing with something outside Svelte, never for deriving values.
- **Module-level `$state` is forbidden for per-visitor data:** under SSR, modules are singletons
  per process.
- Components are PascalCase (`DocsSidebar.svelte`); other modules are kebab-case. Keep them
  focused: past about 400 lines a file is doing more than one thing.
- Every native `<button>` carries a `type`. No native `confirm()`, `alert()` or `prompt()`.
- No dead code, debug comments or `console.*`: the logger is the only exit for logs. Never
  `import.meta.env` or `$env/*`.

## Errors

- `handleError` only acts on unexpected errors (`kind === 'unknown'`): it logs them with an
  `errorId` and shows a safe, generic message. An `error(404, ...)` already carries its message.
- Docs pages are prerendered, so a broken page fails the build instead of shipping a 500. Keep it
  that way: don't turn prerendering off to get past a failure.

## Before calling something done

```sh
pnpm run lint       # no errors
pnpm run check      # zero errors AND zero warnings
pnpm run test       # green
pnpm run build      # prerenders every docs page
```

Actually run them and read the output. CI runs the same four. `svelte-check` warnings such as
`state_referenced_locally` are reactivity bugs, not noise.

---

## Svelte MCP server

You have access to the full Svelte 5 and SvelteKit documentation. Use it: this project depends on
version details that change, and the model's memory lags behind.

1. **`list-sections`** — use it first to discover the available sections.
2. **`get-documentation`** — retrieves the full content of specific sections. Fetch all the
   relevant ones at once.
3. **`svelte-autofixer`** — analyzes Svelte code and returns issues and suggestions. Always use it
   before delivering Svelte code. Repeat until it returns nothing.
4. **`playground-link`** — generates a Playground link. Only after the user confirms, and never if
   the code was written to project files.
