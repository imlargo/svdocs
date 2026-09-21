import HomeIcon from '@lucide/svelte/icons/house';
import type { LucideIcon } from '@lucide/svelte';

export enum NavigationGroup {
	Main = 'main'
}

export interface NavigationItem {
	title: string;
	icon: LucideIcon;
	to: string;
	group: NavigationGroup;
}

// ─── Navigation items ─────────────────────────────────────────────────────────
// Add/remove items here. The sidebar and site-header derive from this list.
export const NAVIGATION_ITEMS: NavigationItem[] = [
	{
		title: 'Dashboard',
		icon: HomeIcon,
		to: '/',
		group: NavigationGroup.Main
	}
];

export const NAVIGATION_GROUP_LABELS: Record<NavigationGroup, string> = {
	[NavigationGroup.Main]: 'Main'
};
