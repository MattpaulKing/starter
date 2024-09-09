<script lang="ts">
	import { browser } from '$app/environment';
	import { setModeCurrent } from '@skeletonlabs/skeleton';
	import { NeoButton, NeoSpark } from './lib/components/neo-brutalism';
	import NeoCard from './lib/components/neo-brutalism/NeoCard.svelte';
	import type { PageData } from './$types';
	import NeoBadge from './lib/components/neo-brutalism/NeoBadge.svelte';
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
				{#snippet cardChildren()}
					<NeoSpark class="absolute -top-6 stroke-black size-12 -right-6 z-20 fill-tertiary-500" />
				{/snippet}
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
				{#snippet cardChildren()}
					<NeoBadge class="absolute -top-4 stroke-black size-12 -right-4 z-20 fill-tertiary-500" />
				{/snippet}
				<h3 class="h3 font-bold">Spresso</h3>
				<span class="mb-4">Non-profit Programming Courses</span>
				<a href="/rec-charity" class="w-fit group self-end"
					><NeoButton class="bg-tertiary-500-400-token">
						<div class="flex gap-x-2 place-items-center">
							<span>View</span>
							<img
								src="/ArrowRight.png"
								alt="arrow"
								class="group-hover:translate-x-2 transition-transform"
							/>
						</div>
					</NeoButton></a
				>
			</NeoCard>
			<NeoCard class="bg-primary-400-500-token">
				{#snippet cardChildren()}
					<NeoBadge class="absolute -top-4 stroke-black size-12 -right-4 z-20 fill-secondary-500" />
				{/snippet}
				<h3 class="h3 font-bold">The Bull</h3>
				<span class="mb-4">Restaurant</span>
				<a href="/restaurant" class="w-fit group self-end"
					><NeoButton class="bg-secondary-500-400-token">
						<div class="flex gap-x-2 place-items-center">
							<span>View</span>
							<img
								src="/ArrowRight.png"
								alt="arrow"
								class="group-hover:translate-x-2 transition-transform"
							/>
						</div>
					</NeoButton></a
				>
				<!-- <NeoAnchorArrow href="/restaurant" class="bg-tertiary-300-600-token self-end" -->
				<!-- ></NeoAnchorArrow> -->
			</NeoCard>
		</section>
	</div>
</div>
