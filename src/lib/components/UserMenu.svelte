<script lang="ts">
	import { Avatar } from '.';
	import { slide } from 'svelte/transition';
	import type { Snippet } from 'svelte';
	let { onclick = () => null, children }: { onclick?: () => void; children?: Snippet } = $props();
	let menuOpen = $state(false);
	function handleClick() {
		menuOpen = !menuOpen;
		onclick();
	}
</script>

<div class="relative h-9">
	<Avatar
		onclick={handleClick}
		initials="MK"
		class="{menuOpen && children
			? 'scale-110 ring-1 ring-secondary-500-400-token'
			: ''}  bg-secondary-400-500-token h-9"
	/>
	{#if menuOpen && children}
		<div transition:slide class="absolute right-0 card px-2 py-4">
			{@render children()}
		</div>
	{/if}
</div>
