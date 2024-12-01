<script lang="ts" generics="T extends Record<string, unknown>">
	import type { Snippet } from 'svelte';
	import { getColKey, type TableStore } from '.';

	let {
		tableStore = $bindable(),
		idx,
		children
	}: {
		tableStore: TableStore<T>;
		idx: 0 | 1;
		children: Snippet;
	} = $props();

	let key = getColKey() as keyof T;
	let numberProxy = $state(tableStore.filters[key].values[idx] as number);

	function updateFilter() {
		tableStore.setNumberFilterValue({
			col: key,
			value: numberProxy,
			valueIdx: idx
		});
	}
</script>

<label class="my-4">
	{@render children()}
	<input
		type="number"
		inputmode="tel"
		autocomplete="off"
		class="input"
		name={''}
		oninput={updateFilter}
		bind:value={numberProxy}
	/>
</label>
