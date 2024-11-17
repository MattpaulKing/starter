<script lang="ts">
	import type { FilterDateRange } from './TableStore.svelte';

	let {
		filter = $bindable(),
		idx,
		label
	}: {
		filter: FilterDateRange;
		idx: number;
		label: string;
	} = $props();

	function updateFilter() {
		let localDate = new Date(filter.strValues[idx]);
		filter.values[idx] = new Date(localDate.getTimezoneOffset() * 60 * 1000 + localDate.getTime());
	}
</script>

<label class="my-4">
	<span>{label}</span>
	<input
		type="date"
		class="input"
		oninput={updateFilter}
		bind:value={filter.strValues[idx]}
		min={filter.range[0].toISOString().slice(0, 10)}
		max={filter.range[1].toISOString().slice(0, 10)}
	/>
</label>
