<script lang="ts">
	import { page } from '$app/stores';
	import { camelToTitle } from '$lib/transforms';
	import { match as isUUID } from '../../params/uuid';
	import { AnchorSlider } from '.';
	let { class: classes = '' }: { class?: string } = $props();
	let routeParts =
		$page.url.pathname
			?.slice(1, $page.url.pathname.length)
			.split('/')
			.filter((part) => part !== '' && part !== undefined)
			.map((part) => (isUUID(part) ? 'id' : part)) ?? [];
</script>

<div class="flex place-items-center gap-x-2 {classes}">
	<AnchorSlider class="text-xl" href="/">Home</AnchorSlider>
	{#if $page.url.pathname}
		{#each routeParts as part, i (i)}
			<img
				src="/CaretLeft.png"
				class="hidden h-5 w-5 rotate-180 dark:invert lg:block"
				alt="caret"
			/>
			<AnchorSlider
				class="text-xl"
				href={$page.url.pathname.slice(0, $page.url.pathname.indexOf(part) + part.length)}
			>
				{camelToTitle(part)}
			</AnchorSlider>
		{/each}
	{/if}
</div>
