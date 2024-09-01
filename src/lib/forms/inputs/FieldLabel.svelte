<script lang="ts">
	import { getField } from './context';
	import type { Snippet } from 'svelte';
	let { label, children }: { label: string | undefined; children?: Snippet } = $props();
	let { path, constraints } = getField();
</script>

<label for={path}>
	<div class="mb-1 ml-1 flex h-8 w-full place-items-center justify-between gap-x-2">
		<span class={$constraints?.required ? 'field-required-label relative' : ''}>
			{label}
		</span>
		{#if children}
			{@render children()}
		{/if}
	</div>
</label>
