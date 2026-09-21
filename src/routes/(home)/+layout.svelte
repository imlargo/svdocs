<script lang="ts">
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();
</script>

<div class="px-8 py-12">
	{@render children?.()}
</div>
