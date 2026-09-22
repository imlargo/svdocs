<script lang="ts">
	import type { Snippet } from 'svelte';
	import { config } from '$lib/config/app';
	import type { SidebarLink } from '$lib/config/sidebar';
	import DocsBreadcrumbs from './docs-breadcrumbs.svelte';
	import DocsPageActions from './docs-page-actions.svelte';
	import DocsPageFooter from './docs-page-footer.svelte';

	let {
		title,
		description,
		raw,
		updated,
		prev,
		next,
		children
	}: {
		title: string;
		description?: string;
		raw: string;
		updated?: string;
		prev?: SidebarLink;
		next?: SidebarLink;
		children: Snippet;
	} = $props();
</script>

<svelte:head>
	<title>{title} - {config.branding.name}</title>
	{#if description}
		<meta name="description" content={description} />
	{/if}
</svelte:head>

<article>
	<DocsBreadcrumbs class="mb-5" />
	<div class="flex flex-wrap items-start justify-between gap-4">
		<div>
			<h1 class="text-3xl font-semibold">{title}</h1>
			{#if description}
				<p class="mt-2 text-lg text-muted-foreground">{description}</p>
			{/if}
		</div>
		<DocsPageActions {raw} />
	</div>
	<div class="prose mt-8 max-w-none dark:prose-invert">
		{@render children()}
	</div>
	<DocsPageFooter {updated} {prev} {next} />
</article>
