<script lang="ts">
	import { browser } from '$app/environment';
	import { setModeCurrent } from '@skeletonlabs/skeleton';
	import { MobileMenu } from './lib/components';

	let { children } = $props();
	if (browser) {
		setModeCurrent(true);
		let bodyEl = document.querySelector('body');
		bodyEl?.setAttribute('data-theme', 'pinche-neutral');
	}
	let pages = [
		{ label: 'About', href: 'about' },
		{ label: 'Menu', href: 'menu/main' },
		{ label: 'Reservations', href: 'reservations' }
	];
	let mobileMenuOpen = $state(false);
</script>

{#snippet navAnchor({ label, href }: { label: string; href: string })}
	<a class="text-gray-50 font-heading-token hover:text-gray-300 text-lg" href="/restaurant/{href}"
		>{label}</a
	>
{/snippet}

<div class="grid grid-rows-[auto_1fr] h-full">
	<header
		class="sticky top-0 z-10 max-w-full flex place-items-center px-2 justify-between bg-secondary-700"
	>
		<a
			href="/restaurant"
			class="font-heading-token text-white hover:text-gray-300 font-bold tracking-wide text-3xl"
			>The Bull</a
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
