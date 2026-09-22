import { error } from '@sveltejs/kit';
import { getCollection, getEntry, getRawSource, type DocsFrontmatter } from '$lib/content/docs';

// The sidebar links to every page anyway, but this keeps prerendering from depending on that.
export const entries = () => getCollection('docs').map((entry) => ({ slug: entry.slug }));

export const load = async ({ params }) => {
	const entry = getEntry('docs', params.slug);
	if (!entry) error(404, 'Not found');

	const { title, description } = entry.data as unknown as DocsFrontmatter;
	const { default: Content } = await entry.load();
	const raw = getRawSource(entry.path);

	return { Content, title, description, raw };
};
