<script lang="ts">
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import DocsSidebar from '$lib/components/layout/docs/docs-sidebar.svelte';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();
</script>

<Sidebar.Provider style="height: calc(100svh - var(--header-height));">
	<DocsSidebar />
	<Sidebar.Inset>
		<div class="mx-auto w-full max-w-3xl px-8 py-12">
			{@render children?.()}
		</div>
	</Sidebar.Inset>
</Sidebar.Provider>
