<script lang="ts">
	import type { Snippet } from 'svelte';
	import { config } from '$lib/config/app';

	let { title, description, children }: { title: string; description?: string; children: Snippet } =
		$props();
</script>

<svelte:head>
	<title>{title} - {config.branding.name}</title>
	{#if description}
		<meta name="description" content={description} />
	{/if}
</svelte:head>

<article>
	<h1 class="text-3xl font-semibold">{title}</h1>
	{#if description}
		<p class="mt-2 text-lg text-muted-foreground">{description}</p>
	{/if}
	<div class="prose mt-8 max-w-none dark:prose-invert">
		{@render children()}
	</div>
</article>
