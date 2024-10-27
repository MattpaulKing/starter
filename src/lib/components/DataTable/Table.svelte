<script lang="ts" generics="T extends Record<string, unknown>">
	import RowCount from './RowCount.svelte';
	import RowsPerView from './RowsPerView.svelte';
	import Pagination from './Pagination.svelte';
	import type { Snippet } from 'svelte';
	import type { TableStore } from '.';
	import { fade, fly } from 'svelte/transition';
	let {
		tableStore = $bindable(),
		headers,
		row
	}: { tableStore: TableStore<T>; headers: Snippet; row: Snippet<[T]> } = $props();
</script>

<div class="flex h-full w-full flex-col space-y-4">
	<div
		class="border-surface-500-400-token h-fit w-full rounded-lg border bg-surface-50 py-0.5 dark:bg-surface-800"
	>
		<table class="table-compact w-full overflow-auto p-0.5 [&>tbody_td]:whitespace-normal">
			<thead
				class="border-collapse [&>tr]:border-surface-500-400-token [&>tr_td]:border-surface-500-400-token [&>tr]:relative [&>tr]:border-b [&>tr_td]:border-x [&>tr_td]:first:border-l-0 [&>tr_td]:last:border-l-0"
			>
				<tr>
					{@render headers()}
				</tr>
			</thead>
			{#if tableStore.rows?.length > 0}
				<tbody
					class="[&>tr:last-child]:border-0! border-surface-500-400-token [&>tr_td]:border-surface-300-600-token [&>tr_td]:border-b [&>tr_td]:px-4"
				>
					{#each tableStore.getPageRows() as rowData}
						<tr>
							{@render row(rowData)}
						</tr>
					{/each}
				</tbody>
			{:else}
				<tbody
					class=" border-surface-500-400-token border [&>tr_td]:border-surface-300-600-token [&>tr_td]:border-b [&>tr_td]:px-4"
				>
					<tr>
						<td colspan="10"><span class="text-lg font-bold">Nothing found... </span></td>
					</tr>
				</tbody>
			{/if}
		</table>
	</div>
	<footer class="flex w-full place-items-baseline justify-between pb-4">
		<RowCount {tableStore} />
		<div class="flex w-fit space-x-4">
			<RowsPerView {tableStore} />
			<Pagination {tableStore} />
		</div>
	</footer>
</div>
