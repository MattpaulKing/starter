<script lang="ts">
	import { Avatar } from '.';
	import { slide } from 'svelte/transition';
	import type { Snippet } from 'svelte';

	function handleClick() {
		menuOpen = !menuOpen;
		onclick();
	}
	function onfocusout(e: FocusEvent) {
		if (!containerEl?.contains(e.relatedTarget as Node | null)) {
			menuOpen = false;
		}
	}
	function onkeydown(e: KeyboardEvent) {
		if (e.key === 'Escape' && menuOpen) {
			menuOpen = false;
		}
	}

	let { onclick = () => null, children }: { onclick?: () => void; children?: Snippet } = $props();
	let containerEl: HTMLDivElement | undefined = $state();
	let menuOpen = $state(false);
</script>

<svelte:window {onfocusout} {onkeydown} />
<div bind:this={containerEl} class="relative h-9">
	<Avatar
		onclick={handleClick}
		initials="MK"
		class="{menuOpen && children
			? 'scale-110 ring-1 ring-secondary-500-400-token'
			: ''}  bg-secondary-400-500-token h-9"
	/>
	{#if menuOpen && children}
		<div transition:slide class="absolute right-0">
			{@render children()}
		</div>
	{/if}
</div>
