<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		colspan = 1,
		rowspan = 1,
		resizable = true,
		class: classes,
		children
	}: {
		colspan?: number;
		rowspan?: number;
		resizable?: boolean;
		class?: string;
		children: Snippet;
	} = $props();
</script>

<td
	{colspan}
	{rowspan}
	class="m-0 p-2 border-surface-500-400-token h-0 {resizable ? 'resize-x' : ''} overflow-x-auto"
>
	<div class="flex {classes ?? ''}  h-full w-full place-items-center justify-center">
		{@render children()}
	</div>
</td>
