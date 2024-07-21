<script lang="ts">
	import { route } from '$lib/ROUTES';
	import { List } from '$lib/components';
	import TodosColumn from './lib/TodosColumn.svelte';

	let { data } = $props();
	let todos = $state(data.todos.todo);
	let inProgress = $state(data.todos.inProgress);
</script>

{#snippet label()}
	<span class="font-bold text-xl">Todos</span>
{/snippet}

<div class="flex h-full w-full gap-x-8">
	<List {label} navList={false} class="h-full truncate rounded-tr-none sticky">
		<a href={route('')} class="btn flex mx-auto variant-filled-success font-bold text-xl btn-sm"
			>+</a
		>
	</List>
	<div class="flex flex-col w-full h-full items-center justify-center">
		<TodosColumn {todos} />
		<TodosColumn todos={inProgress} />
	</div>
</div>
