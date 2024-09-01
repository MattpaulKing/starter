<script lang="ts">
	import { route } from '$lib/ROUTES';
	import { List } from '$lib/components';
	import { getModalStore, openModal } from '$lib/components/Modal';
	import { fade, slide } from 'svelte/transition';
	let { data } = $props();
	let modalStore = getModalStore();
	let tocExpanded = $state(true);
</script>

<div class="grid grid-cols-[auto_1fr] h-full w-full gap-x-8">
	<List
		navList={false}
		class="h-full sticky hidden lg:block {tocExpanded ? 'w-fit' : 'w-min'} max-w-64 rounded-tr-none"
	>
		{#snippet label()}
			<div
				class="flex {tocExpanded
					? 'flex-row'
					: 'flex-col'} place-items-center mb-2 justify-between gap-x-4"
			>
				<span class="text-2xl font-bold">Posts</span>
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
		{#each data.posts as { id, label } (id)}
			{#key tocExpanded}
				<li in:slide={{ axis: 'x' }} out:fade class="flex sticky">
					<a class="anchor max-w-48" href="#{id}">
						<span class="truncate {tocExpanded ? 'block' : 'hidden'}">{label}</span>
					</a>
				</li>
			{/key}
		{/each}
	</List>
	<div class="flex flex-col px-8 py-4 w-full h-fit">
		<h1 class="h1 font-bold mb-8">Blog Posts</h1>
		<div class="flex flex-col w-full h-full gap-y-12">
			{#each data.posts as post}
				<div class="flex flex-col max-w-2xl">
					<div class="flex flex-col">
						<a href="/blog/{post.id}" class="h2 anchor" id="#{post.id}">{post.label}</a>
						<span class="text-sm text-gray-200">{post.createdAt.slice(0, 10)}</span>
					</div>
					<div class="text-token max-h-64">{@html post.content.slice(0, 200)}</div>
				</div>
			{/each}
		</div>
	</div>
</div>
