<script lang="ts">
	import { degreesToDirection } from '.';
	type Range = { min: number; max: number };
	type WaveAgg = { waveHeight: number; swellDirection: number; wavePeriod: number };
	let {
		wavesToday
	}: {
		wavesToday: {
			beach: string;
			waveHeight: Range;
			swell: Range;
			times: {
				early: WaveAgg;
				morning: WaveAgg;
				afternoon: WaveAgg;
			};
		};
	} = $props();

	function wavesToStatus(d: number) {
		return d >= 1.5 ? 'good' : d >= 1 ? 'fair' : 'poor';
	}
	let waveCondition = $derived.by(() => {
		return {
			min: wavesToStatus(wavesToday.waveHeight.min),
			max: wavesToStatus(wavesToday.waveHeight.max)
		};
	});
</script>

<div class="card p-4 grid grid-cols-[auto_1fr_1fr] w-fit">
	<div
		class="w-1 rounded-t-full rounded-b-full mr-2 {waveCondition.max === 'good'
			? 'bg-green-500'
			: waveCondition.max === 'fair'
				? 'bg-yellow-500'
				: 'bg-red-500'}"
	></div>
	<div class="flex flex-col">
		<span class="text-lg font-bold capitalize">{wavesToday.beach}</span>
		<span class="text-2xl font-bold"
			>{wavesToday.waveHeight.min.toFixed(1)}-{wavesToday.waveHeight.max.toFixed(1)}m</span
		>
		<span class="text-sm uppercase font-bold pl-0.5"
			>{waveCondition.min} to {waveCondition.max}</span
		>
	</div>
	<div class="flex flex-col justify-between h-full ml-6 py-1">
		{#each Object.values(wavesToday.times) as time}
			<div class="flex gap-x-2 text-sm">
				<span>{time.waveHeight.toFixed(1)}m</span>
				<span>{time.wavePeriod.toFixed(1)}s</span>
				<span class="font-bold">{degreesToDirection(time.swellDirection)}</span>
			</div>
		{/each}
	</div>
</div>
