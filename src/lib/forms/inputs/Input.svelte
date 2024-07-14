<script lang="ts">
	import { onMount } from 'svelte';
	import { getField, setInputElCtx } from './context';
	export let type: string;
	let { value, path, disabled, constraints, errors } = getField<string>();
	let inputEl: HTMLInputElement;
	onMount(() => {
		setInputElCtx(inputEl);
	});
</script>

<input
	bind:this={inputEl}
	{type}
	autocomplete="off"
	class="input"
	disabled={$disabled}
	name={path}
	title={$value}
	bind:value={$value}
	aria-invalid={$errors ? 'true' : 'false'}
	{...$constraints}
	{...$$restProps}
/>
