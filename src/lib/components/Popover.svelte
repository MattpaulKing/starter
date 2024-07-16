<script lang="ts">
	import type { Snippet } from 'svelte';

	function onfocusout(e: FocusEvent) {
		if (!containerEl?.contains(e.relatedTarget as Node | null)) {
			popoverOpen = false;
		}
	}
	function onkeydown(e: KeyboardEvent) {
		if (e.key === 'Escape' && popoverOpen) {
			popoverOpen = false;
		}
	}

	let {
		popoverOpen = $bindable(false),
		class: classes,
		children
	}: {
		popoverOpen: boolean;
		class?: string;
		children: Snippet;
	} = $props();

	let containerEl: HTMLDivElement | undefined = $state();
</script>

<svelte:window {onfocusout} {onkeydown} />
<div bind:this={containerEl} class="relative p-0! m-0! {classes}">
	{@render children()}
</div>
