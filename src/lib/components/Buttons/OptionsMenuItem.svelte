<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { MouseEventHandler } from 'svelte/elements';

	let { children, onclick }: { children: Snippet; onclick?: MouseEventHandler<EventTarget> } =
		$props();
</script>

<li class="w-full">
	<button {onclick} class="btn btn-sm w-full flex justify-start hover:variant-ghost">
		{@render children()}
	</button>
</li>
