<script lang="ts">
	import { onMount } from 'svelte';
	import { getField, setInputElCtx } from './context';
	let { value, path, disabled, constraints, errors } = getField<string>();
	let inputEl: HTMLInputElement;
	onMount(() => {
		setInputElCtx(inputEl);
	});
</script>

<input
	bind:this={inputEl}
	type="text"
	autocomplete="off"
	class="input"
	disabled={$disabled}
	name={path}
	title={$value}
	bind:value={$value}
	on:reset
	on:blur
	on:change
	aria-invalid={$errors ? 'true' : 'false'}
	{...$constraints}
	{...$$restProps}
/>
