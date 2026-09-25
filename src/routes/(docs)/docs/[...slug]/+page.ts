import { error } from '@sveltejs/kit';
import { getCollection, getEntry, getRawSource, type DocsFrontmatter } from '$lib/content/docs';
import { DOCS_PAGES } from '$lib/config/sidebar';

// The sidebar links to every page anyway, but this keeps prerendering from depending on that.
export const entries = () => getCollection('docs').map((entry) => ({ slug: entry.slug }));

export const load = async ({ params }) => {
	const entry = getEntry('docs', params.slug);
	if (!entry) error(404, 'Not found');

	const { title, description, updated } = entry.data as unknown as DocsFrontmatter;
	const { default: Content } = await entry.load();
	const raw = await getRawSource(entry.path);

	const href = entry.slug ? `/docs/${entry.slug}` : '/docs';
	const index = DOCS_PAGES.findIndex((page) => page.href === href);
	const prev = index > 0 ? DOCS_PAGES[index - 1] : undefined;
	const next = index !== -1 && index < DOCS_PAGES.length - 1 ? DOCS_PAGES[index + 1] : undefined;

	return { Content, title, description, raw, updated, prev, next };
};
