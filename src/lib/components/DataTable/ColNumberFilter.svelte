<script lang="ts" generics="T extends Record<string, unknown>">
	import { getColKey, type TableStore } from '.';

	let {
		tableStore = $bindable(),
		label,
		side
	}: {
		tableStore: TableStore<T>;
		label: string;
		side: 0 | 1;
	} = $props();

	let key = getColKey() as keyof T;
	let numberProxy = $state(tableStore.filters[key].values[side] as number);

	function updateFilter() {
		tableStore.setNumberFilterValue({
			col: key,
			value: numberProxy,
			valueIdx: side
		});
	}
</script>

<label class="my-4">
	<span>{label}</span>
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
