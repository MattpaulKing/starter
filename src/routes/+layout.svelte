<script lang="ts">
	import '../app.css';
	import { Modal, setModalStore } from '$lib/components/Modal';
	import { Toast, setToaster } from '$lib/components/Toaster';
	import { Breadcrumb, List, Avatar, Popover } from '$lib/components';
	import { slide } from 'svelte/transition';
	let { children } = $props();
	setToaster();
	setModalStore();
	let userMenuOpen = $state(false);
	$inspect(userMenuOpen);
</script>

<Toast />
<Modal />
<div class="flex flex-col overflow-y-auto overflow-x-hidden h-screen w-screen">
	<div class="sticky w-full flex h-fit py-2 px-4 bg-surface-100-800-token place-items-center">
		<Breadcrumb class="w-full" />
		<Popover bind:popoverOpen={userMenuOpen} class="h-9">
			{#snippet btnContent()}
				<Avatar
					initials="MK"
					class="{userMenuOpen
						? 'scale-110 ring-1 ring-secondary-500-400-token'
						: ''} bg-secondary-400-500-token h-9"
				/>
			{/snippet}
			{#if userMenuOpen}
				<List transition={slide} class="absolute right-0 top-full" label="Hello World">
					<button class="btn btn-sm variant-ghost">1</button>
					<button class="btn btn-sm variant-ghost">2</button>
					<button class="btn variant-ghost">3</button>
				</List>
			{/if}
		</Popover>
	</div>
	{@render children()}
</div>
