<script lang="ts">
	import { AxisX, AxisY, Area, ChartCard, Tooltip } from '$lib/components/Chart';
	import { scaleTime } from 'd3-scale';
	import { Html, LayerCake, ScaledSvg } from 'layercake';
	import { curveBasisOpen } from 'd3-shape';
	import {
		Table,
		ColMenu,
		ColSortBtn,
		Th,
		ColDateFilter,
		ColNumberFilter
	} from '$lib/components/DataTable';
	import { TableStore } from '$lib/components/DataTable';
	import type { Tables } from '$lib/db/types.js';

	let { data } = $props();
	let filters = $state(data.waves.filters);
	let tableStore = $state(
		new TableStore({
			rows: data.waves.rows,
			filters
		})
	);
	function formatTooltipTitle(e: Date) {
		let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
		let hour = parseInt(e.toLocaleTimeString().slice(0, 2));
		let meridian = 'AM';
		if (hour >= 12) {
			meridian = 'PM';
		}
		if (hour >= 13) {
			hour -= 12;
		}
		return `${days[e.getDay()]} ${hour} ${meridian}`;
	}
	let chartRows = $derived(
		tableStore.visibleRows.sort((a, b) => (a.waveTs.getTime() > b.waveTs.getTime() ? 1 : -1))
	);
</script>

<div class="flex flex-col w-full h-full p-2 lg:p-8">
	<h1 class="h1 font-bold">Waves</h1>
	<div class="grid grid-cols-1 lg:grid-cols-5 lg:gap-x-24 w-full h-fit">
		<div class="flex lg:col-span-2 w-full">
			<Table bind:tableStore>
				{#snippet headers()}
					<Th>
						<span>Date</span>
						<ColMenu {tableStore} key="waveTs">
							<ColSortBtn {tableStore} asc={true}>Earliest to Latest</ColSortBtn>
							<ColSortBtn {tableStore} asc={false}>Latest to Earliest</ColSortBtn>
							<hr class="my-2" />
							<ColDateFilter idx={0} bind:filter={filters.waveTs}>Earliest Date</ColDateFilter>
							<ColDateFilter idx={1} bind:filter={filters.waveTs}>Latest Date</ColDateFilter>
						</ColMenu>
					</Th>
					<Th>Time</Th>
					<Th>
						<span>Wave Height (m)</span>
						<ColMenu {tableStore} key="waveHeight">
							<ColSortBtn {tableStore} asc={true}>Smallest to Largest</ColSortBtn>
							<ColSortBtn {tableStore} asc={false}>Largest to Smallest</ColSortBtn>
							<hr class="my-2" />
							<ColNumberFilter bind:tableStore idx={0}>Minimum</ColNumberFilter>
							<ColNumberFilter bind:tableStore idx={1}>Maximum</ColNumberFilter>
						</ColMenu>
					</Th>
				{/snippet}
				{#snippet row(d)}
					<td>{d.waveTs.toDateString()}</td>
					<td>{d.waveTs.toLocaleTimeString().slice(0, 5)}</td>
					<td class="text-right">{d.waveHeight}</td>
				{/snippet}
			</Table>
		</div>
		<ChartCard class="lg:col-span-3 lg:place-self-center w-full h-fit">
			{#snippet title()}
				<div class="flex flex-col">
					<span class="text-xl font-bold">Wave Height</span>
					<span>In Meters</span>
				</div>
			{/snippet}
			<div class="flex h-80 w-full">
				<LayerCake
					ssr
					percentRange
					padding={{ top: 0, right: 10, bottom: 20, left: 25 }}
					x={(d: Tables<'waves'>) => new Date(d.waveTs)}
					y="waveHeight"
					yDomain={[0, null]}
					xScale={scaleTime()}
					data={chartRows}
					let:xDomain
					let:xScale
				>
					<Html>
						<AxisX ticks={8} format={xScale.domain(xDomain).tickFormat()} />
						<AxisY ticks={8} />
					</Html>
					<ScaledSvg>
						<Area curve={curveBasisOpen} class="fill-tertiary-700 " />
					</ScaledSvg>
					<Html>
						<Tooltip
							formatTitle={formatTooltipTitle}
							allowedKeys={['waveHeight']}
							formatKey={() => 'Wave Height'}
							formatValue={(d: number) => d.toFixed(2).concat('m')}
						/>
					</Html>
				</LayerCake>
			</div>
		</ChartCard>
	</div>
</div>
