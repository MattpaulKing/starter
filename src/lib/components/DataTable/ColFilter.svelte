<script lang="ts">
	import { clickOutside } from '$lib/actions';
	import { fade } from 'svelte/transition';
	import { setContext, type Snippet } from 'svelte';
	import type { TableStore } from '.';
	let {
		tableStore,
		label,
		key,
		children
	}: {
		tableStore: TableStore<Record<string, unknown>>;
		label: string;
		key: string;
		children: Snippet;
	} = $props();
	function handleDropdown() {
		dropdownOpen = true;
	}
	let buttonEl: HTMLButtonElement;
	let dropdownEl: HTMLDivElement | null = $state(null);
	let dropdownOpen = $state(false);
	setContext('key', key);
</script>

<div
	class="flex h-full place-items-center"
	use:clickOutside={() => {
		dropdownOpen = false;
	}}
>
	<span class="mr-4">{label}</span>
	<button
		bind:this={buttonEl}
		onclick={handleDropdown}
		class="{tableStore.filters || tableStore.sort?.by === key
			? 'variant-outline-warning'
			: 'variant-ghost'} btn btn-icon h-6 w-6 rounded-token"
		><img src="/CaretLeft.png" class="-rotate-90 dark:invert" alt="open" /></button
	>
	<div class="absolute z-50 h-0 w-0">
		{#if dropdownOpen}
			<div
				transition:fade
				bind:this={dropdownEl}
				class="card absolute left-1/2 top-4 z-30 w-fit min-w-72 flex-col p-4"
			>
				<div class="flex justify-between mb-4 place-items-center">
					<span class="font-bold text-xl">{label}</span>
					<button onclick={() => tableStore.resetCol(key)} class="btn btn-sm variant-filled-error"
						>Clear</button
					>
				</div>
				{@render children()}
			</div>
		{/if}
	</div>
</div>
