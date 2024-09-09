<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		class: classes,
		cardChildren,
		children
	}: { class?: string; cardChildren?: Snippet; children: Snippet } = $props();
</script>

<div class="flex flex-col w-full relative">
	{#if cardChildren}
		{@render cardChildren()}
	{/if}
	<div class="absolute bg-black rounded-md w-full h-full top-3 -right-3"></div>
	<div
		class="card z-10 p-4 flex flex-col w-full {classes} shadow-lg shadow-gray-700 rounded-token border-black border-2"
	>
		{@render children()}
	</div>
</div>
