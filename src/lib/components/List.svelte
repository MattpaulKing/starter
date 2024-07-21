<script lang="ts">
	import type { Snippet } from 'svelte';
	import { slide, type SlideParams, type TransitionConfig } from 'svelte/transition';
	let {
		navList,
		class: classes,
		label,
		transition = (node: Element) => slide(node, { duration: 0 }),
		children
	}: {
		navList: boolean;
		class?: string;
		label?: Snippet;
		transition?: (node: Element, slideParams?: SlideParams | undefined) => TransitionConfig;
		children: Snippet;
	} = $props();
</script>

<div transition:transition class="w-fit {classes} h-fit flex flex-col gap-y-2 card p-4">
	{#if label}
		{@render label()}
	{/if}
	<div class="flex flex-col w-full space-y-1">
		{#if navList}
			<nav class="list-nav">
				<ul>
					{@render children()}
				</ul>
			</nav>
		{:else}
			<ul class="list">
				{@render children()}
			</ul>
		{/if}
	</div>
</div>
