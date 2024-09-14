<script lang="ts">
	import Resume from '$lib/assets/Resume.pdf';
	import { browser } from '$app/environment';
	import { setModeCurrent } from '@skeletonlabs/skeleton';
	import { NeoButton, NeoSpark } from './lib/components/neo-brutalism';
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
	<div class="grid grid-cols-2 p-6 container h-full place-items-center">
		<section class="flex flex-col">
			<NeoCard class="space-y-12">
				{#snippet cardChildren()}{/snippet}
				<div class="flex relative w-fit">
					<h1 class="h1 tracking-tighter font-bold">Matthew King</h1>
					<NeoSpark
						class="absolute -top-10 stroke-black size-12 -right-10 z-20 fill-tertiary-500"
					/>
				</div>
				<div
					class="w-full grid grid-cols-[auto_auto_1fr] gap-x-3 md:gap-x-4 place-items-center mt-6"
				>
					<a href={Resume} target="_blank" download="Matthew King - CV.pdf"
						><NeoButton class="variant-filled-tertiary btn-sm md:btn-base">Resume</NeoButton></a
					>
					<a href="mailto:matthewpaulking@outlook.com"
						><NeoButton class="bg-primary-400-500-token w-fit btn-sm md:btn-base min-w-12 flex">
							<img src="/Envelope.png" alt="email" class="w-6 h-6" />
							<span class="hidden md:block">Email</span>
						</NeoButton></a
					>
					<div class="flex gap-x-2 justify-self-end px-4">
						<a target="_blank" href="https://github.com/MattpaulKing">
							<img src="/Github.png" alt="github" class="h-6 w-6" />
						</a>
						<a target="_blank" href="https://www.linkedin.com/in/matthew-paul-king/">
							<img src="/LinkedIn.png" alt="github" class="h-6 w-6" />
						</a>
					</div>
				</div>
			</NeoCard>
		</section>

		<section class="flex flex-col w-full items-end">
			<div class="flex flex-col w-fit items-end gap-y-12">
				<div
					class="p-10 rounded-tl-full rounded-br-full bg-surface-100 border-2 relative border-black -right-3 md:-right-0 flex h-20 md:h-24 flex-col items-center justify-center"
				>
					<div
						class="p-10 rounded-tl-full w-full h-full rounded-br-full bg-black absolute -z-10 top-2 -right-2 md:top-3 md:-right-3"
					></div>
					<h2 class="h2 z-10 font-bold w-fit whitespace-nowrap">Sample Websites</h2>
				</div>
				<div class="flex flex-col items-end w-full px-10 gap-y-12">
					<NeoCard class="bg-secondary-400-500-token">
						<div class="w-full justify-between flex place-items-center gap-x-4 mb-4">
							<span class="text-3xl font-heading-token tracking-tighter font-bold">Spresso</span>
							<div class="relative p-1 border border-black rounded-full bg-tertiary-500-400-token">
								<div
									class="absolute top-1 -right-1 bg-black rounded-full -z-10 w-full h-full"
								></div>
								<img class="" src="/pixel-computer.png" alt="computer" />
							</div>
						</div>
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
						<h3 class="text-3xl font-heading-token tracking-tighter font-bold">The Bull</h3>
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
			</div>
		</section>
	</div>
</div>

<style>
</style>
