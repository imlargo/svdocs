import { createContent } from '@svmd/content';

/**
 * Not validated by a schema — this is the project's own content, not user input — so the routes
 * that read it cast to this instead of adding a validator dependency for three strings.
 */
export interface DocsFrontmatter {
	title: string;
	description?: string;
	/** Sidebar section this page is listed under. */
	group: string;
	/** ISO date (e.g. `2026-09-20`). Shown at the bottom of the page when set. */
	updated?: string;
}

export const { getEntry, getCollection } = createContent({
	docs: {
		meta: import.meta.glob('/src/content/docs/**/*.md', { eager: true, import: 'metadata' }),
		body: import.meta.glob('/src/content/docs/**/*.md')
	}
});

// Raw, unparsed file contents, keyed the same way as the glob above (`entry.path`). Backs the
// "Copy page" / "View as Markdown" actions, which want the source, not the rendered page. Lazy like
// the page bodies: eager would put every page's source in the bundle of every page.
const rawSources = import.meta.glob('/src/content/docs/**/*.md', {
	query: '?raw',
	import: 'default'
}) as Record<string, () => Promise<string>>;

export async function getRawSource(path: string): Promise<string> {
	return (await rawSources[path]?.()) ?? '';
}
