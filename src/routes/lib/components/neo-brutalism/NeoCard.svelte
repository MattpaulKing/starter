<script lang="ts">
	import type { Snippet } from 'svelte';

	let { class: classes, children }: { class?: string; children: Snippet } = $props();
</script>

<div class="flex flex-col w-full relative">
	<div class="absolute bg-black rounded-token w-full h-full top-3 -right-3"></div>
	<div
		class="card z-10 p-4 flex flex-col w-full {classes} shadow-lg shadow-gray-700 rounded-token border-black border-2"
	>
		{@render children()}
	</div>
</div>
