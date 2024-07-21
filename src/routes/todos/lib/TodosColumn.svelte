<script lang="ts">
	import { crossfade } from 'svelte/transition';
	import type { Tables } from '$lib/db/types';

	let { todos }: { todos: Tables<'todos'>[] } = $props();
	let [send, receive] = crossfade({});
</script>

<div class="flex flex-col">
	{#each todos as todo (todo.id)}
		<div in:receive={{ key: todo.id }} out:send={{ key: todo.id }} class="card ring-1 p-4">
			<div class="flex justify-between gap-x-4">
				<span class="text-lg font-bold">{todo.label}</span>
				{#if todo.deadline}
					<span class="text-surface-400-500-token">{new Date(todo.deadline).toDateString()}</span>
				{/if}
			</div>
			<span class="prose text-token">{todo.description}</span>
		</div>
	{/each}
</div>
