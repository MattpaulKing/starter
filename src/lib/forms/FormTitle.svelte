<script lang="ts">
	import type { Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();
</script>

<div class="col-span-2 flex w-full justify-between place-items-center">
	<h3 class="h3 font-bold">{@render children()}</h3>
</div>
