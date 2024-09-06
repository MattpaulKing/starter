<script lang="ts">
	import { browser } from '$app/environment';
	import { MobileMenu } from '$routes/restaurant/lib/components';
	import { setModeCurrent } from '@skeletonlabs/skeleton';

	let { children } = $props();
	if (browser) {
		setModeCurrent(false);
		let bodyEl = document.querySelector('body');
		bodyEl?.setAttribute('data-theme', 'pinche-app');
	}
	let pages = [
		{ label: 'About Us', href: 'about' },
		{ label: 'Our Team', href: 'team' },
		{ label: 'Programs', href: 'programs', headings: ['seniors', 'women', 'youth'] }
	];
	let mobileMenuOpen = $state(false);
</script>

{#snippet navAnchor({
	href,
	label,
	headings
}: {
	href: string;
	label: string;
	headings?: string[];
})}
	<nav class="relative group flex flex-col p-2">
		<a
			class="text-gray-50 font-heading-token group-hover:text-gray-300 text-lg"
			href="/rec-charity/{href}"
			>{label}
			{#if headings}
				<img src="/CaretLeft.png" class="invert inline-block w-5 h-5 ml-2 -rotate-90" alt="caret" />
			{/if}
		</a>
		{#if headings}
			<ul
				class="hidden list-nav rounded-lg top-full bg-surface-100-800-token w-full group-hover:flex flex-col absolute"
			>
				{#each headings as heading}
					<a
						class="text-gray-50 capitalize font-heading-token hover:text-gray-300 text-lg"
						href="/rec-charity/{href}#{heading}">{heading}</a
					>
				{/each}
			</ul>
		{/if}
	</nav>
{/snippet}

<div class="grid grid-rows-[auto_1fr] h-full">
	<header
		class="sticky top-0 z-10 max-w-full flex place-items-center px-10 justify-between bg-surface-100-800-token"
	>
		<a
			href="/rec-charity"
			class="font-heading-token text-white hover:text-gray-300 font-bold tracking-wide text-3xl"
			>Spresso</a
		>
		<div class="hidden md:flex gap-x-6 h-14 place-items-center justify-end">
			{#each pages as page}
				{@render navAnchor(page)}
			{/each}
			<button class="btn btn-sm variant-filled-warning">Donate</button>
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
