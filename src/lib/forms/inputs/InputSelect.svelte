<script lang="ts">
	import type { LookupOption } from '../types';
	import { getField } from './context';

	export let lookups: LookupOption[];

	let { value, disabled, constraints, path } = getField<string>();
	let inputEl: HTMLSelectElement;
</script>

<select
	bind:this={inputEl}
	disabled={$disabled}
	bind:value={$value}
	name={path}
	class="select"
	{...$constraints}
	{...$$restProps}
>
	{#each lookups as lookup}
		<option value={lookup.id}>{lookup.label}</option>
	{/each}
</select>

<slot {inputEl} />
