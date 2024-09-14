<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		hasShadow = true,
		class: classes,
		cardChildren,
		children
	}: { hasShadow?: boolean; class?: string; cardChildren?: Snippet; children: Snippet } = $props();
</script>

<div class="flex flex-col w-full relative">
	{#if cardChildren}
		{@render cardChildren()}
	{/if}
	<div
		class="absolute {!hasShadow
			? 'hidden'
			: 'block'} bg-black rounded-md rounded-br-token w-full h-full top-2 -right-2 md:top-3 md:-right-3"
	></div>
	<div
		class="card z-10 p-4 flex flex-col w-full {classes} shadow-lg shadow-gray-700 rounded-token border-black border-2"
	>
		{@render children()}
	</div>
</div>
