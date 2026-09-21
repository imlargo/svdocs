<script lang="ts">
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import DocsSidebar from '$lib/components/layout/docs/docs-sidebar.svelte';
	import DocsBreadcrumbs from '$lib/components/layout/docs/docs-breadcrumbs.svelte';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();
</script>

<Sidebar.Provider style="height: calc(100svh - var(--header-height));">
	<DocsSidebar />
	<Sidebar.Inset>
		<header class="flex h-12 shrink-0 items-center border-b px-4">
			<DocsBreadcrumbs />
		</header>
		<div class="mx-auto w-full max-w-3xl px-6 py-12">
			{@render children?.()}
		</div>
	</Sidebar.Inset>
</Sidebar.Provider>
