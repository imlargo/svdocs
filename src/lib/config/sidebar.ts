export interface SidebarLink {
	title: string;
	href: string;
}

export interface SidebarGroup {
	title: string;
	items: SidebarLink[];
}

// Add/remove groups here — the docs sidebar derives from this list.
export const DOCS_SIDEBAR_GROUPS: SidebarGroup[] = [
	{
		title: 'Getting Started',
		items: [
			{ title: 'Introduction', href: '/docs' },
			{ title: 'Installation', href: '/docs/installation' }
		]
	}
];
