<script lang="ts" generics="T extends Record<string, unknown>">
	import { clickOutside } from '$lib/actions';
	import { fade } from 'svelte/transition';
	import { setColKey, type TableStore } from '.';
	import type { Snippet } from 'svelte';
	let {
		tableStore,
		label,
		key,
		children
	}: {
		tableStore: TableStore<T>;
		label: string;
		key: keyof T & string;
		children: Snippet;
	} = $props();
	function handleDropdown() {
		dropdownOpen = true;
	}
	function resetFilters() {
		tableStore.resetCol(key);
	}
	let dropdownOpen = $state(false);
	setColKey(key);
</script>

<div
	class="flex h-full place-items-center"
	use:clickOutside={() => {
		dropdownOpen = false;
	}}
>
	<span class="mr-4">{label}</span>
	<button
		onclick={handleDropdown}
		class="{tableStore.filters || tableStore.sort?.by === key
			? 'variant-outline-warning'
			: 'variant-ghost'} btn btn-icon h-6 w-6 rounded-token"
		><img src="/CaretLeft.png" class="-rotate-90 dark:invert" alt="open" /></button
	>
	<div class="absolute z-50 h-0 w-0">
		{#if dropdownOpen}
			<div transition:fade class="card absolute left-1/2 top-4 z-30 w-fit min-w-72 flex-col p-4">
				<div class="flex justify-between mb-4 place-items-center">
					<span class="font-bold text-xl">{label}</span>
					<button onclick={resetFilters} class="btn btn-sm variant-ghost hover:variant-filled-error"
						>Clear</button
					>
				</div>
				{@render children()}
			</div>
		{/if}
	</div>
</div>
