<script lang="ts">
	import { Popover } from '..';
	import type { Snippet } from 'svelte';
	let {
		btnContainer = $bindable(),
		btnImg,
		children
	}: { btnContainer?: HTMLDivElement; btnImg?: Snippet; children: Snippet } = $props();
	let menuOpen = $state(false);
</script>

<div class="flex relative justify-end gap-x-2" bind:this={btnContainer}>
	<Popover class="h-9" onClickOutside={() => (menuOpen = false)}>
		<button
			onclick={() => (menuOpen = !menuOpen)}
			class="btn-icon aspect-square btn-icon-sm h-full flex place-items-center variant-ghost rounded-token"
		>
			{#if btnImg}
				{@render btnImg()}
			{:else}
				<span class="font-bold mb-1">...</span>
			{/if}
		</button>
		{#if menuOpen}
			<div class="absolute right-0 z-10">
				{@render children()}
			</div>
		{/if}
	</Popover>
</div>
