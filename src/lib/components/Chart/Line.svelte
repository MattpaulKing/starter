<script lang="ts">
	import { getContext } from 'svelte';
	import { line, curveLinear } from 'd3-shape';
	import type { CurveFactory } from 'd3-shape';
	import type { LayerCakeContext } from './types';

	const { data, xGet, yGet }: LayerCakeContext = getContext('LayerCake');
	let {
		class: classes = 'stroke-primary-500',
		curve = curveLinear
	}: { class?: string; curve?: CurveFactory } = $props();
	let path = $derived.by(() => {
		return line().x($xGet).y($yGet).curve(curve);
	});
</script>

<path class="path-line {classes}" d={path($data)}></path>

<style>
	.path-line {
		fill: none;
		stroke-linejoin: round;
		stroke-linecap: round;
		stroke-width: 2;
	}
</style>
