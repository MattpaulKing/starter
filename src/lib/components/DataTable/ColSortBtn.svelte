<script lang="ts">
	import { getContext } from 'svelte';
	import type { TableStore } from '.';
	let {
		tableStore,
		label,
		asc
	}: {
		tableStore: TableStore<Record<string, unknown>>;
		label: string;
		asc: boolean;
	} = $props();
	let key = getContext('key') as string;
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
	<span>{label}</span>
</button>
