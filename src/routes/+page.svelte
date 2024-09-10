<script lang="ts">
	import { browser } from '$app/environment';
	import { setModeCurrent } from '@skeletonlabs/skeleton';
	import { NeoButton, NeoSpark } from './lib/components/neo-brutalism';
	import NeoCard from './lib/components/neo-brutalism/NeoCard.svelte';
	import NeoBadge from './lib/components/neo-brutalism/NeoBadge.svelte';
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
	<div
		class="flex flex-col gap-y-8 p-6 lg:flex-row lg:justify-around container h-full place-items-center"
	>
		<section class="flex flex-col">
			<NeoCard>
				{#snippet cardChildren()}{/snippet}
				<div class="flex relative w-fit">
					<h1 class="h1 font-bold">Matthew King</h1>
					<NeoSpark
						class="absolute -top-10 stroke-black size-12 -right-10 z-20 fill-tertiary-500"
					/>
				</div>
				<div class="grid grid-cols-2">
					<ul class="list mt-4 px-4">
						<span class="font-bold -mx-2">Languages</span>
						<li>Javascript / Typescript</li>
						<li>Python</li>
						<li>PostgreSQL</li>
					</ul>
					<ul class="list mt-4 px-4">
						<span class="font-bold -mx-2">Skills</span>
						<li>ETL Pipelines</li>
						<li>Report Automation</li>
						<li></li>
					</ul>
				</div>
				<div
					class="grid grid-cols-2 lg:flex lg:flex-wrap justify-items-start gap-y-4 gap-x-4 place-items-center mt-6"
				>
					<NeoButton class="variant-filled-tertiary w-fit">Resume</NeoButton>
					<a href="mailto:matthewpaulking@outlook.com"
						><NeoButton class="bg-primary-400-500-token flex gap-x-2 w-fit">
							<img src="/Envelope.png" alt="email" class="w-6 h-6" />
							Email
						</NeoButton></a
					>
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
			<div
				class="p-10 rounded-tl-full rounded-br-full bg-surface-100 border-2 relative border-black flex h-24 flex-col items-center justify-center"
			>
				<div
					class="p-10 rounded-tl-full w-full h-full rounded-br-full bg-black absolute -z-10 top-4 -right-4"
				></div>
				<h2 class="h2 z-10 font-bold w-fit whitespace-nowrap">Sample Websites</h2>
			</div>
			<div class="flex flex-col items-end w-full px-10 gap-y-8">
				<NeoCard class="bg-secondary-400-500-token">
					{#snippet cardChildren()}
						<NeoBadge
							class="absolute -top-4 stroke-black size-12 -right-4 z-20 fill-tertiary-500"
						/>
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
						<NeoBadge
							class="absolute -top-4 stroke-black size-12 -right-4 z-20 fill-secondary-500"
						/>
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
				</NeoCard>
			</div>
		</section>
	</div>
</div>

<style>
	.bg-img {
		background-image: url('/brutal-bg.png') !important;
		background-attachment: local !important;
		background-repeat: repeat !important;
		background-size: 1100px !important;
	}
</style>
