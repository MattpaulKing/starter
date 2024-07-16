<script lang="ts">
	import type { Snippet } from 'svelte';

	function handleClick() {
		popoverOpen = !popoverOpen;
		onclick();
	}
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
		onclick = () => null,
		btnContent,
		children
	}: {
		popoverOpen: boolean;
		class: string;
		onclick?: () => void;
		btnContent: Snippet;
		children: Snippet;
	} = $props();

	let containerEl: HTMLButtonElement | undefined = $state();
</script>

<svelte:window {onfocusout} {onkeydown} />
<div class="relative">
	<button onclick={handleClick} bind:this={containerEl} class="relative {classes}">
		{@render btnContent()}
	</button>
	{@render children()}
</div>
