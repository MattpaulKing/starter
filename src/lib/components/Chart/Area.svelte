<!--
  @component
  Generates an SVG area shape using the `area` function from [d3-shape](https://github.com/d3/d3-shape).
 -->
<script lang="ts">
	import { getContext } from 'svelte';
	import { area, curveLinear } from 'd3-shape';
	import { fade } from 'svelte/transition';
	import type { CurveFactory } from 'd3-shape';
	import type { LayerCakeContext } from './types';

	let {
		class: classes = 'fill-primary-500',
		curve = curveLinear
	}: { class?: string; curve?: CurveFactory } = $props();

	const { data, xGet, yGet, yScale }: LayerCakeContext = getContext('LayerCake');

	let path = $derived.by(() => {
		return area()
			.x($xGet)
			.y1($yGet)
			.y0(() => $yScale(0))
			.curve(curve);
	});
</script>

{#key path}
	<path transition:fade class={classes} d={path($data)}></path>
{/key}
