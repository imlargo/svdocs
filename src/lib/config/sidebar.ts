import { getCollection, type DocsFrontmatter } from '$lib/content/docs';

export interface SidebarLink {
	title: string;
	href: string;
}

export interface SidebarGroup {
	title: string;
	items: SidebarLink[];
}

// Derived from `src/content/docs/**/*.md` — add a page there with a `group` in its frontmatter
// and it shows up here, no separate place to register it. Order follows the collection's own
// (file path) order, so `index.md` sorts before `installation.md` without needing a manual sort.
const entries = getCollection('docs').map((entry) => {
	const data = entry.data as unknown as DocsFrontmatter;
	return {
		title: data.title,
		group: data.group,
		href: entry.slug ? `/docs/${entry.slug}` : '/docs'
	};
});

const groupTitles = [...new Set(entries.map((entry) => entry.group))];

export const DOCS_SIDEBAR_GROUPS: SidebarGroup[] = groupTitles.map((title) => ({
	title,
	items: entries.filter((entry) => entry.group === title)
}));
