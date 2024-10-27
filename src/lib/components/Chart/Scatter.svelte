<!--
  @component
  Generates an SVG scatter plot. This component can also work if the x- or y-scale is ordinal, i.e. it has a `.bandwidth` method. See the [timeplot chart](https://layercake.graphics/example/Timeplot) for an example.
 -->
<script lang="ts">
	import { getContext } from 'svelte';
	import type { LayerCakeContext } from './types';

	let {
		r = 5,
		class: classes = 'fill-primary-500 stroke-primary-500'
	}: { r?: number; class?: string } = $props();
	const { data, xGet, yGet, xScale, yScale }: LayerCakeContext = getContext('LayerCake');
</script>

<g class="scatter-group">
	{#each $data as d}
		<circle
			class={classes}
			cx={$xGet(d) + ($xScale.bandwidth ? $xScale.bandwidth() / 2 : 0)}
			cy={$yGet(d) + ($yScale.bandwidth ? $yScale.bandwidth() / 2 : 0)}
			{r}
		/>
	{/each}
</g>
