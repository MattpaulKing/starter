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
	let dateStr = $state((tableStore.filters[key].values[side] as Date).toISOString().slice(0, 10));

	function updateFilter() {
		let utcDate = new Date(dateStr);
		let tzOffset = utcDate.getTimezoneOffset();
		tableStore.setRangeFilter({
			col: key,
			value: new Date(utcDate.getTime() + tzOffset * 60 * 1000),
			valueIdx: side
		});
	}
</script>

<label class="my-4">
	<span>{label}</span>
	<input
		type="date"
		autocomplete="off"
		class="input"
		name={''}
		oninput={updateFilter}
		bind:value={dateStr}
	/>
</label>
