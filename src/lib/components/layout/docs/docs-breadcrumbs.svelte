<script lang="ts">
	import { page } from '$app/state';
	import { resolve } from '$app/paths';
	import type { Pathname } from '$app/types';
	import * as Breadcrumb from '$lib/components/ui/breadcrumb/index.js';

	function titleCase(segment: string): string {
		return segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');
	}

	let segments = $derived(
		page.url.pathname
			.split('/')
			.filter(Boolean)
			.map((segment, i, all) => ({
				title: titleCase(segment),
				href: '/' + all.slice(0, i + 1).join('/')
			}))
	);
</script>

<Breadcrumb.Root>
	<Breadcrumb.List>
		{#each segments as segment, i (segment.href)}
			<Breadcrumb.Item>
				{#if i === segments.length - 1}
					<Breadcrumb.Page>{segment.title}</Breadcrumb.Page>
				{:else}
					<Breadcrumb.Link href={resolve(segment.href as Pathname)}>{segment.title}</Breadcrumb.Link
					>
				{/if}
			</Breadcrumb.Item>
			{#if i < segments.length - 1}
				<Breadcrumb.Separator />
			{/if}
		{/each}
	</Breadcrumb.List>
</Breadcrumb.Root>
