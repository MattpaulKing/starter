<script lang="ts">
	let {
		label,
		value = $bindable(),
		dateStr = $bindable(),
		dateRange
	}: {
		label: string;
		value: Date;
		dateStr: string;
		dateRange: [Date, Date];
	} = $props();

	function updateFilter() {
		let localDate = new Date(dateStr);
		value = new Date(localDate.getTimezoneOffset() * 60 * 1000 + localDate.getTime());
		dateStr = value.toISOString().slice(0, 10);
	}
</script>

<label class="my-4">
	<span>{label}</span>
	<input
		type="date"
		class="input"
		oninput={updateFilter}
		bind:value={dateStr}
		min={dateRange[0].toISOString().slice(0, 10)}
		max={dateRange[1].toISOString().slice(0, 10)}
	/>
</label>
