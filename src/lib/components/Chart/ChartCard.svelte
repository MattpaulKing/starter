<script lang="ts">
	import html2canvas from 'html2canvas';
	import Popover from '../Popover.svelte';
	import type { Snippet } from 'svelte';

	let { title, children }: { title: Snippet; children: Snippet } = $props();
	let container: HTMLDivElement;
	let btnContainer: HTMLDivElement;

	async function exportImg() {
		await html2canvas(container, {
			windowWidth: container.scrollWidth,
			windowHeight: container.scrollHeight,
			backgroundColor: null,
			ignoreElements: (el) => el.isSameNode(btnContainer)
		}).then(async (canvas) => {
			// document.body.appendChild(canvas);
			let img = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
			let a = document.createElement('a');
			a.setAttribute('download', 'chart.png');
			a.setAttribute('href', img);
			a.click();
			a.remove();
		});
	}
	let chartBtnsOpen = $state(false);
</script>

<div bind:this={container} class="bg-surface-800 rounded-container-token w-fit p-4">
	<div class="grid ml-4 mr-2 grid-cols-[auto_1fr] items-start mb-4">
		{@render title()}
		<div class="flex relative justify-end gap-x-2" bind:this={btnContainer}>
			<Popover class="h-9" bind:popoverOpen={chartBtnsOpen}>
				<button
					onclick={() => (chartBtnsOpen = !chartBtnsOpen)}
					class="btn-icon btn-icon-sm variant-ghost rounded-token"
				>
					<span class="font-bold">...</span>
				</button>
				{#if chartBtnsOpen}
					<nav class="list-nav bg-surface-700 rounded-token absolute right-0 w-max h-fit z-10">
						<ul class="[&>li>*]:text-sm">
							<li class="">
								<button onclick={exportImg} class="flex w-full">
									<img src="/Image.png" class="dark:invert w-6 h-6" alt="icon" />
									<span>Save Picture</span>
								</button>
							</li>
							<li class="">
								<button onclick={() => null} class="flex w-full">
									<img src="/Info.png" class="dark:invert w-6 h-6" alt="icon" />
									<span>Info</span>
								</button>
							</li>
						</ul>
					</nav>
				{/if}
			</Popover>
		</div>
	</div>
	{@render children()}
</div>
