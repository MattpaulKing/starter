<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { FilterDateRange } from './TableStore.svelte';

	let {
		filter = $bindable(),
		idx,
		children
	}: {
		filter: FilterDateRange;
		idx: number;
		children: Snippet;
	} = $props();

	function updateFilter() {
		let localDate = new Date(filter.strValues[idx]);
		filter.values[idx] = new Date(localDate.getTimezoneOffset() * 60 * 1000 + localDate.getTime());
	}
</script>

<label class="my-4">
	{@render children()}
	<input
		type="date"
		class="input"
		oninput={updateFilter}
		bind:value={filter.strValues[idx]}
		min={filter.range[0].toISOString().slice(0, 10)}
		max={filter.range[1].toISOString().slice(0, 10)}
	/>
</label>
