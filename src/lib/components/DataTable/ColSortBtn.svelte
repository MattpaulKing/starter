<script lang="ts" generics="T extends Record<string, unknown>">
	import { getColKey, type TableStore } from '.';
	let {
		tableStore,
		label,
		asc
	}: {
		tableStore: TableStore<T>;
		label: string;
		asc: boolean;
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
	<span>{label}</span>
</button>
