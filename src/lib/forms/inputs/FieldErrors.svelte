<script lang="ts">
	import { arrow, computePosition, offset } from '@floating-ui/dom';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { getField, getInputElCtx } from './context';

	let inputEl = getInputElCtx();
	let errorEl: HTMLDivElement;
	let arrowEl: HTMLDivElement;

	let { errors } = getField();

	function setErrorPos() {
		if (!$errors || !inputEl) return;
		computePosition($inputEl, errorEl, {
			middleware: [offset(20), arrow({ element: arrowEl })]
		}).then(({ x, y, middlewareData: { arrow } }) => {
			if (arrow) {
				let { x, y } = arrow;
				arrowEl.style.left = x ? `${x}px` : '';
				arrowEl.style.top = y ? `${y}px` : '';
			}
			errorEl.style.left = `${x}px`;
			errorEl.style.top = `${y}px`;
		});
	}

	onMount(() => {
		setErrorPos();
	});
</script>

<div class="relative z-10 w-full">
	{#if $errors}
		<div
			class="card border-error-500-400-token absolute flex flex-col items-center border p-1 rounded-token"
			bind:this={errorEl}
			transition:fade
		>
			<div
				bind:this={arrowEl}
				id="arrow"
				class="bg-surface-100-800-token border-error-500-400-token absolute -mt-3 aspect-square w-4 rotate-45 border"
			></div>
			<span class="card z-10 -mt-1 inline-flex p-1">
				{$errors.join(', ')}
			</span>
		</div>
	{/if}
</div>
