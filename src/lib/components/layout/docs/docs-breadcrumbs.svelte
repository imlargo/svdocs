<script lang="ts">
	import { page } from '$app/state';
	import { resolve } from '$app/paths';
	import type { Pathname } from '$app/types';
	import * as Breadcrumb from '$lib/components/ui/breadcrumb/index.js';
	import { DOCS_SIDEBAR_GROUPS } from '$lib/config/sidebar';
	import SlashIcon from '@lucide/svelte/icons/slash';

	let { class: className }: { class?: string } = $props();

	// Section + page title for the current route, straight out of the sidebar structure, so the
	// breadcrumb always matches the page's real title instead of a guess derived from its URL.
	let trail = $derived.by(() => {
		for (const group of DOCS_SIDEBAR_GROUPS) {
			const item = group.items.find((item) => resolve(item.href as Pathname) === page.url.pathname);
			if (item) return { group: group.title, page: item.title };
		}
		return null;
	});
</script>

{#if trail}
	<Breadcrumb.Root class={className}>
		<Breadcrumb.List>
			<Breadcrumb.Item>
				<span class="text-muted-foreground">{trail.group}</span>
			</Breadcrumb.Item>
			<Breadcrumb.Separator>
				<SlashIcon />
			</Breadcrumb.Separator>
			<Breadcrumb.Item>
				<Breadcrumb.Page>{trail.page}</Breadcrumb.Page>
			</Breadcrumb.Item>
		</Breadcrumb.List>
	</Breadcrumb.Root>
{/if}
