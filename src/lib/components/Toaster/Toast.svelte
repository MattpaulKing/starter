<script lang="ts">
	import { flip } from 'svelte/animate';
	import { getToaster } from './toastContext.svelte';
	import { fade, fly } from 'svelte/transition';
	let toaster = getToaster();
	let containerRect;
</script>

<div
	bind:contentRect={containerRect}
	class="absolute flex flex-col h-fit z-[9999] top-4 gap-y-2 right-8 w-80 max-w-80"
>
	{#each toaster.queue as toast (toast.id)}
		<div
			animate:flip
			in:fly={{ y: containerRect.y, x: containerRect.x }}
			out:fade
			class="{toast.type === 'info'
				? 'bg-surface-300-600-token'
				: toast.type === 'save'
					? 'bg-success-300-600-token'
					: toast.type === 'error'
						? 'bg-error-200-700-token'
						: 'bg-white'} relative p-4 rounded-token max-h-20 shadow-lg ring-1 ring-surface-300-600-token flex w-full h-fit"
		>
			<button
				onclick={() => {
					toaster.remove(toast.id);
				}}
				class="absolute -top-1 -right-1 btn btn-sm font-bold text-lg">x</button
			>
			<span class="">{toast.message}</span>
		</div>
	{/each}
</div>
