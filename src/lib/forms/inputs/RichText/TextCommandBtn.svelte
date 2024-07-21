<script lang="ts">
	import type { Snippet } from 'svelte';
	let {
		active = false,
		class: classes,
		onclick,
		children
	}: {
		class?: string;
		children: Snippet;
		active: boolean | undefined;
		onclick: () => void;
	} = $props();
</script>

<button
	type="button"
	class="border-surface-300-600-token btn btn-icon btn-icon-sm w-8 rounded-none {classes} border-r p-1 text-lg font-bold {active
		? 'variant-filled'
		: ''}"
	{onclick}
>
	{@render children()}
</button>
