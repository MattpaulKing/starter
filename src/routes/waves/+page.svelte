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
						<ColMenu {tableStore} label="Date" key="waveTs">
							<ColSortBtn {tableStore} label="Earliest to Latest" asc={true}></ColSortBtn>
							<ColSortBtn {tableStore} label="Latest to Earliest" asc={false}></ColSortBtn>
							<hr class="my-2" />
							<ColDateFilter label="Earliest Date" idx={0} bind:filter={filters.waveTs}
							></ColDateFilter>
							<ColDateFilter label="Latest Date" idx={1} bind:filter={filters.waveTs}
							></ColDateFilter>
						</ColMenu>
					</Th>
					<Th>Time</Th>
					<Th>
						<ColMenu {tableStore} label="Wave Height (m)" key="waveHeight">
							<ColSortBtn {tableStore} label="Smallest to Largest" asc={true}></ColSortBtn>
							<ColSortBtn {tableStore} label="Largest to Smallest" asc={false}></ColSortBtn>
							<hr class="my-2" />
							<ColNumberFilter bind:tableStore label="Minimum" side={0}></ColNumberFilter>
							<ColNumberFilter bind:tableStore label="Maximum" side={1}></ColNumberFilter>
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
