<script lang="ts">
	import '../app.css';
	import { Modal, setModalStore } from '$lib/components/Modal';
	import { Toast, setToaster } from '$lib/components/Toaster';
	import { Breadcrumb, List, Avatar, Popover, LoadingSpinner, AnchorSlider } from '$lib/components';
	import { slide } from 'svelte/transition';
	import { afterNavigate, beforeNavigate } from '$app/navigation';

	setToaster();
	setModalStore();

	let userMenuOpen = $state(false);
	let slowNav = $state(false);
	let navDelay: ReturnType<typeof setTimeout>;

	beforeNavigate((nav) => {
		navDelay = setTimeout(() => {
			slowNav = true;
		}, 300);
		afterNavigate((nav) => {
			slowNav = false;
			clearTimeout(navDelay);
		});
	});
	let { children } = $props();
</script>

<Toast />
<Modal />

<div class="flex flex-col overflow-y-auto overflow-x-hidden h-screen w-screen">
	<div class="sticky w-full flex h-fit py-2 px-4 bg-surface-100-800-token place-items-center">
		<div class="flex w-full gap-x-8">
			<Breadcrumb />
		</div>
		{#if slowNav}
			<div class="relative h-9 w-9">
				<LoadingSpinner class="h-9 w-9" />
			</div>
		{:else}
			<Popover class="h-9" bind:popoverOpen={userMenuOpen}>
				<button onclick={() => (userMenuOpen = !userMenuOpen)}>
					<Avatar
						initials="MK"
						class="{userMenuOpen
							? 'scale-110 ring-1 ring-secondary-500-400-token'
							: ''} bg-secondary-400-500-token h-9"
					/>
				</button>
				{#if userMenuOpen}
					<List transition={slide} class="absolute right-0 top-full" label="Hello World">
						<button class="btn btn-sm variant-ghost">1</button>
						<button class="btn btn-sm variant-ghost">2</button>
						<button class="btn btn-sm variant-ghost">3</button>
					</List>
				{/if}
			</Popover>
		{/if}
	</div>
	{@render children()}
</div>
