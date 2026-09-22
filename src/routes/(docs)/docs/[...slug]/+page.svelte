<script lang="ts">
	import DocsProse from '$lib/components/layout/docs/docs-prose.svelte';

	let { data } = $props();
	// The component is data, so it has to be a `$derived` local before it can be used as a tag.
	const Content = $derived(data.Content);
</script>

<DocsProse title={data.title} description={data.description} raw={data.raw}>
	<Content />
</DocsProse>
