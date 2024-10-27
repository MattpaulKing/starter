<script lang="ts" generics="T extends Record<string, unknown>">
	import type { TableStore } from '.';
	let { tableStore }: { tableStore: TableStore<T> } = $props();
</script>

<!-- Desktop buttons -->
<div class="variant-ghost-surface btn-group hidden h-10 w-fit lg:flex [&>*+*]:border-surface-500">
	<button
		type="button"
		class="px-0! hover:variant-soft-surface"
		disabled={tableStore.state.pageNumber === 0}
		onclick={() => tableStore.setPage('previous')}
	>
		<img src="/ArrowRight.png" class="min-w-5 rotate-180 dark:invert" alt="previous" />
	</button>
	{#if tableStore.pages?.length > 1}
		{#each tableStore.pages as page}
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
	{/if}
	<button
		disabled={tableStore.state.pageNumber === tableStore.pages.length - 1}
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
		disabled={tableStore.state.pageNumber === 0}
		onclick={() => tableStore.setPage('previous')}
	>
		←
	</button>
	<button
		type="button"
		class="variant-ghost-surface btn mb-2 hover:variant-soft-surface"
		disabled={tableStore.state.pageNumber === tableStore.pages.length - 1}
		onclick={() => tableStore.setPage('next')}
	>
		→
	</button>
</section>
