<script lang="ts">
	import { computePosition, offset } from '@floating-ui/dom';
	import { getContext, onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import type { Writable } from 'svelte/store';

	export let inputEl: HTMLInputElement;
	let focused = getContext('FOCUSED') as Writable<boolean>;
	let descEl: HTMLDivElement;

	function setDescriptionPos() {
		if (!$focused) return;
		computePosition(inputEl, descEl, {
			middleware: [offset(10)]
		}).then(({ x, y }) => {
			descEl.style.left = `${x}px`;
			descEl.style.top = `${y}px`;
		});
	}

	onMount(() => {
		setDescriptionPos();
	});
</script>

<div class="relative z-10 w-full">
	{#if $focused}
		<div
			class="bg-surface-100-800-token absolute h-fit w-fit bg-white bg-opacity-100 p-1 text-sm text-gray-500 dark:text-gray-400"
			bind:this={descEl}
			transition:fade
		>
			<slot />
		</div>
	{/if}
</div>
