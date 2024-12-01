<script lang="ts">
	import { Popover } from '..';
	import type { Snippet } from 'svelte';
	let {
		btnContainer = $bindable(),
		btnImg,
		children,
		title
	}: {
		btnContainer?: HTMLDivElement;
		btnImg?: Snippet;
		title: Snippet;
		children: Snippet;
	} = $props();
	let menuOpen = $state(false);
</script>

<div class="flex relative justify-end gap-x-2" bind:this={btnContainer}>
	<Popover class="h-9" onClickOutside={() => (menuOpen = false)}>
		<button
			onclick={() => (menuOpen = !menuOpen)}
			class="btn-icon aspect-square btn-icon-sm h-full flex place-items-center variant-ghost rounded-token"
		>
			{#if btnImg}
				{@render btnImg()}
			{:else}
				<span class="font-bold mb-1">...</span>
			{/if}
		</button>
		{#if menuOpen}
			<div class="absolute right-0 z-10">
				<div
					class="card space-y-2 py-4 px-2 flex flex-col w-fit border border-surface-500-400-token"
				>
					<span class="font-bold px-2">{@render title()}</span>
					<hr class="" />
					<ul class="[&>li>*]:text-sm w-fit">
						{@render children()}
					</ul>
				</div>
			</div>
		{/if}
	</Popover>
</div>
