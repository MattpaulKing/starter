<script lang="ts" generics="T extends Record<string, unknown>">
	import { getFormCtx, setArrayField } from './context';
	import type { FormPathArrays, InputConstraint, SuperForm } from 'sveltekit-superforms';
	export let form: SuperForm<T>;
	export let path: FormPathArrays<T>;
	export let disabled = false;
	export let constraints: InputConstraint = {};

	let { disabled: formDisabled } = getFormCtx();
	let {
		focused,
		disabled: _disabled,
		errors,
		constraints: _constraints
	} = setArrayField({ form, path });
	$_disabled = disabled || $_disabled || $formDisabled;
	$_constraints = constraints;

	function handleLostFocus(e: FocusEvent) {
		if (!fieldContainer?.contains(e.relatedTarget as Node | null)) {
			$focused = false;
		}
	}
	let fieldContainer: HTMLDivElement;
</script>

<svelte:window on:focusout={handleLostFocus} />
<div
	bind:this={fieldContainer}
	class="mt-4 flex w-full flex-col justify-end {$errors
		? '[&>input]:border-error-500-400-token'
		: ''} [&>input]:min-h-10 {$$restProps.class ?? ''}"
>
	<slot />
</div>
