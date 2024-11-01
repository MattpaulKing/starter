<script lang="ts">
	import { OptionsMenu } from '../Buttons';
	import html2canvas from 'html2canvas';
	import type { Snippet } from 'svelte';

	let {
		title,
		class: classes = '',
		children
	}: { title: Snippet; class?: string; children: Snippet } = $props();
	let container: HTMLDivElement;
	let btnContainer: HTMLDivElement | undefined = $state();

	async function exportImg() {
		await html2canvas(container, {
			windowWidth: container.scrollWidth,
			windowHeight: container.scrollHeight,
			backgroundColor: null,
			ignoreElements: (el) => (btnContainer ? el.isSameNode(btnContainer) : false)
		}).then(async (canvas) => {
			let img = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
			let a = document.createElement('a');
			a.setAttribute('download', 'chart.png');
			a.setAttribute('href', img);
			a.click();
			a.remove();
		});
	}
</script>

<div bind:this={container} class="bg-surface-800 {classes} rounded-container-token p-4">
	<div class="grid ml-4 mr-2 grid-cols-[auto_1fr] items-start mb-4">
		{@render title()}
		<OptionsMenu bind:btnContainer>
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
		</OptionsMenu>
	</div>
	{@render children()}
</div>
