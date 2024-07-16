<script lang="ts">
	import type { Snippet } from 'svelte';
	let {
		class: classes,
		label,
		labelClass,
		children
	}: { class?: string; label?: string; labelClass?: string; children: Snippet } = $props();
</script>

<div class="w-full {classes} h-fit flex flex-col gap-y-2 card p-4">
	{#if label}
		<span class="{labelClass} whitespace-nowrap">{label}</span>
	{/if}
	<div class="flex flex-col w-full space-y-1">
		{@render children()}
	</div>
</div>
