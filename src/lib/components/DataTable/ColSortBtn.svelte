<script lang="ts" generics="T extends Record<string, unknown>">
	import type { Snippet } from 'svelte';
	import { getColKey, type TableStore } from '.';
	let {
		tableStore,
		asc,
		children
	}: {
		tableStore: TableStore<T>;
		asc: boolean;
		children: Snippet;
	} = $props();
	let key = getColKey() as keyof T;
</script>

<button
	onclick={() => tableStore.sortRows({ by: key, asc })}
	class="btn px-0 h-10 w-full justify-start gap-x-2 rounded-token {tableStore.sort?.by === key &&
	tableStore.sort.asc === asc
		? 'variant-ghost'
		: ''} inline-flex hover:variant-ghost"
>
	<img
		src="/SortAscending.png"
		class="dark:invert {asc ? '' : 'rotate-180'}"
		alt={asc ? 'arrow-up' : 'arrow-down'}
	/>
	{@render children()}
</button>
