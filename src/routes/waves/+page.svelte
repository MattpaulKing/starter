<script lang="ts">
	import { AxisX, AxisY, Area, ChartCard, Tooltip } from '$lib/components/Chart';
	import { scaleTime } from 'd3-scale';
	import { Html, LayerCake, ScaledSvg } from 'layercake';
	import { curveBasisOpen } from 'd3-shape';
	import { Table, ColFilter, ColSortBtn, Th } from '$lib/components/DataTable';
	import { TableStore } from '$lib/components/DataTable';
	import type { Tables } from '$lib/db/types.js';

	let { data } = $props();

	let xScale = scaleTime();
	let tableStore = $state(
		new TableStore({
			baseRoute: data.apiRoute,
			rows: data.waves.rows,
			count: data.waves.count,
			filters: {
				waveTs: {
					type: 'date-range',
					values: {
						min: new Date(2024, 9, 20, 0, 0, 0).getTime(),
						max: new Date(2024, 9, 31, 0, 0, 0).getTime()
					},
					range: {
						min: new Date(2024, 9, 23).getTime(),
						max: new Date(2024, 9, 31).getTime()
					}
				}
			}
		})
	);
	let dateMin = $state(new Date(2024, 10, 25));
</script>

<div class="flex flex-col w-full h-full p-2 lg:p-8">
	<h1 class="h1 font-bold">Waves</h1>
	<div class="flex gap-x-12 w-full h-full flex-row-reverse">
		<Table bind:tableStore>
			{#snippet headers()}
				<Th>
					<ColFilter {tableStore} label="Date" key="waveTs">
						<ColSortBtn {tableStore} label="Earliest to Latest" asc={true}></ColSortBtn>
						<ColSortBtn {tableStore} label="Latest to Earliest" asc={false}></ColSortBtn>
						<hr class="my-2" />
						<label>
							<span>Earliest Date</span>
							<input
								type="date"
								autocomplete="off"
								class="input [&::-webkit-calendar-picker-indicator]:scale-150 [&::-webkit-calendar-picker-indicator]:bg-[url('/Calendar.png')] [&::-webkit-calendar-picker-indicator]:dark:invert"
								name={''}
								bind:value={tableStore.filters.waveTs.values.min}
							/>
						</label>
					</ColFilter>
				</Th>
				<Th>Time</Th>
				<Th resizable={false}>Wave Height (m)</Th>
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
					data={data.waves.rows}
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
