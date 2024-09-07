<script lang="ts">
	import type { Snippet } from 'svelte';

	let { title, children, img }: { title?: Snippet; children?: Snippet; img: Snippet } = $props();
</script>

<div class="grid lg:grid-cols-[1fr_600px] w-full px-2 lg:px-24 gap-x-12">
	{#if title}
		{@render title()}
	{/if}
	<div class="flex flex-col">
		{#if children}
			{@render children()}
		{/if}
	</div>
	{@render img()}
</div>
