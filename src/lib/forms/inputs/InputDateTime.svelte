<script lang="ts" generics="T extends Record<string, unknown>">
	import { dateProxy, type FormPath, type SuperForm } from 'sveltekit-superforms';
	import { getField } from './context';

	export let form: SuperForm<T>;

	let { disabled, path, errors } = getField<Date>();
	let inputEl: HTMLInputElement;

	let strValue = dateProxy(form, path as FormPath<T, Date>, { format: 'datetime-local' });
</script>

<input
	bind:this={inputEl}
	type="datetime-local"
	autocomplete="off"
	class="input [&::-webkit-calendar-picker-indicator]:scale-150 [&::-webkit-calendar-picker-indicator]:bg-[url('/Calendar.png')] [&::-webkit-calendar-picker-indicator]:dark:invert"
	name={path}
	disabled={$disabled}
	bind:value={$strValue}
	on:reset
	on:blur
	on:change
	aria-invalid={$errors ? 'true' : 'false'}
	{...$$restProps}
/>

<slot {inputEl} />
