<script lang="ts" generics="T extends Record<string, unknown>">
	import { RowCount, RowsPerView, Pagination } from '.';
	import { OptionsMenu } from '../Buttons';
	import type { Snippet } from 'svelte';
	import type { TableStore } from '.';
	import { fade } from 'svelte/transition';
	let {
		tableStore = $bindable(),
		title,
		headers,
		row
	}: { tableStore: TableStore<T>; title?: Snippet; headers: Snippet; row: Snippet<[T]> } = $props();
	let pageRows = $derived(tableStore.getPageRows());
</script>

<div class="flex h-full w-full flex-col">
	<header class="flex {title ? 'justify-between' : 'justify-end'} place-items-center mb-2">
		{#if title}
			{@render title()}
		{/if}
		<OptionsMenu>
			<div class="card space-y-2 p-4 flex flex-col w-fit border border-surface-500-400-token">
				<span class="font-bold">Options</span>
				<hr class="" />
				<ul class="[&>li>*]:text-sm w-full">
					<li class="flex w-full">
						<button class="btn flex w-full hover:variant-ghost">
							<img src="/Download.png" class="dark:invert w-6 h-6" alt="icon" />
							<span>Export</span>
						</button>
					</li>
				</ul>
			</div>
		</OptionsMenu>
	</header>
	<div
		class="border-surface-500-400-token h-fit w-full rounded-token border border-collapse bg-surface-50 py-0.5 dark:bg-surface-800"
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
					{#each pageRows as rowData}
						{#key pageRows}
							<tr in:fade>
								{@render row(rowData)}
							</tr>
						{/key}
					{/each}
				</tbody>
			{:else}
				<tbody
					class="border-surface-500-400-token border [&>tr_td]:border-surface-300-600-token [&>tr_td]:border-b [&>tr_td]:px-4"
				>
					<tr>
						<td colspan="10"><span class="text-lg font-bold">Nothing found... </span></td>
					</tr>
				</tbody>
			{/if}
		</table>
	</div>
	<footer class="flex mt-4 w-full justify-between pb-4">
		<RowsPerView {tableStore} />
		<div class="flex gap-x-2 place-items-center">
			<RowCount {tableStore} />
			<Pagination {tableStore} />
		</div>
	</footer>
</div>
