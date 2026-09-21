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
}

export const { getEntry, getCollection } = createContent({
	docs: {
		meta: import.meta.glob('/src/content/docs/**/*.md', { eager: true, import: 'metadata' }),
		body: import.meta.glob('/src/content/docs/**/*.md')
	}
});
