<script lang="ts">
	import { browser } from '$app/environment';
	import { setModeCurrent } from '@skeletonlabs/skeleton';
	import type { Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();

	if (browser) {
		setModeCurrent(false);
		let bodyEl = document.querySelector('body');
		bodyEl?.setAttribute('data-theme', 'pinche-app');
	}
</script>

{@render children()}
