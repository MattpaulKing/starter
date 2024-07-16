<script lang="ts">
	import type { Snippet } from 'svelte';
	import { slide, type SlideParams, type TransitionConfig } from 'svelte/transition';
	let {
		class: classes,
		label,
		labelClass,
		transition = (node: Element) => slide(node, { duration: 0 }),
		children
	}: {
		class?: string;
		label?: string;
		labelClass?: string;
		transition?: (node: Element, slideParams?: SlideParams | undefined) => TransitionConfig;
		children: Snippet;
	} = $props();
</script>

<div transition:transition class="w-fit {classes} h-fit flex flex-col gap-y-2 card p-4">
	{#if label}
		<span class="{labelClass} whitespace-nowrap">{label}</span>
	{/if}
	<div class="flex flex-col w-full space-y-1">
		{@render children()}
	</div>
</div>
