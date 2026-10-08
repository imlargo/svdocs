# Agent rules

See `context.md` for project context.

- Everything in English: code, comments, docs, commit messages.
- Always use shadcn-svelte as the component base. Don't replace or bypass it.
- Keep changes simple and iterative. Don't build for future scope (Coral, content/docs features, etc.) until it's explicitly asked for.
- `src/lib/components/ui/` (shadcn) and `src/lib/components/coral/` (vendored Coral) are untouchable: no edits, they are excluded from prettier/eslint. Coral is updated by copying in a new version from upstream.
- SvelteKit 3: import from `#lib/...` with an explicit extension (`#lib/config/app.js`), never `$lib`. Hook types come from `@sveltejs/kit/hooks`.
- Links to the app's own pages: the pathnames in `#lib/config/` keep their leading `/` (they are compared with `page.url.pathname`); for an `href`, pass them through `resolvePathname()` (`#lib/utils/paths.ts`), not `resolve()`, which reads a leading `/` as a route ID.
- Before calling something done: `pnpm lint`, `pnpm check` (zero errors and warnings), `pnpm test`, `pnpm build`.
