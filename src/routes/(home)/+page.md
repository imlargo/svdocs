<script lang="ts">
	import { resolve } from '$app/paths';
	import { config } from '$lib/config/app';
	import { Button } from '$lib/components/ui/button/index.js';
</script>

<svelte:head>
<title>{config.branding.seo.title}</title>
<meta name="description" content={config.branding.seo.description} />
</svelte:head>

# {config.branding.name}

{config.branding.seo.description}

<div class="flex gap-3">
<Button href={resolve('/docs')}>Get started</Button>
<Button href={config.links.github || undefined} target="_blank" rel="noreferrer" variant="outline">GitHub</Button>
</div>
