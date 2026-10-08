import { enhancedImages } from '@sveltejs/enhanced-img';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vitest/config';
import { playwright } from '@vitest/browser-playwright';
import adapter from '@sveltejs/adapter-cloudflare';
import { sveltekit } from '@sveltejs/kit/vite';
import { svmd } from '@svmd/vite';
import { highlightCode } from './svmd-highlight.ts';
import { rehypeHeadingIds } from './rehype-heading-ids.ts';
import { searchIndex } from './vite-plugin-search.ts';

export default defineConfig({
	plugins: [
		enhancedImages(),
		tailwindcss(),
		// svmd goes before the SvelteKit plugin: it hands vite-plugin-svelte already-compiled Svelte, not
		// markdown.
		svmd({
			include: ['src/content/docs/**/*.md', 'src/routes/**/+page.md'],
			highlight: highlightCode,
			rehypePlugins: [rehypeHeadingIds]
		}),
		searchIndex(),
		sveltekit({
			// Lets a `+page.md` be a route on its own, with no `+page.svelte` importing it — see
			// src/routes/(home)/+page.md.
			extensions: ['.svelte', '.md'],
			compilerOptions: {
				// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes('node_modules') ? undefined : true
			},
			// Under Vitest the Cloudflare adapter starts a Workers runtime that keeps the process from
			// exiting, and tests never build anyway.
			adapter: process.env.VITEST ? undefined : adapter(),
			prerender: {
				handleHttpError: ({ path, message }) => {
					// The navbar already links to /showcase and /blog ahead of those pages existing.
					// Expected for now — everything else should still fail the build.
					if (path === '/showcase' || path === '/blog') return;
					throw new Error(message);
				}
			}
		})
	],
	test: {
		expect: { requireAssertions: true },
		projects: [
			{
				extends: './vite.config.ts',
				test: {
					name: 'client',
					browser: {
						enabled: true,
						provider: playwright(),
						instances: [{ browser: 'chromium', headless: true }]
					},
					include: ['src/**/*.svelte.{test,spec}.{js,ts}'],
					exclude: ['src/lib/server/**']
				}
			},

			{
				extends: './vite.config.ts',
				test: {
					name: 'server',
					environment: 'node',
					include: ['src/**/*.{test,spec}.{js,ts}'],
					exclude: ['src/**/*.svelte.{test,spec}.{js,ts}']
				}
			}
		]
	}
});
