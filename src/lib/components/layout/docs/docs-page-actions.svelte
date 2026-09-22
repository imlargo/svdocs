<script lang="ts">
	import CopyIcon from '@lucide/svelte/icons/copy';
	import CheckIcon from '@lucide/svelte/icons/check';
	import FileTextIcon from '@lucide/svelte/icons/file-text';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as ButtonGroup from '$lib/components/ui/button-group/index.js';

	let { raw }: { raw: string } = $props();

	let copied = $state(false);
	let copiedTimeout: ReturnType<typeof setTimeout>;

	async function copyMarkdown() {
		await navigator.clipboard.writeText(raw);
		copied = true;
		clearTimeout(copiedTimeout);
		copiedTimeout = setTimeout(() => (copied = false), 2000);
	}

	function viewAsMarkdown() {
		const url = URL.createObjectURL(new Blob([raw], { type: 'text/markdown' }));
		window.open(url, '_blank');
	}
</script>

<ButtonGroup.Root>
	<Button variant="outline" onclick={copyMarkdown}>
		{#if copied}
			<CheckIcon />
			Copied
		{:else}
			<CopyIcon />
			Copy page
		{/if}
	</Button>
	<Button variant="outline" onclick={viewAsMarkdown}>
		<FileTextIcon />
		View as Markdown
	</Button>
</ButtonGroup.Root>
