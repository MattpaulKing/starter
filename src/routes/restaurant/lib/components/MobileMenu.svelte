<script lang="ts">
	import type { Snippet } from 'svelte';
	let {
		children,
		mobileMenuOpen = $bindable(false)
	}: { children: Snippet; mobileMenuOpen: boolean } = $props();

	function handleClickOutside(e: FocusEvent) {
		if (
			!e.relatedTarget ||
			(e.relatedTarget instanceof HTMLElement && !menuEl.contains(e.relatedTarget))
		) {
			mobileMenuOpen = false;
		}
	}
	let menuEl: HTMLDivElement;
</script>

<div onfocusout={handleClickOutside} bind:this={menuEl} class="relative left-0 block md:hidden">
	<button onclick={() => (mobileMenuOpen = !mobileMenuOpen)} class="btn">
		<svg class="fill-primary-400" viewBox="0 0 100 80" width="40" height="40">
			<rect width="100" height="20"></rect>
			<rect y="30" width="100" height="20"></rect>
			<rect y="60" width="100" height="20"></rect>
		</svg>
	</button>
	{#if mobileMenuOpen}
		<nav class="absolute right-0 list-nav rounded-lg flex flex-col bg-secondary-700 p-4">
			{@render children()}
		</nav>
	{/if}
</div>
