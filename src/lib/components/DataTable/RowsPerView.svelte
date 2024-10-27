<script lang="ts" generics="T extends Record<string, unknown>">
	import type { TableStore } from '.';
	let { tableStore }: { tableStore: TableStore<T> } = $props();
	const options = [5, 10, 20, 50, 100];
	let selectedRowsPerPage = $state(tableStore.state.rowsPerPage);
</script>

<aside class="flex place-items-start">
	<select
		class="select ml-2 h-min w-28"
		bind:value={selectedRowsPerPage}
		onchange={() => tableStore.setRowsPerPage(selectedRowsPerPage)}
	>
		{#each options as option}
			<option value={option}>
				{option} Rows
			</option>
		{/each}
	</select>
</aside>
