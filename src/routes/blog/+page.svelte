<script lang="ts">
	import { route } from '$lib/ROUTES';
	import { List } from '$lib/components';
	import { getModalStore, openModal } from '$lib/components/Modal';
	import { fade, slide } from 'svelte/transition';
	let { data } = $props();
	let tocExpanded = $state(true);
	let modalStore = getModalStore();
</script>

{#snippet label()}
	<div class="flex justify-between gap-x-8">
		<span class="text-2xl {tocExpanded ? 'block' : 'hidden'} font-bold">Posts</span>
		<div class="flex">
			<a
				href={route('/blog/[action=crud]', { action: 'create' })}
				onclick={async (e) => {
					e.preventDefault();
					await openModal({
						ref: await import('$routes/blog/[action=crud]/+page.svelte').then((x) => x.default),
						routes: {
							from: route('/blog'),
							to: route('/blog/[action=crud]', { action: 'create' })
						},
						modalStore
					});
				}}
				title="Create Post"
				class="btn btn-sm rounded-r-none variant-ghost font-bold text-lg py-0">+</a
			>
			<button
				onclick={() => (tocExpanded = !tocExpanded)}
				type="button"
				class="variant-ghost btn btn-icon rounded-l-none btn-icon-sm hidden rounded-r-lg md:inline-flex"
				><img
					src="/SignOut.png"
					class="h-5 w-5 transition-all duration-500 dark:invert hover:will-change-transform {tocExpanded
						? 'rotate-0'
						: '-rotate-180'}"
					alt="close"
				/></button
			>
		</div>
	</div>
{/snippet}

<div class="flex h-full w-full gap-x-8">
	<List
		{label}
		navList={false}
		class="h-full {tocExpanded ? 'w-fit' : 'w-min'} truncate rounded-tr-none sticky"
	>
		{#each data.posts as { id, label } (id)}
			{#key tocExpanded}
				<li in:slide={{ axis: 'x' }} out:fade class="flex">
					<a class="anchor" href="#{id}">
						<span class={tocExpanded ? 'block' : 'hidden'}>{label}</span>
					</a>
				</li>
			{/key}
		{/each}
	</List>
	<div class="flex flex-col px-8 py-4 h-fit">
		<h1 class="h1 font-bold mb-8">Blog Posts</h1>
		<div class="flex flex-col w-full h-full space-y-12">
			{#each data.posts as post}
				<h2 class="h2" id="page1">{post.label}</h2>
				<p class="prose text-token">{post.content}</p>
			{/each}
		</div>
	</div>
</div>
