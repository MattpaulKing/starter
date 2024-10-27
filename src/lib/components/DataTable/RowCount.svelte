<script lang="ts" generics="T extends Record<string, unknown>">
	import type { TableStore } from '.';
	let { tableStore }: { tableStore: TableStore<T> } = $props();
	let start = $derived(tableStore.state.pageNumber * tableStore.state.rowsPerPage);
	let end = $derived(
		tableStore.state.pageNumber * tableStore.state.rowsPerPage + tableStore.state.rowsPerPage
	);
</script>

<aside class="mr-6 whitespace-nowrap leading-8">
	{#if tableStore.count > 0}
		<b>{start}</b>
		-
		<b>{end}</b>
		/ <b>{tableStore.count}</b>
	{:else}
		No entries found
	{/if}
</aside>
