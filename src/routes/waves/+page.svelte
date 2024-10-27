<script lang="ts">
	import { AxisX, AxisY, Area, ChartCard, Tooltip } from '$lib/components/Chart';
	import { scaleTime } from 'd3-scale';
	import { calcExtents, Html, LayerCake, ScaledSvg } from 'layercake';
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

	let xScale = scaleTime();
	let tableStore = $state(
		new TableStore({
			rows: data.waves.data,
			filters: {
				waveTs: {
					filter: 'date-range',
					values: [new Date(2024, 9, 27, 0, 0, 0), new Date(2024, 9, 31, 0, 0, 0)],
					range: {
						min: new Date(2024, 9, 23),
						max: new Date(2024, 9, 31)
					}
				},
				waveHeight: {
					filter: 'number-range',
					values: [0, 5],
					range: {
						min: 0,
						max: 5
					}
				}
			}
		})
	);
	// NOTE: Can use calcExtents to get the ranges
</script>

<div class="flex flex-col w-full h-full p-2 lg:p-8">
	<h1 class="h1 font-bold">Waves</h1>
	<div class="flex gap-x-12 w-full h-full flex-row-reverse">
		<Table bind:tableStore>
			{#snippet headers()}
				<Th>
					<ColMenu {tableStore} label="Date" key="waveTs">
						<ColSortBtn {tableStore} label="Earliest to Latest" asc={true}></ColSortBtn>
						<ColSortBtn {tableStore} label="Latest to Earliest" asc={false}></ColSortBtn>
						<hr class="my-2" />
						<ColDateFilter bind:tableStore label="Earliest Date" side={0}></ColDateFilter>
						<ColDateFilter bind:tableStore label="Latest Date" side={1}></ColDateFilter>
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
			{#snippet row(d: Tables<'waves'>)}
				<td>
					{new Date(d.waveTs).toDateString()}
				</td>
				<td>
					{new Date(d.waveTs).toLocaleTimeString().slice(0, 5)}
				</td>
				<td>
					{d.waveHeight}
				</td>
			{/snippet}
		</Table>
		<ChartCard>
			{#snippet title()}
				<div class="flex flex-col">
					<span class="text-xl font-bold">Wave Height</span>
					<span>In Meters</span>
				</div>
			{/snippet}
			<div class="w-96 h-72">
				<LayerCake
					ssr
					percentRange
					padding={{ top: 0, right: 10, bottom: 20, left: 25 }}
					x={(d: Tables<'waves'>) => new Date(d.waveTs)}
					y="waveHeight"
					yDomain={[0, null]}
					{xScale}
					data={data.waves.data}
					let:xDomain
					let:xScale
				>
					<Html>
						<AxisX ticks={4} format={xScale.domain(xDomain).tickFormat()} />
						<AxisY ticks={4} />
					</Html>
					<ScaledSvg>
						<Area curve={curveBasisOpen} class="fill-primary-700 opacity-80" />
					</ScaledSvg>
					<Html>
						<Tooltip
							formatTitle={(e: Date) => e.toDateString()}
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
