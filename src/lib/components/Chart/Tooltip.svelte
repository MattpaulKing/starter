<script>
	import { getContext } from 'svelte';
	import { format } from 'd3-format';
	import { QuadTree } from '.';

	const { data, width, yScale, config } = getContext('LayerCake');

	const commas = format(',');
	const titleCase = (d) => d.replace(/^\w/, (w) => w.toUpperCase());

	/** @type {Function} [formatTitle=d => d] - A function to format the tooltip title, which is `$config.x`. */
	export let formatTitle = (d) => d;

	/** @type {Function} [formatKey=d => titleCase(d)] - A function to format the series name. */
	export let formatKey = (d) => titleCase(d);

	/** @type {Function} [formatValue=d => isNaN(+d) ? d : commas(d)] - A function to format the value. */
	export let formatValue = (d) => (isNaN(+d) ? d : commas(d));

	/** @type {Number} [offset=-20] - A y-offset from the hover point, in pixels. */
	export let offset = -20;

	export let line = false;

	export let allowedKeys;

	/** @type {Array<Object>|undefined} [dataset] - The dataset to work off of—defaults to $data if left unset. You can pass something custom in here in case you don't want to use the main data or it's in a strange format. */
	export let dataset = undefined;

	const w = 150;
	const w2 = w / 2;

	/* --------------------------------------------
	 * Sort the keys by the highest value
	 */
	function sortResult(result) {
		if (Object.keys(result).length === 0) return [];
		const rows = Object.keys(result)
			.filter((d) => d !== $config.x)
			.map((key) => {
				return {
					key,
					value: result[key]
				};
			})
			.sort((a, b) => b.value - a.value);
		return rows;
	}
</script>

<QuadTree dataset={dataset || $data} y="x" let:x let:y let:visible let:found let:e>
	{@const foundSorted = sortResult(found)}
	{#if visible === true}
		<div style="left:{(x / 100) * $width}px;" class="line border border-dashed"></div>
		<div
			class="tooltip card z-50 rounded-token"
			style="
        width:{w}px;
        display: {visible ? 'block' : 'none'};
        top:50px;
        left:{Math.min(Math.max(w2, (x / 100) * $width), $width - w2)}px;"
		>
			<div class="title">{formatTitle($config.x(found))}</div>
			{#each foundSorted as row}
				<div class="row">
					{#if allowedKeys.includes(row.key)}
						<span class="key">{formatKey(row.key)}:</span>
						{formatValue(row.value)}
					{/if}
				</div>
			{/each}
		</div>
	{/if}
</QuadTree>

<style>
	.tooltip {
		position: absolute;
		font-size: 13px;
		pointer-events: none;
		border: 1px solid #ccc;
		transform: translate(-50%, -100%);
		padding: 5px;
		z-index: 15;
	}
	.line {
		position: absolute;
		top: 0;
		bottom: 0;
		width: 1px;
		pointer-events: none;
	}
	.tooltip,
	.line {
		transition:
			left 250ms ease-out,
			top 250ms ease-out;
	}
	.title {
		font-weight: bold;
	}
</style>
