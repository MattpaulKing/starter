<script lang="ts">
	import { browser } from '$app/environment';
	import { MobileMenu } from '$routes/restaurant/lib/components';
	import { setModeCurrent } from '@skeletonlabs/skeleton';

	let { children } = $props();
	if (browser) {
		setModeCurrent(true);
		let bodyEl = document.querySelector('body');
		bodyEl?.setAttribute('data-theme', 'pinche-app');
	}
	let pages = [{ label: 'sth', href: 'sth' }];
	let mobileMenuOpen = $state(false);
</script>

{#snippet navAnchor({ href, label }: { href: string; label: string })}
	<a class="text-gray-50 font-heading-token hover:text-gray-300 text-lg" href="/restaurant/{href}"
		>{label}</a
	>
{/snippet}

<div class="grid grid-rows-[auto_1fr] h-full">
	<header
		class="sticky top-0 z-10 max-w-full flex place-items-center px-2 justify-between bg-surface-800-100-token"
	>
		<a
			href="/rec-charity"
			class="font-heading-token text-white hover:text-gray-300 font-bold tracking-wide text-3xl"
			>Spresso</a
		>
		<div class="hidden md:flex gap-x-10 h-14 px-10 place-items-center justify-end">
			{#each pages as page}
				{@render navAnchor(page)}
			{/each}
		</div>
		<MobileMenu {mobileMenuOpen}>
			{#each pages as page}
				{@render navAnchor(page)}
			{/each}
		</MobileMenu>
	</header>
	<main class="">
		{@render children()}
	</main>
</div>
