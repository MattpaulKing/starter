<script lang="ts">
	import type { Snippet } from 'svelte';

	let { class: classes, children }: { class?: string; children: Snippet } = $props();
</script>

<div class="relative z-10">
	<button class="btn {classes} border border-black z-10 shadow-md shadow-gray-700">
		{@render children()}
	</button>
	<div
		class="absolute top-1 md:top-1.5 -z-20 -right-1 md:-right-1.5 rounded-token bg-black w-full h-full"
	></div>
</div>
