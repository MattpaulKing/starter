<script lang="ts" generics="T extends Record<string, unknown>">
	import LoadingSpinner from '$lib/components/LoadingSpinner.svelte';
	import { setFormCtx } from './inputs/context';
	import type { SuperForm } from 'sveltekit-superforms';

	let {
		form,
		action,
		disabled = false,
		enctype = 'application/x-www-form-urlencoded',
		bordered = true,
		children,
		...restProps
	}: {
		form: SuperForm<T>;
		action: string;
		disabled?: boolean;
		enctype?: string;
		bordered?: boolean;
		children: any;
		class?: string;
		[k: string]: unknown;
	} = $props();

	setFormCtx({ disabled });
	let { delayed, enhance } = form;
</script>

<div
	class="relative flex h-min w-full {restProps.class ?? ''} {bordered
		? 'card p-4 lg:max-w-xl border-surface-200-700-token border shadow-lg shadow-surface-200 dark:shadow-gray-800'
		: ''}"
>
	{#if $delayed}
		<LoadingSpinner />
	{/if}
	<form
		class="flex w-full flex-col lg:grid lg:grid-cols-2 lg:gap-x-4"
		method="POST"
		{action}
		use:enhance
		{enctype}
	>
		{@render children()}
	</form>
</div>
