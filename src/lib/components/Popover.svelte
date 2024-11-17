<script lang="ts">
	import { clickOutside } from '$lib/actions';
	import type { Snippet } from 'svelte';

	let {
		onClickOutside,
		class: classes,
		children
	}: {
		onClickOutside: () => void;
		class?: string;
		children: Snippet;
	} = $props();
</script>

<div use:clickOutside={onClickOutside} class="relative p-0! m-0! overflow-visible {classes}">
	{@render children()}
</div>
