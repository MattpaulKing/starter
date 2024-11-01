<script lang="ts" generics="T extends Record<string, unknown>">
	import type { TableStore } from '.';
	let { tableStore }: { tableStore: TableStore<T> } = $props();

	let prevDisabled = $derived(tableStore.state.pageNumber + 1 === tableStore.pages[0]);
	let nextDisabled = $derived(
		tableStore.state.pageNumber + 1 === tableStore.pages[tableStore.pages.length - 1]
	);
</script>

<!-- Desktop buttons -->
<div
	class="variant-ghost-surface btn-group [&>button]:btn-sm hidden h-10 w-fit lg:flex [&>*+*]:border-surface-500"
>
	<button
		type="button"
		class="px-0! hover:variant-soft-surface"
		disabled={prevDisabled}
		onclick={() => tableStore.setPage('previous')}
	>
		<img src="/ArrowRight.png" class="min-w-5 rotate-180 dark:invert" alt="previous" />
	</button>
	{#if tableStore.pages?.length > 1}
		{#key tableStore.pages}
			{#each tableStore.pages as page, i (i)}
				<button
					type="button"
					class="h-full hover:variant-soft-surface {page !== null &&
					tableStore.state.pageNumber === page - 1
						? 'variant-soft'
						: ''}"
					onclick={() => tableStore.setPage(page ? page - 1 : null)}
				>
					{page ?? '...'}
				</button>
			{/each}
		{/key}
	{/if}
	<button
		disabled={nextDisabled}
		type="button"
		class="px-0! hover:variant-soft-surface"
		onclick={() => tableStore.setPage('next')}
	>
		<img src="/ArrowRight.png" class="min-w-5 dark:invert" alt="next" />
	</button>
</div>

<!-- Mobile buttons -->
<section class="flex lg:hidden">
	<button
		type="button"
		class="variant-ghost-surface btn mb-2 mr-2 hover:variant-soft-surface"
		disabled={prevDisabled}
		onclick={() => tableStore.setPage('previous')}
	>
		←
	</button>
	<button
		type="button"
		class="variant-ghost-surface btn mb-2 hover:variant-soft-surface"
		disabled={nextDisabled}
		onclick={() => tableStore.setPage('next')}
	>
		→
	</button>
</section>
