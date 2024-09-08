<script lang="ts">
	import { browser } from '$app/environment';
	import { setModeCurrent } from '@skeletonlabs/skeleton';
	import { NeoButton, NeoAnchorArrow } from './lib/components/neo-brutalism';
	import NeoCard from './lib/components/neo-brutalism/NeoCard.svelte';
	import type { PageData } from './$types';
	let { data }: { data: PageData } = $props();
	if (browser) {
		setModeCurrent(true);
		let bodyEl = document.querySelector('body');
		bodyEl?.setAttribute('data-theme', 'pinche-brutal');
	}
</script>

<div
	class="flex flex-col relative z-10 h-full w-full bg-tertiary-100-800-token items-center justify-center"
>
	<div class="absolute h-screen w-screen -z-10 bg-img"></div>
	<div class="flex justify-around container h-full place-items-center">
		<section class="flex flex-col">
			<NeoCard>
				<h1 class="h1 font-bold">Matthew King</h1>
				<a class="anchor text-secondary-800" href="mailto:matthewpaulking@outlook.com"
					>matthewpaulking@outlook.com</a
				>
				<div class="flex gap-x-4 place-items-center mt-6">
					<NeoButton class="variant-filled-tertiary w-fit">Resume</NeoButton>
					<NeoButton class="bg-primary-400-500-token w-fit flex gap-x-2">
						<img src="/Github.png" alt="github" class="h-6 w-6" />Github</NeoButton
					>
					<NeoButton class="bg-primary-400-500-token w-fit flex gap-x-2">
						<img src="/LinkedIn.png" alt="github" class="h-6 w-6" />LinkedIn</NeoButton
					>
				</div>
			</NeoCard>
		</section>

		<section class="flex flex-col w-fit items-end gap-y-8">
			<h2 class="h2 font-bold">Sample Websites</h2>
			<NeoCard class="bg-secondary-400-500-token">
				<h3 class="h3 font-bold">Spresso</h3>
				<span>Non-profit Programming Courses</span>
				<NeoAnchorArrow href="/rec-charity" class="bg-tertiary-300-600-token self-end"
				></NeoAnchorArrow>
			</NeoCard>
			<NeoCard class="bg-primary-400-500-token">
				<h3 class="h3 font-bold">The Bull</h3>
				<span>Restaurant</span>
				<NeoAnchorArrow href="/restaurant" class="bg-tertiary-300-600-token self-end"
				></NeoAnchorArrow>
			</NeoCard>
		</section>
	</div>
</div>

<style>
	.bg-img {
		background-image: url('/brutal-bg.png') !important;
		background-attachment: fixed !important;
		background-position: center !important;
		background-repeat: no-repeat !important;
		background-size: cover !important;
	}
</style>
