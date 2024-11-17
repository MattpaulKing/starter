<script lang="ts" generics="T extends Record<string, unknown>">
	import { FunnelIcon } from '$lib/assets';
	import { camelToTitle } from '$lib/transforms';
	import { fade } from 'svelte/transition';
	import { Popover } from '..';
	import type { TableStore } from '.';
	let {
		tableStore = $bindable(),
		keyFormatter = (key: string) => {
			return camelToTitle(key);
		},
		dateFormatter = (value: Date) => {
			return value.toLocaleDateString();
		},
		numFormatter = (value: number) => {
			return value.toString();
		}
	}: {
		tableStore: TableStore<T>;
		keyFormatter?: (k: string) => string;
		dateFormatter?: (v: Date) => string;
		numFormatter?: (v: number) => string;
	} = $props();
	let popoverOpen = $state(false);
	function togglePopover() {
		popoverOpen = !popoverOpen;
	}
	function formatFilterValue({ filterValue }: { filterValue: string | number | Date }) {
		if (typeof filterValue === 'string') {
			return filterValue;
		} else if (typeof filterValue === 'number') {
			return numFormatter(filterValue);
		} else if (filterValue instanceof Date) {
			return dateFormatter(filterValue);
		}
	}
	$inspect(tableStore.filters);
	function removeFilterValue({ e, key, idx }: { e: MouseEvent; key: keyof T; idx: number }) {
		e.stopPropagation();
		tableStore.removeFilterValue({ key, idx });
	}
	function isDefaultRange({ key, idx }: { key: keyof T; idx: number }) {
		return tableStore.filters[key].values[idx] === tableStore.filters[key].range[idx];
	}
</script>

<Popover onClickOutside={() => (popoverOpen = false)}>
	<button
		onclick={togglePopover}
		class="btn h-9 btn-sm {tableStore.filterCount > 0 ? 'variant-ghost' : 'variant-soft-surface'}"
	>
		<FunnelIcon filterCount={tableStore.filterCount} class=" h-8" />
		Filters
	</button>
	{#if popoverOpen}
		<div transition:fade class="card z-10 absolute top-full p-4">
			<ul class="space-y-2">
				{#each Object.entries(tableStore.filters) as [key, filter]}
					<li>
						<div class="flex flex-col gap-y-2 mb-4">
							<span class="font-bold whitespace-nowrap">
								{keyFormatter(key)}
							</span>
							<div class="flex gap-x-2 gap-y-1">
								{#each filter.values as filterValue, idx}
									{#if (filter.filter === 'date-range' || filter.filter === 'number-range') && idx === 1}
										<span>-</span>
									{/if}
									<button
										onclick={(e) => removeFilterValue({ e, key, idx })}
										class="btn btn-sm {isDefaultRange({ key, idx })
											? 'variant-ghost pointer-events-none'
											: 'group hover:variant-filled-error variant-outline'} py-1 px-3 flex relative gap-x-2"
									>
										<span class="mr-1">{formatFilterValue({ filterValue })}</span>
										<span
											class="absolute font-bold text-white -top-1 right-0.5 group-hover:block hidden"
											>x</span
										>
									</button>
								{/each}
							</div>
						</div>
					</li>
				{/each}
			</ul>
		</div>
	{/if}
</Popover>
